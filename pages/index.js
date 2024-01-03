import Header from "../components/Header";
import Featured from "../components/Featured";
import {Product} from "../models/Product";
import {mongooseConnect} from "../lib/mongoose";
import NewProducts from "../components/NewProducts";
import {WishedProduct} from "../models/WishedProduct";
import {getServerSession} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]";

export default function Home({featuredProduct, newProducts, wishedNewProducts}) {
    return (
        <div>
            <Header/>
            <Featured product={featuredProduct}/>
            <NewProducts products={newProducts} wishedProducts={wishedNewProducts}/>
        </div>
    )
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const featuredProductId = '6579d00153a3257c9d2c84c0';
    const featuredProduct = await Product.findById(featuredProductId);
    const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 10})
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
        },
    }
}
