import styled from "styled-components";
import {RevealWrapper} from 'next-reveal'
import ProductBox from "./ProductBox";

const StyledProductsAll = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-bottom: 70px;
  }
`;

export default function ProductsAll({products,wishedProducts=[]}) {
    return (
        <StyledProductsAll interval={100}>
            {products?.length > 0 && products.map((product,index) => (
                <RevealWrapper key={product._id} delay={index*50}>
                    <ProductBox {...product}
                                wished={wishedProducts.includes(product._id)} />
                </RevealWrapper>
            ))}
        </StyledProductsAll>
    );
}