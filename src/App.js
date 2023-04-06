import './App.css';
import React, { useState } from 'react';
import Header from './Header';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import { Configuration, OpenAIApi } from "openai";
// require('dotenv').config();
 
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

function App() {
  // the prompt will be updated at each key stroke, from the input area and bubble it up to this component, to be used in the openAI request
  const [prompt, setPrompt] = useState("");
  // the chatData is to keep the history of our chat + the newest response. The reason why the newest reponse is separate? wanted to give it a special 'types' effect 
  const [chatData, setChatData] = useState({ "history": [{ "type": "openai", "data": "Type whatever you want and I will try to generate an image based on it!" }], "response": "" });
  
    

  const generateResponse = async () => {
    if (prompt === "") return;
  
    let newChatData = Object.assign({}, chatData);
    if (chatData.response !== "") {
      newChatData.history.push({ type: "openai", data: chatData.response });
    }
    newChatData.history.push({ type: "user", data: prompt });
    setChatData(newChatData);
  
    // let openAIPrompt = "Generate an image based on this prompt:" + prompt;
    try {
      // const openaiInstance = new OpenAIApi(process.env.REACT_APP_OPENAI_API_KEY);
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: '256x256',
      });
      // setImageUrl(response.data.url);
      newChatData.response = "Here is your image. Hope you like it!";
      //newChatData.response = <img src={response.data.data[0].url} alt="Generated Image" />;
      newChatData.history.push({ type: "openai", data: <img src={response.data.data[0].url}/> });
    } catch (error) {
      console.error(error);
      newChatData.response = "Sorry, there was an error generating the image.";
    }
    setChatData(newChatData);
   };
 
  return (
    <div className="App">
      <Header/>
      <div className='chat-container'>
        <ChatHistory chatHistory={chatData.history} response={chatData.response} />

        <ChatInput handleChange={setPrompt} handleClick={generateResponse}></ChatInput>
      </div>
    </div>
  );
}

export default App;