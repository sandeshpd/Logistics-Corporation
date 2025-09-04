import { useEffect, useState } from "react";
import { Box, For, Icon, Link, Menu, Portal, Text, VStack } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import "../css/Jobs.css";
import "../css/EditJobModal.css";
import EditJobModal from "../components/EditJobModal";

function Jobs() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    async function fetchJobs() {
        try {
            setLoading(true);
            const response = await fetch("http://127.0.0.1:8000/jobs");
            const result = await response.json();

            if (result) {
                setJobs(result);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleEditJob = (job) => {
        setSelectedJob(job);
        setShowModal(!showModal);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedJob(null);
    }

    const handleDeleteJob = async (job) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/jobs/${job.id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setJobs(jobs.filter(j => j.id !== job.id));
                return;
            } else {
                setError("Failed to delete job.");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(
        () => {
            fetchJobs();
        }, []
    );

    if (loading) {
        return (
            <div>
                <h2>
                    Fetching data! Please wait...
                </h2>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <h2>
                    Failed to fetch Jobs. Try again later...
                </h2>
                {console.log(error)}
            </div>
        )
    }

    console.log(jobs);

    return (
        <>
            {/* TODO: Add icons for selecting Edit and Delete items from the list */}
            {jobs != '' ?
                (<VStack>
                    <For each={jobs}>
                        {(job, index) => (
                            <Box border="1px solid #555" key={index} p="4" m={"4"} width="40rem" textAlign="left">
                                <div className="options-container" style={{ float: "right" }}>
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
                                                    <Menu.Item
                                                        value="edit"
                                                        p={".7em"}
                                                        cursor={"pointer"}
                                                        onClick={() => handleEditJob(job)}
                                                    >
                                                        Edit...
                                                    </Menu.Item>
                                                    <Menu.Item
                                                        value="delete"
                                                        p={".7em"}
                                                        cursor={"pointer"}
                                                        color={"fg.error"}
                                                        _hover={{ bg: "bg.error", color: "fg.error" }}
                                                        onClick={() => handleDeleteJob(job)}
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
                                        <div className="edit-job-modal-overlay"></div>
                                        <EditJobModal
                                            isOpen={true}
                                            onClose={handleClose}
                                            job={selectedJob}
                                            onJobUpdated={fetchJobs}
                                        />
                                    </>
                                )}
                                <Text fontWeight="bold" mb="0">{job.description}</Text>
                                <Text color="fg.muted">Driver: {job.driver_id}</Text>
                                <Link href="#">
                                    Read more
                                    <Icon>
                                        <FaLongArrowAltRight />
                                    </Icon>
                                </Link>
                            </Box>
                        )}
                    </For>
                </VStack>
                ) : (
                    <h1>There's nothing to see. Add jobs and you'll see those here.</h1>
                )
            }
        </>
    )
}

export default Jobs;