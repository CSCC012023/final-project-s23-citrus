
"use client"

import { useState, FormEvent, ChangeEvent} from "react";
import styles from "./create.module.css";

import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";


const App = (): JSX.Element => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleStartChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStart(event.target.value);
  };

  const handleEndChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnd(event.target.value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleTagsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("submitting");
    e.preventDefault();

    // Handle form submission here
    const res = await fetch('/api/experiences', {
        method: 'POST',
        body: JSON.stringify({"name" : name, "description": description, "location": location, 
          "start_time": start, "end_time": end, "category": category, "tags": tags }),
    });
    console.log(res);
  };

  return (
    <Flex
     className={styles["custom-background"]}
      flexDirection="column"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
      spacing={4}
      p="1rem"
      backgroundColor="whiteAlpha.900"
      boxShadow="md"
      className={styles["custom-box"]}
      >
        {/* <Avatar
        className={`${styles["custom-box"]} ${styles["custom-avatar"]}`}
        /> */}
        {/* <Heading color="teal.400" fontSize="4xl"> */}
        <Heading className={styles["custom-heading"]} textAlign="center">
          Create Event
        </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit}>
            <Stack
              className={styles["custom-avatar-container"]} // Apply the custom CSS class
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
            >

              <FormControl>
                <Input
                  type="name"
                  placeholder="Event Name"
                  value={name}
                  onChange={handleNameChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="description"
                  placeholder="Event Description"
                  value={description}
                  onChange={handleDescriptionChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="location"
                  placeholder="Event Location"
                  value={location}
                  onChange={handleLocationChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="start"
                  placeholder="Event Start Time"
                  value={start}
                  onChange={handleStartChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="end"
                  placeholder="Event End Time"
                  value={end}
                  onChange={handleEndChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="category"
                  placeholder="Event Category"
                  value={category}
                  onChange={handleCategoryChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="tags"
                  placeholder="Event Tags"
                  value={tags}
                  onChange={handleTagsChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <Button type="submit" className={styles["custom-acc-button"]}>
                Create Event
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default App;
