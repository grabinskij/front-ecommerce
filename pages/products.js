import Header from "../components/Header";
import Center from "../components/Center";
import Title from "../components/Title";
import {mongooseConnect} from "../lib/mongoose";
import {Product} from "../models/Product";
import {getServerSession} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]";
import {WishedProduct} from "../models/WishedProduct";
import ProductsGrid from "../components/ProductsGrid";


export default function ProductsPage({
                                         products,
                                         wishedProducts = [],
                                         totalPages,
                                         prevPage,
                                         nextPage,
                                         page,
                                         isPageOutOfRange,
                                         pageNumbers
                                     }) {
    return (
        <>
            <Header/>
            <Center>
                <Title>All products</Title>
                <ProductsGrid
                    products={products}
                    wishedProducts={wishedProducts}
                    totalPages={totalPages}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    page={page}
                    isPageOutOfRange={isPageOutOfRange}
                    pageNumbers={pageNumbers}
                />
            </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const itemsPerPage = 10;
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

    const products = await Product.find({}, null, {sort: {_id: -1}, skip, limit: itemsPerPage});

    const session = await getServerSession(context.req, context.res, authOptions);
    const wishedProducts = session?.user
        ? await WishedProduct.find({
            userEmail: session.user.email,
            product: products.map(p => p._id.toString()),
        })
        : [];
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            wishedProducts: wishedProducts.map(i => i.product.toString()),
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