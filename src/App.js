import './App.css';
import React, { useState } from 'react';
import Header from './Header';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import { Configuration, OpenAIApi } from "openai";
// require('dotenv').config();
 

function App() {
  // the prompt will be updated at each key stroke, from the input area and bubble it up to this component, to be used in the openAI request
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-NpSEZ2OrlvyZf7TAKLgRD0UL/user-Tv2mvpJS18PUGwlcFXQkfm7c/img-t7W3CVXWOyfCIbu6TbrgAruj.png?st=2023-04-06T10%3A53%3A38Z&se=2023-04-06T12%3A53%3A38Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-05T20%3A47%3A22Z&ske=2023-04-06T20%3A47%3A22Z&sks=b&skv=2021-08-06&sig=xs50WZ6XIte9dD/Yk3DNbzXRBQbSjyz9oSiyYu7Fx0c%3D");
  // the chatData is to keep the history of our chat + the newest response. The reason why the newest reponse is separate? wanted to give it a special 'types' effect
  const [chatData, setChatData] = useState({ "history": [{ "type": "openai", "data": "Type whatever you want and I will try generate an image based on it!" }], "response": "" });
  
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
  });

  const openai = new OpenAIApi(configuration);

  const generateResponse = async () => {
    if (prompt === "") return false;
  
    let newChatData = Object.assign({}, chatData);
    if (chatData.response !== "") {
      newChatData.history.push({ type: "openai", data: chatData.response });
    }
    newChatData.history.push({ type: "user", data: prompt });
  
    // let openAIPrompt = "Generate an image based on this prompt:" + prompt;
    try {
      // const openaiInstance = new OpenAIApi(process.env.REACT_APP_OPENAI_API_KEY);
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: '256x256',
      });
      setImageUrl(response.data.data[0].url);
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
      <Header></Header>
      <div className='chat-container'>
        <ChatHistory chatHistory={chatData.history} response={chatData.response} />
        <div>
          {/* <img src = {imageUrl} /> */}
        </div>
        <ChatInput handleChange={setPrompt} handleClick={generateResponse}></ChatInput>
      </div>
    </div>
  );
}

export default App;