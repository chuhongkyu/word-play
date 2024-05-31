import styles from "@/styles/Detail.module.scss";
import React, { memo, useRef, useState } from "react";

const SoundBtn = memo(({url = "/assets/audio/01-01.wav"} : {url: string}) => {
    const [playCount, setPlayCount] = useState(2); 
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const onHandlePlay = () => {
        if (audioRef.current) {
            audioRef.current?.play();
        }
    };

    const onHandleAudioEnd = () => {
        setPlayCount(prev => prev - 1);
    };

    return(
        <button className={styles['sound-btn']} onClick={onHandlePlay} disabled={playCount == 0 ? true: false}>
            <span>{playCount}</span>
            <img width={40} height={40} src="/assets/icon/mic.png" alt="mic"/>
            <audio 
                ref={audioRef} 
                src={url} 
                onEnded={onHandleAudioEnd}
                />
            <p className="ally">음성 퀴즈 버튼</p>
        </button>
    )
})

export default SoundBtn;