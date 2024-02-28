import Link from "next/link";
import styled from "styled-components";

const StyledButton = styled.button`
    outline: none;
    border: none;
    display: inline-block;
    padding: 10px 20px;
    background-color: #3B82F6;
    color: #fff;
    border-radius: 0.25rem;
    transition: background-color 0.3s ease;
    margin-bottom: 0.75rem;
    @media (min-width: 768px) {
        margin-bottom: 0;
    }
    &:hover {
        background-color: #2563EB;
    }
`;

function ButtonHome() {

    return (
        <Link href="/">
            <StyledButton>Go to Home</StyledButton>
        </Link>
    );
}

export default ButtonHome;