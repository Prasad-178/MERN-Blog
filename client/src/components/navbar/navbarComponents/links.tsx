import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBar from './search-bar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';

export const linksInNavbar = [
    "Home",
    "Products",
    <SearchBar />,
    <Button variant="text" sx={{ marginLeft: 'auto', color: 'white' }}> <AccountCircleIcon /> Account </Button>,
    <Button variant="text" sx={{ marginLeft: 4, color: 'white' }}> <ShoppingCartIcon /> Cart </Button>
]

export const iconsInDrawer = [
    <HomeIcon />,
    <CategoryRoundedIcon />,
    <AccountCircleIcon />,
    <ShoppingCartIcon />
]