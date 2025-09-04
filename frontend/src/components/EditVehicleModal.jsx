import {
    Container,
    Field,
    Icon,
    Input,
    Spinner,
    VStack
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import "../css/EditVehicleModal.css";
import { useState } from "react";

function EditVehicleModal({ onClose, vehicle, onVehicleUpdated }) {
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
        setError("");
        setLoading(true);
        setSuccess(false);

        try {
            const response = await fetch(`http://127.0.0.1:8000/vehicles/${vehicle.id}`, {
                method: "PUT",
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
                setError(data.message || "Failed to submit data.");
                setLoading(false);
                return;
            }

            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                onVehicleUpdated();
                onClose();
            }, 2000);
        } catch (error) {
            console.log(error);
            setError("Network Error. Please try again later...");
            setLoading(false);
        }
    };

    return (
        <>
            <div className="modal-container">
                <Container className="edit-vehicle-modal-content">
                    <div className="header">
                        <span
                            className="close-edit-vehicle-modal-icon"
                            onClick={onClose}
                            style={{ float: "right", fontSize: "40px", cursor: "pointer" }}
                        >
                            &times;
                        </span>
                    </div>
                    <form>
                        <h3>Edit Vehicle</h3>
                        <div>
                            <VStack className="edit-vehicle-modal-inner-content">
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
                                <Field.Root>
                                    <Field.Label>Vehicle Type</Field.Label>
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
                                {/* Error indicator in case of any errors hit */}
                                {error && (
                                    <div className="form-error" style={{ color: "red", marginBottom: "0" }}>
                                        {error}
                                    </div>
                                )}
                                <div className="vehicle-footer">
                                    <button
                                        onClick={handleSubmitVehicleData}
                                        disabled={loading || success}
                                        style={{
                                            position: "relative",
                                            minWidth: "90px"
                                        }}
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
                </Container>
            </div>
        </>
    );
};

export default EditVehicleModal;