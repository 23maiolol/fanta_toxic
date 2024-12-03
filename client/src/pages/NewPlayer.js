import { useState } from "react";
import NavBar from "../components/NavBar";
import { FormLabel, Input, Radio, Box } from "@mui/joy";
import { Button } from "@mui/material";
import '../style/NewPlayer.css'
import axios from 'axios'
import jsSHA from "jssha/sha1";

export default function NewPlayer({ player }) {
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [surname, setSurname] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')

    function handleChange(event) {
        if (event) {
            console.log(event.target.value)
            setRole(event.target.value)
        }
    }

    function flMaiusc(str) {
        if (!str) return str;

        return str[0].toUpperCase() + str.slice(1);
    }

    function passwToHash(psswrd){
        let txtHash = new jsSHA('SHA-1', 'TEXT', {encoding: 'UTF8'})
        txtHash.update(psswrd)
        return txtHash.getHash('HEX')
    }

    function handleSubmit(e) {
        e.preventDefault()

        let hPassword = passwToHash(password)
        if (!name)
            alert("Inserisci il nome")
        else if (!surname)
            alert("Inserisci il cognome")
        else if (!role)
            alert("Inserisci il ruolo")
        else if (!nickname)
            alert("Inserisci il soprannome")
        else if (hPassword !== process.env.REACT_APP_PLAYER_PASSWORD)
            alert("Password Incorretta")
        else {
            let player = {
                name: name,
                surname: surname,
                nickname: nickname,
                role: role,
                votes: [],
                matchList: [],
                toxic: [],
                mvp: []
            }
            axios(
                {
                    method: 'post',
                    url: 'http://localhost:3005/player/new',
                    data: player
                }
            )
            .then(data=>{
                alert("Giocatore aggiunto Correttamente")
                window.location.reload()
            })
            .catch(error => {
                if (error.status === 409)
                    return alert('Attenzione: Esiste giá un giocatore con queste informazioni');
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
                <div>
                    <Input placeholder="Nome" value={flMaiusc(name)} onChange={(event) => setName(event.target.value)}></Input>
                </div>
                <div>
                    <Input placeholder="Cognome" value={flMaiusc(surname)} onChange={(event) => setSurname(event.target.value)}></Input>
                </div>
                <div>
                    <Input placeholder="Soprannome" value={nickname} onChange={(event) => setNickname(event.target.value)}></Input>
                </div>
                <div id='radio-container'>
                    <FormLabel sx={{ paddingRight: 2, paddingBottom: 2, paddingTop: 1 }}>Ruolo </FormLabel>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Radio
                            label='Difensore/Terzino'
                            checked={role === 'D'}
                            onChange={handleChange}
                            value="D"
                            name="radio-buttons"
                            slotProps={{ input: { 'aria-label': 'D' } }}
                        />
                        <Radio
                            label='Centrocampista'
                            checked={role === 'C'}
                            onChange={handleChange}
                            value="C"
                            name="radio-buttons"
                            slotProps={{ input: { 'aria-label': 'C' } }}
                        />
                        <Radio
                            label='Attaccante'
                            checked={role === 'A'}
                            onChange={handleChange}
                            value="A"
                            name="radio-buttons"
                            slotProps={{ input: { 'aria-label': 'A' } }}
                        />
                    </Box>
                </div>
                <div id='plpassword'>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' sx={{ width: '70%', marginTop:{xs:'5%', s:'5%', md:'2%', l:'2%', xl:'2%'} }}></Input>
                </div>
                <div id='button-container'>
                    <Button variant="contained" onClick={e => handleSubmit(e)}>Aggiungi Giocatore</Button>
                </div>
            </div>
        </div>
    )

}