import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Posts from './components/Posts';
import Pagination from './components/Pagination';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(()=> {
    const fetchPosts = async() => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setPrevDisabled(false);
    setNextDisabled(false);
  }
  
  const handlePreviousClick = () => {
    if(currentPage >= 1) {
      setCurrentPage(currentPage - 1);
    }
    setCurrentPage(1);
    setPrevDisabled(true);
  }

  const handleNextClick = () => {
    const lastPageIndex = Math.ceil(posts.length / postsPerPage);
    if(currentPage <= lastPageIndex ) {
      setCurrentPage(currentPage + 1);
    }
    setCurrentPage(lastPageIndex);
    setNextDisabled(true);
  }
  return (
    <div className="container">
      <h1 className="text-center mb-3">My Blog</h1>
      <Posts posts={currentPosts} loading={loading}/>
      <Pagination 
        postsPerPage={postsPerPage} 
        totalPosts={posts.length} 
        paginate={paginate} 
        handlePreviousClick={handlePreviousClick}
        handleNextClick={handleNextClick}
        prevDisabled={prevDisabled}
        nextDisabled={nextDisabled}
      />
    </div>
  );
}

export default App;
