import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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

  const handleLogout = () => {
    localStorage.removeItem("buyCarToken");
    localStorage.removeItem("detailsPage");
    setToken("");
  };

  return (
    <div>
      <Box className="navbar">
        <Link to="/home">
          <Box>
            <Button>Home</Button>
          </Box>
        </Link>
        {token ? (
          <Box>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        ) : (
          <Link to="/login">
            <Box>
              <Button>Login</Button>
            </Box>
          </Link>
        )}
        {token ? (
          ""
        ) : (
          <Link to="/">
            <Box>
              <Button>Signup</Button>
            </Box>
          </Link>
        )}
      </Box>
    </div>
  );
};

export default Navbar;