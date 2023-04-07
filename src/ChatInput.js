import {useRef} from "react";

function ChatInput({ handleChange, handleClick }) {

    const inputRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
    }
    function resetForm(){
        inputRef.current.value = "";
    }

    return (
        <div className="input-area">
            <form className="input-container" onSubmit={(e) => handleSubmit(e)}>
                    <input ref={inputRef} type="text" placeholder="Orange cat with a moustache..." id="user-input" onChange={(e) => handleChange(e.target.value)} />
                    <button type="submit" onClick={() => {
                        handleClick();
                        resetForm();
                        }}>Unleash your imagination</button>
            </form>
        </div>
    )
}

export default ChatInput;