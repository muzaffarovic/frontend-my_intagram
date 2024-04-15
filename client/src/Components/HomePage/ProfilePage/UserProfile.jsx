import { Avatar, Button, IconButton, ImageList, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Box } from 'react-bulma-components';
import { useParams } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './ProfilePage.css'
import { ToastContainer, toast } from 'react-toastify';
import ProfileEdit from './ProfileEdit';

const UserProfile = () => {
    const { id } = useParams();
    const { uid } = useParams();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showB, setShowB] = useState(false);
    useEffect(() => {
        axios
            .get(`https://insagram-server-2.onrender.com/user/getUser/${uid}`)
            .then((res) => {
                console.log(res);
                setUser(res.data)
                axios
                    .get(`https://insagram-server-2.onrender.com/post`)
                    .then((res) => {
                        console.log(res);
                        setPosts(res.data.filter((post) => post.user._id === uid))
                        setLoading(false);
                    }).catch((e) => {
                        console.log(e);
                        setLoading(false);
                    })
            }).catch((e) => {
                console.log(e);
            })
    }, [])

    const folow = (tId) => {
        axios
            .post(`https://insagram-server-2.onrender.com/user/subscribe/${id}/${tId}`, {})
            .then((res) => {
                console.log(res);
                axios
                    .get(`https://insagram-server-2.onrender.com/user/getUser/${uid}`)
                    .then((res) => {
                        console.log(res);
                        setUser(res.data)
                    }).catch((e) => {
                        console.log(e);
                    })
                toast.success("Folowed!")
            }).catch((e) => {
                console.log(e);
            })
    }
    const unFolow = (tId) => {
        axios
            .post(`https://insagram-server-2.onrender.com/user/Unsubscribe/${id}/${tId}`, {
            })
            .then((res) => {
                console.log(res);
                axios
                    .get(`https://insagram-server-2.onrender.com/user/getUser/${uid}`)
                    .then((res) => {
                        console.log(res);
                        setUser(res.data)
                    }).catch((e) => {
                        console.log(e);
                    })
                toast.success("Unfolowed!")
            }).catch((e) => {
                console.log(e);
            })
    }


    return (
        <Box style={{ background: 'none' }}>
            {
                showB ? <ProfileEdit showB={showB} setShowB={setShowB} id={id} /> : null
            }
            <ToastContainer />
            <Box style={{ background: 'none', display: "flex", alignItems: 'center', justifyContent: 'center', gap: '20px' }} className='profile-info'>
                <div className="profile-avatar-wrapper">
                    <Avatar style={{ width: "150px", height: "150px" }} src={user != {} ? `https://insagram-server-2.onrender.com/avatar/image/${user._id}` : null} />
                </div>
                <div className="profile-data-wrapper">
                    <div className="profile-name">
                        <b style={{ color: "black" }}>{user?.name}</b>
                        {
                            user.subscribers?.find((u) => u === id) ? <Button variant='contained' style={{ marginLeft: "10px" }} color='secondary' size='small' onClick={() => unFolow(user._id)}>Unfolow</Button>

                                : <Button variant='contained' style={{ marginLeft: "10px" }} color='primary' size='small' onClick={() => folow(user._id)}>Folow</Button>

                        }
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
                                <div key={item._id} className="post-item" style={{ width: "400px", position: 'relative' }}>
                                    <img src={`https://insagram-server-2.onrender.com/image/${item._id}`} alt="" />
                                </div>
                            ))

                }
            </ImageList>
        </Box>
    )
}

export default UserProfile