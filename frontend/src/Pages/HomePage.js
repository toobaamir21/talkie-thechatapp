import React, { useEffect } from 'react'
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from '../components/Authentication/Login';
import SignUp from "../components/Authentication/SignUp";
 import { useHistory } from 'react-router-dom';

const HomePage = () => {
    const history = useHistory();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      
      if (user) {
        history.push("/chats");
      }
    }, [history]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        p={4}
        m="40px 0 15px 0"
        bg={"whitesmoke "}
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
        border='0 solid gray'
        boxShadow='.2rem .2rem .5rem .2rem gray'
      >
        <Text
          fontSize="4xl"
          fontWeight={"bold"}
          fontFamily="Work sans"
          color="black"
          textAlign="center"
          m="10px 0 20px 0"
        >
          Talkie
        </Text>
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList mb="1em">
            <Tab width="50%">LogIn</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage
