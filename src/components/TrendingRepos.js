import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../App.css';
const TrendingRepos = () => {
  const [repos, setRepos] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [pageCount, setPageCount] = useState(0); 
  const [currentPage, setCurrentPage] = useState(0); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const fetchRepos = async (page = 1) => {
    setLoading(true); 
    const perPage = 10; 
    const search = searchQuery ? `+${searchQuery}` : ''; 
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=stars:>1${search}&sort=stars&per_page=${perPage}&page=${page}`
      );
      setRepos(response.data.items); 
      setPageCount(Math.ceil(response.data.total_count / perPage)); 
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
    setLoading(false); 
  };
  useEffect(() => {
    fetchRepos(currentPage + 1);
  }, [currentPage, searchQuery]);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="container">
      <h1>Trending GitHub Repositories</h1>
      <input
        type="text"
        placeholder="Search for repositories..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a> - ⭐ {repo.stargazers_count}
            </li>
          ))}
        </ul>
      )}
      {/* Pagination component */}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};
export default TrendingRepos;
