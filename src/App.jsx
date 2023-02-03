import React, { useEffect, useState } from 'react'
import { Configuration, OpenAIApi } from 'openai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import Button from './components/Button';
import Input from './components/Input';
import Result from './components/Result';
import './App.css';


const App = () => {
  const {VITE_OPEN_AI_KEY} = import.meta.env
  
  const configuration = new Configuration({
    apiKey: VITE_OPEN_AI_KEY
  })
  const openai = new OpenAIApi(configuration)
  const [message, setMessage] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const [isDarkMode, setDarkMode] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)

  function toggleDarkMode(){ // dark and light mode toggler
    setDarkMode(isDarkMode => !isDarkMode)
  }
  
  function notify(){
    toast.success('Copied to clipboard.', {
      className: `${isDarkMode ? 'toastify-dark' : 'toastify-light' }`,
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: `${isDarkMode ? "dark" : "light"}`,
      });
  }

  async function handleClick(){ // for setting the data that come from open ai api
    if (!message) {
      setIsEmpty(true) // will set it true in order to disable the button when the message is empty (falsy value)
    } 
    else {
      setCurrentText("")
      setLoading(true)
      setIsEmpty(false)
        try {
          const headers = {
            "Authorization": "Bearer " + VITE_OPEN_AI_KEY
          }
          const response = await openai.createCompletion({  
            model: "text-davinci-003",
            prompt: message, 
            temperature: 0.9,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          }, {headers: headers});
          setResult(response.data.choices[0].text.trim())

        } catch (error) {
          console.log(error)
        }
    
      setLoading(false)
    }
  }

function handleOnKeyDown(e) {
  if (e.key === "Enter" && !e.shiftKey) { // will automatically send the message by hitting the enter
      e.preventDefault();
      if (e.target.value.trim() !== "") {
          handleClick();
      }
  } else if (e.key === "Enter" && e.shiftKey) { // will add another line in textarea
      e.preventDefault();
      setMessage(prevMessage => prevMessage + "\n");
  }
}

useEffect(() => { //for typewrite animation
  let index = 0;
  const intervalId = setInterval(() => {
    index += 1
    setCurrentText(value => value + result.charAt(index - 1))
  }, 20)
  return () => {
    clearInterval(intervalId)
  };
}, [result])


  return (
    <main id={!isDarkMode && 'main-light-bg'}>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme= {!isDarkMode ? "dark" : "light"}
      />
      <div className='card' id={!isDarkMode && 'card-light-bg'}>
        <h1 id={!isDarkMode && 'bot-light-color'}><span>AsK</span> BOT</h1>
        <div className='components'>
            <h3 id={!isDarkMode && 'result-light-color'}>Result:</h3>
            <Result 
              currentText={currentText}
              isDarkMode={isDarkMode}
              notify={notify}
            />
            <Input
              isDarkMode={isDarkMode} 
              message={message} 
              setMessage={setMessage} 
              handleOnKeyDown={handleOnKeyDown}
            />
            <Button
              isEmpty={isEmpty}
              isDarkMode={isDarkMode}
              handleClick={handleClick}  
              loading={loading} 
            />
        </div>
      </div>
      <p id={!isDarkMode && 'creator-light-color'}className='creator'>Made with ❤️ by Alessandro Benig.</p>
      <DarkModeSwitch
        style={{ marginBottom: '2rem', position: 'absolute', bottom: 0, right: '30px' }}
        checked={isDarkMode}
        onChange={toggleDarkMode}
        moonColor={'yellow'}
        sunColor={'orange'}
        size={35}
      />
    </main>
  )
}

export default App
