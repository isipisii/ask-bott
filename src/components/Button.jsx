import React from 'react'

const Button = (props) => {
  return (
    <div className='btn-container'>
      <button 
        className='send-btn'
        onClick={props.handleClick}
        disabled={props.isEmpty ? true : false}
        id={!props.isDarkMode && 'btn-light-bg'}
      >
        {props.loading ? 'Please wait' : 'Send'}
      </button>
    </div>
  )
}

export default Button