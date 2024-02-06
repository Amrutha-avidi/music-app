import React, { useState } from 'react'
import styled from 'styled-components';
import logo from '../media/logo.png'
import { FaPlus } from "react-icons/fa6";



const MusicForm = ({ addSong }) => {

    const [audio, setAudio] = useState('')
    const [songName, setSongName] = useState('')


    const addFile = (e) => {

        let selected = e.target.files[0]
        if (selected) {
            setSongName(selected.name)
            setAudio(URL.createObjectURL(selected));
        }
        e.preventDefault()
    };

    const addToPlaylist = () => {
        if (audio) {
            addSong(audio, songName)
        }
    }

    return (
        <UploadCon>
            <img src={logo} alt='logo' />
            <Input >
                <input id='file' type='file' onChange={addFile} />
                <label htmlFor='file'>
                    <p>Select File</p>
                </label>
                <button onClick={addToPlaylist}><FaPlus /></button>

            </Input>
        </UploadCon>
    )
}

const UploadCon = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px 50px;
img{
    width: 10rem;
}
`

const Input = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    input{
        opacity: 0;
        width: 0.1px;
        height: 0.1px;
        position: absolute;
    }
    label{
        display: block;
        position: relative;
        width: 200px;
        height: 50px;
        border-radius: 25px;
        background: linear-gradient(40deg, #eccbdf, #e433a0);
        box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: transform .2s ease-out;
        
    }
    button{
        width: 50px;
        height: 50px;
        border-radius: 25px;
        border:0;
        margin-left: 5px;
        background: linear-gradient(40deg, #e433a0, #eccbdf);
        box-shadow: 0 4px 7px rgba(0, 0, 0, 0.4);
    }
`

export default MusicForm