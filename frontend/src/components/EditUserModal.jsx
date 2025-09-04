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
import "../css/EditUserModal.css";

function EditUserModal({ isOpen, onClose, user, onUserUpdated }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // API Integration
    const handleSubmitUserData = async(e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        setSuccess(false);

        try {
            const response = await fetch(`http://127.0.0.1:8000/users/${user.id}`, {
                method:"PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username,
                    password,
                    full_name,
                    role
                })
            });

            if(!response.ok) {
                const data = await response.json();
                setError(data.message || "Failed to submit data.");
                setLoading(false);
                return;
            }
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                onUserUpdated();
                onClose();
            }, 2000);
        } catch (error) {
            console.log(error);
            setError("Network error. Please try again later...");
            setLoading(false);
        }
    };

    return (
        <>
            <div className="modal-container">
                <Container className="edit-user-modal-content">
                    <div className="header">
                        <span
                            className="close-edit-user-modal-icon"
                            onClick={onClose}
                            style={{float: "right", fontSize:"40px", cursor: "pointer"}}
                        >
                            &times;
                        </span>
                    </div>
                    <form>
                        <h3>Edit User</h3>
                        <div>
                            <VStack className="edit-user-modal-inner-content">
                                {/* Username */}
                                <Field.Root>
                                    <Field.Label>Username</Field.Label>
                                    <Input
                                        placeholder="Edit username"
                                        variant={"outline"}
                                        pl={".9em"}
                                        border={"1px solid"}
                                        borderColor={"#aaa"}
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Field.Root>

                                {/* Password */}
                                <Field.Root>
                                    <Field.Label>Password</Field.Label>
                                    <Input
                                        placeholder="Reset password for the user..."
                                        type={"password"}
                                        variant={"outline"}
                                        pl={".9em"}
                                        border={"1px solid"}
                                        borderColor={"#aaa"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Field.Root>

                                {/* Full name */}
                                <Field.Root>
                                    <Field.Label>Full Name</Field.Label>
                                    <Input
                                        placeholder="Edit full name of the user..."
                                        variant={"outline"}
                                        pl={".9em"}
                                        border={"1px solid"}
                                        borderColor={"#aaa"}
                                        value={full_name}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </Field.Root>

                                {/* Role */}
                                <Field.Root>
                                    <Field.Label>Role</Field.Label>
                                    {/* FIXME: Give Drop down menu instead of Text Input */}
                                    <Input
                                        placeholder="Edit role..."
                                        variant={"outline"}
                                        pl={".9em"}
                                        border={"1px solid"}
                                        borderColor={"#aaa"}
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </Field.Root>
                                {/* Error indicator if any error hits */}
                                {error && (
                                    <div className="form-error" style={{ color: "red", marginBottom: "0" }}>
                                        {error}
                                    </div>
                                )}
                                {/* "Save changes" button */}
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

export default EditUserModal;