import React, { useState, useEffect } from 'react'
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsFillSkipEndCircleFill
} from 'react-icons/bs';
import styled from 'styled-components';
import s from '../media/note2.png'



var a;
const Player = ({ currentSong, playlist, setPlaylist, setCurrentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (a) {
      a.pause();
      a = null;
      setIsPlaying(true);
    }

    if (currentSong.audio) {
      a = new Audio(currentSong.audio);
      a.onended = () => {
        setIsPlaying(true);
      };
    }
  }, [currentSong]);

  const PlayPause = () => {
    if (isPlaying) {
      a.play()
      setIsPlaying(false)
    }
    else {
      a.pause()
      setIsPlaying(true)
    }
  }

  const previous = () => {
    const index = playlist.findIndex(song => song.name === currentSong.name)
    if (index === 0) {
      setCurrentSong(currentSong)
    }
    else {
      setCurrentSong(playlist[index - 1])
    }
  }
  const next = () => {
    const index = playlist.findIndex(song => song.name === currentSong.name)
    if (index === playlist.length - 1) {
      setCurrentSong(playlist[0])
    }
    else {
      setCurrentSong(playlist[index + 1])
    }
  }
  return (
    <NowPlaying>
      {/* <audio src={currentSong.audio} controls /> */}
      <Head>Now Playing</Head>
      <div>
        <p>{currentSong.name}</p>
        <div>
          <BsFillSkipStartCircleFill size={40} onClick={previous} />
          {isPlaying ? <BsFillPlayCircleFill size={45} onClick={PlayPause} /> :
            <BsFillPauseCircleFill size={45} onClick={PlayPause} />}
          <BsFillSkipEndCircleFill size={40} onClick={next} />
        </div>
      </div>
      <img src={s} alt='note' />

    </NowPlaying>
  )
}

const NowPlaying = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p{
    font-size:30px;
    font-weight: bold;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
  div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:10px;
    div{
      display: flex;
      flex-direction: row;
      align-items: center;

      gap:18px
    }
  }


img{
  width:18rem;
  height: 8rem;
}

`

const Head = styled.h1`
    text-transform: uppercase;
    background-image: linear-gradient(
      -225deg,
      #12680f 0%,
      #655ce4 35%,
      #ff1361 67%,
      #fff800 100%
    );
    background-size: auto auto;
    background-clip: border-box;
    background-size: 200% auto;
    color: #fff;
    background-clip: text;
    /* text-fill-color: transparent; */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: textclip 2s linear infinite;
    display: inline-block;
    font-size: 40px;


    @keyframes textclip {
      to {
        background-position: 200% center;
      }
    }
`


export default Player