import Players from './pages/Players';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SinglePlayer from './pages/SinglePlayer';
import NewPlayer from './pages/NewPlayer';
import NewMatch7 from './pages/NewMatch7';
import NewMatch8 from './pages/NewMatch8';
import Matches from './pages/Matches';
import SingleMatch from './pages/SingleMatch';
import Statistics from './pages/Statistics';
import ErrorPage from './pages/ErrorPage';
import InitPage from './pages/InitPage';
import Loading from './pages/Loading';

import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  CssVarsProvider as JoyCssVarsProvider,
  extendTheme as joyExtendTheme,
} from "@mui/joy/styles";
import {
  createTheme as materialExtendTheme,
  ThemeProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import MatchTypeChoice from './pages/MatchTypeChoice';



const theme = {
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        background: {
          default: "#ffffff",
        },
        primary: {
          main: "#503fc9",
          50: "#ece5fd",
          100: "#cdbdf8",
          200: "#ae98f1",
          300: "#8e76e7",
          400: "#6e58da",
          500: "#503fc9",
          600: "#342cb5",
          700: "#1d1e9c",
          800: "#111580",
          900: "#101063",
        },
      },
    },
  }
};

const materialTheme = materialExtendTheme(theme);
const joyTheme = joyExtendTheme(theme);

function App() {
  const [loading, setLoading] = useState(true)
  const [playersList, setPlayerList] = useState(null)
  const [matchList, setMatchList] = useState(null)
  const [e, setE] = useState(false)

  useEffect(() => {
    if (!matchList)
      axios.get(`${process.env.REACT_APP_ENDPOINT}/match/list`).then(response => {setMatchList(response.data) }).catch(e => setE(true))
    if (!playersList)
      axios.get(`${process.env.REACT_APP_ENDPOINT}/player/list`).then(response => {setPlayerList(response.data) }).catch(e => setE(true))
    if (playersList && matchList)
      setLoading(false)
    else
      setLoading(true)

  }, [playersList, matchList, e, loading])

  if (e)
    return (
      <ThemeProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider theme={joyTheme}><Router>
          <Routes>
            <Route path='*' element={<ErrorPage />}></Route>
          </Routes>
        </Router>
        </JoyCssVarsProvider>
      </ThemeProvider>);
  else if (loading)
    return (
      <Loading></Loading>
    )
  else
    return (
      <ThemeProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider theme={joyTheme}>
          <Router>
            <Routes>
              <Route path='/' element={<InitPage></InitPage>}></Route>
              <Route path='/players_menu' element={<Players playersList={playersList} key={playersList}></Players>}></Route>
              {playersList.map((player) => {
                let player_path = `/${player._id}`;
                return (<Route path={player_path} element={<SinglePlayer player={player} ></SinglePlayer>} key={player._id}></Route>)
              })}
              <Route path='/match_menu' element={<Matches matchList={matchList}></Matches>}></Route>
              {matchList.map((match) => {
                let match_path = `${match.date}`
                return (<Route path={match_path} element={<SingleMatch match={match} ></SingleMatch>} key={match.date}></Route>)
              })
              }
              <Route path='/statistics' element={<Statistics playersList={playersList} matchList={matchList} ></Statistics>}></Route>
              <Route path='/new_match_7' element={<NewMatch7 playersList={playersList}></NewMatch7>}></Route>
              <Route path='/new_match_8' element={<NewMatch8 playersList={playersList}></NewMatch8>}></Route>
              <Route path='/match_choice' element={<MatchTypeChoice></MatchTypeChoice>}></Route>
              <Route path='/new_player' element={<NewPlayer></NewPlayer>}></Route>
              <Route path='*' element={<InitPage></InitPage>}></Route>
            </Routes>
          </Router>
        </JoyCssVarsProvider>
      </ThemeProvider>
    );

}

export default App;
