import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SvgIcon from '@mui/icons-material/Menu';
import { ReactComponent as SkullIcon } from "../images/toxicIcon.svg"
import { Link } from 'react-router-dom';

const pages = [{ name: 'Giocatori', p_link: '/players_menu' },
{ name: 'Partite', p_link: '/match_menu' },
{ name: 'Statistiche', p_link: '/statistics' },
{ name: 'Nuova Partita', p_link: '/new_match' },
{ name: 'Nuovo Giocatore', p_link: '/new_player' }];


export default function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color='primary' width='100%'>
      <Container maxWidth="xl" sx={{ marginLeft: '0px', marginRight: '0%', width: '100%' }}>
        <Toolbar disableGutters>
          <SvgIcon component={SkullIcon} inheritViewBox sx={{ display: { xs: 'none', md: 'flex' }, ml: '3%', mr: 1 }} ></SvgIcon>
          <Typography
            variant="h6"
            noWrap
            component="a"
            color='white'
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              textDecoration: 'none',
            }}
          >
            FantaToxic
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon sx={{ color: 'white' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography as={Link} to={page.p_link} sx={{ textAlign: 'center', color: 'primary.500', fontWeight: 600 }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SvgIcon component={SkullIcon} inheritViewBox sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}></SvgIcon>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            FantaToxic
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                as={Link}
                to={page.p_link}
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontWeight: '700', marginLeft: '2%' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

