import Header from "../components/Header";
import styled from "styled-components";
import Center from "../components/Center";
import Button from "../components/Button";
import Input from "../components/Input";
import {CartContext} from "../components/CartContext";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Table from "../components/Table";
import {RevealWrapper} from "next-reveal";
import {useSession} from "next-auth/react";
import HeaderPlaceholder from "../components/HeaderPlaceholder";
import Spinner from "../components/Spinner";
import ContentPlaceholder from "../components/ContentPlaceholder";
import FooterPlaceholder from "../components/FooterPlaceholder";
import Footer from "../components/Footer";


const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;


  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2) {
    text-align: center;
  }

  table tr.subtotal td {
    padding: 15px 0;
  }

  table tbody tr.subtotal td:nth-child(2) {
    font-size: 20px;
  }

  tr.total td {
    font-weight: bold;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    max-width: 60px;
    max-height: 60px;
  }

  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 10px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
const ProductAmount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 30px;
  margin: 0 auto;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;
const WarningMessage = styled.p`
  align-items: center;
  margin-top: 1rem;
  font-size: 0.7rem;

  p {
    margin: 0;

    span {
      color: red;
      margin-right: 2px;
    }

    &:last-child {
      margin-left: 6px;

      span {
        display: block;
      }
    }
  }
`;

const StyledWarningText = styled.p`
  color: red;
  font-size: 0.9rem;

  span {
    color: #0260c4;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #3784d3;
    }
  }
`;
const InputOrder = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing:border-box;
  &::placeholder {
    font-size: ${props => props.error ? '0.7rem' : 'inherit'};
    color: ${props => props.error ? 'red' : 'inherit'};
  }
`;



export default function CartPage({setPopupVisible, consentGiven}) {
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext);
    const {data: session} = useSession();
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [cityError, setCityError] = useState('');
    const [postalCodeError, setPostalCodeError] = useState('');
    const [streetAddressError, setStreetAddressError] = useState('');
    const [countryError, setCountryError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [shippingFee, setShippingFee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingCheckout, setLoadingCheckout] = useState(false);


    useEffect(() => {
        setLoading(false);
    }, []);


    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', {ids: cartProducts})
                .then(response => {
                    setProducts(response.data);
                })
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window?.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }
        axios.get('/api/settings?name=shippingFee').then(res => {
            setShippingFee(res.data.value);
        })
    }, []);

    useEffect(() => {
        if (!session) {
            return;
        }
        axios.get('/api/address').then(response => {
            setName(response.data.name);
            setEmail(response.data.email);
            setCity(response.data.city);
            setPostalCode(response.data.postalCode);
            setStreetAddress(response.data.streetAddress);
            setCountry(response.data.country);
        });
    }, [session]);

    function moreOfThisProduct(id) {
        addProduct(id);
    }

    function lessOfThisProduct(id) {
        removeProduct(id);
    }



    async function goToPayment() {
        try {
            const response = await axios.post('/api/checkout', {
                name, email, city, postalCode, streetAddress, country, cartProducts
            });

            if (response.data.url) {
                window.location = response.data.url;
            }
        } catch (error) {
            console.error("Error occurred while processing payment:", error);
            throw error;
        }
        finally {
            setLoadingCheckout(false);
        }
    }

    async function validateAndGoToPayment() {
        setNameError('');
        setEmailError('');
        setCityError('');
        setPostalCodeError('');
        setStreetAddressError('');
        setCountryError('');

        let errors = [];

        if (!name.trim()) {
            setNameError("Name is required.");
            errors.push("Name is required.");
        }else if (!/^[a-zA-Z]+$/.test(name)) {
            setNameError("Name should contain only letters.");
            setName('');
            errors.push("Name should contain only letters.");
        }


        if (!email.trim()) {
            setEmailError("Email is required.");
            errors.push("Email is required.");
        }else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Invalid email format.");
            setEmail('');
            errors.push("Invalid email format.");
        }


        if (!city.trim()) {
            setCityError("City is required.");
            errors.push("City is required.");
        }else if (!/^[a-zA-Z]+$/.test(city)) {
            setCityError("It must have letters only.");
            setCity('');
            errors.push("It must have letters only.");
        }


        if (!postalCode.trim()) {
            setPostalCodeError("Postal code is required.");
            errors.push("Postal code is required.");
        }else if (!/^\d+$/.test(postalCode)) {
            setPostalCodeError("It must contain numbers.");
            setPostalCode('');
            errors.push("It must contain numbers.");
        }


        if (!streetAddress.trim()) {
            setStreetAddressError("Street address is required.");
            errors.push("Street address is required.");
        }


        if (!country.trim()) {
            setCountryError("Country is required.");
            errors.push("Country is required.");
        }else if (!/^[a-zA-Z]+$/.test(country)) {
            setCountryError("Country must have letters only.");
            setCountry('');
            errors.push("Country must have letters only.");
        }



        if (errors.length > 0) {
            console.error("Validation errors:", errors);
            return;
        }

        setLoadingCheckout(true);

        await goToPayment();

    }

    let productsTotal = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        productsTotal += price;
    }

    function openPopup() {
        setPopupVisible(prev => !prev);
    }

    if (isSuccess) {
        return (
            <>
                <Header/>
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Thanks for your order!</h1>
                            <p>We will email you after the order will be sent.</p>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        )
    }

    return (
        <>
            {loading ? <HeaderPlaceholder/> : <Header/>}
            {loading && <Spinner fullWidth={true}/>}
            {loading ? <ContentPlaceholder/> : (
                <Center>
                    <ColumnsWrapper>
                        <RevealWrapper delay={0}>
                            <Box>
                                <h2>Cart</h2>
                                {!cartProducts?.length && (
                                    <div>Your cart is empty</div>
                                )}
                                {products?.length > 0 && (
                                    <Table>
                                        <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {products.map(product => (
                                            <tr key={product._id}>
                                                <ProductInfoCell>
                                                    <ProductImageBox>
                                                        <img src={product.images[0]} alt=""/>
                                                    </ProductImageBox>
                                                    {product.title}
                                                </ProductInfoCell>
                                                <td>
                                                    <ProductAmount>
                                                        <Button mobile
                                                                onClick={() => lessOfThisProduct(product._id)}>-</Button>
                                                        <QuantityLabel>
                                                            {cartProducts.filter(id => id === product._id).length}
                                                        </QuantityLabel>
                                                        <Button mobile
                                                                onClick={() => moreOfThisProduct(product._id)}>+</Button>
                                                    </ProductAmount>
                                                </td>
                                                <td>${cartProducts.filter(id => id === product._id).length * product.price}</td>
                                            </tr>
                                        ))}
                                        <tr className="subtotal">
                                            <td colSpan={2}>Products</td>
                                            <td>${productsTotal}</td>
                                        </tr>
                                        <tr className="subtotal">
                                            <td colSpan={2}>Shipping</td>
                                            <td>${shippingFee}</td>
                                        </tr>
                                        <tr className="subtotal total">
                                            <td colSpan={2}>Total</td>
                                            <td>${productsTotal + parseInt(shippingFee || 0)}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                )}
                            </Box>
                        </RevealWrapper>
                        {!!cartProducts?.length && (
                            <RevealWrapper delay={100}>
                                <Box>
                                    <h2>Order information</h2>
                                    <InputOrder type="text"
                                           placeholder={nameError ? `${nameError}` : "Name"}
                                           value={name}
                                           name="name"
                                           onChange={ev => setName(ev.target.value)}
                                           error={nameError}
                                    />
                                    <InputOrder type="text"
                                           placeholder={emailError ? `${emailError}` : "Email"}
                                           value={email}
                                           name="email"
                                           onChange={ev => setEmail(ev.target.value)}
                                           error={emailError}
                                    />
                                    <CityHolder>
                                        <InputOrder type="text"
                                               placeholder={cityError ? `${cityError}` : "City"}
                                               value={city}
                                               name="city"
                                               onChange={ev => setCity(ev.target.value)}
                                               error={cityError}
                                        />
                                        <InputOrder type="text"
                                               placeholder={postalCodeError ? `${postalCodeError}` : "Postal Code"}
                                               value={postalCode}
                                               name="postalCode"
                                               onChange={ev => setPostalCode(ev.target.value)}
                                               error={postalCodeError}
                                        />
                                    </CityHolder>
                                    <InputOrder type="text"
                                           placeholder={streetAddressError ? `${streetAddressError}` : "Street Address"}
                                           value={streetAddress}
                                           name="streetAddress"
                                           onChange={ev => setStreetAddress(ev.target.value)}
                                           error={streetAddressError}
                                    />
                                    <InputOrder type="text"
                                           placeholder={countryError ? `${countryError}` : "Country"}
                                           value={country}
                                           name="country"
                                           onChange={ev => setCountry(ev.target.value)}
                                           error={countryError}
                                    />
                                    {loadingCheckout ? (
                                        <Spinner fullWidth={true}/>
                                    ) : (
                                        <>
                                            {consentGiven ? (
                                                <Button black block onClick={validateAndGoToPayment}>Continue to payment</Button>
                                            ) : (
                                                <StyledWarningText>During submitting, this form uses cookies. To proceed
                                                    with fake payment in test mode, please accept
                                                    the <span onClick={openPopup}>cookie usage agreement</span> and
                                                    other privacy settings.
                                                </StyledWarningText>
                                            )}


                                            <WarningMessage>
                                                <p><span>*</span>Payment is not real! Only in test mode!</p>
                                                <p>For testing purposes, enter card
                                                    number:<span> 4242 4242 4242 4242</span></p>
                                            </WarningMessage>

                                        </>
                                    )}
                                </Box>
                            </RevealWrapper>
                        )}
                    </ColumnsWrapper>
                </Center>
            )}
            {loading ? <FooterPlaceholder/> : <Footer/>}
        </>
    )
}
