// "use client"

// import Image from "next/image"

// import { useState, FormEvent } from 'react';

// const Signup = (): JSX.Element => {
//   const [name, setName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');

  

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;






"use client"

import { useState, FormEvent} from "react";
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
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  

  const handleFnameChange = (event) => {
    setFname(event.target.value);
  };

  const handleLnameChange = (event) => {
    setLname(event.target.value);
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Handle form submission here
  const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({"fname": fname, "lname": lname, "email": email, "password": password }),
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
                  type="Fname"
                  placeholder="First Name"
                  value={fname}
                  onChange={handleFnameChange}
                  className={styles["custom-input"]}
                />
              </FormControl>


              <FormControl>
                <Input
                  type="Lname"
                  placeholder="Last Name"
                  value={lname}
                  onChange={handleLnameChange}
                  className={styles["custom-input"]}
                />
              </FormControl>


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
                {/* <FormHelperText textAlign="left">
                  <Link>Forgot password?</Link>
                </FormHelperText> */}
              </FormControl>


              
              <Button className={styles["custom-acc-button"]}>
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