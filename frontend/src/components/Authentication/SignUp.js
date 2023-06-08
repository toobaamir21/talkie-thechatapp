import { FormControl, FormLabel, Input, InputGroup, Button, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import {useToast} from "@chakra-ui/react";
import {useHistory} from "react-router-dom"
import axios from 'axios'


const SignUp = () => {
    const [show, setshow] = useState(false);
    const [name,setname]=useState()
    const [email,setemail]=useState()
    const [password,setpassword]=useState()
    const [cpass, setcpass] = useState();
    //const [pic, setpic] = useState();
       const [loading, setLoading] = useState(false);
    const toast = useToast()   
    const history = useHistory()

    const handleClick=()=>setshow(!show)
    // const postDetails=(pics)=>{
    //   setLoading(true)
    //   if (pic===undefined) {
    //     toast({
    //       title:"Please select an image",
    //       status:"warning",
    //       duration:5000,
    //       isClosable:true,
    //       position:"bottom"
    //     })
    //     return
    //   }
      
    //      if (pics.type === "image/jpeg" || pics.type === "image/png") {
    //        const data = new FormData();
    //        data.append("file", pics);
    //        data.append("upload_preset", "chat-app");
    //        data.append("cloud_name", "dxtgicfmk");
    //        fetch("https://api.cloudinary.com/v1_1/dxtgicfmk", {
    //          method: "post",
    //          body: data,
    //        })
    //          .then((res) => res.json())
    //          .then((data) => {
    //            setpic(data.url.toString());
    //            console.log(data.url.toString());
    //            setLoading(false);
    //          })
    //          .catch((err) => {
    //            console.log(err);
    //            setLoading(false);
    //          });
    //      } else {
    //        toast({
    //          title: "Please Select an Image!",
    //          status: "warning",
    //          duration: 5000,
    //          isClosable: true,
    //          position: "bottom",
    //        });
    //        setLoading(false);
    //        return;
    //      }

    // }
    const submithandler = async () => {
      setLoading(true);
      if (!name || !email || !password || !cpass) {
        toast({
          title: "Please fill all the fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
      if (password !== cpass) {
        toast({
          title: "Passwords donot match",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
          setLoading(false);
        return;
      }
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/user",
          { name, email, password },
          config
        );

        toast({
          title: "Registration successful",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        history.push("/chats");
      } catch (error) {
        toast({
          title: "An error occured",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    };
     
  return (
    <VStack>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setname(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setemail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="cpassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password again"
            onChange={(e) => setcpass(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* <FormControl id="pic" isRequired>
        <FormLabel>Upload Picture</FormLabel>
        
          <Input
            type="file"
            p={1.5}
            accept='image/*'
            onChange={(e) => postDetails(e.target.files[0])}
          />
      </FormControl> */}
      <Button colorScheme='blue' width="100%" style={{marginTop:15}}
      onClick={submithandler} isLoading={loading}>
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp
