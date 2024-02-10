import React from 'react';
import { AppBar, Button, Menu, MenuItem, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const defaultPrimaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();

const colorOptions = ["#002884", "#ba000d", "#1B5E20", "#00B8D4", "#212121", "#263238"];

export default function Header() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
	const { user, updateUserColor } = useAuth();

    const theme = React.useMemo(() => {
        return createTheme({
            palette: { primary: { main: user?.primaryColor || defaultPrimaryColor } }
        });
    }, [user?.primaryColor]);

    React.useEffect(() => {
        if (user?.primaryColor) {
            document.documentElement.style.setProperty("--primary-color", user?.primaryColor);
        }
    }, [user?.primaryColor]);

    const handleClick = React.useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, []);

    const onColorSelect = React.useCallback((color) => {
        updateUserColor(color);
    }, [updateUserColor]);

	return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" flexGrow={1}>Hello {user?.username}</Typography>
                    <Button color="inherit" onClick={handleClick}>Choose Theme</Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                    >
                        {colorOptions.map(color => <MenuItem key={color} onClick={() => onColorSelect(color)}>{color}</MenuItem>)}
                    </Menu>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
	);
}
