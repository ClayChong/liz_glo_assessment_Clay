import React, {useState, useEffect} from 'react';
import './styles.scss'
import CategoriesColor from '../../static/CategoriesColor';

const PostCard = (props) => {
  const [author, setAuthor] = useState('')
  const [avatar, setAvatar] = useState('')
  const [publishDate, setPublishDate] = useState('')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setAuthor(props.data.author.name)
    setAvatar(props.data.author.avatar)
    setPublishDate(new Date(props.data.publishDate).toLocaleDateString())
    setTitle(props.data.title)
    setSummary(props.data.summary)
    setCategories(props.data.categories.map(category => {
      return category.name
    }))
  }, [props])

  return (<div className='post-card'>
    <div className='post-card-header'>
      <div className='avatar'>
        <img src={avatar} />
      </div>
      <div>
        <p><strong>{author}</strong></p>
        <small style={{color: 'gray'}}>{publishDate}</small>
      </div>
    </div>
    <div className="post-card-categories-container">
      {
        categories && categories.map((category, index) => {
          return (
            <div className="post-card-categories-item" key={category + index} style={{backgroundColor: CategoriesColor[category]}}>
              {category}
            </div>
          )
        })
      }
    </div>
    <div>
      <h1 style={{marginBottom: '12px'}}>{title}</h1>
      <p>{summary}</p>
    </div>
  </div>)
}

export default PostCard;