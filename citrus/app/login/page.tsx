"use client"

import { ChangeEvent, useState } from "react";
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

const App = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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
        <Avatar
            className={`${styles["custom-box"]} ${styles["custom-avatar"]} ${styles["custom-avatar-container"]}`} 
        />
        <Heading 
            className={styles["custom-heading"]} textAlign="center">
          Welcome
        </Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
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
                <FormHelperText textAlign="left">
                  <Link>Forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button className={styles["custom-login-button"]}>
              Login
            </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Don't have an account?{" "}
        <Link color="teal.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default App;
