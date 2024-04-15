import React, { useState } from 'react'
import {Box, Button, TextField} from '@mui/material'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleSumbit = (e) => {
        // e.preventDefeault();
        try {
            if(!email){
                toast.error("Please enter email")
            }else if(!password){
                toast.error("Please enter password")
            }
            else{
                axios
                .post("https://insagram-server-2.onrender.com/auth/login",{
                    email:email,
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
            <h2>Sign in to account</h2>
            <TextField label='E-mail' onChange={(e) => setEmail(e.target.value)}/>
            <TextField label='Password' type='password' onChange={(e) => setPassword(e.target.value)}/>
            <Button variant='contained' onClick={handleSumbit}>Sign in</Button>
            <span>Don't have  a account ? <Link to={'/auth/register'}>Register</Link></span>
        </form>
    </Box>
  )
}

export default Login