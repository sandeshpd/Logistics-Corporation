import { Grid, GridItem } from "@chakra-ui/react";
import "../css/Jobs.css";

function Jobs() {
    return (
        <>
            <Grid templateColumns="repeat(3, 1fr)" gap="6" h="100%" w="100%">
                <GridItem
                    backgroundColor="#ccc"
                    border="2px solid black"
                    borderRadius="1rem"
                    placeContent="center"
                >Jobs would display in each box</GridItem>
                <GridItem
                    backgroundColor="#ccc"
                    border="2px solid black"
                    borderRadius="1rem"
                    justifyContent="center"
                    placeContent="center"
                >Jobs would display in each box</GridItem>
                <GridItem
                    backgroundColor="#ccc"
                    border="2px solid black"
                    borderRadius="1rem"
                    justifyContent="center"
                    placeContent="center"
                >Jobs would display in each box</GridItem>
                <GridItem
                    backgroundColor="#ccc"
                    border="2px solid black"
                    borderRadius="1rem"
                    justifyContent="center"
                    placeContent="center"
                >Jobs would display in each box</GridItem>
                <GridItem
                    backgroundColor="#ccc"
                    border="2px solid black"
                    borderRadius="1rem"
                    justifyContent="center"
                    placeContent="center"
                >Jobs would display in each box</GridItem>
                <GridItem
                    backgroundColor="#ccc"
                    border="2px solid black"
                    borderRadius="1rem"
                    justifyContent="center"
                    placeContent="center"
                >Jobs would display in each box</GridItem>
            </Grid>

        </>
    )
}

export default Jobs;