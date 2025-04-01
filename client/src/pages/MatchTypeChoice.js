import { useState } from 'react';
import NavBar from '../components/NavBar';
import { Button, Typography, Box} from '@mui/material';
import { Link } from 'react-router-dom';

export default function MatchTypeChoice({ playersList }) {
    return <>
        <NavBar></NavBar>
        <Box sx={{ width:'100%', display:'flex', justifyContent:'center', flexDirection:'column'}}>
            <Box>
            <a href='/new_match_7'>
                <Typography
                variant='h2'
                sx={{
                    width: 'fit-content',
                    padding:'20px',
                    margin:'25%',
                    fontFamily: 'monospace',
                    color:'primary.700'
                }}>
                    7vs7
                </Typography>
            </a>
            </Box>
           <Box>
           <a  href='/new_match_8'>
            <Typography
                variant='h2'
                sx={{
                    width: 'fit-content',
                    padding:'20px',
                    margin:'25%',
                    fontFamily: 'monospace',
                    color:'primary.700'
                }}>
                    8vs8
                </Typography>
            </a>
           </Box>
            
        </Box>
    </>;
}
