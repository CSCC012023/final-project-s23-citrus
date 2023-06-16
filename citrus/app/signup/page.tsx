
"use client"

import { useState, FormEvent, ChangeEvent} from "react";
import styles from "./signup.module.css";

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
  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Handle form submission here
  const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({"username" : username, "password": password, email: email }),
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
          Sign Up
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
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  className={styles["custom-input"]}
                />
              </FormControl>

              <FormControl>
                <Input
                  type="username"
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
              Create Account
            </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account?{" "}
        <Link color="teal.500" href="#">
          Log In
        </Link>
      </Box>
    </Flex>
  );
};

export default App;
