import styled, { keyframes } from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 0; 
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    user-select: none;
`;

export const Content = styled.div`
    position: relative;
    display: flex;
    justify-content:center;
    align-items: center;
    height: 100vh;
`;
const rotate = keyframes`
    from {
        transform:rotate(0deg);
        border-radius: 0.5rem;
    }
    to {
        transform:rotate(360deg);
        border-radius: 0rem;
    }
`
export const Spin = styled.div`
    position: absolute;
    min-height: 2.5rem;
    min-width: 2.5rem;
    max-height: 2.5rem;
    max-width: 2.5rem;
    border-radius: 0.5rem;

    animation: ${rotate} 4s linear infinite;
        
    background-color: #363636;
`;

const rotateInverse = keyframes`
    from {
        transform:rotate(360deg);
        border-radius: 0.5rem;
    }
    to {
        transform:rotate(0deg);
        border-radius: 0rem;
    }
`

export const SpinReverse = styled(Spin)`
    animation-name: ${rotateInverse};
`;