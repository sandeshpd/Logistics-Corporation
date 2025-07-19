import { useState } from "react";
import {
    Avatar,
    Button,
    Card,
    Container,
    Field,
    HoverCard,
    Icon,
    Input,
    Link,
    Portal,
    Text,
    VStack
} from "@chakra-ui/react";
import { FiAlertCircle } from "react-icons/fi";
import profile_picture_src from "../assets/default_profile_picture.png";
import "../css/Login.css";

function Login() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Container maxW="100%" display="grid" placeContent="center">
                <form>
                    <Card.Root width="400px" variant="elevated" p="2.7em">
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
                                    <Input placeholder="Enter your username" variant="outline" />
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>
                                        Password <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        variant="outline"
                                    />
                                </Field.Root>
                            </VStack>
                            <Text justifyContent="end" fontSize="1rem">
                                Don't have an account?{" "}
                                <Link
                                    variant="underline"
                                    href="#"
                                    colorPalette="blue"
                                >
                                    Create one.
                                    <HoverCard.Root
                                        positioning={{ placement: "top" }}
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
                                                    <Text textStyle="sm" color="fg.muted" p="5px">
                                                        Only Admin users can log in.
                                                    </Text>
                                                </HoverCard.Content>
                                            </HoverCard.Positioner>
                                        </Portal>
                                    </HoverCard.Root>
                                </Link>
                            </Text>
                        </Card.Body>
                        <Card.Footer justifyContent="center">
                            <Button backgroundColor="#1563bd">Sign In</Button>
                        </Card.Footer>
                    </Card.Root>
                </form>
            </Container>
        </>
    )
}

export default Login;