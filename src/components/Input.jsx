import React from 'react'

const Input = (props) => {

  function handleChange(e){ //will handle the inputs and pass it in setMessage state
    e.preventDefault()
    props.setMessage(e.target.value)
  }

  return (
    <textarea 
      placeholder='Ask something or anything...' 
      type='text' 
      onChange={handleChange} 
      value={props.message}
      onKeyDown={props.handleOnKeyDown}
    >
    </textarea>
  )
}

export default Input