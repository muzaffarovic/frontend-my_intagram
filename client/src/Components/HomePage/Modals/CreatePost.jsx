import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Modal } from 'react-bulma-components'
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer,toast } from 'react-toastify';
import './Modal.css'
import axios from 'axios';
const CreatePost = ({ showC, setShowC,id }) => {
    const [title,setTitle] = useState("");
    const [file,setFile] = useState(null);
    const formData = new FormData();
    formData.append('file',file)
    formData.append('title',title)
    const handleClose = () => {
        setShowC(false)
    }
    const handleSumbit = () => {
        try {
            if(!title){
                toast.error("Please enter title post!")
            }else if(!file){
                toast.error("Please enter image post")
            }else{
                axios
                .post(`http://localhost:4000/post/${id}`,formData)
                .then((res) => {
                    console.log(res);
                    toast.success("New post created!")
                }).catch((e) => {
                    console.log(e);
                    toast.error(e?.response.data.message);
                }).finally(() => {
                    setShowC(false);
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal
            show={showC}
            className='modal'
            onClose={handleClose}
        >
            <ToastContainer/>
            <Modal.Content className='modal-content'>
                <Modal.Card.Header>
                    <Modal.Card.Title>Create youre post</Modal.Card.Title>
                </Modal.Card.Header>
                <form className='form-modal'>
                    <TextField label='Post title' onChange={(e) => setTitle(e.target.value)} className='form-input' />
                    <TextField type='file' onChange={(e) => setFile(e.target.files[0])}  className='form-input'/>
                    <Button onClick={handleSumbit}>Create</Button>
                </form>
            </Modal.Content>
        </Modal>
    )
}

export default CreatePost