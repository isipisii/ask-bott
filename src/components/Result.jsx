import React, { useState } from 'react'
import ClipboardJS from "clipboard";

const Result = (props) => {
  const resultEl = document.querySelector('.result')
  const[isEmpty, setIsEmpty] = useState(false)

  function handleCopy() { 
    if (resultEl.innerText.length === 0) {
      return
    } else {
      let isHandlerAttached = false;
      const clipboard = new ClipboardJS(resultEl, {
        text: () => resultEl.innerText,
      })
      const successHandler = () => {
        props.notify()
        clipboard.off("success", successHandler);
        isHandlerAttached = false
      }
      if (!isHandlerAttached) {
        clipboard.on("success", successHandler);
        isHandlerAttached = true
      }
      clipboard.on("error", (e) => {
        console.error("Clipboard copy failed: ", e)
      })
    }
  }

  // function handleCopy(){ // for copying to clipboard
  //   if (resultEl.innerText.length === 0)  {
  //     return
  //   }
  //   else{
  //     navigator.clipboard.writeText(resultEl.innerText)
  //     props.notify()
  //   }
  // }

  function handleMouseEnter(){ //for conditional rendering of "copy-indicator"
    if (resultEl.innerText.length === 0)  {
      setIsEmpty(false)
    }
    else setIsEmpty(true)
  }

  return (
    <div className='result-container'>
      <div className='result'
        onClick={handleCopy}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={() => setIsEmpty(false)}
        id={!props.isDarkMode && 'result-light-bg'}
        >
          {props.currentText}
      </div>
      {isEmpty && <p className='copy-indicator'>Click the text to copy.</p>}
    </div>
  )
}

export default Result