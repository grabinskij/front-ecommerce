import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "../components/CartContext";
import { SessionProvider } from "next-auth/react"
import {StyleSheetManager} from 'styled-components';


const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  hr{
    display: block;
    border: 0;
    border-top: 1px solid #ddd;
  }
`;


export default function App({Component, pageProps: { session, ...pageProps }}) {
    const shouldForwardProp = (prop, defaultValidatorFn) => {
        const isDefaultValid = typeof defaultValidatorFn === 'function' ? defaultValidatorFn(prop) : true;
        return isDefaultValid || prop.startsWith('$');
    };
    return (
        <>
            <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                <GlobalStyles/>
                <SessionProvider session={session}>
                    <CartContextProvider>
                        <Component {...pageProps} />
                    </CartContextProvider>
                </SessionProvider>
            </StyleSheetManager>
        </>
    )
}
