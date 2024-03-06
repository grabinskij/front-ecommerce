import React from 'react';
import styled from "styled-components";

const StyledOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 50;
    display: ${({ show }) => (show ? 'block' : 'none')};
`;

const HiddenOverlay = styled.div`
    display: none;
`;

const Overlay = ({ show }) => {

    return(
        <>
            { show ? (
                    <StyledOverlay show={show} />
                ) : (
                    <HiddenOverlay />
                )
            }
        </>
    )
}
export default Overlay;
