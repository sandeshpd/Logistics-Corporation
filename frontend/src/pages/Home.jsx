import { Container, Image } from "@chakra-ui/react";
import "../css/Home.css";
import under_construction from "../assets/under-construction.png";

function Home() {

    return (
        <>
            <Container display="grid" justifyItems="center">
                <h1>This website is under construction. Stay tuned.</h1>
                <Image src={under_construction} height="400px" width="auto" mt="1.5em"/>
            </Container>
        </>
    )
}

export default Home;