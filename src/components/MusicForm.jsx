import React, {  useState } from 'react'


const MusicForm = ({ addSong }) => {

    const [audio, setAudio] = useState('')
    const [songName, setSongName] = useState('')


    const addFile =  (e) => {
        let selected = e.target.files[0]
        if (selected) {
            setSongName(selected.name)
            setAudio(URL.createObjectURL(selected));
        }
    };
    
    const addToPlaylist = () => {
        if (audio) {
            addSong(audio, songName)
        }
    }

    console.log(audio)

    return (
        <form >
            <input type='file' onChange={addFile}  />
            <button onClick={addToPlaylist}>Add</button>
        </form>
    )
}

export default MusicForm