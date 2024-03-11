import styles from "@/styles/Detail.module.scss";
import { useRef, useState } from "react";

const SoundBtn = ({url} : {url: string}) => {
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
        <button className={`${styles.soundBtn}`} onClick={onHandlePlay} disabled={playCount == 0 ? true: false}>
            <span>{playCount}</span>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.5 20C27.5 18.0191 26.7334 16.226 25.4829 14.8883C24.6369 13.9832 23.3333 14.7411 23.3333 15.9801V24.0196C23.3333 25.2546 24.6301 26.0132 25.4764 25.1136C26.7308 23.7803 27.5 21.9844 27.5 20ZM6.66667 15C5.74619 15 5 15.7462 5 16.6667V23.3333C5 24.2538 5.74619 25 6.66667 25H10.9763C11.4183 25 11.8423 25.1756 12.1548 25.4882L17.1548 30.4882C18.2048 31.5381 20 30.7945 20 29.3097V10.6904C20 9.20552 18.2048 8.46191 17.1548 9.51185L12.1548 14.5119C11.8423 14.8244 11.4183 15 10.9763 15H6.66667Z" fill="#F9FAFA"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M23.3807 9.80563C23.5985 8.9113 24.5001 8.36291 25.3944 8.58076C30.1103 9.72946 33.3333 14.578 33.3333 20C33.3333 25.4221 30.1103 30.2706 25.3944 31.4193C24.5001 31.6372 23.5985 31.0888 23.3807 30.1944C23.1628 29.3001 23.7112 28.3985 24.6056 28.1807C27.4972 27.4763 30 24.2538 30 20C30 15.7463 27.4972 12.5238 24.6056 11.8194C23.7112 11.6015 23.1628 10.7 23.3807 9.80563Z" fill="white"/>
            </svg>
            <audio 
                ref={audioRef} 
                src={url} 
                onEnded={onHandleAudioEnd}
                />
        </button>
    )
}

export default SoundBtn;