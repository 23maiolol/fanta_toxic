import '../style/NewMatch.css'
import NavBar from "../components/NavBar";
import { Input, Autocomplete } from "@mui/joy";
import { Button, InputLabel } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {useState} from "react";
import "dayjs/locale/it"
import TextField from "@mui/material/TextField";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import it from 'dayjs/locale/it';
import axios from 'axios';
import jsSHA from 'jssha/sha1';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(it)

export default function NewMatch({ playersList }) {
    let votesList = [0, 1, 2, 3, 3.5, 4, 4.25, 4.5, 4.75, 5, 5.25, 5.5, 5.75, 6, 6.25, 6.5, 6.75, 7, 7.25, 7.5, 8, 8.25, 8.5, 8.75, 9, 9.25, 9.5, 9.75, 10]

    const playerDefault = {
        completeName: null,
        playerId: null,
        vote: null,
        comment: ''
    }
    let [password, setPassword] = useState('')
    let [player1, setPlayer1] = useState(playerDefault)
    let [player2, setPlayer2] = useState(playerDefault)
    let [player3, setPlayer3] = useState(playerDefault)
    let [player4, setPlayer4] = useState(playerDefault)
    let [player5, setPlayer5] = useState(playerDefault)
    let [player6, setPlayer6] = useState(playerDefault)
    let [player7, setPlayer7] = useState(playerDefault)
    let [player8, setPlayer8] = useState(playerDefault)
    let [player9, setPlayer9] = useState(playerDefault)
    let [player10, setPlayer10] = useState(playerDefault)
    let [player11, setPlayer11] = useState(playerDefault)
    let [player12, setPlayer12] = useState(playerDefault)
    let [player13, setPlayer13] = useState(playerDefault)
    let [player14, setPlayer14] = useState(playerDefault)
    let [mvp, setMVP] = useState(null)
    let [toxic, setToxic] = useState(null)
    let [matchDay, setMatchDay] = useState(dayjs.utc());

    function valueToId(value) {
        let idL = playersList.filter(player => player.nickname === (value.split('(').slice(-1)[0].slice(0, -1)))
        if (idL.length)
            return idL[0]._id
        else
            alert('id non trovato')
        return 0
    }

    function setPlayer(value, reason, currPlayer, setPlayerFunction) {
        if (reason === 'clear') {
            return setPlayerFunction({ ...currPlayer, completeName: null, playerId: null })
        } else {
            return setPlayerFunction({ ...currPlayer, completeName: value, playerId: valueToId(value) })
        }
    }

    function setVote(value, reason, currPlayer, setPlayerFunction) {
        console.log(value)
        if (reason === 'clear') {
            return setPlayerFunction({ ...currPlayer, vote: null })
        } else {
            return setPlayerFunction({ ...currPlayer, vote: value })
        }
    }

    function setComment(value, currPlayer, setPlayerFunction) {
        return setPlayerFunction({ ...currPlayer, comment: value })
    }

    function handleMVPorToxic(value, reason, setFunction) {
        if (reason === 'clear') {
            return setFunction(null)
        } else {
            return setFunction(value)
        }
    }

    function full(mP) {
        for (let i = 0; i < mP.length; i++) {
            let p = mP[i]
            if (!(p.completeName && p.playerId && p.vote && p.comment))
                return false
        }
        return true
    }

    function passwToHash(psswrd) {
        let txtHash = new jsSHA('SHA-1', 'TEXT', { encoding: 'UTF8' })
        txtHash.update(psswrd)
        return txtHash.getHash('HEX')
    }

    function isInMatchList(toxicOrMvp, mList) {
        return mList.find((player) => player.completeName === toxicOrMvp)
    }


    function handleSubmit(e) {
        e.preventDefault()
        let matchPlayers = [player1, player2, player3, player4, player5, player6, player7, player8, player9, player10, player11, player12, player13, player14]
        
        let hPassword = passwToHash(password)
        if (!mvp)
            alert("Inserisci l'MVP della giornata!")
        else if (!isInMatchList(mvp, matchPlayers))
            alert("L'MVP inserito non ha partecipato alla partita!")
        else if (!toxic)
            alert("Inserisci il TOXIC della giornata!")
        else if (!isInMatchList(toxic, matchPlayers))
            alert("Il toxic inserito non ha partecipato alla partita!")
        else if (!full(matchPlayers))
            alert("Non hai completato l'inserimento di tutti i giocatori!")
        else if (hPassword !== process.env.REACT_APP_MATCH_PASSWORD)
            alert("Password incorretta!")
        else {

            let matchPlayersId = matchPlayers.map((player) => player.playerId)
            let date = `${matchDay.$D}/${matchDay.$M + 1}/${matchDay.$y}`

            let match = {
                date: date,
                mvp: valueToId(mvp),
                toxic: valueToId(toxic),
                reports: matchPlayers,
                playersList: matchPlayersId,
            }
            axios(
                {
                    method: 'post',
                    url: 'http://localhost:3005/match/new',
                    data: match
                }
            )
                .then(data => {
                    alert('Partita aggiunta correttamente!')
                    window.location.reload()
                }
                )
                .catch(error => {
                    if (error.status === 409)
                        return alert('Attenzione: Esiste giá una partita per questa data!');
                    else
                        return alert('Errore nel salvataggio della partita riprovare piu tardi')
                });
            
        }
    }


    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>
            <div id='form-container'>
                <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>Giocatore 1</InputLabel>
                <div className='player-container'>
                    <div className='comp-cont left-bar'>
                        <Autocomplete
                            value={player1.completeName}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='1'
                            id="1"
                            onChange={(event, value, reason) => setPlayer(value, reason, player1, setPlayer1)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont middle-bars'>
                        <Autocomplete
                            value={player1.vote}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='101'
                            id="101"
                            onChange={(event, value, reason) => setVote(value, reason, player1, setPlayer1)}
                            placeholder="Voto"
                            options={votesList.map(vote => (vote))}
                            sx={{ maxWidth: 100, minWidth: 50 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont text-cont'>
                        <TextField
                            value={player1.comment}
                            onChange={(event) => setComment(event.target.value, player1, setPlayer1)}
                            sx={{
                                width: '100%', minWidth: '250px', marginTop: {
                                    xs: 2
                                },
                                marginBottom: {
                                    xs: 2
                                }, backgroundColor: 'white', fontSize: 'smaller'
                            }}
                            rows={2}
                            multiline
                            placeholder='Inserisci Commento Partita'
                        ></TextField>
                    </div>
                </div>
                <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>Giocatore 2</InputLabel>
                <div className='player-container'>
                    <div className='comp-cont left-bar'>
                        <Autocomplete
                            value={player2.completeName}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='2'
                            id="2"
                            onChange={(event, value, reason) => setPlayer(value, reason, player2, setPlayer2)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont middle-bars'>
                        <Autocomplete
                            value={player2.vote}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='20'
                            id="20"
                            onChange={(event, value, reason) => setVote(value, reason, player2, setPlayer2)}
                            placeholder="Voto"
                            options={votesList.map(vote => (vote))}
                            sx={{ maxWidth: 100, minWidth: 50 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont text-cont'>
                        <TextField
                            value={player2.comment}
                            onChange={(event) => setComment(event.target.value, player2, setPlayer2)}
                            sx={{
                                width: '100%', minWidth: '250px', marginTop: {
                                    xs: 2
                                },
                                marginBottom: {
                                    xs: 2
                                }, backgroundColor: 'white', fontSize: 'smaller'
                            }}
                            rows={2}
                            multiline
                            placeholder='Inserisci Commento Partita'
                        ></TextField>
                    </div>
                </div>
                <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>Giocatore 3</InputLabel>
                <div className='player-container'>
                    <div className='comp-cont left-bar'>
                        <Autocomplete
                            value={player3.completeName}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='3'
                            id="3"
                            onChange={(event, value, reason) => setPlayer(value, reason, player3, setPlayer3)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont middle-bars'>
                        <Autocomplete
                            value={player3.vote}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='30'
                            id="30"
                            onChange={(event, value, reason) => setVote(value, reason, player3, setPlayer3)}
                            placeholder="Voto"
                            options={votesList.map(vote => (vote))}
                            sx={{ maxWidth: 100, minWidth: 50 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont text-cont'>
                        <TextField
                            value={player3.comment}
                            onChange={(event) => setComment(event.target.value, player3, setPlayer3)}
                            sx={{
                                width: '100%', minWidth: '250px', marginTop: {
                                    xs: 2
                                },
                                marginBottom: {
                                    xs: 2
                                }, backgroundColor: 'white', fontSize: 'smaller'
                            }}
                            rows={2}
                            multiline
                            placeholder='Inserisci Commento Partita'
                        ></TextField>
                    </div>
                </div>
                <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>Giocatore 4</InputLabel>
                <div className='player-container'>
                    <div className='comp-cont left-bar'>
                        <Autocomplete
                            value={player4.completeName}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='4'
                            id="4"
                            onChange={(event, value, reason) => setPlayer(value, reason, player4, setPlayer4)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont middle-bars'>
                        <Autocomplete
                            value={player4.vote}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='40'
                            id="40"
                            onChange={(event, value, reason) => setVote(value, reason, player4, setPlayer4)}
                            placeholder="Voto"
                            options={votesList.map(vote => (vote))}
                            sx={{ maxWidth: 100, minWidth: 50 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont text-cont'>
                        <TextField
                            value={player4.comment}
                            onChange={(event) => setComment(event.target.value, player4, setPlayer4)}
                            sx={{
                                width: '100%', minWidth: '250px', marginTop: {
                                    xs: 2
                                },
                                marginBottom: {
                                    xs: 2
                                }, backgroundColor: 'white', fontSize: 'smaller'
                            }}
                            rows={2}
                            multiline
                            placeholder='Inserisci Commento Partita'
                        ></TextField>
                    </div>
                </div>
                <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>Giocatore 5</InputLabel>
                <div className='player-container'>
                    <div className='comp-cont left-bar'>
                        <Autocomplete
                            value={player5.completeName}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='5'
                            id="5"
                            onChange={(event, value, reason) => setPlayer(value, reason, player5, setPlayer5)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont middle-bars'>
                        <Autocomplete
                            value={player5.vote}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='50'
                            id="50"
                            onChange={(event, value, reason) => setVote(value, reason, player5, setPlayer5)}
                            placeholder="Voto"
                            options={votesList.map(vote => (vote))}
                            sx={{ maxWidth: 100, minWidth: 50 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont text-cont'>
                        <TextField
                            value={player5.comment}
                            onChange={(event) => setComment(event.target.value, player5, setPlayer5)}
                            sx={{
                                width: '100%', minWidth: '250px', marginTop: {
                                    xs: 2
                                },
                                marginBottom: {
                                    xs: 2
                                }, backgroundColor: 'white', fontSize: 'smaller'
                            }}
                            rows={2}
                            multiline
                            placeholder='Inserisci Commento Partita'
                        ></TextField>
                    </div>
                </div>
                <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>Giocatore 6</InputLabel>
                <div className='player-container'>
                    <div className='comp-cont left-bar'>
                        <Autocomplete
                            value={player6.completeName}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='6'
                            id="6"
                            onChange={(event, value, reason) => setPlayer(value, reason, player6, setPlayer6)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont middle-bars'>
                        <Autocomplete
                            value={player6.vote}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='60'
                            id="60"
                            onChange={(event, value, reason) => setVote(value, reason, player6, setPlayer6)}
                            placeholder="Voto"
                            options={votesList.map(vote => (vote))}
                            sx={{ maxWidth: 100, minWidth: 50 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont text-cont'>
                        <TextField
                            value={player6.comment}
                            onChange={(event) => setComment(event.target.value, player6, setPlayer6)}
                            sx={{
                                width: '100%', minWidth: '250px', marginTop: {
                                    xs: 2
                                },
                                marginBottom: {
                                    xs: 2
                                }, backgroundColor: 'white', fontSize: 'smaller'
                            }}
                            rows={2}
                            multiline
                            placeholder='Inserisci Commento Partita'
                        ></TextField>
                    </div>
                </div>
                <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>Giocatore 7</InputLabel>
                <div className='player-container'>
                    <div className='comp-cont left-bar'>
                        <Autocomplete
                            value={player7.completeName}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='7'
                            id="7"
                            onChange={(event, value, reason) => setPlayer(value, reason, player7, setPlayer7)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont middle-bars'>
                        <Autocomplete
                            value={player7.vote}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='70'
                            id="70"
                            onChange={(event, value, reason) => setVote(value, reason, player7, setPlayer7)}
                            placeholder="Voto"
                            options={votesList.map(vote => (vote))}
                            sx={{ maxWidth: 100, minWidth: 50 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont text-cont'>
                        <TextField
                            value={player7.comment}
                            onChange={(event) => setComment(event.target.value, player7, setPlayer7)}
                            sx={{
                                width: '100%', minWidth: '250px', marginTop: {
                                    xs: 2
                                },
                                marginBottom: {
                                    xs: 2
                                }, backgroundColor: 'white', fontSize: 'smaller'
                            }}
                            rows={2}
                            multiline
                            placeholder='Inserisci Commento Partita'
                        ></TextField>
                    </div>
                </div>
                <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>Giocatore 8</InputLabel>
                <div className='player-container'>
                    <div className='comp-cont left-bar'>
                        <Autocomplete
                            value={player8.completeName}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='8'
                            id="8"
                            onChange={(event, value, reason) => setPlayer(value, reason, player8, setPlayer8)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont middle-bars'>
                        <Autocomplete
                            value={player8.vote}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='80'
                            id="80"
                            onChange={(event, value, reason) => setVote(value, reason, player8, setPlayer8)}
                            placeholder="Voto"
                            options={votesList.map(vote => (vote))}
                            sx={{ maxWidth: 100, minWidth: 50 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont text-cont'>
                        <TextField
                            value={player8.comment}
                            onChange={(event) => setComment(event.target.value, player8, setPlayer8)}
                            sx={{
                                width: '100%', minWidth: '250px', marginTop: {
                                    xs: 2
                                },
                                marginBottom: {
                                    xs: 2
                                }, backgroundColor: 'white', fontSize: 'smaller'
                            }}
                            rows={2}
                            multiline
                            placeholder='Inserisci Commento Partita'
                        ></TextField>
                    </div>
                </div>
                <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>Giocatore 9</InputLabel>
                <div className='player-container'>
                    <div className='comp-cont left-bar'>
                        <Autocomplete
                            value={player9.completeName}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='9'
                            id="9"
                            onChange={(event, value, reason) => setPlayer(value, reason, player9, setPlayer9)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont middle-bars'>
                        <Autocomplete
                            value={player9.vote}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='90'
                            id="90"
                            onChange={(event, value, reason) => setVote(value, reason, player9, setPlayer9)}
                            placeholder="Voto"
                            options={votesList.map(vote => (vote))}
                            sx={{ maxWidth: 100, minWidth: 50 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont text-cont'>
                        <TextField
                            value={player9.comment}
                            onChange={(event) => setComment(event.target.value, player9, setPlayer9)}
                            sx={{
                                width: '100%', minWidth: '250px', marginTop: {
                                    xs: 2
                                },
                                marginBottom: {
                                    xs: 2
                                }, backgroundColor: 'white', fontSize: 'smaller'
                            }}
                            rows={2}
                            multiline
                            placeholder='Inserisci Commento Partita'
                        ></TextField>
                    </div>
                </div>
                <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>Giocatore 10</InputLabel>
                <div className='player-container'>
                    <div className='comp-cont left-bar'>
                        <Autocomplete
                            value={player10.completeName}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='10'
                            id="10"
                            onChange={(event, value, reason) => setPlayer(value, reason, player10, setPlayer10)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont middle-bars'>
                        <Autocomplete
                            value={player10.vote}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='100'
                            id="100"
                            onChange={(event, value, reason) => setVote(value, reason, player10, setPlayer10)}
                            placeholder="Voto"
                            options={votesList.map(vote => (vote))}
                            sx={{ maxWidth: 100, minWidth: 50 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont text-cont'>
                        <TextField
                            value={player10.comment}
                            onChange={(event) => setComment(event.target.value, player10, setPlayer10)}
                            sx={{
                                width: '100%', minWidth: '250px', marginTop: {
                                    xs: 2
                                },
                                marginBottom: {
                                    xs: 2
                                }, backgroundColor: 'white', fontSize: 'smaller'
                            }}
                            rows={2}
                            multiline
                            placeholder='Inserisci Commento Partita'
                        ></TextField>
                    </div>
                </div>
                <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>Giocatore 11</InputLabel>
                <div className='player-container'>
                    <div className='comp-cont left-bar'>
                        <Autocomplete
                            value={player11.completeName}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='11'
                            id="11"
                            onChange={(event, value, reason) => setPlayer(value, reason, player11, setPlayer11)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont middle-bars'>
                        <Autocomplete
                            value={player11.vote}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='110'
                            id="110"
                            onChange={(event, value, reason) => setVote(value, reason, player11, setPlayer11)}
                            placeholder="Voto"
                            options={votesList.map(vote => (vote))}
                            sx={{ maxWidth: 100, minWidth: 50 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont text-cont'>
                        <TextField
                            value={player11.comment}
                            onChange={(event) => setComment(event.target.value, player11, setPlayer11)}
                            sx={{
                                width: '100%', minWidth: '250px', marginTop: {
                                    xs: 2
                                },
                                marginBottom: {
                                    xs: 2
                                }, backgroundColor: 'white', fontSize: 'smaller'
                            }}
                            rows={2}
                            multiline
                            placeholder='Inserisci Commento Partita'
                        ></TextField>
                    </div>
                </div>
                <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>Giocatore 12</InputLabel>
                <div className='player-container'>
                    <div className='comp-cont left-bar'>
                        <Autocomplete
                            value={player12.completeName}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='12'
                            id="12"
                            onChange={(event, value, reason) => setPlayer(value, reason, player12, setPlayer12)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont middle-bars'>
                        <Autocomplete
                            value={player12.vote}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='120'
                            id="120"
                            onChange={(event, value, reason) => setVote(value, reason, player12, setPlayer12)}
                            placeholder="Voto"
                            options={votesList.map(vote => (vote))}
                            sx={{ maxWidth: 100, minWidth: 50 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont text-cont'>
                        <TextField
                            value={player12.comment}
                            onChange={(event) => setComment(event.target.value, player12, setPlayer12)}
                            sx={{
                                width: '100%', minWidth: '250px', marginTop: {
                                    xs: 2
                                },
                                marginBottom: {
                                    xs: 2
                                }, backgroundColor: 'white', fontSize: 'smaller'
                            }}
                            rows={2}
                            multiline
                            placeholder='Inserisci Commento Partita'
                        ></TextField>
                    </div>
                </div>
                <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>Giocatore 13</InputLabel>
                <div className='player-container'>
                    <div className='comp-cont left-bar'>
                        <Autocomplete
                            value={player13.completeName}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='13'
                            id="13"
                            onChange={(event, value, reason) => setPlayer(value, reason, player13, setPlayer13)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont middle-bars'>
                        <Autocomplete
                            value={player13.vote}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='130'
                            id="130"
                            onChange={(event, value, reason) => setVote(value, reason, player13, setPlayer13)}
                            placeholder="Voto"
                            options={votesList.map(vote => (vote))}
                            sx={{ maxWidth: 100, minWidth: 50 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont text-cont'>
                        <TextField
                            value={player13.comment}
                            onChange={(event) => setComment(event.target.value, player13, setPlayer13)}
                            sx={{
                                width: '100%', minWidth: '250px', marginTop: {
                                    xs: 2
                                },
                                marginBottom: {
                                    xs: 2
                                }, backgroundColor: 'white', fontSize: 'smaller'
                            }}
                            rows={2}
                            multiline
                            placeholder='Inserisci Commento Partita'
                        ></TextField>
                    </div>
                </div>
                <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px' }}>Giocatore 14</InputLabel>
                <div className='player-container'>
                    <div className='comp-cont left-bar'>
                        <Autocomplete
                            value={player14.completeName}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='140'
                            id="140"
                            onChange={(event, value, reason) => setPlayer(value, reason, player14, setPlayer14)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont middle-bars'>
                        <Autocomplete
                            value={player14.vote}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='14'
                            id="14"
                            onChange={(event, value, reason) => setVote(value, reason, player14, setPlayer14)}
                            placeholder="Voto"
                            options={votesList.map(vote => (vote))}
                            sx={{ maxWidth: 100, minWidth: 50 }}>
                        </Autocomplete>
                    </div>
                    <div className='comp-cont text-cont'>
                        <TextField
                            value={player14.comment}
                            onChange={(event) => setComment(event.target.value, player14, setPlayer14)}
                            sx={{
                                width: '100%', minWidth: '250px', marginTop: {
                                    xs: 2
                                },
                                marginBottom: {
                                    xs: 2
                                }, backgroundColor: 'white', fontSize: 'smaller'
                            }}
                            rows={2}
                            multiline
                            placeholder='Inserisci Commento Partita'
                        ></TextField>
                    </div>
                </div>
                <div id='toxic-mvp-cont'>
                    <div className='mvp'>
                        <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px', marginBottom: '10%' }}>MVP</InputLabel>
                        <Autocomplete
                            value={mvp}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='15'
                            id="15"
                            onChange={(event, value, reason) => handleMVPorToxic(value, reason, setMVP)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                    <div className='toxic'>
                        <InputLabel sx={{ borderBottom: 'solid', borderBottomWidth: '1px', marginBottom: '10%' }}>Toxic</InputLabel>
                        <Autocomplete
                            value={toxic}
                            isOptionEqualToValue={(option, value) => option.value === value.value}
                            aria-label='16'
                            id="16"
                            onChange={(event, value, reason) => handleMVPorToxic(value, reason, setToxic)}
                            placeholder="Cerca Giocatore"
                            options={playersList.map((player) => (`${player.name} ${player.surname} (${player.nickname})`))}
                            sx={{ maxWidth: 300, minWidth: 75 }}>
                        </Autocomplete>
                    </div>
                </div>
                <div id='date-picker'>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                        <DatePicker
                            sx={{ color: 'white' }}
                            timezone='Europe/Rome'
                            label='Giorno della partita'
                            value={matchDay}
                            onChange={(value) => setMatchDay(value)}>
                        </DatePicker>
                    </LocalizationProvider>
                </div>
                <div id='password'>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' sx={{ width: '60%' }}></Input>
                </div>
                <div id='button-container'>
                    <Button variant="contained" onClick={e => handleSubmit(e)}>Aggiungi Partita</Button>
                </div>
            </div>
        </div>

    )
}//<Input value={player1.vote} onChange={(e,v)=>{setVote(e.target.value, player1, setPlayer1)}}placeholder='voto' sx={{width:75}} required></Input>