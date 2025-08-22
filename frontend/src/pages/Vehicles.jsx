import { Box, For, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

function Vehicles() {
    const [loading, setLoading] = useState(false);
    const [vehicleList, setVehicleList] = useState([]);
    const [error, setError] = useState("");

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

    console.log(vehicleList);

    return (
        <>
            <div className="main-container">
                {vehicleList !== "" ?
                    (<VStack>
                        <For each={vehicleList}>
                            {
                                (vehicle, index) => (
                                    <Box border={"1px solid #555"} key={index} p={"4"} w={"40rem"} textAlign={"left"}>
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