import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "../components/CartContext";
import { SessionProvider } from "next-auth/react"
import {StyleSheetManager} from 'styled-components';
import {useState} from "react";
import Overlay from "../components/Overlay";
import CookiePopup from "../components/CookiePopup";
import ChangeConsentTab from "../components/ChangeConsentTab";


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

    const [showOverlay, setShowOverlay] = useState(false);
    const [showChangeConsent, setShowChangeConsent] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [consentGiven, setConsentGiven] = useState(null);

    return (
        <>
            <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                <GlobalStyles/>
                <SessionProvider session={session}>
                    <Overlay show={showOverlay}/>
                    <CookiePopup
                        setIsButtonVisible={setIsButtonVisible}
                        setPopupVisible={setPopupVisible}
                        popupVisible={popupVisible}
                        setShow={setShowOverlay}
                        setShowChangeConsent={setShowChangeConsent}
                        setConsentGiven={setConsentGiven}
                    />
                    <ChangeConsentTab
                        setShowPopup={setPopupVisible}
                        showChangeConsent={showChangeConsent}
                    />
                    <CartContextProvider>
                        <Component {...pageProps} consentGiven={consentGiven} setPopupVisible={setPopupVisible}/>
                    </CartContextProvider>
                </SessionProvider>
            </StyleSheetManager>
        </>
    )
}
