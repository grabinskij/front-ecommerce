import styled from "styled-components";
import Header from "../../components/Header";
import Center from "../../components/Center";
import CartIcon from "../../components/icons/CartIcon";
import {mongooseConnect} from "../../lib/mongoose";
import {Product} from "../../models/Product";
import WhiteBox from "../../components/WhiteBox";
import Title from "../../components/Title";
import ProductImages from "../../components/ProductImages";
import FlyingButton from "../../components/FlyingButton";
import ProductReviews from "../../components/ProductReviews";
import {useEffect, useState} from "react";
import HeaderPlaceholder from "../../components/HeaderPlaceholder";
import Spinner from "../../components/Spinner";
import ContentPlaceholder from "../../components/ContentPlaceholder";
import FooterPlaceholder from "../../components/FooterPlaceholder";
import Footer from "../../components/Footer";


const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;
const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({product}) {

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
                    <ColWrapper>
                        <WhiteBox>
                            <ProductImages images={product.images}/>
                        </WhiteBox>
                        <div>
                            <Title>{product.title}</Title>
                            <p>{product.description}</p>
                            <PriceRow>
                                <div>
                                    <Price>${product.price}</Price>
                                </div>
                                <div>
                                    <FlyingButton main _id={product._id} src={product.images?.[0]}>
                                        <CartIcon/>Add to cart
                                    </FlyingButton>
                                </div>
                            </PriceRow>
                        </div>
                    </ColWrapper>
                    <ProductReviews product={product}/>
                </Center>
            )}
            {loading ? <FooterPlaceholder/> : <Footer/>}
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const {id} = context.query;
    const product = await Product.findById(id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        }
    }
}