import React from 'react';
import {useRouter} from "next/router";
import ButtonHome from "../components/ButtonHome";
import Header from "../components/Header";
import HeaderPlaceholder from "../components/HeaderPlaceholder";
import Spinner from "../components/Spinner";
import ContentPlaceholder from "../components/ContentPlaceholder";
import {useEffect, useState} from "react";
import styled from "styled-components";



const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  line-height: 24px;
  font-size: 18px;
  
  button {
    outline: none;
    border: none;
  }
  
  a {
    display: block;
    word-wrap: break-word;
    max-width: fit-content;
    font-size: 16px;
    color: #007bff;
    &:hover{
      color: #3d2ed9;
    }
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: left;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 30px 0;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;
const HeadTitle = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 30px 0;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StyledLink = styled.a`
  display: block;
  word-wrap: break-word;
  max-width: fit-content;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const HeadContainer = styled.div`
  padding-top: 1rem;
`;

const HeadContentContainer = styled.div`
  display: block;
  width: 100%;
  align-items: center;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4rem;
    margin-bottom: 4rem;
    height: 3.2rem;
  }
`;

const ButtonContainer = styled.div`
  background-color: transparent;
  padding: 0;
  display: flex;
  gap: 10px;
`;

const StyledButton = styled.button`
  outline: none;
  border: none;
  padding: 0;
  a{
    display: inline-block;
    padding: 10px 10px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
    &:hover {
      background-color: #0056b3;
      color: white;
    }
  }

`;

const StyledH2Heading = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;


export default function PrivacyPolicy() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        if (!loading && router.asPath.includes('#terms-de')) {
            const target = document.getElementById('terms-de');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [loading, router]);

    return (
        <>
        {loading ? <HeaderPlaceholder/> : <Header/>}
        {loading && <Spinner fullWidth={true}/>}
        {loading ? <ContentPlaceholder/> : (
            
            <Container>
                <ContentContainer>

                    <HeadContainer id="terms-eng">
                        <HeadContentContainer>
                            <ButtonContainer>
                                <StyledButton>
                                    <StyledLink href='#terms-de'>DE</StyledLink>
                                </StyledButton>
                                <StyledButton>
                                    <StyledLink href='#terms-eng'>ENG</StyledLink>
                                </StyledButton>
                            </ButtonContainer>
                            <HeadTitle>Privacy Policy</HeadTitle>
                            <ButtonHome/>
                        </HeadContentContainer>
                    </HeadContainer>

                    <Title>General Information</Title>
                    <Paragraph>The following information provides a brief overview of how your
                        personal data is handled when you
                        visit this
                        website. Personal data refers to any data that can be used to personally identify you.
                    </Paragraph><br/>

                    <StyledH2Heading>Data Collection on This Website</StyledH2Heading>

                    <Paragraph>Data collection on this website is carried out by the website operator.
                        The contact details of the
                        operator are
                        available in the Legal Notice of this website.
                    </Paragraph>

                    <Paragraph>Your data is either transmitted by you or automatically collected, or
                        after your consent when
                        visiting the
                        website through our IT systems. This may include technical data such as your internet browser,
                        operating system,
                        or the time of page access. This data is collected automatically when visiting the website.
                    </Paragraph>

                    <Paragraph>Some of the data is collected to ensure the proper functioning of the
                        website. Other data may be used
                        to analyze
                        your user behavior.
                    </Paragraph>

                    <Paragraph>You have the right to obtain free information about the origin,
                        recipient, and purpose of your stored
                        personal
                        data at any time. You also have the right to request the correction or deletion of this data. If
                        you
                        have
                        consented to the processing of your data, you can revoke this consent at any time. Under certain
                        circumstances,
                        you also have the right to request the restriction of the processing of your personal data, as
                        well
                        as the right
                        to lodge a complaint with the competent supervisory authority.
                    </Paragraph>

                    <Paragraph>If you have any questions about data protection, you can contact us at
                        any time.</Paragraph><br/><br/>


                    <Title>Hosting</Title>

                    <Paragraph>Our website is hosted on an external hosting service. The personal data
                        collected on this website is
                        stored on
                        the servers of the host(s). This includes, among other things, IP addresses, contact requests,
                        meta
                        and
                        communication data, contract data, contact details, names, website access, and other data
                        generated
                        by the use
                        of a website.
                    </Paragraph>

                    <Paragraph>The external hosting is carried out for the purpose of providing our
                        site securely, quickly, and
                        efficiently by a
                        professional provider. If consent has been obtained, processing is carried out exclusively on
                        the
                        basis of the
                        applicable legal provisions. The consent can be revoked at any time.
                    </Paragraph>

                    <Paragraph>Our host processes your data only on our instructions and to fulfill
                        its contractual obligations.
                    </Paragraph>

                    <Paragraph>We use the following host:</Paragraph>

                    <Paragraph>Vercel Inc.<br/>
                        440 N Barranca Ave #4133<br/>
                        Covina, CA 91723<br/>
                        privacy@vercel.com
                    </Paragraph>


                    <Title>Mandatory Information</Title>

                    <Paragraph>We take the protection of your personal data very seriously. We treat
                        your data confidentially and in
                        accordance
                        with the statutory data protection regulations and this privacy policy.
                    </Paragraph>

                    <Paragraph>When using this website, various personal data is collected. This
                        privacy policy explains what data
                        we collect
                        and for what purpose. We point out that data transmission over the Internet (e.g., when
                        communicating by email)
                        may have security vulnerabilities. Complete protection of data against access by third parties
                        is
                        not
                        possible.
                    </Paragraph>

                    <Paragraph>The processing of data on this website is the responsibility of the
                        website operator. The contact
                        details of the
                        operator are available in the Legal Notice of this website.
                    </Paragraph>

                    <StyledH2Heading>Right to Data Portability</StyledH2Heading>

                    <Paragraph>You have the right to have data that we process automatically based on
                        your consent transmitted to
                        you or to a
                        third party in a common, machine-readable format. If technically feasible, we can also arrange
                        for
                        the transfer
                        directly to the responsible party you have named.
                    </Paragraph>

                    <StyledH2Heading>Information, Correction, and Deletion</StyledH2Heading>

                    <Paragraph>You have the right to obtain information free of charge at any time
                        about your stored personal data,
                        its origin,
                        recipient, and the purpose of data processing. You may also have the right to correct incorrect
                        data
                        or have
                        unwanted data deleted. If you have any questions about personal data, you can contact us at any
                        time.
                    </Paragraph>

                    <StyledH2Heading>Right to Restrict Processing</StyledH2Heading>

                    <Paragraph>You have the right to restrict the processing of your personal data in
                        certain situations. Please
                        contact us at
                        any time if you wish to exercise this right.
                    </Paragraph><br/><br/>


                    <Title>Data Collection on This Website</Title>

                    <StyledH2Heading>Cookies</StyledH2Heading>
                    <Paragraph>This website uses &quot;cookies&quot;. These small data records are
                        stored on your device and do not
                        cause any
                        harm. There
                        are temporary cookies that are only stored during your browsing session, and permanent cookies
                        that
                        remain on
                        your device until you delete them or they are automatically removed.
                    </Paragraph>
                    <Paragraph>Cookies can originate from us (first-party cookies) or from third
                        parties (third-party cookies).
                        Third-party
                        cookies enable the integration of specific services from external providers.
                    </Paragraph>
                    <Paragraph>The storage of cookies is carried out in accordance with Art. 6 para. 1 lit. f GDPR, unless there is another
                        legal basis. The operator of the website has a legitimate interest in storing necessary cookies to provide its
                        services technically flawless and optimized. If consent has been requested for the storage of cookies and
                        similar tracking technologies, the processing is carried out exclusively on the basis of this consent (Art. 6
                        para. 1 lit. a GDPR and § 25 para. 1 TTDSG); this consent can be revoked at any time.
                    </Paragraph>
                    <Paragraph>You have the option to configure your browser to inform you about the
                        setting of cookies, to allow
                        them only in
                        certain cases, to reject them in general, and to delete already stored cookies. Please note that
                        disabling
                        cookies may affect the functionality of the website.
                    </Paragraph><br/>

                    <StyledH2Heading>Contact Form</StyledH2Heading>
                    <Paragraph>When you contact us via the contact form, the information and contact
                        details you provide will be
                        stored to
                        process your request and respond to any follow-up inquiries. This data will not be disclosed
                        without
                        your
                        consent.
                    </Paragraph>
                    <Paragraph>The processing of the data entered into the contact form is based
                        exclusively on your consent (Art. 6
                        para. 1
                        lit. a GDPR). You can revoke this consent at any time by sending us an informal message by
                        email.
                        The legality
                        of the data processing operations carried out until the revocation remains unaffected by the
                        revocation.
                    </Paragraph>
                    <Paragraph>The data you enter in the contact form will remain with us until you
                        request deletion, revoke your
                        consent, or
                        the purpose for data storage no longer applies (e.g., after completion of request processing).
                        Mandatory
                        statutory provisions – especially retention periods – remain unaffected.
                    </Paragraph><br/>

                    <StyledH2Heading>Comment Function on This Website</StyledH2Heading>
                    <Paragraph>When using the comment function, the time of creation and, if not
                        posted anonymously, the chosen
                        username are
                        stored in addition to your comment.
                    </Paragraph>
                    <Paragraph>Comments and the associated data are stored on this website until the
                        commented content is completely
                        deleted or
                        must be deleted for legal reasons.
                    </Paragraph>
                    <Paragraph>The storage of comments is based on your consent. You can revoke this
                        consent at any time without
                        affecting the
                        lawfulness of the previous data processing.
                    </Paragraph><br/><br/>


                    <Title>Additional Features and Tools</Title>


                    <StyledH2Heading>Google Fonts</StyledH2Heading>
                    <Paragraph>This website uses so-called Google Fonts provided by Google for the
                        consistent display of fonts. When
                        a page is
                        loaded,
                        the necessary fonts are loaded into the browser cache to correctly display texts and fonts. Your
                        browser must
                        establish
                        a connection to Google&apos;s servers for this purpose. As a result, Google becomes aware that
                        this
                        website has been
                        accessed
                        via your IP address. The use of Google Fonts is in accordance with Art. 6 para. 1 lit. f GDPR.
                        The
                        website
                        operator has
                        a legitimate interest in the uniform presentation of the typeface on their website. If consent
                        has
                        been
                        requested,
                        the processing is carried out exclusively in accordance with Art. 6 para. 1 lit. a GDPR and § 25
                        para. 1 TTDSG,
                        to the
                        extent that the consent includes the storage of cookies or access to information on the
                        user&apos;s
                        terminal device
                        (e.g., device
                        fingerprinting) within the meaning of the TTDSG. Consent can be revoked at any time. If your
                        browser
                        does not
                        support Google
                        Fonts, a standard font will be used from your computer.
                    </Paragraph>
                    <Paragraph>Further information about Google Fonts can be found in Google&apos;s
                        privacy policy at:
                        <StyledLink href="https://policies.google.com/privacy?hl=en"
                           target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy?hl=en</StyledLink>
                    </Paragraph><br/>

                    <StyledH2Heading>Font Awesome</StyledH2Heading>
                    <Paragraph>This site uses Font Awesome for consistent font and icon display. The
                        provider is Fonticons, Inc.,
                        located at 6
                        Porter Road Apartment 3R, Cambridge, Massachusetts, USA. When loading a page, the necessary
                        fonts
                        are loaded
                        into the browser cache to display text, fonts, and icons correctly. Your browser must establish
                        a
                        connection to
                        Font Awesome&apos;s servers for this purpose. Font Awesome thus becomes aware that this website
                        has
                        been
                        accessed via
                        your IP address. The use of Font Awesome is in accordance with Art. 6 para. 1 lit. f GDPR. We
                        have a
                        legitimate
                        interest in the consistent presentation of the typeface on our website. If appropriate consent
                        has
                        been
                        obtained, processing is carried out exclusively in accordance with Art. 6 para. 1 lit. a GDPR
                        and §
                        25 para. 1
                        TTDSG, insofar as the consent includes the storage of cookies or access to information on the
                        user&apos;s
                        device
                        (e.g., device fingerprinting) as defined in the TTDSG. Consent can be revoked at any time. If
                        your
                        browser does
                        not support Font Awesome, a standard font will be used from your computer.
                    </Paragraph>
                    <Paragraph>For more information on Font Awesome, please see Font Awesome&apos;s
                        Privacy Policy at:
                        <StyledLink href="https://fontawesome.com/privacy" target="_blank"
                           rel="noopener noreferrer">https://fontawesome.com/privacy</StyledLink>
                    </Paragraph><br/>

                    <StyledH2Heading>Google Maps</StyledH2Heading>
                    <Paragraph>This website uses the Google Maps mapping service provided by Google
                        LLC, 1600 Amphitheatre Parkway,
                        Mountain
                        View, CA 94043, USA. To use the Google Maps features, it is necessary to store your IP address.
                        This
                        information
                        is usually transmitted to a Google server in the USA and stored there. The website operator has
                        no
                        influence on
                        this data transmission. When Google Maps is activated, Google may use Google Fonts for
                        consistent
                        font display.
                        When Google Maps is accessed, your browser loads the required web fonts into the browser cache
                        to
                        display text
                        and fonts correctly. The use of Google Maps is in the interest of an appealing presentation of
                        our
                        online offers
                        and easy location of the places mentioned on the website. This represents a legitimate interest
                        within the
                        meaning of Art. 6 para. 1 lit. f GDPR. If appropriate consent has been obtained, processing is
                        carried out
                        exclusively in accordance with Art. 6 para. 1 lit. a GDPR and § 25 para. 1 TTDSG, insofar as the
                        consent
                        includes the storage of cookies or access to information on the user&apos;s device (e.g., device
                        fingerprinting) as
                        defined in the TTDSG. Consent can be revoked at any time. Data transfer to the USA is based on
                        the
                        Standard
                        Contractual Clauses of the European Commission.
                    </Paragraph>
                    <Paragraph>For more details, please see:
                        <StyledLink href="https://privacy.google.com/businesses/gdprcontrollerterms/" target="_blank"
                           rel="noopener noreferrer">https://privacy.google.com/businesses/gdprcontrollerterms/
                        </StyledLink>
                        <StyledLink href="https://privacy.google.com/businesses/gdprcontrollerterms/sccs/" target="_blank"
                           rel="noopener noreferrer">https://privacy.google.com/businesses/gdprcontrollerterms/sccs/
                        </StyledLink>
                    </Paragraph>
                    <Paragraph>For more information on how Google handles user data, please see
                        Google&apos;s Privacy Policy at:
                        <StyledLink href="https://policies.google.com/privacy?hl=en" target="_blank"
                           rel="noopener noreferrer">https://policies.google.com/privacy?hl=en</StyledLink>
                    </Paragraph><br/>

                    <StyledH2Heading>Bootstrap Framework (via jsDelivr CDN)</StyledH2Heading>
                    <Paragraph>We use the Bootstrap CSS framework via the jsDelivr Content Delivery
                        Network (CDN), provided by
                        Volentio JSD
                        Limited, located at Suite 2a1, Northside House, Mount Pleasant, Barnet, England, EN4 9EB. We
                        integrate the
                        Bootstrap CSS framework on our website to optimize the display of our content on various devices
                        and
                        improve
                        loading times. The jsDelivr CDN is a service that provides content such as libraries and
                        frameworks,
                        including
                        the Bootstrap framework. The integration of Bootstrap via the jsDelivr CDN serves to protect our
                        legitimate
                        interests in accordance with Art. 6 para. 1 lit. f GDPR. If your browser has JavaScript enabled
                        and
                        no
                        JavaScript blocker is installed, your browser transmits personal data (e.g., your IP address and
                        browser) to the
                        jsDelivr CDN when our page is loaded.
                    </Paragraph>
                    <Paragraph>The provider&apos;s privacy policy for jsDelivr can be found at:
                        <StyledLink href="https://www.jsdelivr.com/privacy-policy-jsdelivr-net/"
                           target="_blank"
                           rel="noopener noreferrer">https://www.jsdelivr.com/privacy-policy-jsdelivr-net</StyledLink>
                    </Paragraph><br/><br/>

                    <StyledH2Heading>jQuery</StyledH2Heading>
                    <Paragraph>To further optimize loading times, we also include jQuery on our
                        website. When you visit our website,
                        program
                        libraries are retrieved and downloaded from servers of the provider Google LLC, located at 1600
                        Amphitheatre
                        Parkway, Mountain View, CA 94043, USA, via the Google Content Delivery Network. Personal data
                        (e.g.,
                        your IP
                        address and browser) is transmitted to Google in the process. The integration of jQuery serves
                        to
                        protect our
                        legitimate interests in accordance with Art. 6 para. 1 lit. f GDPR.
                    </Paragraph>
                    <Paragraph>For more information on how Google handles user data, please see
                        Google&apos;s Privacy Policy at:
                        <StyledLink href="https://www.google.com/policies/privacy"
                           target="_blank" rel="noopener noreferrer">https://www.google.com/policies/privacy</StyledLink>
                    </Paragraph><br/><br/>


                    <Title>Authentication</Title>

                    <StyledH2Heading>Use of Firebase Authentication</StyledH2Heading>
                    <Paragraph>We use Firebase Authentication from Google in our applications, a
                        service for authentication.
                        Firebase
                        Authentication allows us to simplify the login process by using third-party identity services
                        and
                        storing the
                        corresponding information on its platform. This service acts as an intermediary for data
                        collection
                        between
                        third parties and ourselves. The data collected by Firebase Authentication is stored on our
                        behalf
                        so that we
                        can use and process it for our apps. The personal data collected includes email address and
                        password. In these
                        cases, processing is carried out in accordance with your consent pursuant to Art. 6 para. 1 lit.
                        a
                        GDPR.
                    </Paragraph>
                    <Paragraph>For more information on data protection, please refer to Google&apos;s
                        Privacy Policy at:
                        <StyledLink href="https://policies.google.com/privacy"
                           target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</StyledLink>
                    </Paragraph><br/>

                    <StyledH2Heading>Google OAuth</StyledH2Heading>
                    <Paragraph>Google OAuth, provided by Google LLC, is a service for logging in and
                        authenticating closely linked
                        to the Google
                        network. This service allows users to log in to various applications and websites using their
                        Google
                        login
                        credentials. The types of personal data collected include various data types, including user
                        identifiers, email
                        addresses, and profile information, as described in the service&apos;s Privacy Policy.
                    </Paragraph>
                    <Paragraph>For more information about Google and privacy, please visit:
                        <StyledLink href="https://policies.google.com/privacy"
                           target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</StyledLink>
                    </Paragraph><br/>

                    <StyledH2Heading>jsDelivr CDN</StyledH2Heading>
                    <Paragraph>To speed up content delivery on our website, we use the Content
                        Delivery Network (CDN) from jsDelivr,
                        operated by
                        Volentio JSD Limited, located at Suite 2a1, Northside House, Mount Pleasant, Barnet, England,
                        EN4
                        9EB. A CDN is
                        a service that delivers large media files such as graphics or scripts more quickly via
                        regionally
                        distributed
                        servers. We use the CDN solely for the purpose of improving the loading times and security of
                        our
                        website. Your
                        browser must establish a connection to the CDN&apos;s servers to retrieve the content, thereby
                        allowing
                        the CDN to
                        become aware that our website has been accessed via your IP address. The use of the CDN is based
                        on
                        our
                        legitimate interests in providing a secure and efficient delivery as well as analyzing and
                        optimizing our online
                        offering in accordance with Art. 6 para. 1 lit. f GDPR.
                    </Paragraph>
                    <Paragraph>For more information on data protection, please refer to the privacy
                        policy of jsDelivr:
                        <StyledLink href="https://www.jsdelivr.com/privacy-policy-jsdelivr-net"
                           target="_blank" rel="noopener noreferrer">https://www.jsdelivr.com/privacy-policy-jsdelivr-net</StyledLink>
                    </Paragraph><br/><br/>





                    <HeadContainer id="terms-de">
                        <HeadContentContainer>
                            <ButtonContainer>
                                <StyledButton>
                                    <StyledLink href='#terms-eng'>ENG</StyledLink>
                                </StyledButton>
                                <StyledButton>
                                    <StyledLink href='#terms-de'>DE</StyledLink>
                                </StyledButton>
                            </ButtonContainer>
                            <HeadTitle>Datenschutzerklärung</HeadTitle>
                            <ButtonHome/>
                        </HeadContentContainer>
                    </HeadContainer>


                    <Title>Allgemeine Hinweise</Title>
                    <Paragraph>Die nachfolgenden Informationen bieten eine kurze Übersicht darüber,
                        wie mit Ihren persönlichen Daten
                        umgegangen
                        wird, wenn Sie diese Website besuchen. Persönliche Daten sind alle Daten, die dazu genutzt
                        werden
                        können, Sie
                        persönlich zu identifizieren.
                    </Paragraph><br/>


                    <StyledH2Heading>Datenerfassung auf dieser Website</StyledH2Heading>

                    <Paragraph>Die Datenerfassung auf dieser Website erfolgt durch den Betreiber der
                        Website.Die Kontaktdaten des
                        Betreibers
                        sind im Impressum dieser Website verfügbar.
                    </Paragraph>

                    <Paragraph>Ihre Daten werden entweder von Ihnen übermittelt oder automatisch
                        erfasst, bzw. nach Ihrer
                        Zustimmung beim Besuch
                        der Website durch unsere IT-Systeme. Dies kann technische Daten wie Ihren Internetbrowser, Ihr
                        Betriebssystem
                        oder die Uhrzeit des Seitenaufrufs umfassen. Die Erfassung dieser Daten erfolgt automatisch beim
                        Besuch der
                        Website.
                    </Paragraph>

                    <Paragraph>Ein Teil der Daten wird erhoben, um die fehlerfreie Bereitstellung der
                        Website zu gewährleisten.
                        Andere Daten
                        können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                    </Paragraph>

                    <Paragraph>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
                        Empfänger und Zweck Ihrer
                        gespeicherten
                        personenbezogenen Daten zu erhalten. Sie haben auch das Recht, die Berichtigung oder Löschung
                        dieser Daten zu
                        verlangen. Wenn Sie der Verarbeitung Ihrer Daten zugestimmt haben, können Sie diese Zustimmung
                        jederzeit
                        widerrufen. Unter bestimmten Umständen haben Sie auch das Recht, die Einschränkung der
                        Verarbeitung Ihrer
                        personenbezogenen Daten zu verlangen, sowie das Recht, sich bei der zuständigen Aufsichtsbehörde
                        zu
                        beschweren.
                    </Paragraph>

                    <Paragraph>Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden.</Paragraph>
                    <br/><br/>


                    <Title>Hosting</Title>

                    <Paragraph>Unsere Website befindet sich auf einem externen Hosting-Service. Die
                        personenbezogenen Daten,
                        die auf dieser
                        Website erfasst werden, werden
                        auf den Servern des Hosters / der Hoster gespeichert. Dabei handelt es sich unter anderem um
                        IP-Adressen,
                        Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen,
                        Websitezugriffe und andere
                        Daten, die durch die Nutzung einer Website generiert werden.
                    </Paragraph>
                    <Paragraph>Das externe Hosting erfolgt zum Zweck im Interesse einer sicheren,
                        schnellen und effizienten
                        Bereitstellung
                        unseres Seiten durch einen professionellen Anbieter. Sofern eine entsprechende Einwilligung
                        abgefragt wurde,
                        erfolgt die Verarbeitung ausschließlich auf Grundlage der geltenden gesetzlichen
                        Bestimmungen. Die Einwilligung
                        kann jederzeit widerrufen werden.
                    </Paragraph>

                    <Paragraph>Unser Hoster verarbeitet Ihre Daten nur im Rahmen unserer Weisungen und
                        zur Erfüllung seiner
                        Leistungspflichten.
                    </Paragraph>

                    <Paragraph>Wir verwenden folgenden Hoster:</Paragraph>
                    <Paragraph>Vercel Inc.<br/>
                        440 N Barranca Ave #4133<br/>
                        Covina, CA 91723<br/>
                        privacy@vercel.com
                    </Paragraph>


                    <Title>Pflichtinformationen</Title>

                    <Paragraph>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
                        behandeln Ihre Daten
                        vertraulich und gemäß den
                        gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                    </Paragraph>

                    <Paragraph>Bei der Nutzung dieser Website werden verschiedene personenbezogene
                        Daten erhoben. Diese
                        Datenschutzerklärung
                        erläutert, welche Daten wir erheben und zu welchem Zweck. Wir weisen darauf hin, dass die
                        Datenübertragung im
                        Internet Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff
                        durch Dritte ist
                        nicht möglich.
                    </Paragraph>
                    <Paragraph>Die Verarbeitung von Daten auf dieser Website liegt in der
                        Verantwortung des
                        Websitebetreibers.
                        Die Kontaktdaten des Betreibers sind im Impressum dieser Website verfügbar.
                    </Paragraph>


                    <StyledH2Heading>Recht auf Datenübertragbarkeit</StyledH2Heading>
                    <Paragraph>Sie haben das Recht, Daten, die wir aufgrund Ihrer Einwilligung
                        automatisiert
                        verarbeiten, in einem gängigen, maschinenlesbaren Format an sich oder an einen von Ihnen
                        benannten Dritten
                        übertragen zu lassen. Soweit technisch möglich, können wir auch direkt die Übertragung an
                        den von Ihnen
                        genannten Verantwortlichen vornehmen.
                    </Paragraph>


                    <StyledH2Heading>Auskunft, Korrektur und Löschung</StyledH2Heading>
                    <Paragraph>Sie haben jederzeit das Recht, gemäß den geltenden Gesetzen kostenfrei
                        Auskunft über Ihre
                        gespeicherten
                        personenbezogenen Daten, deren Herkunft, Empfänger und den Zweck der Datenverarbeitung zu
                        erhalten.
                        Gegebenenfalls haben Sie auch das Recht, fehlerhafte Daten zu korrigieren oder unerwünschte
                        Daten löschen zu
                        lassen. Bei Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
                    </Paragraph>


                    <StyledH2Heading>Recht auf Beschränkung der Datenverarbeitung</StyledH2Heading>
                    <Paragraph>Sie haben das Recht, die Verarbeitung Ihrer persönlichen Daten in
                        bestimmten Situationen
                        einzuschränken. Bitte
                        kontaktieren Sie uns jederzeit, wenn Sie von diesem Recht Gebrauch machen möchten.
                    </Paragraph><br/><br/>


                    <Title>Datenerfassung auf dieser Website</Title>

                    <StyledH2Heading>Cookies</StyledH2Heading>
                    <Paragraph>Auf dieser Website verwenden wir &quot;Cookies&quot;. Diese kleinen
                        Datensätze werden auf Ihrem Gerät
                        gespeichert und
                        richten keinen Schaden an. Es gibt temporäre Cookies, die nur während Ihrer Browsersitzung
                        gespeichert werden,
                        und dauerhafte Cookies, die auf Ihrem Gerät verbleiben, bis Sie sie löschen oder sie
                        automatisch entfernt
                        werden.
                    </Paragraph>
                    <Paragraph>Cookies können entweder von uns (First-Party-Cookies) oder von
                        Drittanbietern
                        (Third-Party-Cookies) stammen.
                        Drittanbieter-Cookies ermöglichen die Integration spezifischer Dienste von externen
                        Anbietern.
                    </Paragraph>
                    <Paragraph>Die Speicherung von Cookies erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO, sofern keine
                        andere Rechtsgrundlage vorliegt. Der Betreiber der Website hat ein legitimes Interesse an der Speicherung von
                        notwendigen Cookies, um seine Dienste technisch einwandfrei und optimiert bereitzustellen. Falls um Einwilligung
                        zur
                        Speicherung von Cookies und ähnlichen Tracking-Technologien gebeten wurde, erfolgt die Verarbeitung
                        ausschließlich
                        auf Basis dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG); diese
                        Einwilligung kann jederzeit widerrufen werden.
                    </Paragraph>
                    <Paragraph>Sie haben die Möglichkeit, Ihren Browser so einzustellen, dass Sie über
                        das Setzen von
                        Cookies informiert werden,
                        sie nur in bestimmten Fällen zulassen oder generell ablehnen sowie bereits gespeicherte
                        Cookies löschen können.
                        Bitte beachten Sie, dass die Deaktivierung von Cookies die Funktionalität der Website
                        beeinträchtigen kann.
                    </Paragraph><br/>


                    <StyledH2Heading>Kontaktformular</StyledH2Heading>
                    <Paragraph>Wenn Sie uns über das Kontaktformular kontaktieren, werden die von
                        Ihnen angegebenen
                        Informationen und
                        Kontaktdaten gespeichert, um Ihre Anfrage zu bearbeiten und eventuelle Nachfragen zu
                        beantworten. Diese Daten
                        werden ohne Ihre Zustimmung nicht weitergegeben.
                    </Paragraph>

                    <Paragraph>Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt
                        ausschließlich auf
                        Grundlage Ihrer
                        Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit
                        widerrufen, indem Sie uns
                        eine formlose Mitteilung per E-Mail senden. Die Rechtmäßigkeit der bis zum Widerruf
                        erfolgten Datenverarbeitung
                        bleibt vom Widerruf unberührt.
                    </Paragraph>

                    <Paragraph>Die von Ihnen im Kontaktformular hinterlegten Daten werden bei uns
                        gespeichert, bis Sie uns
                        zur Löschung
                        auffordern, Ihre Einwilligung widerrufen oder der Zweck der Datenspeicherung entfällt (z. B.
                        nach Abschluss der
                        Anfragebearbeitung). Dabei bleiben zwingende gesetzliche Aufbewahrungsfristen unberührt.
                    </Paragraph><br/>


                    <StyledH2Heading>Kommentarfunktion auf dieser Website</StyledH2Heading>
                    <Paragraph>Bei Nutzung der Kommentarfunktion werden neben Ihrem Kommentar auch der
                        Zeitpunkt der
                        Erstellung sowie, sofern
                        nicht anonym gepostet wird, der gewählte Nutzername gespeichert.
                    </Paragraph>
                    <Paragraph>Kommentare und die dazugehörigen Daten werden auf dieser Website
                        gespeichert, bis der
                        kommentierte Inhalt
                        vollständig gelöscht wird oder aus rechtlichen Gründen gelöscht werden muss.
                    </Paragraph>
                    <Paragraph>Die Speicherung von Kommentaren erfolgt aufgrund Ihrer Einwilligung.
                        Sie können diese
                        Einwilligung jederzeit
                        widerrufen, ohne dass die Rechtmäßigkeit der vorherigen Datenverarbeitung davon berührt
                        wird.
                    </Paragraph><br/><br/>


                    <Title>Zusatzfunktionen und Tools</Title>

                    <StyledH2Heading>Google Fonts</StyledH2Heading>
                    <Paragraph>Für die konsistente Darstellung von Schriftarten verwendet diese Seite
                        sogenannte Google
                        Fonts, die von Google
                        bereitgestellt werden. Beim Laden einer Seite werden die erforderlichen Schriftarten in den
                        Browsercache
                        geladen, um Texte und Schriftarten korrekt anzuzeigen. Ihr Browser muss hierzu eine
                        Verbindung zu den Servern
                        von Google herstellen. Dadurch erlangt Google Kenntnis darüber, dass diese Website über Ihre
                        IP-Adresse
                        aufgerufen wurde. Die Nutzung von Google Fonts erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO. Der
                        Websitebetreiber
                        hat ein berechtigtes Interesse an der einheitlichen Darstellung des Schriftbildes auf seiner
                        Website. Sofern
                        eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich
                        gemäß Art. 6 Abs. 1
                        lit. a DSGVO und § 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung von Cookies oder
                        den Zugriff auf
                        Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TTDSG
                        umfasst. Die Einwilligung
                        ist jederzeit widerrufbar. Falls Ihr Browser Google Fonts nicht unterstützt, wird eine
                        Standardschrift von Ihrem
                        Computer verwendet.
                    </Paragraph>
                    <Paragraph>Weitere Informationen zu Google Fonts finden Sie unter der
                        Datenschutzerklärung von Google
                        unter:
                        <StyledLink href="https://policies.google.com/privacy?hl=de"
                           target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy?hl=de</StyledLink>
                    </Paragraph><br/>


                    <StyledH2Heading>Font Awesome</StyledH2Heading>
                    <Paragraph>Für die konsistente Darstellung von Schriftarten und Symbolen verwendet
                        diese Seite Font
                        Awesome. Der Anbieter
                        ist Fonticons, Inc., mit Sitz in 6 Porter Road Apartment 3R, Cambridge, Massachusetts, USA.
                        Beim Laden einer Seite werden die benötigten Fonts in den Browsercache geladen, um Texte,
                        Schriftarten und
                        Symbole korrekt anzuzeigen. Ihr Browser muss hierzu eine Verbindung zu den Servern von Font
                        Awesome herstellen.
                        Dadurch erlangt Font Awesome Kenntnis darüber, dass diese Website über Ihre IP-Adresse
                        aufgerufen wurde. Die
                        Nutzung von Font Awesome erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein
                        berechtigtes Interesse an der
                        einheitlichen Darstellung des Schriftbildes auf unserer Website. Sofern eine entsprechende
                        Einwilligung
                        abgefragt wurde, erfolgt die Verarbeitung ausschließlich gemäß Art. 6 Abs. 1 lit. a DSGVO
                        und § 25 Abs. 1 TTDSG,
                        soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im
                        Endgerät des Nutzers
                        (z. B. Device-Fingerprinting) im Sinne des TTDSG umfasst. Die Einwilligung ist jederzeit
                        widerrufbar.
                        Wenn Ihr Browser Font Awesome nicht unterstützt, wird eine Standardschrift von Ihrem
                        Computer verwendet.
                    </Paragraph>
                    <Paragraph>Weitere Informationen zu Font Awesome finden Sie in der
                        Datenschutzerklärung von Font Awesome
                        unter:
                        <StyledLink href="https://fontawesome.com/privacy"
                           target="_blank" rel="noopener noreferrer">https://fontawesome.com/privacy</StyledLink>
                    </Paragraph><br/>

                    <StyledH2Heading>Google Maps</StyledH2Heading>
                    <Paragraph>Diese Website verwendet den Kartendienst Google Maps, bereitgestellt
                        von der Google LLC, 1600
                        Amphitheatre
                        Parkway,
                        Mountain View, CA 94043, USA.
                    </Paragraph>
                    <Paragraph>Zur Nutzung der Google Maps-Funktionen ist es erforderlich, Ihre
                        IP-Adresse zu speichern.
                        Diese Informationen
                        werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
                        Der Websitebetreiber
                        hat keinen Einfluss auf diese Datenübertragung. Wenn Google Maps aktiviert ist, kann Google
                        zum Zwecke der
                        konsistenten Darstellung der Schriftarten Google Fonts verwenden. Beim Aufruf von Google
                        Maps lädt Ihr Browser
                        die benötigten Web Fonts in den Browsercache, um Texte und Schriftarten korrekt
                        anzuzeigen.
                    </Paragraph>
                    <Paragraph>Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden
                        Darstellung der
                        Online-Angebote und an einer
                        leichten Auffindbarkeit der auf der Website angegebenen Orte. Dies stellt ein berechtigtes
                        Interesse gemäß Art.
                        6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt
                        die Verarbeitung
                        ausschließlich gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG, soweit die
                        Einwilligung die Speicherung
                        von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B.
                        Device-Fingerprinting) im Sinne
                        des TTDSG umfasst. Die Einwilligung ist jederzeit widerrufbar.
                    </Paragraph>
                    <Paragraph>Die Datenübertragung in die USA erfolgt auf Basis der
                        Standardvertragsklauseln der
                        EU-Kommission. Weitere Details
                        finden Sie hier:
                        <StyledLink href="https://privacy.google.com/businesses/gdprcontrollerterms/" target="_blank"
                           rel="noopener noreferrer">https://privacy.google.com/businesses/gdprcontrollerterms/
                        </StyledLink>
                        <StyledLink href="https://privacy.google.com/businesses/gdprcontrollerterms/sccs/" target="_blank"
                           rel="noopener noreferrer">https://privacy.google.com/businesses/gdprcontrollerterms/sccs/
                        </StyledLink>
                    </Paragraph>
                    <Paragraph>Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google:
                        <StyledLink href="https://policies.google.com/privacy?hl=de" target="_blank"
                           rel="noopener noreferrer">https://policies.google.com/privacy?hl=de</StyledLink>
                    </Paragraph><br/>


                    <StyledH2Heading>Bootstrap Framework (via jsDelivr CDN)</StyledH2Heading>

                    <Paragraph>Wir verwenden das Bootstrap-CSS-Framework über das jsDelivr Content
                        Delivery Network (CDN),
                        bereitgestellt von
                        Volentio JSD Limited mit Sitz in Suite 2a1,
                        Northside House, Mount Pleasant, Barnet, England, EN4 9EB. Wir integrieren auf unserer
                        Website das
                        Bootstrap-CSS-Framework , um unsere Inhalte auf verschiedenen
                        Endgeräten optimal darzustellen und die Ladezeiten zu verbessern. Das jsDelivr-CDN ist ein
                        Dienst,
                        der Inhalte wie Bibliotheken und Frameworks bereitstellt, darunter auch das
                        Bootstrap-Framework. Die Einbindung
                        von
                        Bootstrap über das jsDelivr-CDN dient der Wahrung unserer berechtigten Interessen
                        gemäß Art. 6 Abs. 1 lit. f DSGVO. Sofern Ihr Browser JavaScript aktiviert hat und kein
                        JavaScript-Blocker
                        installiert ist, übermittelt Ihr Browser beim Laden unserer Seite personenbezogene
                        Daten (z. B. Ihre IP-Adresse und Browser) an das jsDelivr-CDN.
                    </Paragraph>

                    <Paragraph>Die Datenschutzerklärung des Anbieters jsDelivr finden Sie unter:
                        <StyledLink href="https://www.jsdelivr.com/privacy-policy-jsdelivr-net/"
                           target="_blank" rel="noopener noreferrer">https://www.jsdelivr.com/privacy-policy-jsdelivr-net</StyledLink>
                    </Paragraph><br/><br/>


                    <StyledH2Heading>jQuery</StyledH2Heading>
                    <Paragraph>Zur weiteren Optimierung der Ladezeiten binden wir auf unserer Website
                        auch die jQuery ein.
                        Dabei werden beim
                        Aufruf unserer Website Programmbibliotheken von Servern des
                        Anbieters Google LLC, ansässig in 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA,
                        abgerufen und über
                        das Content Delivery Network von Google heruntergeladen. Hierbei werden personenbezogene
                        Daten (z. B. Ihre
                        IP-Adresse und Browser) an Google übertragen. Die Einbindung von jQuery dient der Wahrung
                        unserer berechtigten
                        Interessen gemäß Art. 6 Abs. 1 lit. f DSGVO.
                    </Paragraph>

                    <Paragraph>Die Datenschutzerklärung von Google finden Sie unter:
                        <StyledLink href="https://www.google.com/policies/privacy"
                           target="_blank" rel="noopener noreferrer">https://www.google.com/policies/privacy</StyledLink>
                    </Paragraph><br/><br/>


                    <Title>Authentifizierung</Title>

                    <StyledH2Heading>Nutzung von Firebase Authentication</StyledH2Heading>
                    <Paragraph>Wir setzen in unseren Anwendungen Firebase Authentication von Google
                        ein, einen Dienst zur
                        Authentifizierung.
                        Firebase Authentication ermöglicht es uns, den Anmeldeprozess zu vereinfachen, indem es
                        Identitätsdienste von
                        Drittanbietern nutzt und die entsprechenden Informationen auf seiner Plattform speichert.
                        Dieser Dienst fungiert
                        als Vermittler für die Datenerhebung zwischen Dritten und uns selbst. Die von Firebase
                        Authentication erhobenen
                        Daten werden in unserem Auftrag gespeichert, damit wir sie für unsere Apps nutzen und
                        verarbeiten können.
                        Die erhobenen personenbezogenen Daten umfassen E-Mail-Adress und Passwort. In diesen Fällen
                        erfolgt die
                        Verarbeitung gemäß
                        Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
                    </Paragraph>
                    <Paragraph>Weitere Informationen zum Datenschutz finden Sie in den
                        Datenschutzbestimmungen von Google
                        unter:
                        <StyledLink href="https://policies.google.com/privacy"
                           target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</StyledLink>
                    </Paragraph><br/>


                    <StyledH2Heading>Google OAuth</StyledH2Heading>
                    <Paragraph>Google OAuth, bereitgestellt von Google LLC, ist ein Dienst zur
                        Anmeldung und
                        Authentifizierung, der eng mit dem
                        Google-Netzwerk verbunden ist. Dieser Dienst ermöglicht es Benutzern, sich bei verschiedenen
                        Anwendungen und
                        Websites anzumelden, indem sie ihre Google-Anmeldeinformationen verwenden.
                    </Paragraph>
                    <Paragraph>Die Art der erhobenen personenbezogenen Daten umfasst verschiedene
                        Datenarten, darunter
                        Benutzeridentifikatoren,
                        E-Mail-Adressen und Profilinformationen, die in der Datenschutzerklärung des Dienstes
                        beschrieben sind.
                    </Paragraph>
                    <Paragraph>Weitere Informationen zu Google und Datenschutz finden Sie unter:
                        <StyledLink href="https://policies.google.com/privacy"
                           target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</StyledLink>
                    </Paragraph><br/>


                    <StyledH2Heading>jsDelivr CDN</StyledH2Heading>
                    <Paragraph>Um die Auslieferung von Inhalten auf unserer Website zu beschleunigen,
                        verwenden wir das
                        Content Delivery Network
                        (CDN) von jsDelivr, betrieben von Volentio JSD Limited mit Sitz in Suite 2a1, Northside
                        House, Mount Pleasant,
                        Barnet, England, EN4 9EB.
                    </Paragraph>
                    <Paragraph>Ein CDN ist ein Dienst, der große Mediendateien wie Grafiken oder
                        Skripte über regional
                        verteilte Server
                        schneller bereitstellt. Wir nutzen das CDN allein zum Zweck der Verbesserung der Ladezeiten
                        und der Sicherheit
                        unserer Website.
                    </Paragraph>
                    <Paragraph>Ihr Browser muss eine Verbindung zu den Servern des CDNs herstellen, um
                        die Inhalte
                        abzurufen, wodurch das CDN
                        Kenntnis davon erlangt, dass unsere Website über Ihre IP-Adresse aufgerufen wurde.
                    </Paragraph>
                    <Paragraph>Die Nutzung des CDNs erfolgt auf der Grundlage unserer berechtigten
                        Interessen an einer
                        sicheren und effizienten
                        Bereitstellung sowie der Analyse und Optimierung unseres Online-Angebots gemäß Art. 6 Abs. 1
                        lit. f DSGVO.
                    </Paragraph>
                    <Paragraph>Weitere Informationen zum Datenschutz finden Sie in der
                        Datenschutzerklärung von jsDelivr:
                        <StyledLink href="https://www.jsdelivr.com/privacy-policy-jsdelivr-net"
                           target="_blank" rel="noopener noreferrer">https://www.jsdelivr.com/privacy-policy-jsdelivr-net</StyledLink>
                    </Paragraph><br/><br/>

                    <ButtonHome/>

                    <br /><br /><br /><br />

                </ContentContainer>
            </Container>
        )}
        </>
    );
}
