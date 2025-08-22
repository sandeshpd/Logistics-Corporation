import { useEffect, useState } from "react";
import { Box, For, Icon, Link, Text, VStack } from "@chakra-ui/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import "../css/Jobs.css";

function Jobs() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [jobs, setJobs] = useState([]);

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

    return (
        <>
            {jobs != '' ?
                (<VStack>
                    <For each={jobs}>
                        {(job, index) => (
                            <Box border="1px solid #555" key={index} p="4" width="40rem" textAlign="left">
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