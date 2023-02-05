import React from 'react';
import './styles.scss'

const Spinner = (props) => {
  return (
    <div
      className="spinner"
      onClick={(e) => e.stopPropagation()}
      style={{display: props.show ? 'flex' : 'none'}}
    >
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div>Loading...</div>
    </div>
  )
}

export default Spinner;