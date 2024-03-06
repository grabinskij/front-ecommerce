import styled from "styled-components";
import Link from "next/link";
import {useState} from "react";
import FlyingButton from "./FlyingButton";
import HeartOutlineIcon from "./icons/HeartOutlineIcon";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";
import {useSession} from "next-auth/react";
import {withSwal} from "react-sweetalert2";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const ProductWrapper = styled.div`
  button{
    width: 100%;
    text-align: center;
    justify-content: center;
  }
`;
const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 160px; 
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  img{
    max-width: 100%;
    max-height: 120px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: .9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
    margin-top: 5px;
`;
const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

const WishlistButton = styled.button`
  border: 0;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  cursor: pointer;
  ${props => props.wished ? `
    color: red;
    ` : `
    color: black;
    `}
  svg{
    width: 16px;
  }
`;

function ProductBox({ _id,
                      title,
                      price,
                      images,
                      wished= false,
                      swal,
                      onRemoveFromWishList=()=>{},
                      }) {

    const url = '/product/'+_id;
    const [isWished, setIsWished] = useState(wished);
    const { data: session } = useSession();




    async function addToWishlist(e) {
        e.preventDefault();
        e.stopPropagation();
        const nextValue = !isWished;
        if (nextValue === false && onRemoveFromWishList) {
            onRemoveFromWishList(_id);
        }
        axios.post('/api/wishlist', {
            product: _id,
        }).then(() => {});
        setIsWished(nextValue);
    }

    function addToWishlistWarning(e) {
        e.preventDefault();
        e.stopPropagation();
        swal.fire({
            title: 'To add items to your wish list, please log in',
        })
    }

    return (
        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    {session && (
                        <WishlistButton wished={isWished} onClick={addToWishlist}>
                            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
                        </WishlistButton>
                    )}
                    {!session && (
                        <WishlistButton onClick={addToWishlistWarning}>
                            <HeartOutlineIcon />
                        </WishlistButton>
                    )}
                    <img src={images?.[0]} alt="img"/>
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>{title}</Title>
                <PriceRow>
                    <Price>
                        ${price}
                    </Price>
                    <FlyingButton _id={_id} src={images?.[0]}>Add to cart</FlyingButton>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    )
}

export default withSwal(ProductBox);
