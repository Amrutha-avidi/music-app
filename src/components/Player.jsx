import React, { useState, useEffect } from 'react'

var a;
const Player = ({ currentSong }) => {
  const [isPlaying, setIsPlaying] = useState(true)
  console.log(currentSong.audio)

  

  // useEffect(() => {
  //   if (a) {
  //     a.pause();
  //     a = null;
  //     setIsPlaying(true);
  //   }

  //   if (currentSong.audio) {
  //     a = new Audio(currentSong.audio);
  //     a.onended = () => {
  //       setIsPlaying(true);
  //     };
  //   }
  // }, [currentSong]);

  // const handleClick = () => {
  //   if (isPlaying) {
  //     a.play()
  //     setIsPlaying(false)
  //   }
  //   else {
  //     a.pause()
  //     setIsPlaying(true)
  //   }
  // }


  return (
    <div>
      <audio src={currentSong.audio} controls />
       
      {/* <p>{currentSong.name}</p>
      {isPlaying ?
        <button onClick={handleClick}>Play</button> :
        <button onClick={handleClick}>Pause</button>} */}
    </div>
  )
}

export default Player