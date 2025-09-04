import { useState } from "react";
import {
    Container,
    Field,
    Icon,
    Input,
    Spinner,
    VStack
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

function VehicleModal({ onClose }) {
    const [license_plate, setLicensePlate] = useState("");
    const [model, setModel] = useState("");
    const [vehicle_type, setVehicleType] = useState("");
    const [capacity, setCapacity] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false);

    // API Integration
    const handleSubmitVehicleData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError("");

        // POST vehicle data to the backend
        try {
            const response = await fetch("http://127.0.0.1:8000/vehicles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    license_plate,
                    model,
                    vehicle_type,
                    capacity
                })
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || "Something went wrong.");
                return;
            }
            setSuccess(true);
            setLoading(false);
            setTimeout(() => {
                onClose();
                setSuccess(false);
            }, 2000);   // Show checkmark for 2s before closing modal box.
        } catch (error) {
            console.log(error);
            setError("Network Error. Please try again.");
            setLoading(false);
        };
    };

    return (
        <>
            <div className="vehicle-modal-container">
                <Container className="vehicle-modal-content">
                    <div className="vehicle-header">
                        <span
                            className="close-vehicle-modal-icon"
                            onClick={onClose}
                        >
                            &times;
                        </span>
                    </div>

                    <form>
                        <div>
                            <VStack className="vehicle-modal-inner-content">

                                {/* License Plate */}
                                <Field.Root>
                                    <Field.Label>License Plate</Field.Label>
                                    <Input
                                        placeholder="Enter License Plate"
                                        variant={"outline"}
                                        pl={".9em"}
                                        border={"1px solid"}
                                        borderColor={"#aaa"}
                                        value={license_plate}
                                        onChange={(e) => setLicensePlate(e.target.value)}
                                    />
                                </Field.Root>

                                {/* Model */}
                                <Field.Root>
                                    <Field.Label>Model</Field.Label>
                                    <Input
                                        placeholder="Enter vehicle model"
                                        variant={"outline"}
                                        pl={".9em"}
                                        border={"1px solid"}
                                        borderColor={"#aaa"}
                                        value={model}
                                        onChange={(e) => setModel(e.target.value)}
                                    />
                                </Field.Root>

                                {/* Vehicle Type */}
                                <Field.Root>
                                    <Field.Label>Vehicle Type</Field.Label>
                                    {/* FIXME: Drop down menu, maybe? */}
                                    <Input
                                        placeholder="Enter Vehicle Type"
                                        variant={"outline"}
                                        pl={".9em"}
                                        border={"1px solid"}
                                        borderColor={"#aaa"}
                                        value={vehicle_type}
                                        onChange={(e) => setVehicleType(e.target.value)}
                                    />
                                </Field.Root>

                                {/* Vehicle Capacity in Tonnes */}
                                <Field.Root>
                                    <Field.Label>Capacity</Field.Label>
                                    <Input
                                        placeholder="Enter Capacity"
                                        variant={"outline"}
                                        pl={".9em"}
                                        border={"1px solid"}
                                        borderColor={"#aaa"}
                                        value={capacity}
                                        onChange={(e) => setCapacity(e.target.value)}
                                    />
                                </Field.Root>
                                {error && (
                                    <div
                                        className="form-error"
                                        style={{ color: "red", marginBottom: "0" }}
                                    >
                                        {error}
                                    </div>
                                )}
                                <div className="vehicle-footer">
                                    <button
                                        onClick={handleSubmitVehicleData}
                                        disabled={loading || success}
                                        style={
                                            {
                                                position: "relative",
                                                minWidth: "90px"
                                            }
                                        }
                                    >
                                        {loading ? (
                                            <Spinner size={"sm"} />
                                        ) : success ? (
                                            <Icon as={FaCheckCircle} color={"green.500"} boxSize={5} />
                                        ) : (
                                            "Submit"
                                        )}
                                    </button>
                                </div>
                            </VStack>
                        </div>
                    </form>
                </Container >
            </div >
        </>
    );
};

export default VehicleModal;