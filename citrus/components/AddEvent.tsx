"use client"

import { useState, FormEvent, ChangeEvent} from "react";
import styles from "@/app/(organizers)/organizer/create/create.module.css";
import { useSession, signIn, signOut } from 'next-auth/react'
import { usePathname } from "next/navigation";

import {
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  Box,
  FormControl,
  Textarea,
} from "@chakra-ui/react";


export default function AddEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  const { data: session } = useSession();
  const path = usePathname();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleCapacityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCapacity(event.target.value);
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
    e.preventDefault();
    const organizer_fields = {
      "org_id": path.includes("organizer") ? session?.user?.name : null,
      "user_id": path.includes("organizer") ? null : session?.user?.name
    }
    // Handle form submission here
    const res = await fetch('/api/experiences', {
        method: 'POST',
        body: JSON.stringify({"name" : name, "description": description, "capacity": parseInt(capacity), "location": location,
          "start_time": start, "end_time": end, "category": category, "tags": tags.split(","), ...organizer_fields }),
    });
  };

  if (!session) {
    return (<div>
              <p>You must be logged in to create an event.</p>
              <li>
                <a href={path.includes("organizer") ? "/organizer/login": "/login"}>Login</a>
              </li>
            </div>
    )
  } else {
    return (
      <Flex
      className={styles["custom-background"] + " h-full w-full"}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
        spacing={4}
        p="1rem"
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
        className={styles["custom-box"] + " w-9/12"}
        >
          <Heading className={styles["custom-heading"]} textAlign="center">
            Create Event
          </Heading>
          <Box className="w-full">
            <form onSubmit={handleSubmit} className="w-full">
              <Stack
                className="w-full justify-items-center flex"
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
              >
                <h2>Event name</h2>
                <FormControl className="w-8/12 mx-auto">
                  <Input
                    type="text"
                    placeholder="Event Name"
                    value={name}
                    onChange={handleNameChange}
                    className={styles["custom-input"] + " w-full"}
                  />
                </FormControl>

                <h2>Event description</h2>
                <FormControl className="w-9/12 mx-auto">
                  <Textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    className={styles["custom-input"] + " w-full resize-y"}
                  />
                </FormControl>

                <h2>Event capacity</h2>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Event Capacity"
                    value={capacity}
                    onChange={handleCapacityChange}
                    className={styles["custom-input"]}
                  />
                </FormControl>

                <h2>Event location</h2>
                <FormControl className="w-7/12 mx-auto">
                  <Input
                    type="location"
                    placeholder="Event Location"
                    value={location}
                    onChange={handleLocationChange}
                    className={styles["custom-input"] + " w-full"}
                  />
                </FormControl>

                <h2>Event start and end time</h2>
                <FormControl>
                  <Input
                    type="datetime-local"
                    placeholder="Event Start Time"
                    value={start}
                    onChange={handleStartChange}
                    className={styles["custom-input"]}
                  />
                </FormControl>

                <FormControl>
                  <Input
                    type="datetime-local"
                    placeholder="Event End Time"
                    value={end}
                    onChange={handleEndChange}
                    className={styles["custom-input"]}
                  />
                </FormControl>

                <h2>Event category</h2>
                <FormControl>
                  <Input
                    type="category"
                    placeholder="Event Category"
                    value={category}
                    onChange={handleCategoryChange}
                    className={styles["custom-input"]}
                  />
                </FormControl>

                <h2>Event tags (must be comma-separated)</h2>
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
  }
};
