import React, {useState, useEffect, useRef} from 'react';
import './App.scss'
import TheHeader from './TheHeader';
import PostCard from './PostCard';
import Pagination from './Pagination';
import CategoryFilter from './CategoryFilter';
import Spinner from './Spinner';
import FilterMenu from './FilterMenu';

function App() {
  const [isInit, setIsInit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPosts, setCurrentPosts] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState({});
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const postListElement = useRef();

  const fetchData = async () => {
    if(isLoading) return;

    setIsLoading(true);
    const filterCategories = getFilterCategories();
    const response = await fetch(`./api/posts?page=${currentPage}&limit=10&filter=${filterCategories}`);
    const resData = JSON.parse(response._bodyInit);
    setTotalPages(resData.totalPages);
    setCurrentPosts(resData.posts);

    setIsLoading(false);
  }

  const getCategories = async () => {
    const response = await fetch('./api/categories');

    const initCategories = {}
    JSON.parse(response._bodyInit).categories.forEach(category => {
      initCategories[category] = false;
    })

    setCategories(initCategories);
  }

  const nextPage = () => {
    if(currentPage + 1 > totalPages || isLoading) return;

    setCurrentPage(prevState => (prevState + 1))
    postListElement.current.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const prevPage = () => {
    if(currentPage === 1 || isLoading) return;

    setCurrentPage(prevState => (prevState - 1))
    postListElement.current.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const getFilterCategories = () => {
    const filter = []
    Object.keys(categories).forEach(category => {
      if(categories[category]) {
        filter.push(category)
      }
    })

    return filter.join(',')
  }

  const setFilter = (category) => {
    if(isLoading) return

    const newObj = {
      ...categories
    }
    newObj[category] = !categories[category]
    setCategories(newObj)
  }

  const setMenu = (bool) => {
    setShowFilterMenu(bool)
  }

  useEffect(() => {
    if(!isInit) return

    if(currentPage === 1) {
      fetchData();
    } else {
      setCurrentPage(1)
    }

    postListElement.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [categories])

  useEffect(() => {
    getCategories();
    fetchData().then(() => setIsInit(true));
  }, [])

  useEffect(() => {
    if(!isInit) return
    fetchData();
  }, [currentPage])

  return <div className="container">
    <TheHeader onFilterClick={() => setMenu(true)} />
    <div className="content-wrapper">
      <div className="category-section">
        <CategoryFilter categories={categories} onToggle={setFilter} />
      </div>
      <div ref={postListElement} className="main-section">
        <div className="post-list">
          { currentPosts && currentPosts.map((post) => {
            return (<PostCard key={post.id} data={post} />)
          }) }
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </div>
    <FilterMenu categories={categories} onToggle={setFilter} show={showFilterMenu} setMenu={setMenu} />
    <Spinner show={isLoading} />
  </div>;
}

export default App;
