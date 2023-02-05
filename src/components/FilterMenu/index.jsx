import React, {useState, useEffect} from 'react';
import './styles.scss'
import CategoryFilter from '../CategoryFilter';

const FilterMenu = ({ categories, onToggle, show, setMenu }) => {
  // const [displayNone, setDisplayNone] = useState(true);

  // useEffect(() => {
  //   if (show) {
  //     setDisplayNone(false);
  //   } else {
  //     setTimeout(() => {
  //       setDisplayNone(true);
  //     }, 500)
  //   }
  // }, [show])

  return (
    <div className={`filter-menu ${show ? "show" : ""}`} >
      <div className='wrapper'>
        <button onClick={() => {setMenu(false)}}>Close</button>
        <CategoryFilter categories={categories} onToggle={onToggle} />
      </div>
    </div>
  )
}

export default FilterMenu;