import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../App.css';
 // Import your CSS file for styling

const TrendingRepos = () => {
  const [repos, setRepos] = useState([]); // State for repositories
  const [loading, setLoading] = useState(false); // Loading state
  const [pageCount, setPageCount] = useState(0); // Total pages for pagination
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const [searchQuery, setSearchQuery] = useState(''); // Search query

  // Function to fetch repositories from GitHub API
  const fetchRepos = async (page = 1) => {
    setLoading(true); // Set loading to true while fetching
    const perPage = 10; // Number of repositories per page
    const search = searchQuery ? `+${searchQuery}` : ''; // Append search query if exists

    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=stars:>1${search}&sort=stars&per_page=${perPage}&page=${page}`
      );
      setRepos(response.data.items); // Update state with repository data
      setPageCount(Math.ceil(response.data.total_count / perPage)); // Update page count for pagination
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }

    setLoading(false); // Set loading to false after fetching
  };

  // Fetch repositories when the component mounts or when page/search query changes
  useEffect(() => {
    fetchRepos(currentPage + 1);
  }, [currentPage, searchQuery]);

  // Handle page click for pagination
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Handle search input changes
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
