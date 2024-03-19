import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useHistory, Link } from "react-router-dom";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  // console.log("children :");
  // console.log(children);

  //get username form local storage
  var username = localStorage.getItem("username");
  // console.log(username);

  //use useHistory for navigation
  let history = useHistory();

  // Logout btn handler
  let handleLogout = () => {
      //Redirect to same page - /products
      history.push("/");
      //Refresh the page
      history.go();
      //Remove all items
      localStorage.clear();
    };

  //1. for register and login pages show "back to explore box", use hasHiddenAuthButtons to check if you are on regisetr/login page, true means you are on login/regiser
  //2. for logged out view (ie. Header view for Products page ), show register and login box in header, see images
  //3. for logged in view (ie. Header view for Products page), show user icon, username form local storage and logout option

  return (
    <Box className="header">
      <Box className="header-title">
        <Link to="/">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Link>
      </Box>
      
      {hasHiddenAuthButtons ? (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
        >
            Back to explore         
        </Button>
      ) : !username ? (
        <>
        <Box width="30vw">{children && children}</Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            className="header-title"
            variant="text"
            onClick={() => {
              history.push("/login");
            }}
          >
            {/* <Link to="/login">LOGIN</Link> : this will fail the test cases  but its fine to use that*/}
            Login
          </Button>
          <Button
            className="header-title"
            variant="contained"
            onClick={() => {
              history.push("/register");
            }}
          >
            Register
          </Button>
        </Stack>
        </>
      ) : (
        <>
        <Box width="30vw">{children && children}</Box>
        <Stack direction="row" spacing={1} alignItems="center">
           {/* <img src="avatar.png" alt={username}>Text</img> */}
           <Avatar alt={username} src="./" />
           <p>{username}</p>
           <Button
            className="header-title"
            variant="text"
            onClick={() => {
              handleLogout()
            }}
          >
            Logout
          </Button>
        </Stack>
        </>
      )}
    </Box>
  );
};

export default Header;
