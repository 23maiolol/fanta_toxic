import {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../style/Players.css"
import NavBar from '../components/NavBar';
import Autocomplete from '@mui/joy/Autocomplete';
import { Box } from '@mui/material';

export default function Players({ playersList }) {
  let [selected_player, setPlayer] = useState(playersList)

  function handleSearchChange(event, value) {

    console.log('value', value)
    if (value) {
      setPlayer(playersList.filter((player) => (player.name.slice(0, value.length) === value.toString().split(" ")[0]) || (player.surname.slice(0, value.length) === value.toString().split(" ")[0]) || (player.nickname.slice(0, value.length) === value.toString().split(" ")[0])))
    } else {
      setPlayer(playersList)
    }
  }

  if (playersList.length > 0)
    return (<div id='player-page'>
      <div>
        <NavBar></NavBar>
      </div>
      <div id='search-bar'>
        <Autocomplete
          onInputChange={handleSearchChange}
          placeholder="Cerca"
          options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
          sx={{ width: 300 }}></Autocomplete>
      </div>
      <div id="table-container">
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 65 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: '900' }}>Nome Cognome</TableCell>
                <TableCell align="center" sx={{ fontWeight: '900' }}>Soprannome</TableCell>
                <TableCell align="center" sx={{ fontWeight: '900' }}>Ruolo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selected_player.map((player) => {
                let player_link = `/${player._id}`
                return (
                  <TableRow
                    key={player.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center"><a href={player_link}>{player.name} {player.surname}</a></TableCell>
                    <TableCell align="center"><a href={player_link}>{player.nickname}</a></TableCell>
                    <TableCell align="center">{player.role}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
    )
  else
    return (
      <div>
        <div>
          <NavBar></NavBar>
        </div>
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10%', color: 'primary.700', fontSize: 'larger', fontWeight: '600' }}>
            Nessun giocatore presente
          </Box>
        </div>
      </div>)
}
