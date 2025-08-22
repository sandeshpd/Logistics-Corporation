import { Container, HStack, Image, Link, Stack, VStack } from "@chakra-ui/react";
import under_construction from "../assets/under-construction.png";
import "../css/UnderConstruction.css";


function UnderConstruction() {
    return (
        <>
            <Container display="grid" justifyItems="center" h="100%">
                <h1>This website is under construction. Stay tuned.</h1>
                <Stack direction="row" gap="19rem">
                    <Image src={under_construction} height="300px" width="auto" mt="1.5em" />
                    <VStack
                        width="20rem"
                        height="fit-content"
                        mt="1.5em"
                        py=".5em"
                        border="1px solid #000"
                        borderRadius="12px"
                    >
                        <h2>Meanwhile checkout these links:</h2>
                        <ul>
                            <li>
                                <Link href="/home">Home</Link>
                            </li>
                            <li>
                                <Link href="/jobs">Jobs</Link>
                            </li>
                            <li>
                                <Link href="/users">Users</Link>
                            </li>
                            <li>
                                <Link href="/vehicles">Vehicles</Link>
                            </li>
                            <li>
                                <Link href="/login">Login</Link>
                            </li>
                            <li>
                                <Link href="/register">Register</Link>
                            </li>
                        </ul>
                    </VStack>
                </Stack>
            </Container>

        </>
    )
}
export default UnderConstruction;