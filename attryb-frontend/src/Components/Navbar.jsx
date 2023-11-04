import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link,useLocation  } from "react-router-dom";

const Navbar = () => {
    const location = useLocation(); // Get the current location
  const [token, setToken] = useState("");
  useEffect(() => {
    let verifyToken = localStorage.getItem("buyCarToken");
    if(verifyToken){
      setToken(verifyToken);
    }
    else{
      setToken("");
    }
  }, [token]);

  //logout function 
  const handleLogout = () => {
    localStorage.removeItem("buyCarToken");
    localStorage.removeItem("detailsPage");
    setToken("");
  };

  return (
    <div className="navdiv">
      <Box className="navbar">
        <Link to="/home">
          <Box>
            <Text className={location.pathname === '/home' ? 'active-text' : 'text'}>Home</Text>
          </Box>
        </Link>
        {token ? (
          <Box>
            <Text className={location.pathname === '/logout' ? 'active-text' : 'text'} onClick={handleLogout}>Logout</Text>
          </Box>
        ) : (
          <Link to="/login">
            <Box>
              <Text className={location.pathname === '/login' ? 'active-text' : 'text'}>Login</Text>
            </Box>
          </Link>
        )}
        {token ? (
          ""
        ) : (
          <Link to="/">
            <Box>
              <Text className={location.pathname === '/' ? 'active-text' : 'text'}>Signup</Text>
            </Box>
          </Link>
        )}
      </Box>
    </div>
  );
};

export default Navbar;