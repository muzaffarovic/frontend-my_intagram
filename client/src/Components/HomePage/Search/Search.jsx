import { Avatar, Drawer, IconButton, InputAdornment, List, ListItem, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Button } from 'react-bulma-components';
import { useNavigate } from 'react-router-dom';
const Search = ({ setShowDriver, showDriver, id }) => {
    const [name, setName] = useState("");
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const handleClose = () => {
        setShowDriver(false);
    }
    const handlSearch = (e) => {
        e.preventDefault();
        try {

            if (!name) {
                toast.error("Please enter user name")
            }
            axios.post("https://insagram-server-2.onrender.com/user/search/", {
                name: name
            })
                .then((res) => {
                    console.log(res);
                    setUser(res.data)
                }).catch((error) => {
                    console.log(error);
                    toast.error(error.response.data.message);
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {} , [user])
    return (
        <Drawer
            open={showDriver}
            anchor='left'
            onClose={handleClose}
        >
            <ToastContainer />
            <List sx={{ width: 500 }}>
                <ListItem>
                    <form style={{ display: 'flex' }}>
                        <TextField label='Search user by name...' onChange={(e) => setName(e.target.value)} />
                        <Button onClick={handlSearch} style={{ marginLeft: '10px' }}><SearchIcon /></Button>
                    </form>
                </ListItem>
                <ListItem className='search-users' sx={{ display: 'flex', cursor:"pointer"}} onClick={() => navigate(id === user._id ? `/profile/${id}` : `/user/profile/${id}/${user._id}`)} >
                    {
                        user == {}  ? <span>Search user profile</span> : <div className='user' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Avatar src={user != {} ? `https://insagram-server-2.onrender.com/avatar/image/${user._id}` : null} />
                        <b>{user.name}</b>
                    </div>
                    }
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Search