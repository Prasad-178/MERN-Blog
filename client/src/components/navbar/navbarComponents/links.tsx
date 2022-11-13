import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from './search-bar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import AuthCheck from '../../../assets/auth-asset/AuthCheck';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import CreateIcon from '@mui/icons-material/Create';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const linksInNavbar = [
    "Home",
    "My Posts",
    <SearchBar />,
    AuthCheck() ? 
    <Link to={'/secure/user'} style={{ textDecoration: 'none' }}><Button variant="text" sx={{ marginLeft: 'auto', color: 'white' }}> <AccountCircleIcon /> Account </Button></Link> 
    :
    <Link to={'/login'} style={{ textDecoration: 'none' }}><Button variant="text" sx={{ marginLeft: 'auto', color: 'white' }}> <LoginIcon /> Login </Button></Link>
    ,
    AuthCheck() ? 
    // <Link to={'/'} style={{ textDecoration: 'none' }}><Button variant="text" sx={{ marginLeft: 4, color: 'white' }}> <LogoutIcon /> Logout </Button></Link> 
    <Button onClick={ async () => {
        const data = await axios.get("http://localhost:3000/secure/logout")
        console.log(data);
        const navigate = useNavigate()
        navigate('/')
    }} 
    variant="text" sx={{ marginLeft: 4, color: 'white' }}> <LogoutIcon /> Logout </Button>
    : 
    <Link to={'/register'} style={{ textDecoration: 'none' }}><Button variant="text" sx={{ marginLeft: 'auto', color: 'white' }}> <CreateIcon /> Register </Button></Link>
]

export const iconsInDrawer = [
    <HomeIcon />,
    <CategoryRoundedIcon />,
    <AccountCircleIcon />,
    <ShoppingCartIcon />
]