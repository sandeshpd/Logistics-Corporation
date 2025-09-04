import { useEffect, useState, useRef } from "react";
import {
    Container,
    Field,
    Grid,
    GridItem,
    HoverCard,
    Icon,
    Input,
    InputGroup,
    Spinner,
    Text
} from "@chakra-ui/react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdCalendar } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../css/EditJobModal.css";

// Helper function to format date in YYYY-MM-DD (backend friendly format)
function formatDate(date) {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

function EditJobModal({ isOpen, onClose, job, onJobUpdated }) {
    const [description, setDescription] = useState("");
    const [source_location, setSourceLocation] = useState("");
    const [destination_location, setDestinationLocation] = useState("");
    const [driver_id, setAssignedDriver] = useState("");
    const [vehicle_id, setAssignedVehicle] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, onChange] = useState(new Date());
    const [calendar, showCalendar] = useState(false);
    const calendarRef = useRef(null);

    // API Integration
    const handleSaveChanges = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        setSuccess(false);

        // PUT modified Job data to the backend
        try {
            const response = await fetch(`http://127.0.0.1:8000/jobs/${job.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description,
                    source_location,
                    destination_location,
                    scheduled_time: formatDate(value),
                    driver_id,
                    vehicle_id
                })
            });

            // If failed to fetch API, then execute this
            if(!response.ok) {
                const data = await response.json();
                setError(data.message || "Failed to load data.");
                return;
            }
            
            setSuccess(true);
            setLoading(false);
            setTimeout(() => {
                onJobUpdated();
                onClose();
                setSuccess(false);
            }, 2000);
        } catch (error) {
            console.log(error);
            setError("Network error. Please try again later...");
            setLoading(false);
        }
    };

    useEffect(
        () => {
            function handleClickOutside(event) {
                if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                    showCalendar(false);
                }
            }

            if (calendar) {
                document.addEventListener("mousedown", handleClickOutside);
            } else {
                document.removeEventListener("mousedown", handleClickOutside);
            }
        }, [calendar]
    );

    return (
        <>
            <div className="modal-container">
                <Container className="modal-content">
                    <div className="header">
                        <span
                            className="close-modal-icon"
                            onClick={onClose}
                        >&times;</span>
                    </div>
                    <div>
                        <form>
                            <h3>Edit job</h3>
                            <Grid className="modal-main-content" templateColumns={"repeat(2, 1fr)"} gap={6}>
                                
                                {/* Edit Job Description */}
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>Description</Field.Label>
                                        <Input
                                            placeholder="Enter description"
                                            variant={"outline"}
                                            pl={".9em"}
                                            border={"1px solid"}
                                            borderColor={"#aaa"}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Field.Root>
                                </GridItem>

                                {/* Edit Source Location */}
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>Source</Field.Label>
                                        <Input
                                            placeholder="Enter source location"
                                            variant={"outline"}
                                            pl={".9em"}
                                            border={"1px solid"}
                                            borderColor={"#aaa"}
                                            value={source_location}
                                            onChange={(e) => setSourceLocation(e.target.value)}
                                        />
                                    </Field.Root>
                                </GridItem>

                                {/* Edit Destination Location */}
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>Destination</Field.Label>
                                        <Input
                                            placeholder="Enter destination location"
                                            variant={"outline"}
                                            pl={".9em"}
                                            border={"1px solid"}
                                            borderColor={"#aaa"}
                                            value={destination_location}
                                            onChange={(e) => setDestinationLocation(e.target.value)}
                                        />
                                    </Field.Root>
                                </GridItem>

                                {/* Edit Scheduled Time */}
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>Scheduled Time</Field.Label>
                                        <InputGroup startElement={<IoMdCalendar style={{ marginLeft: ".4rem" }} />}>
                                            <Input
                                                placeholder="Enter scheduled time"
                                                variant={"outline"}
                                                pl={".9em"}
                                                border={"1px solid"}
                                                borderColor={"#aaa"}
                                                value={formatDate(value)}
                                                // onChange={(e) => setScheduledTime(e.target.value)}
                                                onClick={() => showCalendar(true)}
                                            />
                                        </InputGroup>
                                        {calendar && (
                                            <div
                                                ref={calendarRef}
                                                style={{
                                                    display: "flex",
                                                    position: "absolute",
                                                    zIndex: "9999",
                                                    width: "20rem",
                                                    margin: "4rem auto"
                                                }}
                                            >
                                                <Calendar
                                                    onChange={(date) => {
                                                        onChange(date);
                                                        showCalendar(false);
                                                    }}
                                                    value={value}
                                                    style={{ margin: "0 auto", backgroundColor: "#fff" }}
                                                />
                                            </div>
                                        )}
                                    </Field.Root>
                                </GridItem>

                                {/* Edit Assigned Driver */}
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>
                                            Assiged Driver
                                            <HoverCard.Root
                                                positioning={{ placement: "right" }}
                                                size="sm"
                                                open={open}
                                                onOpenChange={(e) => setOpen(e.open)}
                                            >
                                                <HoverCard.Trigger asChild>
                                                    <Icon size="xs" color="#888" ml={"4px"}>
                                                        <BsFillInfoCircleFill />
                                                    </Icon>
                                                </HoverCard.Trigger>
                                                <HoverCard.Positioner>
                                                    <HoverCard.Content colorPalette={"gray"}>
                                                        <HoverCard.Arrow />
                                                        <Text textStyle="sm" color="fg.muted" p="9px">
                                                            User can be edited using his/her id only
                                                            for now.
                                                            So you have to know it's associated id
                                                            before editing this data.
                                                            Editing directly using a name feature
                                                            may get implemeneted in future updates.
                                                        </Text>
                                                    </HoverCard.Content>
                                                </HoverCard.Positioner>
                                            </HoverCard.Root>
                                        </Field.Label>
                                        <Input
                                            placeholder="Assign driver by id"
                                            variant={"outline"}
                                            pl={".9em"}
                                            border={"1px solid"}
                                            borderColor={"#aaa"}
                                            value={driver_id}
                                            onChange={(e) => setAssignedDriver(e.target.value)}
                                        />
                                    </Field.Root>
                                </GridItem>

                                {/* Edit Assigned Vehicle */}
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>Assigned Vehicle</Field.Label>
                                        <Input
                                            placeholder="Assign vehicle by id"
                                            variant={"outline"}
                                            pl={".9em"}
                                            border={"1px solid"}
                                            borderColor={"#aaa"}
                                            value={vehicle_id}
                                            onChange={(e) => setAssignedVehicle(e.target.value)}
                                        />
                                    </Field.Root>
                                </GridItem>
                            </Grid>
                        </form>
                        {/* Error indicator in case of any Error hits */}
                        {error ? (
                            <div
                                className="form-error"
                                style={{ color: "red", marginBottom: "0" }}
                            >
                                {error}
                            </div>
                        ) : (null)}

                        <div className="footer">
                            {/* Submit button to save changes */}
                            <button
                                onClick={handleSaveChanges}
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
                    </div>
                </Container>
            </div>
        </>
    );
};

export default EditJobModal;