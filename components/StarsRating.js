import StarOutline from "./icons/StarOutline";
import styled from "styled-components";
import {useState} from "react";
import StarSolid from "./icons/StarSolid";
import {primary} from "../lib/colors";

const StarsWrapper = styled.div`
  display: inline-flex;
  gap: 1px;
  align-items: center;
`;
const StarWrapper = styled.button`
  ${props => props.size === 'md' && `
      height: 1.3rem;
      width: 1.3rem;
  `}
  ${props => props.size === 'sm' && `
      height: 1rem;
      width: 1rem;
  `}
  ${props => !props.disabled && `
      cursor: pointer;
  `}
  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  color: ${primary};
`;

export default function StarsRating({size='md', defaultHowManyStars=0, disabled, onChange=() => {}}) {
    const [howManyStars, setHowManyStars] = useState(defaultHowManyStars);
    const fiveStars = [1,2,3,4,5];
    function handleStarClick(n){
        if (disabled) {
            return;
        }
        setHowManyStars(n);
        onChange(n);
    }
    return (
        <StarsWrapper>
        {fiveStars.map(n => (
            <div key={n.n}>
                <StarWrapper disabled={disabled} size={size} onClick={() => handleStarClick(n)}>
                    {howManyStars >= n ? <StarSolid /> : <StarOutline />}
                </StarWrapper>
            </div>
        ))}
        </StarsWrapper>
    );
 }