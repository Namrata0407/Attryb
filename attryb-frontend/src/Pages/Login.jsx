import { Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [obj, setObj] = useState({ email: "", password: "" });
  const nav = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setObj({ ...obj, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.email == "" || obj.password == "") {
      toast({
        title: "Please fill all fields.",
        description: "All fields are mandatory",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position:"top"

      });
    } else {
      loginUser();
    }
  };

  const loginUser = async () => {
    try {
      console.log(obj);
      let res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, obj);
      if (res.data.message == "login Successful") {
        toast({
          title: "Login Successfully",
          description: "Success",
          status: "success",
          duration: 2000,
          isClosable: true,
          position:"top"

        });
        localStorage.setItem("buyCarToken", res.data.token);
        setObj({ email: "", password: "" });
        nav("/home");
      } else if (res.data.message == "Invalid Credentials") {
        toast({
          title: "Login Failed",
          description: `${res.data.message}`,
          status: "error",
          duration: 2000,
          isClosable: true,
          position:"top"

        });
      }
    } catch (error) {
      toast({
        title: "Login Failed.",
        description: "Login error",
        status: "error",
        duration: 2000,
        isClosable: true,
        position:"top"

      });
      console.log(error.message);
    }
  };

 

  return (
    <div>
      <Heading className="Heading">Login Form</Heading>
      <div className="formBox">
        <form onSubmit={handleSubmit}>
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
          <Link to="/">
            {"Don't have account?"} <span className="login_link">Click</span>
          </Link>
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;