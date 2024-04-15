import React, { useState } from 'react'
import {Box, Button, TextField} from '@mui/material'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Login/Login.css'
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const handleSumbit = (e) => {
        // e.preventDefeault();
        try {
            if(!name){
                toast.error("Please enter name")
            }
            else if(!email){
                toast.error("Please enter email!")
            }else if(!password){
                toast.error("Please enter password!")
            }else if(password.length < 5){
                toast.error("Password characters has been 6+")
            }
            else if(confirmPassword !== password){
                toast.error("Password not confirmed!")
            }
            else{
                axios
                .post("hhttps://insagram-server-2.onrender.com/auth/register",{
                    email:email,
                    name:name,
                    password:password
                })
                .then((res) => {
                    console.log(res);
                    navigate(`/${res.data._id}`);
                }).catch((e) => {
                    console.log(e);
                    toast.error(e.response.data.message)
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Box className='form-box'>
        <ToastContainer/>
        <form className='sign-form' onKeyDown={(e) => e.key === 'Enter' ? handleSumbit : 'ok'}>
            <h2>Create new account</h2>
            <TextField label='Username' onChange={(e) => setName(e.target.value)}/>
            <TextField label='E-mail' onChange={(e) => setEmail(e.target.value)}/>
            <TextField label='Password' type='password' onChange={(e) => setPassword(e.target.value)}/>
            <TextField label='Confirm password' type='password' onChange={(e) => setConfirmPassword(e.target.value)}/>
            <Button variant='contained' onClick={handleSumbit}>Sign up</Button>
            <span>Have any account ? <Link to={'/auth/login'}>Login</Link></span>
        </form>
    </Box>
  )
}

export default Register