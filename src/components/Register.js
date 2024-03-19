import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {

  let history =useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [username,updateUserName]=useState("");
  const [password,updatePassword]=useState("");
  const [confirmPassword,updateConfirmPasswrod]=useState("");
  const [loader,updateLoader]=useState(false);
  ////maintained a state for formData
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

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  //  let data={
  //   "username":username,
  //   "password":password,
  //   "confirmPassword":confirmPassword
  // }

  // const eventHandler=()=>{
  //     {validateInput(data) && register(data) }
  // }
  const register = async (formData) => {
    if(validateInput(formData)===false){
      return;
    }
  
    setISloading(true);
    try {
      const data={
        username:formData.username,
        password:formData.password
       }
  
      let response = await axios.post(`${config.endpoint}/auth/register`, data);
    //  console.log(response);
    history.push("/login");

    //Form reset
    setformData({
      username: "",
      password: "",
      confirmPassword: "",
    });

      if (response.data.success) {
        // Registration successful (status code 201)
        // console.log('Registration successful');
        enqueueSnackbar("Registered successfully", { variant: 'success' });
         //should have used  history.push(()=>("/login")); , doing jsut for test cases

      }
        
      }
     catch (error) {
      console.log(error.response); //observe this to find all the fields
      if(error.response && error.response.status===400)
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

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */


   const validateInput = (data) => {

    if(!data.username){
      enqueueSnackbar("Username is a required field", 
      {
        variant: 'warning',
      });
      return false;
    }
      if(data.username.length<6 ){
        enqueueSnackbar("Username must be at least 6 characters", 
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
        if(data.password.length<6 ){
          enqueueSnackbar("Password must be at least 6 characters", 
          {
            variant: 'warning',
          });
          return false;
        }
    if(data.password!==data.confirmPassword){
      enqueueSnackbar("Passwords do not match", 
          {
            variant: 'warning',
          });
          return false;
    }
    return true;

    }


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
              <h2 className="title">Register</h2>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                title="Username"
                name="username"
                placeholder="Enter Username"
                fullWidth
                value={formData.username || ""}
                onChange={(e)=>handleChange(e)}
              />
              <TextField
                id="password"
                variant="outlined"
                label="Password"
                name="password"
                type="password"
                helperText="Password must be atleast 6 characters length"
                fullWidth
                placeholder="Enter a password with minimum 6 characters"
                value={formData.password || ""}
                onChange={(e)=>handleChange(e)}
              />
              <TextField
                id="confirmPassword"
                variant="outlined"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                value={formData.confirmPassword || ""}
                onChange={(e)=>handleChange(e)}
              />
              {isLoading?(
                <Box display="flex" justifyContentalignItems="center" justifyContent="center">
                 <CircularProgress color="success" size={30}/>
               </Box>
              ):(
                <Button className="button" variant="contained" onClick={async () => {
                  await register(formData);}}>
              Register Now
                 </Button>
              )}
               
              <p className="secondary-action">
                Already have an account?{" "}
                 <a className="link" href="/login">
                  Login here
                 </a>
              </p>
            </Stack>
            </Box>
          <Footer />
          
            
          
        </Box>
  
       
   
    );
  };
  
  export default Register;
