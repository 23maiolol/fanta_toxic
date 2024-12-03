import NavBar from "../components/NavBar"
import LChart from "../components/LChart";
import { Grid } from '@mui/joy'
import { Box, Divider, Paper } from "@mui/material";
import '../style/SinglePlayer.css'
import { useEffect } from "react";

export default function SinglePlayer({ player }) {
    let average = 0

    let matchDates = player.matchList.map((match) => match.date)

    if (player.votes.length !== 0)
        average = Math.round((player.votes.reduce((acc, curr) => acc + curr) / player.votes.length) * 100) / 100

    useEffect(() => {

        let el = document.getElementById('average')
        if (el) {
            if (average >= 7)
                el.style.color = 'green'
            else if (average >= 6)
                el.style.color = 'orange'
            else
                el.style.color = 'red'
        }
    }, [average])




    return (
        <div>
            <div id='nav-cont'>
                <NavBar></NavBar>
            </div>
            <div id="grid-cont">
                <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 12, l: 12 }}>
                    <Grid xs={3} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', borderColor: 'lightgrey', borderWidth: '2px', margin: '2%' }}>
                        <Paper elevation={5} width='100%' height='100%'>
                            <Box sx={{ display: 'flex', justifyContent: 'center', fontWeight: '800', marginBottom: '2%', marginTop: '2%', fontSize: 'larger' }}>Info Giocatore</Box>
                            <Divider variant="middle" ></Divider>
                            <Box sx={{ marginLeft: '6%' }}>
                                <Box sx={{ display: 'flex', marginTop: '4%' }}>
                                    <span className="prop tag">Nome:</span><span className="prop value"> {player.name}</span>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <span className="prop tag">Cognome:</span><span className="prop value"> {player.surname}</span>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <span className="prop tag">Soprannome:</span><span className="prop value"> {player.nickname}</span>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <span className="prop tag">Ruolo:</span><span className="prop value"> {player.role}</span>
                                </Box>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: '5%' }}>
                                    <span className="prop tag">Lista Partite:</span>
                                    <ol>
                                        {player.matchList.map((match) => {
                                            if (match) {
                                                let match_link = `/${match.date}`
                                                return <li className="item" key={match.date}><a href={match_link}>{match.date}</a></li>
                                            }
                                        }
                                        )}
                                    </ol>

                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid xs={8} sx={{ display: 'flex', flexDirection: 'column', borderRadius: '10px', borderWidth: '2px', margin: '2%' }}>
                        <Paper elevation={5} width='100%' height='100%'>
                            <Box sx={{ display: 'flex', justifyContent: 'center', fontWeight: '800', marginBottom: '1%', fontSize: 'larger', marginTop: '1%' }}>Statistiche Giocatore</Box>
                            <Divider variant="middle"></Divider>
                            <Box>
                                <LChart votes={player.votes} dates={matchDates}></LChart>
                            </Box>
                            <Grid container spacing={3} columns={{ xs: 1, sm: 1, md: 12 }} sx={{ display: 'flex', margin: '2%', width: '100%', flexDirection: 'space-around' }}>
                                <Grid xs={3} sx={{ marginRight: '5%', display: 'flex', justifyContent: 'center', marginLeft: '2%' }}>
                                    <span className="stat ">Media </span><span className="stat vote ">Voti: </span><span id='average' className="stat value-stat">{average}</span>
                                </Grid>
                                <Grid xs={4} sx={{ marginRight: '5%', display: 'flex', justifyContent: 'center' }}>
                                    <span className="stat ">Toxic:</span><span className="stat value-stat toxic">{player.toxic.length}</span>
                                </Grid>
                                <Grid xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <span className="stat ">MVP:</span><span className="stat value-stat mvp">{player.mvp.length}</span>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>

    )
}