import React from 'react'
import './Navbar.css'
import { IconButton, Menu, MenuItem, Toolbar } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = ({ id,setShowC,setShowDriver }) => {
    const navigate = useNavigate();
    return (
        <header>
            <Toolbar className='nav-wrapp'>
                <Link
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    style={{ marginTop: '30px' }}
                    to={`/${id}`}
                >
                    <img style={{ width: "60px" }} src="https://lovely-begonia-033a8a.netlify.app/static/media/instagram-logo.0234e0bf8fae139480ea.png" alt="" />
                </Link>
                <div className='nav-menu'>
                    <MenuItem>
                        <HomeIcon onClick={() => navigate(`/${id}`)}/>
                    </MenuItem>
                    <MenuItem onClick={() => setShowC(true)}>
                        <ControlPointIcon/>
                    </MenuItem>
                    <MenuItem onClick={() => setShowDriver(true)}>
                        <SearchIcon />
                    </MenuItem>
                    <MenuItem onClick={() => navigate(`/profile/${id}`)}>
                        <PersonIcon/>
                    </MenuItem>
                    <MenuItem onClick={() => navigate(`/auth/login`)}>
                        Logout
                    </MenuItem>
                </div>
            </Toolbar>
        </header>
    )
}

export default Navbar