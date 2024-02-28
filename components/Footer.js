import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import {usePathname} from "next/navigation";

const StyledFooter = styled.header`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  align-items: center;
  background-color: #0286ee;
  height: 80px;
  z-index: 10;
`;

const StyledNav = styled.nav`
  gap: 15px;
  display: flex;
  justify-content: center;
  padding: 0;
  flex-grow: 1;
`;
const NavLink = styled(Link)`
  display: block;
  text-decoration: none;
  min-width: 30px;
  font-weight: bold;
  padding: 0;
  color: #fff;
  background-color: transparent;
  margin: 0;
`;
const StyledDivider = styled.li`
  color: rgba(255, 255, 255, 0.5);
  list-style-type: none;
`;



export default function Footer() {
    const currentPath = usePathname();

    return (
        <StyledFooter>
            <Center>
                <StyledNav>
                    <NavLink href={'/legal-notice'} currentPath={currentPath}>Legal notice</NavLink>
                    <StyledDivider>|</StyledDivider>
                    <NavLink href={'/privacy-policy'} currentPath={currentPath}>Privacy policy</NavLink>
                </StyledNav>
            </Center>
        </StyledFooter>
    );
}