import React, { useState, useEffect } from 'react'
import MusicForm from './MusicForm'
import styled from 'styled-components'
import { v4 as uuid } from "uuid";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FcMusic } from "react-icons/fc";
import Player from './Player';


const getLocalItems = () => {
  let list = localStorage.getItem('playlist')
  if (list) {
    return JSON.parse(localStorage.getItem('playlist'))
  } else {
    return []
  }
}

const getNowPlaying = () => {
  let running = localStorage.getItem('nowPlaying')
  if (running) {
    return JSON.parse(localStorage.getItem('nowPlaying'))
  }
  return null
}




const MusicWrapper = () => {
  const [playlist, setPlaylist] = useState(getLocalItems())
  const [currentSong, setCurrentSong] = useState(getNowPlaying())


  const addSong = (audio, songName) => {
    setPlaylist([...playlist, { id: uuid(), audio, name: songName }])

  }


  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist))
  }, [playlist])

  useEffect(() => {
    localStorage.setItem('nowPlaying', JSON.stringify(currentSong))
  }, [currentSong])



  const removeSong = (song) => {
      if (playlist.length === 0 || song === currentSong) {
      localStorage.setItem('nowPlaying', '')
      setCurrentSong(null)
    }
    const newPlaylist = playlist.filter((each) => each.id !== song.id)
    setPlaylist(newPlaylist)

  

    // getNowPlaying()

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
          <hr />
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
    background: rgb(18, 6, 241);
background: linear-gradient(124deg, rgba(4,1,59,1) 16%, rgba(12,12,177,0.7343312324929971) 69%);
    /* background-color: #837e7e; */
    height: 100vh;
    color:white;
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
 color:white;
     position: absolute;
    bottom: 1px;
    width: 100%;
      background-color: transparent;
   
    /* box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;  */
      padding:10px 40px;
`


export default MusicWrapper