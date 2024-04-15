import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { Modal } from 'react-bulma-components'
import {toast,ToastContainer} from 'react-toastify'
import axios from 'axios'
const ProfileEdit = ({showB,setShowB,id}) => {
    const handleClose = () => {
        setShowB(false);
    }
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [bio,setBio] = useState("");
    const [avatar,setAvatar] = useState(null);
    const formData = new FormData();

    formData.append("name",name)
    formData.append("email",email)
    formData.append("bio",bio)
    formData.append("file",avatar)

    const handleSumbit = (e) => {
        e.preventDefault();
        try {
            axios
            .patch(`http://localhost:4000/user/edit/${id}`,formData)
            .then((res) => {
                toast.success("Successfuly edited profile!")
            }).catch((e) => {
                console.log(e);
            }).finally(() => {
                // setShowB(false);
            })
        } catch (error) {
            console.log(error);
            toast.error("Error in edit profile!")
        }
    }
  return (
    <Modal 
        show={showB}
        onClose={handleClose}
    >
        <ToastContainer/>
        <Modal.Content>
            <Modal.Card.Header style={{background:'#fff'}}>
                <Modal.Card.Title style={{color:"#000"}}>Edit profile</Modal.Card.Title>
            </Modal.Card.Header>
            <Modal.Card.Body style={{background:'#fff',display:'flex',gap:"30px",flexWrap:'wrap'}}>
                <TextField onChange={(e) => setName(e.target.value)} label='Name'/>
                <TextField onChange={(e) => setEmail(e.target.value)} label='E-mail'/>
                <TextField onChange={(e) => setBio(e.target.value)} label='Enter new bio'/>
                <TextField onChange={(e) => setAvatar(e.target.files[0])} type='file'/>
            </Modal.Card.Body>
            <Modal.Card.Footer style={{background:'#fff'}}>
                <Button onClick={handleSumbit} variant='contained' type='submit'>Save</Button>
            </Modal.Card.Footer>
        </Modal.Content>
    </Modal>
  )
}

export default ProfileEdit