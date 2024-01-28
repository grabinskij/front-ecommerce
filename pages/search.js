import styled from "styled-components";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {debounce} from "lodash";
import Input from "../components/Input";
import Center from "../components/Center";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import ProductsAll from "../components/ProductsAll";
import {mongooseConnect} from "../lib/mongoose";
import {Product} from "../models/Product";
import {getServerSession} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]";
import {WishedProduct} from "../models/WishedProduct";
import HeaderPlaceholder from "../components/HeaderPlaceholder";
import ContentPlaceholder from "../components/ContentPlaceholder";


const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.4rem;
`;
const InputWrapper = styled.div`
  position: sticky;
  top: 68px;
  margin: 25px 0;
  padding: 5px 0;
  background-color: #eeeeeeaa;
`;

export default function SearchPage({wishedProducts = []}) {
    const [phrase, setPhrase] = useState('');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const debouncedSearch = useCallback(
        debounce(searchProducts, 500), []
    );
    useEffect(() => {
        if (phrase.length > 0) {
            setIsLoading(true);
            debouncedSearch(phrase);
        } else {
            setProducts([]);
        }
    }, [phrase]);

    function searchProducts(phrase) {
        axios.get('/api/products?phrase=' + encodeURIComponent(phrase))
            .then(response => {
                setProducts(response.data);
                setIsLoading(false);
            });
    }

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            {loading ? <HeaderPlaceholder/> : <Header/>}
            {loading && <Spinner fullWidth={true}/>}
            {loading ? <ContentPlaceholder/> : (
                <Center>
                    <InputWrapper>
                        <SearchInput
                            autoFocus
                            value={phrase}
                            onChange={ev => setPhrase(ev.target.value)}
                            placeholder="Search for products..."/>
                    </InputWrapper>
                    {!isLoading && phrase !== '' && products.length === 0 && (
                        <h2>No products found for query "{phrase}"</h2>
                    )}
                    {isLoading && (
                        <Spinner fullWidth={true}/>
                    )}
                    {!isLoading && products.length > 0 && (
                        <ProductsAll products={products} wishedProducts={wishedProducts}/>
                    )}
                </Center>
            )}
        </>
    );
}


export async function getServerSideProps(context) {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort: {'_id': -1}});
    const session = await getServerSession(context.req, context.res, authOptions);
    const wishedProducts = session?.user
        ? await WishedProduct.find({
            userEmail: session?.user.email,
            product: products.map(p => p._id.toString()),
        })
        : [];
    return {
        props: {
            wishedProducts: wishedProducts.map(i => i.product.toString()),
        }
    };
}
