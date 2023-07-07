
"use client"

import { useState, FormEvent, ChangeEvent} from "react";
import { signIn } from 'next-auth/react'
import styles from "./login.module.css";

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
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    signIn('user-credentials', {username: username, password: password, callbackUrl: '/'})
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
          User Log-in
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
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={styles["custom-input"]}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>

              </FormControl>

              <Button type="submit" className={styles["custom-acc-button"]}>
                Log in
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Don`&apos;`t have an account?{" "}
        <Link color="teal.500" href="/signup">
          Sign up
        </Link>
      </Box>
    </Flex>
  );
};

export default App;
