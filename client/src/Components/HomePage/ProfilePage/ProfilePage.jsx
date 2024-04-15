import { Avatar, Button, IconButton, ImageList, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Box } from 'react-bulma-components';
import { useParams } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './ProfilePage.css'
import { ToastContainer, toast } from 'react-toastify';
import ProfileEdit from './ProfileEdit';
const ProfilePage = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showB,setShowB] = useState(false);
    useEffect(() => {
        axios
            .get(`http://localhost:4000/auth/me/${id}`)
            .then((res) => {
                console.log(res);
                setUser(res.data)
                axios
                    .get(`http://localhost:4000/post`)
                    .then((res) => {
                        console.log(res);
                        setPosts(res.data.filter((post) => post.user._id === id))
                        setLoading(false);
                    }).catch((e) => {
                        console.log(e);
                        setLoading(false);
                    })
            }).catch((e) => {
                console.log(e);
            })
    }, [])


    const handleClick = (id) => {
        try {
            axios
                .post(`http://localhost:4000/delete/${id}`,{})
                .then((res) => {
                    console.log(res);
                    axios
                        .get(`http://localhost:4000/post`)
                        .then((res) => {
                            console.log(res);
                            setPosts(res.data.filter((post) => post.user._id === id))
                            setLoading(false);
                        }).catch((e) => {
                            console.log(e);
                        })
                }).catch((e) => {
                    console.log(e);
                })
        } catch (error) {
            console.log(error);
            toast.error("Cannot delete this post!")
        }
    }

    return (
        <Box style={{ background: 'none' }}>
            {
                showB ? <ProfileEdit showB={showB} setShowB={setShowB} id={id} /> : null
            }
            <ToastContainer />
            <Box style={{ background: 'none', display: "flex", alignItems: 'center', justifyContent: 'center', gap: '20px' }} className='profile-info'>
                <div className="profile-avatar-wrapper">
                    <Avatar style={{ width: "150px", height: "150px" }} src={user != {} ? `http://localhost:4000/avatar/image/${user._id}` : null }/>
                </div>
                <div className="profile-data-wrapper">
                    <div className="profile-name">
                        <b style={{ color: "black" }}>{user.name}</b>
                        <Button variant='contained' style={{ marginLeft: "10px" }} color='warning' size='small' onClick={() => setShowB(true)}>Edit profile</Button>
                    </div>
                    <div className="profile-actions" style={{ paddingTop: "10px" }}>
                        <span>Posts: {posts.length}</span>
                        <span style={{ marginLeft: "10px" }}>Folowers: {user.subscribers?.length}</span>
                    </div>
                </div>
            </Box>
            <ImageList cols={5} >
                {
                    loading ? 
                    <h3>Loading...</h3>
                    
                    : posts.length <= 0 ? <h3>Posts not found!</h3>
                    :
                        posts.map((item) => (
                            <div className="post-item" style={{ width: "400px", position: 'relative' }}>
                                <Button className='menu-btn' color='error' onClick={() => handleClick(item._id)}>Delete</Button>
                                <img src={`http://localhost:4000/image/${item._id}`} alt="" />
                            </div>
                        ))

                }
            </ImageList>
        </Box>
    )
}

export default ProfilePage