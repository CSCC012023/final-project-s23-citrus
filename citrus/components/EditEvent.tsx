"use client"

import { useState, FormEvent, ChangeEvent} from "react";
import styles from "@/app/(organizers)/organizer/create/create.module.css";
import { useSession } from 'next-auth/react'
import { usePathname } from "next/navigation";
import type { experiences } from '@prisma/client';
import "@/lib/patch"

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
import exp from "constants";


export default function EditEvent(value: {experience: experiences}) {
  const startTimeString = (value.experience.start as Date).toString();
  const endTimeString = (value.experience.end as Date).toString();

  // Remove the Z at the end of the string
  const startTime = startTimeString.substring(0, startTimeString.length - 1);
  const endTime = endTimeString.substring(0, endTimeString.length - 1);

  // Build the tags string
  var tagsString = (value.experience.tags as string[]).join(",");

  const [name, setName] = useState(value.experience.name);
  const [description, setDescription] = useState(value.experience.description);
  const [capacity, setCapacity] = useState(value.experience.capacity);
  const [location, setLocation] = useState(value.experience.location);
  const [start, setStart] = useState(startTime);
  const [end, setEnd] = useState(endTime);
  const [category, setCategory] = useState(value.experience.category);
  const [tags, setTags] = useState(tagsString);
 

  const { data: session } = useSession();
  const path = usePathname();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleCapacityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCapacity(BigInt(event.target.value));
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
    // Handle form submission here
    const res = await fetch('/api/experiences/' + value.experience.id, {
        method: 'PUT',
        body: JSON.stringify({"name" : name, "description": description, "capacity": Number(capacity), "location": location,
          "start": new Date(start), "end": new Date(end), "category": category, "tags": tags.split(",") }),
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
                    placeholder={name}
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
                    value={capacity.toString()}
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
