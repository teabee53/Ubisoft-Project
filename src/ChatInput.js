function ChatInput({ handleChange, handleClick }) {
    function handleSubmit(e) {
        e.preventDefault();
        
        e.target.reset();
    }

    return (
        <div className="input-area">
            <form className="input-container" onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder="Orange cat with a moustache..." id="user-input" onChange={(e) => handleChange(e.target.value)} />
                    <button type="submit" onClick={handleClick}>Unleash your imagination</button>
            </form>
        </div>
    )
}

export default ChatInput;