import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "../components/CartContext";
import { StyleSheetManager } from 'styled-components';



const GlobalStyles = createGlobalStyle`
  
  
  body{
    background-color: #eee;
    padding: 0;
    margin: 0;
    //font-family: 'Roboto', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
    const shouldForwardProp = (prop, defaultValidatorFn) => {
        // If the defaultValidatorFn is not a function, default to allowing the prop
        const isDefaultValid = typeof defaultValidatorFn === 'function' ? defaultValidatorFn(prop) : true;
        return isDefaultValid || prop.startsWith('$');
    };
  return (
      <>
          <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <GlobalStyles />
          <CartContextProvider>
              <Component {...pageProps} />
          </CartContextProvider>
          </StyleSheetManager>
      </>
  )
}
