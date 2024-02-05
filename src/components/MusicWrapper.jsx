import React, { useState, useEffect } from 'react'
import MusicForm from './MusicForm'
import styled from 'styled-components'
import { v4 as uuid } from "uuid";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FcMusic } from "react-icons/fc";
import Player from './Player';


// const getLocalItems = () => {
//   let list = localStorage.getItem('playlist')
//   if (list) {
//     return JSON.parse(localStorage.getItem('playlist'))
//   } else {
//     return []
//   }
// }

// const getNowPlaying = () => {
//   let running = localStorage.getItem('nowPlaying') || 'default value';
//   if (running) {
//     return JSON.parse(localStorage.getItem('nowPlaying'))
//   } else {
//     return ''
//   }
// }


const MusicWrapper = () => {
  const [playlist, setPlaylist] = useState([])
  const [currentSong, setCurrentSong] = useState(null)


  const addSong = (audio, songName) => {
    setPlaylist([...playlist, { id: uuid(), audio, name: songName }])
    
  }

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist))
  }, [playlist])


  // useEffect(() => {
  //   localStorage.setItem('nowPlaying', JSON.stringify(currentSong))
  // }, [currentSong])


  const removeSong = (song) => {
    const newPlaylist = playlist.filter((each) => each.id !== song.id)
    setPlaylist(newPlaylist)

    if (playlist.length > 0) {

      const index = playlist.findIndex(each => each.name === song.name)
      if (song === currentSong) {
        setCurrentSong(playlist[index - 1])
        // getNowPlaying()
      }
    }
  }


  return (
    <Container>
      <MusicForm addSong={addSong} />
      {playlist.map(each => (
        <SongItem key={each.id}>
          <div onClick={() => setCurrentSong(each)}>
            <FcMusic size={40} />
            <p>{each.name}</p>
          </div>
          <MdOutlineDeleteOutline size={32}
            onClick={() => removeSong(each)} />
        </SongItem>
      ))}

      {currentSong ? (
        <PlayerCon>
          <Player
            playlist={playlist}
            setPlaylist={setPlaylist}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong} />
        </PlayerCon>
      )
        : (<div></div>)
      }

    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    label{
        display: flex;
        align-items: center;
        justify-content: right;
        button{
            background-color: transparent;
            border:0;
        }
    }
`

const SongItem = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 3rem ;
    div{
        display: flex;
        align-items: center;
        gap:20px;
        cursor: pointer;
        p{
            font-size:30px;
        }
    }
`
const PlayerCon = styled.div`
     position: absolute;
    bottom: 1px;
    width: 100%;
    background-color: gold;
    padding:30px;
`


export default MusicWrapper