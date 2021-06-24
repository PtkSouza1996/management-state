import { Container,Content, Spin, SpinReverse } from "./styles";

export function LoadingOverlay(){
    return (
        <Container>
            <Content>
            <Spin />
            <SpinReverse />
            <Spin />
            <SpinReverse />
            </Content>
        </Container>
    )
}