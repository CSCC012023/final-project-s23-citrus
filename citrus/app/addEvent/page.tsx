"use client"

import { useState, FormEvent, ChangeEvent} from "react";
import styles from "./addevent.module.css";

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
  const [capacity, setCapacity] = useState(0);
  const [start_time, setStart] = useState("");
  const [end_time, setEnd] = useState("");
  const [category, setCategory] = useState("");
//   const [tags, setTags] = useState("");
  const [attendees, setAttendees] = useState("");
  const [org_id, set_org_id] = useState("");
  const [user_id, set_user_id] = useState("");
  

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleCapacityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setCapacity(value);
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

//   const handleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setTags(event.target.value);
//   };

  const handleAttendeeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAttendees(event.target.value);
  };

  const handleOrgIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    set_org_id(event.target.value);
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    set_user_id(event.target.value);
  };


const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Handle form submission here
  const res = await fetch(process.env.BASE_API_URL + '/api/experiences', {
      method: 'POST',
      body: JSON.stringify({"name" : name, "description": description, "location": location, 
      "capacity": capacity, "start" : start_time, "end": end_time, "category": category, "org_id": org_id, 
      "user_id": user_id, "attendees": attendees}),
  });
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
                  placeholder="Name"
                  value={name}
                  onChange={handleNameChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="description"
                  placeholder="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="location"
                  placeholder="Location"
                  value={location}
                  onChange={handleLocationChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="capacity"
                  placeholder="Capacity"
                  value={capacity}
                  onChange={handleCapacityChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="start"
                  placeholder="Start Date"
                  value={start_time}
                  onChange={handleStartChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="end"
                  placeholder="End Date"
                  value={end_time}
                  onChange={handleEndChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="category"
                  placeholder="Category"
                  value={category}
                  onChange={handleCategoryChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="attendees"
                  placeholder="Attendees"
                  value={attendees}
                  onChange={handleAttendeeChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                    type="org_id"
                    placeholder="Organization Id"
                    value={org_id}
                    onChange={handleOrgIdChange}
                    className={styles["custom-input"]}
                    />             
              </FormControl>

              <FormControl>
                <Input
                    type="user_id"
                    placeholder="User Id"
                    value={user_id}
                    onChange={handleUserIdChange}
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