import React from 'react';
import { useRouter } from 'next/router';
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

const BoldText = styled.span`
  font-weight: bold;
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

const StyledH3Heading = styled.h3`
  font-size: 1rem;
  margin-bottom: 1.1rem;
  font-weight: 600;
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const StyledH5 = styled.h5`
    margin-bottom: 0;
`;

export default function LegalNotice() {
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
                                    <Title>Legal Notice</Title>
                                    <ButtonHome/>
                                </HeadContentContainer>
                            </HeadContainer>


                            <Paragraph>
                                Bohdan Hrabynskyi<br/>
                                Ringstraße 9<br/>
                                17268 Templin
                            </Paragraph>

                            <Paragraph>
                                <BoldText>Contact:</BoldText><br/>
                                Phone: +49 (0) 162 63 20 634<br/>
                                Email:
                                <StyledLink href='mailto:bogdan.grabinskij@gmail.com'>
                                    bogdan.grabinskij@gmail.com
                                </StyledLink>
                            </Paragraph>

                            <Paragraph>
                                <BoldText>Responsible for the content of the website:</BoldText><br/>
                                Bohdan Hrabynskyi
                            </Paragraph>

                            <br/>
                            <br/>

                            <StyledH2Heading>Purpose and Use</StyledH2Heading>
                            <Paragraph>Our pages are designed and operated as hobby websites. Our pages are
                                not used for commercial
                                purposes,
                                and no
                                payments are made or accepted. Nothing can be sold or purchased on our pages. Our pages
                                are only
                                prototypes to
                                demonstrate how a real e-commerce website, educational website, informational website,
                                or any
                                other
                                website
                                might look.
                            </Paragraph>

                            <StyledH2Heading>Liability for Content</StyledH2Heading>
                            <Paragraph>While we have made every effort to ensure the accuracy, completeness,
                                and timeliness of our
                                content, we
                                cannot
                                guarantee it. As private website operators, we are not obligated to monitor transmitted
                                or
                                stored
                                third-party
                                information or to investigate circumstances indicating unlawful activity. However, we
                                are
                                obligated
                                under
                                general laws to remove or block the use of information upon becoming aware of a specific
                                legal
                                violation.
                                Liability in this regard is only possible from the time of knowledge of a concrete
                                infringement.
                                Upon
                                becoming
                                aware of such legal violations, we will remove the respective content immediately.
                            </Paragraph>

                            <StyledH2Heading>Liability for Links</StyledH2Heading>
                            <Paragraph>Our pages may contain links to third-party external websites whose
                                content is beyond our control.
                                Therefore, we
                                cannot assume any liability for the accuracy and completeness of these third-party
                                contents. The
                                respective
                                provider or operator is always responsible for the content of the linked pages. The
                                linked pages
                                were
                                checked
                                for possible legal violations at the time of linking. No illegal content was discernible
                                at the
                                time of
                                linking.
                                However, continuous monitoring of the linked pages is unreasonable without concrete
                                evidence of
                                a
                                violation of
                                the law. If we become aware of legal violations, we will remove such links immediately.
                            </Paragraph>

                            <StyledH2Heading>Copyright</StyledH2Heading>
                            <Paragraph>The content and works created by the website operators are subject to
                                German copyright law. Any
                                duplication,
                                processing, distribution, or use beyond the scope of copyright law requires the prior
                                written
                                consent of
                                the
                                respective author or creator. Downloads and copies of this page are only permitted for
                                private,
                                non-commercial
                                use.
                            </Paragraph>

                            <Paragraph>If the content on this page was not created by the operator, the
                                copyrights of third parties are
                                respected.
                                Should you nevertheless become aware of a copyright infringement, please inform us
                                accordingly.
                                If we
                                become
                                aware of legal violations, we will remove the relevant content immediately.
                            </Paragraph>
                            <StyledH3Heading>This legal notice also applies to the following social media profiles:</StyledH3Heading>

                            <StyledH5>GitHub:</StyledH5>
                            <StyledLink href='https://github.com/grabinskij' target="_blank"
                                        rel="noopener noreferrer">https://github.com/grabinskij</StyledLink>

                            <StyledH5>LinkedIn:</StyledH5>
                            <StyledLink href='https://www.linkedin.com/in/bohdan-hrabynskyi'
                                        target="_blank"
                                        rel="noopener noreferrer">https://www.linkedin.com/in/bohdan-hrabynskyi</StyledLink>

                            <StyledH5>Facebook:</StyledH5>
                            <StyledLink href='https://www.facebook.com/bogdan.grabinsky'
                                        target="_blank"
                                        rel="noopener noreferrer">https://www.facebook.com/bogdan.grabinsky</StyledLink>


                            <br /><br />

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
                                    <Title>Impressum</Title>
                                    <ButtonHome/>
                                </HeadContentContainer>
                            </HeadContainer>


                            <Paragraph>
                                Bohdan Hrabynskyi<br/>
                                Ringstra&szlig;e 9<br/>
                                17268 Templin
                            </Paragraph>

                            <Paragraph>
                                <BoldText>Kontakt:</BoldText><br/>
                                Telefon: +49 (0) 162 63 20 634<br/>
                                E-Mail:
                                <StyledLink href='mailto:bogdan.grabinskij@gmail.com'>
                                    bogdan.grabinskij@gmail.com
                                </StyledLink>
                            </Paragraph>

                            <Paragraph>
                                <BoldText>Verantwortlich für den Inhalt der Website:</BoldText><br/>
                                Bohdan Hrabynskyi
                            </Paragraph>

                            <br/>
                            <br/>

                            <StyledH2Heading>Zweck und Verwendung</StyledH2Heading>
                            <Paragraph>Unsere Seiten sind als Hobby-Websites konzipiert und wird betrieben.
                                Unsere Seiten werden nicht
                                für kommerzielle
                                Zwecke genutzt und es werden keine Zahlungen durchgefürt oder entgegengenommen. Auf
                                unseren
                                Seiten kann nichts
                                verkauft oder gekauft werden. Unsere Seiten sind nur Prototypen dafür, wie eine echte
                                E-commerce
                                Website, eine
                                Bildungswebsite,
                                eine Informations-Website oder eine andere Website aussehen könnte.
                            </Paragraph>


                            <StyledH2Heading>Haftung für Inhalte</StyledH2Heading>
                            <Paragraph>Unsere Inhalte wurden mit großer Sorgfalt erstellt, jedoch können wir
                                keine Gewähr für deren
                                Richtigkeit,
                                Vollständigkeit und Aktualität übernehmen. Als Privater Website-Betreiber sind wir nicht
                                dazu verpflichtet,
                                übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
                                forschen,
                                die auf rechtswidrige Tätigkeiten hinweisen. Wir bleiben jedoch gemäß den allgemeinen
                                Gesetzen verpflichtet,
                                Informationen bei Kenntnis konkreter Rechtsverletzungen zu entfernen oder deren Nutzung
                                zu
                                sperren.
                                Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
                                konkreten
                                Rechtsverletzung
                                möglich.
                                Wir werden bei Bekanntwerden entsprechender Rechtsverletzungen die betreffenden Inhalte
                                umgehend entfernen.
                            </Paragraph>


                            <StyledH2Heading>Haftung für Links</StyledH2Heading>
                            <Paragraph>Unsere Seiten können Links zu externen Websites Dritter enthalten,
                                deren Inhalte außerhalb
                                unserer Kontrolle
                                liegen.
                                Daher können wir keine Gewähr für die Richtigkeit und Vollständigkeit dieser fremden
                                Inhalte
                                übernehmen.
                                Verantwortlich für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                                oder
                                Betreiber.
                                Vor der Verlinkung wurden die Inhalte der verknüpften Seiten auf mögliche Rechtsverstöße
                                überprüft. Zu diesem
                                Zeitpunkt waren keine rechtswidrigen Inhalte erkennbar. Eine fortlaufende Kontrolle der
                                verlinkten Seiten ist
                                jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Sollten uns
                                Rechtsverstöße bekannt
                                werden,
                                werden wir entsprechende Links umgehend entfernen.
                            </Paragraph>


                            <StyledH2Heading>Urheberrecht</StyledH2Heading>
                            <Paragraph>Die Inhalte und Werke, die durch die Seitenbetreiber erstellt wurden,
                                unterliegen dem
                                deutschen Urheberrecht.
                                Jegliche Vervielfältigung, Bearbeitung, Verbreitung oder Nutzung außerhalb der Grenzen
                                des
                                Urheberrechts bedarf
                                der vorherigen schriftlichen Zustimmung des jeweiligen Autors oder Erstellers. Downloads
                                und
                                Kopien dieser
                                Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                            </Paragraph>

                            <Paragraph>Sofern die Inhalte auf dieser Seite nicht vom Betreiber erstellt
                                wurden, werden die
                                Urheberrechte Dritter
                                beachtet.
                                Sollten Sie dennoch eine Urheberrechtsverletzung feststellen, bitten wir um einen
                                entsprechenden Hinweis.
                                Bei Bekanntwerden von Rechtsverletzungen werden wir die betreffenden Inhalte umgehend
                                entfernen.
                            </Paragraph>

                            <StyledH3Heading>Dieses Impressum gilt auch für folgende Social Media Profile:</StyledH3Heading>

                            <StyledH5>GitHub:</StyledH5>
                            <StyledLink href='https://github.com/grabinskij' target="_blank"
                                        rel="noopener noreferrer">https://github.com/grabinskij</StyledLink>

                            <StyledH5>Linkedin:</StyledH5>
                            <StyledLink href='https://www.linkedin.com/in/bohdan-hrabynskyi'
                                        target="_blank"
                                        rel="noopener noreferrer">https://www.linkedin.com/in/bohdan-hrabynskyi</StyledLink>

                            <StyledH5>Facebook:</StyledH5>
                            <StyledLink href='https://www.facebook.com/bogdan.grabinsky'
                                        target="_blank"
                                        rel="noopener noreferrer">https://www.facebook.com/bogdan.grabinsky</StyledLink>

                            <br/><br/>

                            <ButtonHome/>

                            <br/><br/><br/><br/>

                        </ContentContainer>
                    </Container>
            )}
        </>
    );
}

