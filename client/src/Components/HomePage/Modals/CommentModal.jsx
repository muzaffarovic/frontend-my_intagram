import { Avatar, Button, ImageList, ImageListItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bulma-components'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const CommentModal = ({ setShowM, showM, pId, id }) => {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const handleCLose = () => {
        setShowM(false);
    }
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://insagram-server-2.onrender.com/post/comment/${pId}`)
            .then((res) => {
                console.log(res);
                setData(res.data);
                setLoading(false);
            }).catch((e) => {
                console.log(e);
            })
    }, [])

    const handleAddComment = (e) => {
        e.preventDefault();
        try {
            if (!text) {
                toast.error("Please enter comment!")
            } else {
                axios.post(`https://insagram-server-2.onrender.com/post/comment/${pId}/${id}`, {
                    comment: text,
                    user: id
                })
                    .then((res) => {
                        console.log(res);
                        axios
                            .get(`https://insagram-server-2.onrender.com/post/comment/${pId}`)
                            .then((res) => {
                                console.log(res);
                                setData(res.data);
                                setLoading(false);
                            }).catch((e) => {
                                console.log(e);
                            }).finally(() => {
                                toast.success("Successfulu added new comment")
                                setText("");
                            })
                    }).catch((e) => {
                        console.log(e);
                    })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Modal
            show={showM}
            onClose={handleCLose}
        >
            <ToastContainer />
            <Modal.Content>
                <Modal.Card.Header>
                    <Modal.Card.Title>Comments</Modal.Card.Title>
                </Modal.Card.Header>
                <Modal.Card.Body>
                    <ImageList className="modal-body-row" style={{ height: '200px', display: "flex", flexDirection: 'column', alignItems: 'start', gap: "30px" }}>
                        {
                            loading ? <h3>Loading...</h3> :
                            data.map((item) => (
                                <div className='comment' key={item._id} style={{ display: 'flex', alignItems: 'center'}}>
                                    <Avatar src={item.user?.avatar != {} ? `https://insagram-server-2.onrender.com/avatar/image/${item.user?._id}` : null}/>
                                    <b style={{ marginLeft: '5px' }}>{item.user?.name}</b>
                                    <span style={{ marginLeft: '15px' }}>    {item.comment}</span>
                                </div>
                            ))
                        }

                    </ImageList>
                    <div className="modal-text-field" style={{ display: 'flex', paddingTop: '30px' }}>
                        <TextField onChange={(e) => setText(e.target.value)} style={{ width: '100%', marginRight: "10px",color:"white" }} type='text' label='Enter comment' variant='standard' />
                        <Button variant='contained' onClick={handleAddComment}>Add</Button>
                    </div>
                </Modal.Card.Body>
            </Modal.Content>
        </Modal>
    )
}

export default CommentModal