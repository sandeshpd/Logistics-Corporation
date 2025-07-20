import { Center } from "@chakra-ui/react";
import not_found from "../assets/404-not-found.jpg";
import "../css/NotFound.css";

const NotFound = () => {
    return (
        <>
            <Center>
                <div className="main_container">
                    <p>Error 404 - Page you are looking for is not found. It might have been moved or deleted.</p>
                    <img src={not_found} height="400px" width="400px" />
                </div>
            </Center>
        </>
    )
}

export default NotFound;