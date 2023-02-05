import React, {useState, useEffect} from 'react';
import './styles.scss'
import CategoriesColor from '../../static/CategoriesColor';

const CategoryFilter = (props) => {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    setCategories(props.categories)
  }, [props])

  const onToggle = (category) => {
    props.onToggle(category)
  }

  return (
    <div className='category-container'>
      <div className='category-title'>
        Category Filter
      </div>
      <div className='categories-filter'>
        {
          Object.keys(categories).map((category, index) => {
            return (
              <div
                key={category + index}
                className='category-checkbox'
                onClick={() => onToggle(category)}
                style={{
                  border: `1px solid ${CategoriesColor[category]}`,
                  backgroundColor: categories[category] ? CategoriesColor[category] : 'white',
                  color: categories[category] ? 'white' : CategoriesColor[category]
                }}
              >
                {category}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CategoryFilter;