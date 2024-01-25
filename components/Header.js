import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import {useContext, useState} from "react";
import {CartContext} from "./CartContext";
import BarsIcon from "./icons/Bars";
import SearchIcon from "./icons/SearchIcon";
import {primary} from "../lib/colors";
import {usePathname} from "next/navigation";

const StyledHeader = styled.header`
  background-color: #0286ee;
  position: sticky;
  top: 0;
  z-index: 10;
`;
const LogoWrapper = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  width: 100px;
  height: 45px;
`;
const LogoImage = styled.img`
  max-width: 100%;
  height: auto;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0 10px;
  align-items: center;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #000;
  background-color: white;
  min-width: 30px;
  padding: 10px;
  margin: 0 -20px;
  font-weight: bold;
  svg {
    height: 20px;
  }
  @media screen and (min-width: 768px) {
    opacity: ${props =>
            props.href === props.currentPath ? "0.7" : "1"};
    padding: 0;
    color: #fff;
    background-color: transparent;
    margin: 0;
  }
`;
const NavButton = styled.button`
  width: 30px;
  height: 30px;
  border: 0;
  padding-top: 4px;
  color: white;
  cursor: pointer;
  position: relative;
  background-color: ${primary};
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const SideIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  a {
    display: inline-block;
    min-width: 20px;
    color: white;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export default function Header() {
    const currentPath = usePathname();
    const {cartProducts} = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);

    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <LogoWrapper href={'/'}>
                        <LogoImage src="/logo-toys.png" alt="Logo"/>
                    </LogoWrapper>
                    <StyledNav mobileNavActive={mobileNavActive}>
                        <NavLink href={'/'} currentPath={currentPath}>Home</NavLink>
                        <NavLink href={'/products'} currentPath={currentPath}>All products</NavLink>
                        <NavLink href={'/categories'} currentPath={currentPath}>Categories</NavLink>
                        <NavLink href={'/account'} currentPath={currentPath}>Account</NavLink>
                        <NavLink href={'/cart'} currentPath={currentPath}>Cart ({cartProducts.length})</NavLink>
                    </StyledNav>
                    <SideIcons>
                        <Link href={'/search'}><SearchIcon/></Link>
                        <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                            <BarsIcon/>
                        </NavButton>
                    </SideIcons>
                </Wrapper>
            </Center>
        </StyledHeader>
    );
}