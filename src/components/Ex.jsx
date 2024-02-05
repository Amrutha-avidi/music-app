import { useState, useEffect } from 'react';

var a
export default function Ex() {
    const [audio, setAudio] = useState(null)
    const [isPlaying, setIsPlaying] = useState(true)

    console.log(audio)

    useEffect(() => {
        if (a) {
            a.pause();
            a = null;
            setIsPlaying("Play");
        }
        if (audio) {
            a = new Audio(audio);
            a.onended = () => {
                setIsPlaying("Play");
            };
        }
    }, [audio]);

    const handleClick = () => {
        if (isPlaying) {
            a.play()
            setIsPlaying(false)
        }
        else {
            a.pause()
            setIsPlaying(true)
        }
    }
    const set = (e)=>{
       setAudio(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <div >

            <input type='file' 
            onChange={set} />
            {isPlaying ? <button onClick={handleClick}>Play</button> :
                <button onClick={handleClick}>Pause</button>}
        </div>
    );
}

