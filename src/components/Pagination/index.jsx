import React from 'react';
import './styles.scss'

const Pagination = ({ currentPage, totalPages, nextPage, prevPage }) => {

  return (<div className='pagination'>
      <button onClick={prevPage}>Prev</button>
      <span style={{margin: "0 12px"}}>{currentPage} / {totalPages}</span>
      <button onClick={nextPage}>Next</button>
  </div>)
}

export default Pagination;