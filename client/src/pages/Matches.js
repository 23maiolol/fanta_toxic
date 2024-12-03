import React from 'react'
import NavBar from '../components/NavBar.js'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';

export default function Matches({ matchList }) {

    if (matchList.length === 0)
        return (
            <div>
                <div>
                    <NavBar></NavBar>
                </div>
                <div>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10%', color: 'primary.700', fontSize: 'larger', fontWeight: '600' }}>
                        Nessuna partita presente
                    </Box>
                </div>
            </div>)
    else
        return (
            <div>
                <div>
                    <NavBar></NavBar>
                </div>
                <div id="table-container">
                    <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 65 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontWeight: '900' }}>Data</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {matchList.map((match) => {
                                    let match_link = `/${match.date.toLowerCase()}`
                                    return (
                                        <TableRow
                                            key={match.date}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center"><a href={match_link}>{match.date}</a></TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
}