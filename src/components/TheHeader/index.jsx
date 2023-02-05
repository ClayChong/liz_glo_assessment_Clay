import './styles.scss'

const TheHeader = ({ onFilterClick }) => {
  return (
    <div className="header">
      <p>My Posts</p>
      <button onClick={onFilterClick}>Filter</button>
    </div>
  )
}

export default TheHeader