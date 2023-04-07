import {useRef} from "react";
import React, { useState } from 'react';
import LoadingScreen from './LoadingScreen';

function ChatInput({ handleChange, handleClick }) {

    const inputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
    }
    function resetForm(){
        inputRef.current.value = "";
    }

    const handleButtonClick = () => {
        setIsLoading(true);
        setIsOverlayVisible(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsOverlayVisible(false);
        }, 5000);
};

    return (
        <div className="input-area">
            <form className="input-container" onSubmit={(e) => handleSubmit(e)}>
                    <input ref={inputRef} type="text" placeholder="Orange cat with a moustache..." id="user-input" onChange={(e) => handleChange(e.target.value)} />
                    <button type="submit" onClick={() => {
                        handleClick();
                        resetForm();
                        handleButtonClick();
                        }}>Unleash your imagination</button>
                        {isLoading && <LoadingScreen />}
                     {isOverlayVisible && (
        <div className="overlay" onClick={() => setIsOverlayVisible(false)} />)}
            </form>
        </div>
    )
}

export default ChatInput;