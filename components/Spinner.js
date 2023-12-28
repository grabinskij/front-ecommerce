import {BeatLoader} from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
  ${props => props.fullWidth ?`
    display:flex;
    justify-content:center;
    border:5px solid red;
  ` : `
    border:5px solid blue;
  `
}
`;

export default function Spinner({fullWidth}){
    return (
        <Wrapper fullWidth={fullWidth}>
            <BeatLoader speedMultiplier={2} color={'#444'}/>
        </Wrapper>
    )
}