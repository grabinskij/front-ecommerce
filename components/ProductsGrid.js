import ProductBox from "./ProductBox";
import styled from "styled-components";
import {RevealWrapper} from 'next-reveal'
import Link from "next/link";
import {primary} from "../lib/colors";


const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 50px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-bottom: 70px;
  }
`;
const StyledPaginationWrapper = styled.div`
  display: flex;
  margin: 40px 0 50px 0;
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;
  font-size: 18px;
  font-weight: bold;
  align-items: center;

`;
const PaginationButtonsWrapper = styled.div`
  display: flex;
  gap: 2px;
`;
const PreviousButton = styled.div`
  opacity: 0.6;
  color: ${primary};
  text-decoration: none;
  cursor: pointer;
`;
const PreviousLink = styled(Link)`
  color: ${primary};
  text-decoration: none;
`;
const NextButton = styled.div`
  opacity: 0.6;
  color: ${primary};
  text-decoration: none;
  cursor: pointer;
`;
const NextLink = styled(Link)`
  color: ${primary};
  text-decoration: none;
`;
const StyledLink = styled(Link)`
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  color: ${({active}) => (active ? '#fff' : 'inherit')};
  background-color: ${({active}) => (active ? `${primary}` : 'inherit')};
  font-weight: ${({active}) => (active ? 'bold' : 'inherit')};

  &:hover {
    background-color: ${({active}) => (active ? `${primary}` : '#a39afa')};
    color: #fff;
  }
`;


export default function ProductsGrid({
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
            <StyledProductsGrid interval={100}>
                {products?.length > 0 && products.map((product, index) => (
                    <RevealWrapper key={product._id} delay={index * 50}>
                        <ProductBox {...product}
                                    wished={wishedProducts.includes(product._id)}/>
                    </RevealWrapper>
                ))}
            </StyledProductsGrid>
            {isPageOutOfRange ? (
                <div>No more pages...</div>
            ) : (

                <StyledPaginationWrapper>
                    <Pagination>
                        {page === 1 ? (
                            <PreviousButton aria-disabled="true">
                                Previous
                            </PreviousButton>
                        ) : (
                            <PreviousLink href={`?page=${prevPage}`} aria-label="Previous Page">
                                Previous
                            </PreviousLink>
                        )}
                        <PaginationButtonsWrapper>
                            {pageNumbers.map((pageNumber, index) => (
                                <StyledLink
                                    key={index}
                                    active={page === pageNumber}
                                    href={`?page=${pageNumber}`}
                                >
                                    {pageNumber}
                                </StyledLink>
                            ))}
                        </PaginationButtonsWrapper>
                        {page === totalPages ? (
                            <NextButton aria-disabled="true">
                                Next
                            </NextButton>
                        ) : (
                            <NextLink href={`?page=${nextPage}`} aria-label="Next Page">
                                Next
                            </NextLink>
                        )}
                    </Pagination>
                </StyledPaginationWrapper>
            )}
        </>
    );
}
