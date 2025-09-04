import { Box, For, Icon, Link, Menu, Portal, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import "../css/Vehicles.css";
import "../css/EditVehicleModal.css";
import EditVehicleModal from "../components/EditVehicleModal";

function Vehicles() {
    const [loading, setLoading] = useState(false);
    const [vehicleList, setVehicleList] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    async function fetchVehicles() {
        try {
            setLoading(true);
            const response = await fetch("http://127.0.0.1:8000/vehicles");
            const result = await response.json();

            if (result) {
                setVehicleList(result);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleEditVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowModal(!showModal);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedVehicle(null);
    };

    const handleDeleteVehicle = async (vehicle) => {
        if (!window.confirm(`Are you sure you want to delete ${vehicle.model}?`)) return;
        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/vehicles/${vehicle.id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || `Failed to delete "${vehicle.model}."`);
                return;
            }

            setVehicleList(vehicleList.filter(v => v.id !== vehicle.id));
        } catch (error) {
            console.log(error);
            setError("Network Error. Please try again later...");
        } finally {
            setLoading(false);
        }
    };

    useEffect(
        () => {
            fetchVehicles();
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
                {vehicleList !== "" ?
                    (<VStack>
                        <For each={vehicleList}>
                            {
                                (vehicle, index) => (
                                    <Box border={"1px solid #555"} key={index} p={"4"} m={"4"} w={"40rem"} textAlign={"left"}>
                                        <div className="options-container" style={{ float: "right", cursor: "pointer" }}>
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
                                                            {/* TODO: Add icons */}
                                                            <Menu.Item
                                                                value="edit"
                                                                p={".7em"}
                                                                cursor={"pointer"}
                                                                onClick={() => handleEditVehicle(vehicle)}
                                                            >
                                                                Edit...
                                                            </Menu.Item>
                                                            <Menu.Item
                                                                value="delete"
                                                                p={".7em"}
                                                                cursor={"pointer"}
                                                                color={"fg.error"}
                                                                _hover={{ bg: "bg.error", color: "fg.error" }}
                                                                onClick={() => handleDeleteVehicle(vehicle)}
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
                                                <div className="edit-vehicle-modal-overlay"></div>
                                                <EditVehicleModal
                                                    isOpen={true}
                                                    onClose={handleClose}
                                                    vehicle={selectedVehicle}
                                                    onVehicleUpdated={fetchVehicles}
                                                />
                                            </>
                                        )}
                                        <Text fontWeight={"bold"} mb={"0"}>License Plate: {vehicle.license_plate}</Text>
                                        <Text fontWeight={"bold"} mb={"0"}>Model: {vehicle.model}</Text>
                                        <Text fontWeight={"bold"} mb={"0"}>Type of Vehicle: {vehicle.vehicle_type}</Text>
                                        <Text fontWeight={"bold"}>Capacity: {vehicle.capacity}</Text>
                                        <Link href="#">
                                            Read more
                                            <Icon>
                                                <FaLongArrowAltRight />
                                            </Icon>
                                        </Link>
                                    </Box>
                                )
                            }
                        </For>
                    </VStack>
                    ) : (
                        <h1>Looks like vehicles are not added yet. Add those and vehicles will appear here.</h1>
                    )
                }
            </div>
        </>
    );
};

export default Vehicles;