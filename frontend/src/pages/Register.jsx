import {
    Button,
    Card,
    Container,
    Field,
    Grid,
    GridItem,
    HoverCard,
    Icon,
    Input,
    Menu,
    Portal,
    Text
} from "@chakra-ui/react";
import { IoIosArrowDown } from "react-icons/io";
import { BsFillInfoCircleFill } from "react-icons/bs";
import "../css/Register.css";
import { useState } from "react";

function Register() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Container maxW="100%" display="grid" placeContent="center">
                <form>
                    <Card.Root width="100%" variant="outline" p="2.7rem" border="1px solid" borderColor="#aaa">
                        <Card.Header placeItems="center">
                            <Card.Title>
                                <h2>Register user</h2>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Grid templateColumns="repeat(2, 1fr)" gap="6">
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>First Name:</Field.Label>
                                        <Input
                                            placeholder="Enter first name"
                                            variant="outline"
                                            pl=".9em"
                                            border="1px solid" 
                                            borderColor="#aaa"
                                        />
                                    </Field.Root>
                                </GridItem>
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>Last Name:</Field.Label>
                                        <Input
                                            placeholder="Enter last name"
                                            variant="outline"
                                            pl=".9em"
                                            border="1px solid" 
                                            borderColor="#aaa"
                                        />
                                    </Field.Root>
                                </GridItem>
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>Username:</Field.Label>
                                        <Input
                                            placeholder="Enter username"
                                            variant="outline"
                                            pl=".9em"
                                            border="1px solid" 
                                            borderColor="#aaa"
                                        />
                                    </Field.Root>
                                </GridItem>
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>
                                            Enter Password:
                                            <HoverCard.Root
                                                positioning={{ placement: "right" }}
                                                size="sm"
                                                open={open}
                                                onOpenChange={(e) => setOpen(e.open)}>
                                                <HoverCard.Trigger asChild>
                                                    <Icon size="xs" color="#888">
                                                        <BsFillInfoCircleFill />
                                                    </Icon>
                                                </HoverCard.Trigger>
                                                <Portal>
                                                    <HoverCard.Positioner>
                                                        <HoverCard.Content>
                                                            <HoverCard.Arrow />
                                                            <Text textStyle="sm" color="fg.muted" px="9px">
                                                                User can change password later.
                                                            </Text>
                                                        </HoverCard.Content>
                                                    </HoverCard.Positioner>
                                                </Portal>
                                            </HoverCard.Root>
                                        </Field.Label>
                                        <Input
                                            placeholder="Enter password"
                                            variant="outline"
                                            pl=".9em"
                                            type="password"
                                            border="1px solid" 
                                            borderColor="#aaa"
                                        />
                                    </Field.Root>
                                </GridItem>
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>Role:</Field.Label>
                                        <Menu.Root>
                                            <Menu.Trigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="md"
                                                    backgroundColor="white"
                                                    border="1px solid" 
                                                    borderColor="#aaa"
                                                >
                                                    Select a role...
                                                    <Icon size="md" color="#777">
                                                        <IoIosArrowDown />
                                                    </Icon>
                                                </Button>
                                            </Menu.Trigger>
                                            <Portal>
                                                <Menu.Positioner>
                                                    <Menu.Content>
                                                        <Menu.Item cursor="pointer" p=".7em" value="driver">Driver</Menu.Item>
                                                        <Menu.Item cursor="pointer" p=".7em" value="cleaner">Cleaner</Menu.Item>
                                                        <Menu.Item cursor="pointer" p=".7em" value="warehouse-manager">Warehouse Manager</Menu.Item>
                                                        <Menu.Item cursor="pointer" p=".7em" value="forklift-operator">Forklift Operator</Menu.Item>
                                                        <Menu.Item cursor="pointer" p=".7em" value="engineer">Engineer</Menu.Item>
                                                    </Menu.Content>
                                                </Menu.Positioner>
                                            </Portal>
                                        </Menu.Root>
                                    </Field.Root>
                                </GridItem>
                            </Grid>
                            <Button backgroundColor="#1563bd" mt="1em" className="submitBtn">
                                Submit
                            </Button>
                        </Card.Body>
                    </Card.Root>
                </form>
            </Container>
        </>
    )
}

export default Register;