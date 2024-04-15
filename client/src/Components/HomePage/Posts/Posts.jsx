import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import './Post.css'
import axios from 'axios';
import CommentModal from '../Modals/CommentModal';
import { Button } from 'react-bulma-components';
import { useNavigate } from 'react-router-dom';
const Posts = ({ id }) => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [showM, setShowM] = useState(false);

    useEffect(() => {
        axios
            .get(`https://insagram-server-2.onrender.com/post`)
            .then((res) => {
                console.log(res);
                setPosts(res.data);
            }).catch((e) => {
                console.log(e);
            })
    }, [showM])


    const handleLike = (pId) => {
        axios
            .post(`https://insagram-server-2.onrender.com/post/like/${pId}/${id}`)
            .then((res) => {
                console.log(res);
                axios.get(`https://insagram-server-2.onrender.com/post`)
                    .then((res) => {
                        console.log(res);
                        setPosts(res.data);
                    }).catch((e) => {
                        console.log(e);
                    });
            }).catch((e) => {
                console.log(e);
            })
    }

    const unLike = (pId) => {
        axios
            .post(`https://insagram-server-2.onrender.com/post/Unlike/${pId}/${id}`)
            .then((res) => {
                console.log(res);
                axios.get(`https://insagram-server-2.onrender.com/post`)
                    .then((res) => {
                        console.log(res);
                        setPosts(res.data);
                    }).catch((e) => {
                        console.log(e);
                    });
            }).catch((e) => {
                console.log(e);
            })
    }
    const folow = (tId) => {
        try {
            axios
            .post(`https://insagram-server-2.onrender.com/user/subscribe/${id}/${tId}`,{})
            .then((res) => {
                console.log(res);
                axios.get(`https://insagram-server-2.onrender.com/post`)
                .then((res) => {
                    console.log(res);
                    setPosts(res.data);
                }).catch((e) => {
                    console.log(e);
                });     
            }).catch((e) => {
                console.log(e);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const unFolow = (tId) => {
        try {
            axios
            .post(`https://insagram-server-2.onrender.com/user/Unsubscribe/${id}/${tId}`,{})
            .then((res) => {
                console.log(res);
                axios.get(`https://insagram-server-2.onrender.com/post`)
                .then((res) => {
                    console.log(res);
                    setPosts(res.data);
                }).catch((e) => {
                    console.log(e);
                });
            }).catch((e) => {
                console.log(e);
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box className='posts-box'>
            {
                posts.map((item) => (
                    <Card className='post' key={item._id}>
                        {
                            showM ? <CommentModal pId={item._id} id={id} showM={showM} setShowM={setShowM}/> : null
                        }
                        <CardHeader
                        style={{cursor:"pointer"}}
                            onClick={() => navigate(id === item.user._id ? `/profile/${id}` :`/user/profile/${id}/${item.user._id}`)}
                            avatar={
                                <Avatar src={item.user != {} ? `https://insagram-server-2.onrender.com/avatar/image/${item.user._id}` : null}></Avatar>
                            }
                            title={item.user.name}
                            subheader=
                        {
                            id !== item.user._id ? 
                            item.user.subscribers.find((user) => user === id ) ?
                            <Button size={'small'} onClick={() => unFolow(item.user._id)}>Unfolow</Button>:<Button onClick={() => folow(item.user._id)} size={'small'}>Folow</Button>
                            :null
                        }
                        >
                        </CardHeader>
                        <CardContent>
                            <img
                                src={`https://insagram-server-2.onrender.com/image/${item._id}`}
                                style={{ width: '500px' }}
                            />
                        </CardContent>
                        <CardActions>
                            <IconButton>
                                {
                                    item.like.find((item) => item === id) ? <FavoriteIcon onClick={() => unLike(item._id)} style={{ color: 'red' }} /> : <FavoriteBorderIcon onClick={() => handleLike(item._id)} />
                                }
                            </IconButton>
                            {item.like.length}
                            <IconButton onClick={() => setShowM(true)}>
                                <CommentIcon />
                            </IconButton>
                            {item.comments.length}
                        </CardActions>
                    </Card>
                ))
            }

        </Box>
    )
}

export default Posts