import {mongooseConnect} from "../../lib/mongoose";
import {WishedProduct} from "../../models/WishedProduct";
import {getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";

export default async function handle(req, res) {
    await mongooseConnect();
    const session = await getServerSession(req, res, authOptions);
    const {user} = session ? session : {};

    if(req.method === 'POST') {
        const {product} = req.body;
        if (user) {
            const wishedDoc = await WishedProduct.findOne({userEmail: user.email, product});
            if (wishedDoc) {
                await WishedProduct.findByIdAndDelete(wishedDoc._id);
            } else {
                await WishedProduct.create({userEmail: user.email, product});
            }
            res.json(true);
        }
    } else if (req.method === 'GET') {
        if (user) {
            res.json(
                await WishedProduct.find({userEmail: user.email}).populate('product')
            );
        }
    } else {
        res.status(405).end();
    }
}




