import Header from "../components/Header";
import Featured from "../components/Featured";
import {Product} from "../models/Product";
import {mongooseConnect} from "../lib/mongoose";
import NewProducts from "../components/NewProducts";
import {WishedProduct} from "../models/WishedProduct";
import {getServerSession} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]";
import {Setting} from "../models/Setting";


export default function Home({featuredProduct, newProducts, wishedNewProducts, totalCount, totalPages,  prevPage, nextPage, page, isPageOutOfRange, pageNumbers }) {

    return (
        <div>
            <Header/>
            <Featured product={featuredProduct}/>
            <NewProducts
                products={newProducts}
                wishedProducts={wishedNewProducts}
                totalCount={totalCount}
                totalPages={totalPages}
                prevPage={prevPage}
                nextPage={nextPage}
                page={page}
                isPageOutOfRange={isPageOutOfRange}
                pageNumbers={pageNumbers}
            />
        </div>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const featuredProductSetting = await Setting.findOne({name: 'featuredProductId'});
    const featuredProductId = featuredProductSetting.value;
    const featuredProduct = await Product.findById(featuredProductId);

    const itemsPerPage = 8;
    const totalCount = await Product.countDocuments({});
    let page = parseInt(context.query.page, 10) || 1;
    page = !page || page < 1 ? 1 : page;

    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;
    const isPageOutOfRange = page > totalPages;
    const pageNumbers = [];
    const offsetNumber = 3;
    for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
        if (i >= 1 && i <= totalPages) {
            pageNumbers.push(i);
        }
    }



    const skip = (page - 1) * itemsPerPage;

    const newProducts = await Product.find({}, null, { sort: { _id: -1 }, skip, limit: itemsPerPage });

    // const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 8})
    const session = await getServerSession(context.req, context.res, authOptions);
    const wishedNewProducts = session?.user
        ? await WishedProduct.find({
            userEmail: session.user.email,
            product: newProducts.map(p => p._id.toString()),
        })
        : [];
    return {
        props: {
            featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
            newProducts: JSON.parse(JSON.stringify(newProducts)),
            wishedNewProducts: wishedNewProducts.map(i => i.product.toString()),
            totalCount,
            totalPages,
            prevPage,
            nextPage,
            page,
            isPageOutOfRange,
            pageNumbers
        },
    }
}


