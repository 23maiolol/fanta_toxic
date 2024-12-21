import React from "react"
import NavBar from "../components/NavBar"
import { Grid } from '@mui/joy'
import { Box, Divider, Paper } from "@mui/material";
import { useEffect } from "react";
import '../style/SingleMatch.css'

export default function SingleMatch({ match }) {

    useEffect(() => {
        let elmnts = document.querySelectorAll('.vote')
        console.log(elmnts)
        elmnts.forEach((el) => {
            if (el) {
                if (parseFloat(el.innerText) >= 7)
                    el.style.color = 'green'
                else if (parseFloat(el.innerText) >= 6)
                    el.style.color = 'orange'
                else
                    el.style.color = 'red'
            }
        })

    }, [])

    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>
            <div>
                <Paper elevation={5} sx={{ margin: '4%' }}>
                    <Grid sx={{ display: 'flex', flexDirection: 'column', margin: '4%' }}>

                        <Box sx={{ display: 'flex', justifyContent: 'center', fontWeight: '800', marginTop: '2%', marginBottom: '2%', fontSize: 'larger' }}>Pagelle {match.date}</Box>

                        <Divider variant="" textAlign='left' sx={{ color: 'goldenrod', fontWeight: '800' }}>MVP</Divider>
                        <Box sx={{ display: 'flex', marginBottom: { xs: '4%', s: '4%', md: '4%', l: '1%', xl: '1%' }, marginTop: { xs: '4%', s: '4%', md: '4%', l: '1%', xl: '1%' }, marginLeft: '1.5%', justifyContent: 'left' }}>
                            <span className="prop value comment"><a href={`/${match.mvp._id}`}>{match.mvp.name} {match.mvp.surname}</a></span>
                        </Box>
                        <Divider variant="" textAlign='left' sx={{ color: 'purple', fontWeight: '800' }}>Toxic</Divider>
                        <Box sx={{ display: 'flex', marginBottom: { xs: '4%', s: '4%', md: '4%', l: '1%', xl: '1%' }, marginTop: { xs: '4%', s: '4%', md: '4%', l: '1%', xl: '1%' }, marginLeft: '1.5%', justifyContent: 'left' }}>
                            <span className="prop value comment"><a href={`/${match.toxic._id}`}>{match.toxic.name} {match.toxic.surname}</a></span>
                        </Box>
                        <Divider variant="" textAlign='left' sx={{ fontWeight: '800', color: 'primary.700' }}>Giocatori</Divider>
                        {match.reports.map((report, index) => {
                            let player_link = `/${report.player._id}`
                            if (index === 0)
                                return <Box key={index} sx={{ marginBottom: { xs: '4%', s: '4%', md: '4%', l: '1%', xl: '1%' }, marginTop: { xs: '4%', s: '4%', md: '4%', l: '1%', xl: '1%' } }}>
                                    <Box sx={{ marginLeft: '4%', paddingRight: '2%' }}>
                                        <Box sx={{ display: 'flex' }}>
                                            <span className="mprop mtag">Nome:</span><span className="mprop mvalue"><a href={player_link}>{report.player.name} {report.player.surname}</a></span>
                                        </Box>
                                        <Box sx={{ display: 'flex' }}>
                                            <span className="mprop mtag">Voto:</span><span className="mprop mvalue vote">{report.vote}</span>
                                        </Box>
                                        <Box sx={{ display: 'flex' }}>
                                            <span className="mprop mtag">Commento:</span><span className="mprop mvalue mcomment">{report.comment}</span>
                                        </Box>
                                    </Box>

                                </Box>
                            else
                                return <Box key={index} sx={{ marginBottom: { xs: '4%', s: '4%', md: '4%', l: '1%', xl: '1%' }, marginTop: { xs: '2%', s: '2%', md: '2%', l: '1%', xl: '1%' } }}>
                                    <Divider variant="" textAlign='left' sx={{ color: 'darkblue', fontWeight: '800' }}></Divider>
                                    <Box sx={{ marginLeft: '4%', paddingRight: '2%' }}>
                                        <Box sx={{ display: 'flex', marginTop: { xs: '4%', s: '4%', md: '4%', l: '1%', xl: '1%' } }}>
                                            <span className="mprop mtag">Nome:</span><span className="mprop mvalue"><a href={player_link}>{report.player.name} {report.player.surname}</a></span>
                                        </Box>
                                        <Box sx={{ display: 'flex' }}>
                                            <span className="mprop mtag">Voto:</span><span className="mprop mvalue vote">{report.vote}</span>
                                        </Box>
                                        <Box sx={{ display: 'flex' }}>
                                            <span className="mprop mtag">Commento:</span><span className="mprop mvalue comment">{report.comment}</span>
                                        </Box>
                                    </Box>

                                </Box>
                        })}

                    </Grid>
                </Paper>
            </div>
        </div>
    )
}