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
import { useEffect, useRef, useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdCalendar } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Helper function to format date in YYYY-MM-DD (in backend friendly format)
function formatDate(date) {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

function JobModal({ onClose }) {
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
    const [calendar, shwoCalendar] = useState(false);
    const calendarRef = useRef(null);

    // API Integration
    const handleSubmitJobData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError("");

        // POST Job data to the backend
        try {
            const response = await fetch("http://127.0.0.1:8000/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    description,
                    source_location,
                    destination_location,
                    scheduled_time: formatDate(value),  // send formatted data
                    driver_id,
                    vehicle_id
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

    useEffect(
        () => {
            function handleClickOutside(event) {
                if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                    shwoCalendar(false);
                }
            }
            if (calendar) {
                document.addEventListener("mousedown", handleClickOutside);
            } else {
                document.removeEventListener("mousedown", handleClickOutside);
            }

            return () => {
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
                        {/* FIXME: Responsiveness */}
                        <form>
                            <Grid className="modal-inner-content" templateColumns="repeat(2, 1fr)" gap="6">
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>Description</Field.Label>
                                        <Input
                                            placeholder="Enter description"
                                            variant="outline"
                                            pl=".9em"
                                            border="1px solid"
                                            borderColor="#aaa"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Field.Root>
                                </GridItem>
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>Source</Field.Label>
                                        <Input
                                            placeholder="Enter source location"
                                            variant="outline"
                                            pl=".9em"
                                            border="1px solid"
                                            borderColor="#aaa"
                                            value={source_location}
                                            onChange={(e) => setSourceLocation(e.target.value)}
                                        />
                                    </Field.Root>
                                </GridItem>
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>Destination</Field.Label>
                                        <Input
                                            placeholder="Enter destination location"
                                            variant="outline"
                                            pl=".9em"
                                            border="1px solid"
                                            borderColor="#aaa"
                                            value={destination_location}
                                            onChange={(e) => setDestinationLocation(e.target.value)}
                                        />
                                    </Field.Root>
                                </GridItem>
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>Scheduled at</Field.Label>
                                        <InputGroup startElement={<IoMdCalendar style={{ marginLeft: ".4rem" }} />}>
                                            <Input
                                                placeholder="Enter scheduled time"
                                                variant="outline"
                                                border="1px solid"
                                                borderColor="#aaa"
                                                pl="1.4rem"
                                                value={formatDate(value)}
                                                readOnly
                                                onClick={() => shwoCalendar(true)}
                                                // onChange={(e) => setScheduledAt(e.target.value)}
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
                                                        shwoCalendar(false);
                                                    }}
                                                    value={value}
                                                    style={{ margin: "0 auto", backgroundColor: "#fff" }}
                                                />
                                            </div>
                                        )}
                                    </Field.Root>
                                </GridItem>
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>
                                            Assigned Driver
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
                                                            User can be associated using his/her id only
                                                            for now.
                                                            So you have to know it's associated id
                                                            before assigning a driver to this job.
                                                            Assigning directly using a name feature
                                                            may get implemeneted in future updates.
                                                        </Text>
                                                    </HoverCard.Content>
                                                </HoverCard.Positioner>
                                            </HoverCard.Root>
                                        </Field.Label>
                                        <Input
                                            placeholder="Enter assigned driver"
                                            variant="outline"
                                            pl=".9em"
                                            border="1px solid"
                                            borderColor="#aaa"
                                            value={driver_id}
                                            onChange={(e) => setAssignedDriver(e.target.value)}
                                        />
                                    </Field.Root>
                                </GridItem>
                                <GridItem>
                                    <Field.Root>
                                        <Field.Label>Assigned Vehicle</Field.Label>
                                        <Input
                                            placeholder="Enter assigned vehicle"
                                            variant="outline"
                                            pl=".9em"
                                            border="1px solid"
                                            borderColor="#aaa"
                                            value={vehicle_id}
                                            onChange={(e) => setAssignedVehicle(e.target.value)}
                                        />
                                    </Field.Root>
                                </GridItem>
                            </Grid>
                        </form>
                        {error && (
                            <div
                                className="form-error"
                                style={{ color: "red", marginBottom: "0" }}
                            >
                                {error}
                            </div>
                        )}
                        <div className="footer">
                            <button
                                onClick={handleSubmitJobData}
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
                    </div>
                </Container>
            </div>
        </>
    );
};

export default JobModal;