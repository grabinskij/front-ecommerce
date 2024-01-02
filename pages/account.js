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


const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 40px;
  margin: 20px;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;


export default function AccountPage() {

    const {data: session} = useSession();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [loaded, setLoaded] = useState(false);

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
    }

    useEffect(() => {
        axios.get('/api/address').then(response => {
            setName(response.data.name);
            setEmail(response.data.email);
            setCity(response.data.city);
            setPostalCode(response.data.postalCode);
            setStreetAddress(response.data.streetAddress);
            setCountry(response.data.country);
            setLoaded(true);
        });
    }, []);

    return (
        <>
            <Header/>
            <Center>
                <ColsWrapper>
                    <div>
                        <RevealWrapper delay={0}>
                            <WhiteBox>
                                <h2>Wishlist</h2>
                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                    <div>
                        <RevealWrapper delay={100}>
                            <WhiteBox>
                                <h2>Account details</h2>
                                {!loaded && (
                                    <Spinner fullWidth={true}/>
                                )}
                                {loaded && (
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
                                {session && (
                                    <Button primary onClick={logOut}>Logout</Button>
                                )}
                                {!session && (
                                    <Button primary onClick={logIn}>Login</Button>
                                )}
                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                </ColsWrapper>
            </Center>
        </>
    )
}