import { Card, Center, Container, HStack, Image, Stack } from "@chakra-ui/react";
import "../css/Home.css";
import addUser from "../assets/icons8-add-user-100.png";
import clipboardPlus from "../assets/icons8-clipboard-plus-100.png";
import truck from "../assets/icons8-truck-100.png";

function Home() {

    return (
        <>
            <Container 
                display="grid" 
                justifyItems="center" 
                h="60%" 
                gap="4"
                smToMd={{display:"flex", flexDir:"column", gap:"1rem"}}
            >
                <h1 style={{ marginBottom: '0', marginTop:'0' }}>DalanValan</h1>
                <h2 style={{ marginBottom: ".2em" }}>Your logistics, simplified - efficiency at every step.</h2>
                
                {/* <h2 style={{ marginBottom: ".4em", justifySelf:"left" }}>Main features:</h2> */}
                <Stack 
                    gap="4rem"
                    direction={{ base:'column', md:'row' }}                                    
                >
                    <Card.Root
                        w="16rem"
                        h="20rem"
                        overflow="hidden"
                        variant="outline"
                        gap="1rem"
                        px="1em"
                        border="2px solid"
                        borderRadius="20px"
                    >
                        <Center>
                            <Image
                                src={addUser}
                                alt="Add user icon from icons8.com"
                                h="100px"
                                w="100px"
                                mt="1rem"
                            />
                        </Center>
                        <Card.Body gap="1">
                            <Card.Title fontSize="2xl">Add & Manage Users Effortlessly</Card.Title>
                            <Card.Description fontSize="1rem">
                                Quickly add, edit, and organize users to keep your team in
                                sync and operations running smoothly.
                            </Card.Description>
                        </Card.Body>
                    </Card.Root>
                    <Card.Root
                        w="16rem"
                        h="20rem"
                        overflow="hidden"
                        variant="outline"
                        gap="2rem"
                        px="1em"
                        border="2px solid"
                        borderRadius="20px"
                    >
                        <Center>
                            <Image
                                src={truck}
                                alt="Truck icon from icons8.com"
                                h="100px"
                                w="100px"
                            />
                        </Center>
                        <Card.Body gap="1">
                            <Card.Title fontSize="2xl">Register Vehicles with Ease</Card.Title>
                            <Card.Description fontSize="1rem">
                                Add and manage your fleet in a few clicks, ensuring every
                                vehicle is ready for action.
                            </Card.Description>
                        </Card.Body>
                    </Card.Root>
                    <Card.Root
                        w="16rem"
                        h="20rem"
                        overflow="hidden"
                        variant="outline"
                        gap="1rem"
                        px="1em"
                        border="2px solid"
                        borderRadius="20px"
                    >
                        <Center>
                            <Image
                                src={clipboardPlus}
                                alt="Clipboard icon from icons8.com"
                                h="100px"
                                w="100px"
                                mt="1.1rem"
                            />
                        </Center>
                        <Card.Body gap="1">
                            <Card.Title fontSize="2xl">Create Jobs in Seconds</Card.Title>
                            <Card.Description fontSize="1rem">
                                Input and track your jobs effortlessly, keeping your logistics
                                organized and on schedule.
                            </Card.Description>
                        </Card.Body>
                    </Card.Root>
                </Stack>
            </Container>
        </>
    )
}

export default Home;