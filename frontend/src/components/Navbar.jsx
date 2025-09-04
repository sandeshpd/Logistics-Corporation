import { useState } from "react";
import { Button, Icon, Link, Menu, Portal} from "@chakra-ui/react";
import { FaCaretDown } from "react-icons/fa6";
import JobModal from "./JobModal.jsx";
import UserModal from "./UserModal.jsx";
import VehicleModal from "./VehicleModal.jsx";
import "../css/Navbar.css";
import "../css/JobModal.css";
import "../css/UserModal.css";
import "../css/VehicleModal.css";

function Navbar() {
    const [showModal, setShowModal] = useState(null);

    function handleOpenJobModal() {
        setShowModal("job");
    };

    function handleOpenUserModal() {
        setShowModal("user");
    };

    function handleOpenVehicleModal() {
        setShowModal("vehicle");
    };

    function handleCloseModal() {
        setShowModal(null);
    };

    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <Menu.Root>
                            <Menu.Trigger asChild>
                                <Button
                                    className="navbar-brand-btn"
                                    variant="outline"
                                    border="1px solid #000"
                                    px=".6em"
                                >
                                    Add
                                    <Icon size="sm" color="#111">
                                        <FaCaretDown />
                                    </Icon>
                                </Button>
                            </Menu.Trigger>
                            <Portal>
                                <Menu.Positioner>
                                    <Menu.Content>
                                        <Menu.Item
                                            onClick={handleOpenJobModal}
                                            value="new-job"
                                            p=".7em"
                                            cursor="pointer"
                                        >
                                            Job
                                        </Menu.Item>
                                        <Menu.Item
                                            onClick={handleOpenUserModal}
                                            value="new-user"
                                            p=".7em"
                                            cursor="pointer"
                                        >
                                            User
                                        </Menu.Item>
                                        <Menu.Item
                                            onClick={handleOpenVehicleModal}
                                            value="new-vehicle"
                                            p=".7em"
                                            cursor="pointer"
                                        >
                                            Vehicle
                                        </Menu.Item>
                                    </Menu.Content>
                                </Menu.Positioner>
                            </Portal>
                        </Menu.Root>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/register">
                                <Button
                                    className="nav-link register-btn"
                                    variant="outline"
                                    border="1px solid #000"
                                    px=".6em"
                                >
                                    Register
                                </Button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/login">
                                <Button
                                    className="nav-link login-btn"
                                    variant="outline"
                                    backgroundColor="#333"
                                    color="white"
                                    px=".6em"
                                >
                                    Log In
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {showModal === "job" && (
                <>
                    <div className="job-modal-overlay"></div>
                    <JobModal isOpen={true} onClose={handleCloseModal} />
                </>
            )}
            {showModal === "user" && (
                <>
                    <div className="user-modal-overlay"></div>
                    <UserModal isOpen={true} onClose={handleCloseModal} />
                </>
            )}
            {showModal === "vehicle" && (
                <>
                    <div className="vehicle-modal-overlay"></div>
                    <VehicleModal isOpen={true} onClose={handleCloseModal} />
                </>
            )}
        </>
    )
}

export default Navbar;