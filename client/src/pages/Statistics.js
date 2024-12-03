import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Grid, Box } from "@mui/joy";
import { Divider, Paper } from "@mui/material";
import BChart from "../components/BChart";
import "../style/Statistics.css"

export default function Statistics({ playersList, matchList }) {
    let [worst5, setWorst] = useState([])
    let [top5, setTop] = useState([])
    let [toxic, setToxic] = useState('')
    let [mvp, setMvp] = useState('')

    function FindToxic(pList) {
        let toxic = pList[0]
        for (let player of pList.slice(1,)) {
            if (player.toxic.length > toxic.toxic.length) {
                toxic = player
            }
        }
        return toxic
    }

    function FindMvp(pList) {
        let mvp = pList[0]
        for (let player of pList.slice(1,)) {
            if (player.mvp.length > mvp.mvp.length) {
                mvp = player
            }
        }
        return mvp
    }


    function calcAv(player) {
        if (player.votes.length > 0) {
            let av = Math.round((player.votes.reduce((acc, curr) => acc + curr) / player.votes.length) * 100) / 100
            return { ...player, votes: av }
        }
        else
            return { ...player, votes: 0 }
    }


    function FindMax5(arr) {
        let first = arr[0]
        let second = { votes: 0 }
        let third = { votes: 0 }
        let fourth = { votes: 0 }
        let fifth = { votes: 0 }

        for (let player of arr.slice(1,)) {
            if (player.votes > first.votes) {
                fifth = fourth
                fourth = third
                third = second
                second = first
                first = player
            }
            else if ((second.votes < player.votes) && (player.votes <= first.votes)) {
                fifth = fourth
                fourth = third
                third = second
                second = player
            }
            else if ((third.votes < player.votes) && (player.votes <= second.votes)) {
                fifth = fourth
                fourth = third
                third = player
            }
            else if ((fourth.votes < player.votes) && (player.votes <= third.votes)) {
                fifth = fourth
                fourth = player
            }
            else if ((fifth.votes < player.votes) && (player.votes <= fourth.votes)) {
                fifth = player
            }
        }
        return [first, second, third, fourth, fifth]
    }

    function FindMin5(arr) {
        let fifth = arr[0]
        let fourth = { votes: 11 }
        let third = { votes: 11 }
        let second = { votes: 11 }
        let first = { votes: 11 }

        for (let player of arr.slice(1,)) {
            if (player.votes < fifth.votes) {
                first = second
                second = third
                third = fourth
                fourth = fifth
                fifth = player
            }
            else if ((fourth.votes > player.votes) && (player.votes >= fifth.votes)) {
                first = second
                second = third
                third = fourth
                fourth = player
            }
            else if ((third.votes > player.votes) && (player.votes >= fourth.votes)) {
                first = second
                second = third
                third = player
            }
            else if ((second.votes > player.votes) && (player.votes >= third.votes)) {
                first = second
                second = player
            }
            else if ((first.votes > player.votes) && (player.votes >= second.votes)) {
                first = player
            }
        }
        return [first, second, third, fourth, fifth]
    }

    useEffect(() => {
        let updPlayerList = playersList.map((player) => calcAv(player))
        updPlayerList = updPlayerList.filter((player) => player.votes !== 0)  // recuper i player che hanno voti e elimino player senza voti
        return (setWorst(FindMin5(updPlayerList)),
            setTop(FindMax5(updPlayerList)),
            setToxic(FindToxic(playersList)),
            setMvp(FindMvp(playersList)))
    }, [playersList])


    if (playersList.length && matchList.length)
        return (
            <div>
                <div>
                    <NavBar></NavBar>
                </div>
                <div>
                    <Grid container spacing={1} columns={{ xs: 1, sm: 12, md: 12 }} sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Grid xs={5} sx={{ margin: '2%', height: '100%' }}>
                            <Paper elevation={5}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', fontWeight: '800', paddingTop: '2%', paddingBottom: '2%', fontSize: 'larger' }}>Migliori 5</Box>
                                <Divider variant="middle"></Divider>
                                <BChart avList={top5.map((player) => player.votes)} playerList={top5.map((player) => `${player.nickname}`)} color={'#59a14f'}>

                                </BChart>
                            </Paper>
                        </Grid>
                        <Grid xs={5} sx={{ margin: '2%', height: '100%' }}>
                            <Paper elevation={5}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', fontWeight: '800', paddingTop: '2%', paddingBottom: '2%', fontSize: 'larger' }}>Peggiori 5</Box>
                                <Divider variant="middle"></Divider>
                                <BChart avList={worst5.map((player) => player.votes)} playerList={worst5.map((player) => `${player.nickname}`)} color={'#e15759'}>

                                </BChart>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} columns={{ xs: 1, sm: 12, md: 12 }} sx={{ display: 'flex', justifyContent: 'center', flex: 'wrap', margin: '2%' }}>
                        <Grid xs={8}>
                            <Paper elevation={5} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', fontWeight: '800', paddingTop: '6%', paddingBottom: '6%', marginLeft: '2%', fontSize: 20, flexWrap: 'wrap' }}><span className="toxicspan">Il giocatore più TOXIC:</span><span className="toxicspan2">{toxic.name} {toxic.surname} ({toxic.nickname})</span></Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', fontWeight: '800', paddingTop: '6%', paddingBottom: '6%', marginLeft: '4%', fontSize: 20, flexWrap: 'wrap' }}><span className="mvpspan">Il giocatore con più MVP:</span><span className="mvpspan2">{mvp.name} {mvp.surname} ({mvp.nickname})</span></Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
        else
        return (
            <div>
                <div>
                    <NavBar></NavBar>
                </div>
                <div>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10%', color: 'primary.700', fontSize: 'larger', fontWeight: '600' }}>
                        Nessuna statistica presente
                    </Box>
                </div>
            </div>)
}