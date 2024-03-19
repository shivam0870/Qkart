import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";


// curl command to send login request to backend with a registered user and incorrect password: 
// curl -X POST -H "Content-Type: application/json" -d '{"username":"papa877", "password":"your_password"}' http://13.126.185.48:8082/api/v1/auth/login

const Login = () => {
    ////maintained a state for formData
    const { enqueueSnackbar } = useSnackbar();
    let history=useHistory();
    const[formData, setformData]=useState({});
    const[isLoading,setISloading]=useState(false);
    const handleChange=(e)=>{
  
      // console.log("name and value");
      // console.log(e.target.name);
      // console.log(e.target.value);
  
      let name=e.target.name;
      let value=e.target.value;
  
      setformData((prevState)=>({...prevState,[name]: value}));
  
    };
  

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (formData) => {
    

    
     if(validateInput(formData)===false){
      return;
    }

  
    setISloading(true);
    try {
      const data={
        username:formData.username,
        password:formData.password
       };
      
      let response = await axios.post(`${config.endpoint}/auth/login`, data);
    //  console.log(response);
      
     persistLogin(response.data.token,response.data.username,response.data.balance);
     //Redirect to products page
     history.push("/");
     //Form reset
     setformData({
       username: "",
       password: "",
     });

      if (response.data.success) {
        // Registration successful (status code 201)
        // console.log('Registration successful');
        enqueueSnackbar("Logged in successfully", { variant: 'success' });
      }
        
      }
     catch (error) {
      // console.log(error.response); //observe this to find all the fields
      if(error.response.status===400)
      {
        enqueueSnackbar(error.response.data.message , { variant: 'error' });
      }
      else{
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", 
      {
        variant: 'error',
      });

      }
      
    }
    setISloading(false);
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    if(!data.username){
      enqueueSnackbar("Username is a required field", 
      {
        variant: 'warning',
      });
      return false;
    }

      if(!data.password){
        enqueueSnackbar("Password is a required field", 
        {
          variant: 'warning',
        });
        return false;
      }
      return true;

  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    console.log("token :",token);
    
    // const userObj={
    //   "username": username,
    //   "token": token,
    //   "balance": balance
    // }
    // window.localStorage.setItem("userObj", JSON.stringify(userObj));
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('balance', balance);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
        <h2 className="title">Login</h2>
            <TextField
              id="username"
              label="username"
              variant="outlined"
              title="Username"
              name="username"
              placeholder="Username"
              fullWidth
              value={formData.username || ""}
              onChange={(e)=>handleChange(e)}
            />
            <TextField
              id="password"
              variant="outlined"
              label="password"
              name="password"
              type="password"
              //helperText="Password must be atleast 6 characters length"
              fullWidth
              placeholder="Password"
              value={formData.password || ""}
              onChange={(e)=>handleChange(e)}
            />
            {isLoading?(
              <Box display="flex" alignItems="center" justifyContent="center">
               <CircularProgress color="success" size={30}/>
             </Box>
            ):(
              <Button className="button" variant="contained" onClick={async () => {
                await login(formData);}}>
            LOGIN TO QKART
               </Button>
            )}
             
            <p className="secondary-action">
            Don’t have an account?{" "}
                <a className="link" href="/register">
               Register now
               </a>
             
            </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;






