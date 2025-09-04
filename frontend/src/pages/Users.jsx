import { Box, For, Icon, Link, Menu, Portal, Text, VStack } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import "../css/Users.css";
import "../css/EditUserModal.css";
import { useEffect, useState } from "react";
import EditUserModal from "../components/EditUserModal";

function Users() {
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    async function fetchUsers() {
        try {
            setLoading(true);
            const response = await fetch("http://127.0.0.1:8000/users");
            const result = await response.json();

            if (result) {
                setUserList(result);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowModal(!showModal);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleDeleteUser = async (user) => {
        if (!window.confirm(`Are you sure you want to delete ${user.username}?`)) return;
        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/users/${user.id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || `Failed to delete "${user.username}".`);
                return;
            }

            setUserList(userList.filter(u => u.id !== user.id));
        } catch (error) {
            console.log(error);
            setError("Network error. Please try again later...");
        } finally {
            setLoading(false);
        }
    };

    useEffect(
        () => {
            fetchUsers();
        }, []
    );

    if (loading) {
        return (
            <div>
                <h2>
                    Fetching data. Please wait...
                </h2>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <h2>
                    Failed load users list. Please try again later...
                </h2>
                {console.log(error)};
            </div>
        )
    }

    return (
        <>
            {/* TODO: Add icons for selecting Edit and Delete items from the list */}
            <div className="main-container">
                {userList != "" ?
                    (<VStack>
                        <For each={userList}>
                            {(user, index) => (
                                <Box border={"1px solid #555"} key={index} p={"4"} m={"4"} w={"40rem"} textAlign={"left"}>
                                    <div className="options-container" style={{ float: "right" }}>
                                        <Menu.Root>
                                            <Menu.Trigger asChild>
                                                <button className="options-button">
                                                    <Icon size={"md"}>
                                                        <HiDotsVertical />
                                                    </Icon>
                                                </button>
                                            </Menu.Trigger>
                                            <Portal>
                                                <Menu.Positioner>
                                                    <Menu.Content>
                                                        <Menu.Item
                                                            value="edit"
                                                            p={".7em"}
                                                            cursor={"pointer"}
                                                            onClick={() => handleEditUser(user)}
                                                        >
                                                            Edit...
                                                        </Menu.Item>
                                                        <Menu.Item
                                                            value="delete"
                                                            p={".7em"}
                                                            cursor={"pointer"}
                                                            color={"fg.error"}
                                                            _hover={{ bg: "bg.error", color: "fg.error" }}
                                                            onClick={() => handleDeleteUser(user)}
                                                        >
                                                            Delete
                                                        </Menu.Item>
                                                    </Menu.Content>
                                                </Menu.Positioner>
                                            </Portal>
                                        </Menu.Root>
                                    </div>
                                    {showModal && (
                                        <>
                                            <div className="edit-user-modal-overlay"></div>
                                            <EditUserModal
                                                isOpen={true}
                                                onClose={handleClose}
                                                user={selectedUser}
                                                onUserUpdated={fetchUsers}
                                            />
                                        </>
                                    )}
                                    <Text fontWeight={"bold"} mb={"0"}>{user.full_name}</Text>
                                    <Text fontWeight={"bold"} mb={"0"}>{user.username}</Text>
                                    <Text fontWeight={"bold"}>{user.role}</Text>
                                    <Link href="#">
                                        Read more
                                        <Icon>
                                            <FaLongArrowAltRight />
                                        </Icon>
                                    </Link>
                                </Box>
                            )}
                        </For>
                    </VStack>
                    ) : (
                        <h1>Looks like users are not added yet. Add the users and they will appear here.</h1>
                    )
                }
            </div>
        </>
    );
};

export default Users;