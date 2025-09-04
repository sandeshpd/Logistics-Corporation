import { Container, Field, Icon, Input, Spinner, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

function UserModal({ onClose }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // API Integration
    const handleSubmitUserData = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        setSuccess(false);
        
        // POST User to the backend
        try {
            const response = await fetch("http://127.0.0.1:8000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, full_name, role }),
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
            }, 2000);   // Show checkmark for 2s before closing modal box
        } catch (error) {
            console.log(error);
            setError("Network error. Please try again.");
            setLoading(false);
        }
    };

    return (
        <>
            <div className="user-modal-container">
                <Container className="user-modal-content">
                    <div className="user-header">
                        {/* Close icon */}
                        <span
                            className="close-user-modal-icon"
                            onClick={onClose}
                        >
                            &times;
                        </span>
                    </div>

                    <form>
                        <div>
                            <VStack className="user-modal-inner-content">
                                {/* Username field */}
                                <Field.Root>
                                    <Field.Label>Username</Field.Label>
                                    <Input
                                        placeholder="Enter username to assign"
                                        variant={"outline"}
                                        pl={".9em"}
                                        border={"1px solid"}
                                        borderColor={"#aaa"}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Field.Root>

                                {/* Password field */}
                                <Field.Root>
                                    <Field.Label>Password</Field.Label>
                                    <Input
                                        placeholder="Enter password for the user..."
                                        type={"password"}
                                        variant={"outline"}
                                        pl={".9em"}
                                        border={"1px solid"}
                                        borderColor={"#aaa"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Field.Root>

                                {/* User's Full Name field */}
                                <Field.Root>
                                    <Field.Label>Full Name</Field.Label>
                                    <Input
                                        placeholder="Enter full name of the user..."
                                        variant={"outline"}
                                        pl={".9em"}
                                        border={"1px solid"}
                                        borderColor={"#aaa"}
                                        value={full_name}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </Field.Root>

                                {/* User's Role field */}
                                <Field.Root>
                                    <Field.Label>Role</Field.Label>
                                    {/* FIXME: Give Drop down menu instead of Text Input */}
                                    <Input
                                        placeholder="Select role..."
                                        variant={"outline"}
                                        pl={".9em"}
                                        border={"1px solid"}
                                        borderColor={"#aaa"}
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </Field.Root>

                                {/* Errors shall appear here if any */}
                                {error && (
                                    <div className="form-error" style={{ color: "red", marginBottom: "0" }}>
                                        {error}
                                    </div>
                                )}

                                {/* Submit data button */}
                                <div className="user-footer">
                                    <button
                                        onClick={handleSubmitUserData}
                                        disabled={loading || success}
                                        style={
                                            {
                                                position: "relative",
                                                minWidth: "90px",
                                            }
                                        }
                                    >
                                        {loading ? (
                                            <Spinner size="sm" />
                                        ) : success ? (
                                            <Icon as={FaCheckCircle} color={"green.500"} boxSize={5} />
                                        ) : (
                                            "Submit"
                                        )}
                                    </button>
                                </div>
                            </VStack>
                        </div>
                    </form >
                </Container >
            </div>
        </>
    );
};

export default UserModal;