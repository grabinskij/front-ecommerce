import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import styled from "styled-components";
import {signOut, useSession} from "next-auth/react";



const PopupContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    border-radius: 0.5rem;
    z-index: 50;
    width: 90%;
    max-width: 36rem; 
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #e6e6e6;
    padding: .1rem;
    font-weight: bold;
`;

const H2 = styled.h2`
  font-size: 1.4rem;
  @media (max-width: 768px) {
    font-size: .9rem;
  }
`;

const Content = styled.div`
    text-align: justify;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    @media (min-width: 768px) {
        font-size: 1rem;
    }
`;

const OverflowContainer = styled.div`
    overflow-y: auto;
    padding-left: 0.5rem;
    padding-right: 1rem;;
    max-height: calc(100vh - 400px);
`;

const Footer = styled.div`
    display: flex;
    flex-direction: column;
    border-top: 1px solid transparent;
    padding: 1rem;
    box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
    width: 75%;
    margin: 0.3rem auto 0.3rem;
    padding: 0.6rem 1rem;
    font-weight: bold;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    background-color: #ff4d4f;
    color: #ffffff;
    font-size: 1rem;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        background-color: #cccccc;
        color: #ff4d4f;
    }
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
`;

const FooterText = styled.div`
    text-align: center;
    font-size: 0.875rem; 
    border-top: 1px solid #e6e6e6;
    padding: 10px;
    @media (min-width: 768px) {
        font-size: 1rem;
    }
`;

const StyledLink = styled(Link)`
    margin: 0 0.5rem;
    cursor: pointer;
    color: #3182ce;
    text-decoration: none;
    &:hover {
        color: #63b3ed;
    }
`;

const LanguageButton = styled.button`
    margin: 0.5rem;
    padding: 0.25rem 0.5rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    background-color: #ff4d4f;
    color: #ffffff;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        background-color: #cccccc;
        color: #ff4d4f;
    }
`;

const Paragraph = styled.p`
    margin-bottom: 0.5rem;
`;

const InnerLink = styled(Link)`
    color: #3182ce; 
    &:hover {
        color: #63b3ed;
    }
`;

const Divider = styled.span`
    display: inline-block;
    color: #cbd5e0;
`;


const CookiePopup = ({setShow, setShowChangeConsent, setPopupVisible, popupVisible, setIsButtonVisible, setConsentGiven}) => {
    const [language, setLanguage] = useState('English');
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        const hasConsented = getCookie('site_consent') === "true" ? true : false;
        setConsentGiven(hasConsented);

        if (!hasConsented && getCookie('site_consent') !== "false" &&
            router.pathname !== '/privacy-policy' &&
            router.pathname !== '/legal-notice' &&
            router.pathname !== '/privacy-policy#terms-de' &&
            router.pathname !== '/legal-notice#terms-de'
        ) {
            setShow(true);
            setPopupVisible(true);

        } else {
            setPopupVisible(false);
            setShow(false);
            setShowChangeConsent(true);
        }
    }, [router.pathname]);


    const toggleStorage = (prop) => {
        setCookie('site_consent', prop ? "true" : "false", 365);
        setConsentGiven(prop);
        setPopupVisible(false);
    }

    const acceptCookies = () => {
        toggleStorage(true);
        setPopupVisible(false);
        setShow(false);
        setShowChangeConsent(true);
        setIsButtonVisible(true);
    }

    const declineCookies = () => {
        setPopupVisible(false);
        toggleStorage(false);
        setShow(false);
        setShowChangeConsent(true);
        setIsButtonVisible(false);
    }

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }



    function closePopup() {
        setPopupVisible(false);
        setShow(false);
    }



    async function declineCookiesLogout() {
        await toggleStorage(false);
        await router.push('/');
        await signOut();
    }

    const changeLanguage = () => {
        setLanguage(prevLanguage => prevLanguage === 'English' ? 'German' : 'English');
    }

    return (
        <>
            {popupVisible && (
                <PopupContainer>
                    <div>
                        <Header>
                            <H2>{language === 'English' ? 'Cookies and Data Privacy Settings' : 'Cookies und Datenschutzeinstellungen'}</H2>
                        </Header>
                        <Content>
                            <OverflowContainer>
                                {language === 'English' ? (
                                    <>
                                        <Paragraph>By clicking the &quot;Accept All&quot; button, you consent to this website using
                                            cookies and
                                            similar
                                            technologies to store and retrieve information on your device. These
                                            technologies
                                            are used to
                                            conduct comprehensive evaluations of your visits and the use of our website.
                                            They
                                            enable detailed
                                            analysis of your activities to create a customized online experience. We
                                            tailor
                                            content and features
                                            to your preferences and interests to provide you with the greatest benefit
                                            possible.
                                        </Paragraph>
                                        <Paragraph>Please be aware that by using these technologies, data may be stored on your
                                            device
                                            and may be
                                            transmitted to third parties. This transmission may also occur to countries
                                            that may
                                            not have
                                            sufficient data protection standards.
                                        </Paragraph>
                                        <Paragraph>You have the right to refuse and to change or revoke your consent at a later
                                            time.
                                            Further
                                            information about how we handle your data and the technologies we use can be
                                            found
                                            in our <InnerLink href={"/privacy-policy"} onClick={closePopup}>privacy policy</InnerLink>.</Paragraph>
                                        <Paragraph>Are you under 16 years old? Unfortunately, you are not entitled to
                                            independently
                                            consent to this
                                            service in order to view this content. Please ask your parents or legal
                                            guardians to
                                            agree to the
                                            service together with you!
                                        </Paragraph>
                                    </>
                                ) : (
                                    <>
                                        <Paragraph>
                                            Durch Betätigung der Schaltfläche &quot;Alle akzeptieren&quot; geben Sie Ihre
                                            Zustimmung, dass diese Webseite
                                            Cookies und ähnliche Technologien einsetzt, um Informationen auf Ihrem
                                            Endgerät zu speichern und
                                            auszulesen. Diese Technologien dienen dazu, umfangreiche Auswertungen über
                                            Ihre Besuche und die
                                            Nutzung unserer Webseite durchzuführen.
                                            Dabei ermöglichen sie eine detaillierte Analyse Ihrer Aktivitäten, um ein
                                            maßgeschneidertes
                                            Online-Erlebnis zu gestalten. Wir passen Inhalte und Funktionen individuell
                                            an Ihre Präferenzen und
                                            Interessen an, um Ihnen den größtmöglichen Nutzen zu bieten.
                                        </Paragraph>
                                        <Paragraph>
                                            Bitte berücksichtigen Sie, dass durch die Nutzung dieser Technologien Daten
                                            auf Ihrem Gerät
                                            gespeichert
                                            und
                                            an Drittanbieter weitergegeben werden können. Diese Übermittlung kann auch
                                            in Länder erfolgen, die
                                            möglicherweise nicht über ein angemessenes Datenschutzniveau verfügen.
                                        </Paragraph>
                                        <Paragraph>
                                            Sie haben das Recht, nicht einzuwilligen und deine Einwilligung zu einem
                                            späteren Zeitpunkt zu
                                            ändern oder zu widerrufen.
                                            Weitere Informationen zu unserem Umgang mit Ihren Daten und den von uns
                                            verwendeten Technologien
                                            finden
                                            Sie in unserer ausführlichen <InnerLink
                                            href={"/privacy-policy#terms-de"} onClick={closePopup}>Datenschutzerklärung</InnerLink>.
                                        </Paragraph>
                                        <Paragraph>
                                            Du bist unter 16 Jahre alt? Bedauerlicherweise bist du nicht berechtigt,
                                            diesem Dienst eigenständig
                                            zuzustimmen, um diese Inhalte anzusehen. Bitte ersuche deine Eltern oder
                                            Erziehungsberechtigten
                                            darum,
                                            dem Dienst gemeinsam mit dir zuzustimmen!
                                        </Paragraph>
                                    </>
                                )}
                            </OverflowContainer>
                        </Content>
                        <Footer>
                            <Button onClick={acceptCookies}>
                                {language === 'English' ? 'Accept All' : 'Alle akzeptieren'}
                            </Button>
                            {!session ? (
                                <Button onClick={declineCookies}>
                                    {language === 'English' ? 'Reject' : 'Ablehnen'}
                                </Button>
                            ) : (
                                <Button onClick={declineCookiesLogout}>
                                    {language === 'English' ? 'Reject' : 'Ablehnen'}
                                </Button>
                                )
                            }
                        </Footer>
                        <FooterText>
                            <StyledLink href={language === 'English' ? "/legal-notice" : "/legal-notice#terms-de"} onClick={closePopup}>{language === 'English' ? 'Legal Notice' : 'Impressum'}</StyledLink>
                                <Divider>|</Divider>
                            <StyledLink href={language === 'English' ? "/privacy-policy" : "/privacy-policy#terms-de"} onClick={closePopup}>{language === 'English' ? 'Privacy Policy' : 'Datenschutzerklärung'}</StyledLink>
                            <LanguageButton onClick={changeLanguage}>{language === 'English' ? 'DE' : 'ENG'}</LanguageButton>
                        </FooterText>
                    </div>
                </PopupContainer>
            )}
        </>
    );
}

export default CookiePopup;