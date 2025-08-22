import { Box, For, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../css/Users.css";
import { useEffect, useState } from "react";

function Users() {
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState("");

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

    useEffect(
        () => {
            fetchUsers();
        }, []
    );

    if(loading) {
        return(
            <div>
                <h2>
                    Fetching data. Please wait...
                </h2>
            </div>
        )
    }

    if(error) {
        return(
            <div>
                <h2>
                    Failed load users list. Please try again later...
                </h2>
                {console.log(error)};
            </div>
        )
    }

    console.log(userList);

    return (
        <>
            <div className="main-container">
                {userList != "" ?
                    (<VStack>
                        <For each={userList}>
                            {(user, index) => (
                                <Box border={"1px solid #555"} key={index} p={"4"} w={"40rem"} textAlign={"left"}>
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