import { useState } from "react";
import {
    Avatar,
    Button,
    Card,
    Container,
    Field,
    HoverCard,
    HStack,
    Icon,
    Input,
    Link,
    Portal,
    Separator,
    Text,
    VStack
} from "@chakra-ui/react";
import { FiAlertCircle } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import profile_picture_src from "../assets/default_profile_picture.png";
import "../css/Login.css";

function Login() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Container maxW="100%" display="grid" placeContent="center">
                <form>
                    <Card.Root width="400px" variant="elevated" p="2.5em">
                        <Card.Header placeItems="center">
                            <Avatar.Root shape="full" size="2xl">
                                <Avatar.Fallback name="Profile" />
                                <Avatar.Image src={profile_picture_src} />
                            </Avatar.Root>
                            <Card.Title>Log In</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <VStack gap="5">
                                <Field.Root required>
                                    <Field.Label>
                                        Username <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        placeholder="Enter your username"
                                        variant="outline"
                                        paddingLeft=".9em"
                                    />
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>
                                        Password <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        variant="outline"
                                        paddingLeft=".9em"
                                    />
                                </Field.Root>
                            </VStack>
                        </Card.Body>
                        <Card.Footer justifyContent="center">
                            <VStack>
                                <Button
                                    backgroundColor="#1563bd"
                                    mt="1em"
                                >
                                    Sign In
                                </Button>
                                <Text justifyContent="end" fontSize="1rem" mb="0">
                                    Don't have an account?{" "}
                                    <Link
                                        variant="underline"
                                        href="#"
                                        colorPalette="blue"
                                    >
                                        Create one.
                                        <HoverCard.Root
                                            positioning={{ placement: "right" }}
                                            size="sm"
                                            open={open}
                                            onOpenChange={(e) => setOpen(e.open)}>
                                            <HoverCard.Trigger asChild>
                                                <Icon size="xs" color="#888">
                                                    <FiAlertCircle />
                                                </Icon>
                                            </HoverCard.Trigger>
                                            <Portal>
                                                <HoverCard.Positioner>
                                                    <HoverCard.Content>
                                                        <HoverCard.Arrow />
                                                        <Text textStyle="sm" color="fg.muted" px="9px">
                                                            Only Admin users can log in.
                                                        </Text>
                                                    </HoverCard.Content>
                                                </HoverCard.Positioner>
                                            </Portal>
                                        </HoverCard.Root>
                                    </Link>
                                </Text>
                                <HStack>
                                    <Separator 
                                        flex="1" 
                                        orientation="horizontal"    
                                        variant="solid" 
                                        color="black" 
                                        size="lg"
                                    />
                                    <Text flexShrink="0" height="1.4em" mb="0">Or</Text>
                                    <Separator 
                                        flex="1" 
                                        orientation="horizontal"
                                        variant="solid" 
                                        color="black" 
                                        size="lg"
                                    />
                                </HStack>
                                <Text mb=".8em">Login using:</Text>
                                <HStack gap="6">
                                    <Button
                                        color="#000"
                                        background="#fff"
                                        border="1px solid"
                                        borderRadius="50%"
                                        w="3rem"
                                        h="3rem"
                                    >
                                        <FaGoogle />
                                    </Button>
                                    <Button
                                        color="#000"
                                        background="#fff"
                                        border="1px solid"
                                        borderRadius="50%"
                                        w="3rem"
                                        h="3rem"
                                    >
                                        <FaFacebookF />
                                    </Button>
                                    <Button
                                        color="#000"
                                        background="#fff"
                                        border="1px solid"
                                        borderRadius="50%"
                                        w="3rem"
                                        h="3rem"
                                    >
                                        <FaXTwitter />
                                    </Button>
                                </HStack>
                            </VStack>
                        </Card.Footer>
                    </Card.Root>
                </form>
            </Container>
        </>
    )
}

export default Login;