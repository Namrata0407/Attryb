import { Heading, Text } from '@chakra-ui/react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import axios from "axios"

const Signup = () => {
  const [obj, setObj] = useState({ name:"", email: "", password: "" });
  const nav = useNavigate();
  const toast = useToast()

  const handleChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.name=="" || obj.email == "" || obj.password == "") {
      toast({
        title: 'Please fill all fields.',
        description: "All fields are mandatory",
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position:"top"

      })
    } else {  
       registeruser()
      
    }
  };

  const registeruser = async()=>{
  
   try {
    let res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/register`,obj);
    if(res.data.message == "Dealer regestred successfully"){
      toast({
        title: 'Registered Successfully',
        description: "Success",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position:"top"
      })
      setObj({ name:"", email: "", password: "" })
     nav("/login")
    }
   
   } catch (error) {
    toast({
      title: 'Registration Failed.',
      description: "This email already exists",
      status: 'error',
      duration: 2000,
      isClosable: true,
      position:"top"

    })
   }
  }

  return (
    <div className="signup-page">
     <Heading className="Heading">Signup Form</Heading>
     <Text className='textt' fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
      <div className="formBox">
      
        <form onSubmit={handleSubmit}>
        <label>Enter Name</label>
          <br />
          <input
            type="text"
            value={obj.name}
            placeholder="Enter name"
            name="name"
            onChange={handleChange}
          />
          <br />
          <label>Enter Email</label>
          <br />
          <input
            type="email"
            value={obj.email}
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
          <br />
          <label>Enter Password</label>
          <br />
          <input
            type="password"
            value={obj.password}
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />
          <br />
          <Link to="/login" >Already have account? <span className='login_link' >Click</span></Link>
          <input type="submit" value="Register" />
        </form>

        
      </div>
    </div>
  );
}

export default Signup