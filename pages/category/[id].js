import styled from "styled-components";
import {useEffect, useState} from "react";
import axios from "axios";
import Header from "../../components/Header";
import Center from "../../components/Center";
import {Category} from "../../models/Category";
import {Product} from "../../models/Product";
import Spinner from "../../components/Spinner";
import ProductsAll from "../../components/ProductsAll";
import {mongooseConnect} from "../../lib/mongoose";
import {WishedProduct} from "../../models/WishedProduct";
import {authOptions} from "../api/auth/[...nextauth]";
import {getServerSession} from "next-auth";
import HeaderPlaceholder from "../../components/HeaderPlaceholder";
import ContentPlaceholder from "../../components/ContentPlaceholder";
import FooterPlaceholder from "../../components/FooterPlaceholder";
import Footer from "../../components/Footer";


const CategoryHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 1.5em;
    margin-right: 10px;
    padding: 0;
    margin-bottom: 0;
  }
`;
const FiltersWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px 0;
`;
const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: #444;

  select {
    background-color: transparent;
    border: 0;
    font-size: inherit;
    color: #444;
  }
`;

export default function CategoryPage({category, subCategories, products: originalProducts, wishedProducts = []}) {
    const defaultSorting = '_id-desc';
    const defaultFilterValues = category.properties
        .map(p => ({name: p.name, value: 'all'}));
    const [products, setProducts] = useState(originalProducts);
    const [filtersValues, setFiltersValues] = useState(defaultFilterValues);
    const [sort, setSort] = useState(defaultSorting);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [filtersChanged, setFiltersChanged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);


    function handleFilterChange(filterName, filterValue) {
        setFiltersValues(prev => {
            return prev.map(p => ({
                name: p.name,
                value: p.name === filterName ? filterValue : p.value,
            }));
        });
        setFiltersChanged(true);
    }

    useEffect(() => {
        if (!filtersChanged) {
            return;
        }
        setLoadingProducts(true);
        const catIds = [category._id, ...(subCategories?.map(c => c._id) || [])];
        const params = new URLSearchParams;
        params.set('categories', catIds.join(','));
        params.set('sort', sort);
        filtersValues.forEach(f => {
            if (f.value !== 'all') {
                params.set(f.name, f.value);
            }
        });
        const url = `/api/products?` + params.toString();
        axios.get(url).then(res => {
            setProducts(res.data);
            setLoadingProducts(false);
        })
    }, [filtersValues, sort, filtersChanged]);


    return (
        <>
            {loading ? <HeaderPlaceholder/> : <Header/>}
            {loading && <Spinner fullWidth={true}/>}
            {loading ? <ContentPlaceholder/> : (
                <Center>
                    <CategoryHeader>
                        <h1>{category.name}</h1>
                        <FiltersWrapper>
                            {category.properties.map(prop => (
                                <Filter key={prop.name}>
                                    <span>{prop.name}:</span>
                                    <select
                                        onChange={ev => handleFilterChange(prop.name, ev.target.value)}
                                        value={filtersValues.find(f => f.name === prop.name).value}>
                                        <option value="all">All</option>
                                        {prop.values.map(val => (
                                            <option key={val} value={val}>{val}</option>
                                        ))}
                                    </select>
                                </Filter>
                            ))}
                            <Filter>
                                <span>Sort:</span>
                                <select
                                    value={sort}
                                    onChange={ev => {
                                        setSort(ev.target.value);
                                        setFiltersChanged(true);
                                    }}>
                                    <option value="price-asc">price, lowest first</option>
                                    <option value="price-desc">price, highest first</option>
                                    <option value="_id-desc">newest first</option>
                                    <option value="_id-asc">oldest first</option>
                                </select>
                            </Filter>
                        </FiltersWrapper>
                    </CategoryHeader>
                    {loadingProducts && (
                        <Spinner fullWidth/>
                    )}
                    {!loadingProducts && (
                        <div>
                            {products.length > 0 && (
                                <ProductsAll products={products} wishedProducts={wishedProducts}/>
                            )}
                            {products.length === 0 && (
                                <div>Sorry, no products found</div>
                            )}
                        </div>
                    )}
                </Center>
            )}
            {loading ? <FooterPlaceholder/> : <Footer/>}
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const category = await Category.findById(context.query.id);
    const subCategories = await Category.find({parent: category._id});
    const catIds = [category._id, ...subCategories.map(c => c._id)];
    const products = await Product.find({category: catIds});
    const session = await getServerSession(context.req, context.res, authOptions);
    const wishedProducts = session?.user
        ? await WishedProduct.find({
            userEmail: session?.user.email,
            product: products.map(p => p._id.toString()),
        })
        : [];
    return {
        props: {
            category: JSON.parse(JSON.stringify(category)),
            subCategories: JSON.parse(JSON.stringify(subCategories)),
            products: JSON.parse(JSON.stringify(products)),
            wishedProducts: wishedProducts.map(i => i.product.toString()),
        }
    };
}
