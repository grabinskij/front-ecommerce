import styled, {css, keyframes} from "styled-components";
import {primary} from "../lib/colors";


const clickAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const ButtonStyle = css`
  border:0;
  padding: 7px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight:500;
  font-size: 16px;
  &:active{
    animation: ${clickAnimation} 0.3s;
  }
  svg{
    height: 18px;
    margin-right: 5px;
  }
  ${props => props.block && css`
    display: block;
    width: 100%;
  `}
  ${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
  `}
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  `}
  ${props => props.black && !props.outline && css`
    background-color: #000;
    color: #fff;
  `}
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}
  ${props => props.primary && !props.outline && css`
    background-color: ${primary};
    border: 2px solid ${primary};
    color:#fff;
  `}
  ${props => props.primary && props.outline && css`
    background-color: transparent;
    border: 2px solid ${primary};
    color:${primary};
  `}
  ${props => props.mobile && css`
    font-size: 14px;
    padding: 4px 12px;
    @media screen and (min-width: 768px) {
      font-size: 16px;
      padding: 7px 20px;
    }
  `}
  ${props =>
      props.clicked &&
      css`
      animation: ${clickAnimation} 0.3s ease;
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({children, clicked,...rest}) {
  return (
      <StyledButton {...rest} clicked={clicked}>{children}</StyledButton>
  );
}