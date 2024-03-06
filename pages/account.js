import Header from "../components/Header";
import Center from "../components/Center";
import {signIn, signOut, useSession} from "next-auth/react";
import Button from "../components/Button";
import WhiteBox from "../components/WhiteBox";
import {RevealWrapper} from "next-reveal";
import styled from "styled-components";
import Input from "../components/Input";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import ProductBox from "../components/ProductBox";
import Tabs from "../components/Tabs";
import Order from "../components/Order";
import HeaderPlaceholder from "../components/HeaderPlaceholder";
import ContentPlaceholder from "../components/ContentPlaceholder";
import FooterPlaceholder from "../components/FooterPlaceholder";
import Footer from "../components/Footer";


const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin: 20px;

  p {
    margin: 5px;
  }

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: .8fr 1.2fr;
    gap: 40px;
  }
`;

const ProductBoxWrapper = styled.div`
  border: 1px solid #eee;
  padding: 15px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const WishedProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledWarning = styled.p`
  color: red;
  span {
    color: #0260c4;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: #3784d3;
    }
  }
`;
const LogoutButtonWrapper = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p{
    color: green;
  }
`;


export default function AccountPage({consentGiven, setPopupVisible}) {
    const {data: session} = useSession();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [addressLoaded, setAddressLoaded] = useState(true);
    const [wishListLoaded, setWishListLoaded] = useState(true);
    const [orderLoaded, setOrderLoaded] = useState(true);
    const [wishedProducts, setWishedProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('Orders');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSavedAddress, setIsSavedAddress] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    async function logOut() {
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL
        });
    }

    async function logIn() {
        await signIn('google');
    }

    function saveAddress() {
        const data = {name, email, city, streetAddress, postalCode, country}
        axios.put('/api/address', data)
        setIsSavedAddress(true);
    }

    useEffect(() => {
        if (!session) {
            return;
        }
        setAddressLoaded(false);
        setWishListLoaded(false);
        setOrderLoaded(false);
        axios.get('/api/address').then(response => {
            setName(response?.data?.name);
            setEmail(response?.data?.email);
            setCity(response?.data?.city);
            setPostalCode(response?.data?.postalCode);
            setStreetAddress(response?.data?.streetAddress);
            setCountry(response.data?.country);
            setAddressLoaded(true);
        });
        axios.get('/api/wishlist').then(response => {
            setWishedProducts(response.data.map(wp => ({...wp.product, key: wp._id})));
            setWishListLoaded(true);
        })
        axios.get('/api/orders').then(response => {
            setOrders(response.data);
            setOrderLoaded(true);
        })
    }, [session]);

    function productRemovedFromWishList(idToRemove) {
        setWishedProducts(products => {
            return [...products.filter(p => p._id.toString() !== idToRemove)]
        })
    }

    function openPopup() {
        setPopupVisible(prev => !prev);
    }

    return (
        <>
            {loading ? <HeaderPlaceholder/> : <Header/>}
            {loading && <Spinner fullWidth={true}/>}
            {loading ? <ContentPlaceholder/> : (
                <Center>
                    <ColsWrapper>
                        <div>
                            <RevealWrapper delay={100}>
                                <WhiteBox>
                                    <h2>{session ? 'Account details' : 'Login'}</h2>
                                    {!addressLoaded && (
                                        <Spinner fullWidth={true}/>
                                    )}
                                    {addressLoaded && session && (
                                        <>
                                            <Input type="text"
                                                   placeholder="Name"
                                                   value={name}
                                                   name="name"
                                                   onChange={ev => setName(ev.target.value)}/>
                                            <Input type="text"
                                                   placeholder="Email"
                                                   value={email}
                                                   name="email"
                                                   onChange={ev => setEmail(ev.target.value)}/>
                                            <CityHolder>
                                                <Input type="text"
                                                       placeholder="City"
                                                       value={city}
                                                       name="city"
                                                       onChange={ev => setCity(ev.target.value)}/>
                                                <Input type="text"
                                                       placeholder="Postal Code"
                                                       value={postalCode}
                                                       name="postalCode"
                                                       onChange={ev => setPostalCode(ev.target.value)}/>
                                            </CityHolder>
                                            <Input type="text"
                                                   placeholder="Street Address"
                                                   value={streetAddress}
                                                   name="streetAddress"
                                                   onChange={ev => setStreetAddress(ev.target.value)}/>
                                            <Input type="text"
                                                   placeholder="Country"
                                                   value={country}
                                                   name="country"
                                                   onChange={ev => setCountry(ev.target.value)}/>
                                            <Button black block onClick={saveAddress}>Save</Button>
                                            <hr/>
                                        </>
                                    )}
                                    <LogoutButtonWrapper>
                                        {session && (
                                            <Button primary onClick={logOut}>Logout</Button>
                                        )}
                                        {session && isSavedAddress &&(
                                            <p>Saved!</p>
                                        )}
                                    </LogoutButtonWrapper>
                                    {!session && consentGiven && (
                                        <Button primary onClick={logIn}>Login</Button>
                                    )}
                                    {!session && !consentGiven && (
                                        <StyledWarning>During submitting, this form uses cookies. To proceed with log in, please accept
                                            the <span onClick={openPopup}>cookie usage agreement</span> and other privacy settings.
                                        </StyledWarning>
                                    )}

                                </WhiteBox>
                            </RevealWrapper>
                        </div>
                        <div>
                            <RevealWrapper delay={0}>
                                <WhiteBox>
                                    <Tabs tabs={['Orders', 'Wishlist']} active={activeTab} onChange={setActiveTab}/>
                                    {activeTab === 'Orders' && (
                                        <>
                                            {!orderLoaded && (
                                                <Spinner fullWidth={true}/>
                                            )}
                                            {orderLoaded && (
                                                <div>
                                                    {orders.length === 0 && (
                                                        <p>Login to see your orders</p>
                                                    )}
                                                    {orders.length > 0 && orders.map(ord => (
                                                        <Order key={ord._id}{...ord} />
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {activeTab === 'Wishlist' && (
                                        <>
                                            {!wishListLoaded && (
                                                <Spinner fullWidth={true}/>
                                            )}
                                            {wishListLoaded && (
                                                <>

                                                    <WishedProductGrid>
                                                        {wishedProducts.length > 0 && wishedProducts.map(wp => (
                                                            <ProductBoxWrapper key={wp._id}>
                                                                <ProductBox {...wp} wished={true}
                                                                            onRemoveFromWishList={productRemovedFromWishList}
                                                                />
                                                            </ProductBoxWrapper>
                                                        ))}
                                                    </WishedProductGrid>
                                                    {wishedProducts.length === 0 && (
                                                        <>
                                                            {session && (
                                                                <p>Your wish list is empty</p>
                                                            )}
                                                            {!session && (
                                                                <p>Login to add products to your wishlist</p>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    )}
                                </WhiteBox>
                            </RevealWrapper>
                        </div>
                    </ColsWrapper>
                </Center>
            )}
            {loading ? <FooterPlaceholder/> : <Footer/>}
        </>
    )
}