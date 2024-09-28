import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../App.css';

const TrendingRepos = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchRepos = useCallback(async (page = 1) => {
        setLoading(true);
        const perPage = 12;  // Fetch 12 repositories per page
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
    }, [searchQuery]);

    useEffect(() => {
        fetchRepos(currentPage + 1);
    }, [fetchRepos, currentPage]);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="container">
            <h1 className="font-bold text-3xl mb-4">Trending GitHub Repositories</h1>
            <input
                type="text"
                placeholder="Search for repositories..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            {loading ? (
                <p className="text-lg">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {repos.map((repo) => (
                        <div 
                            key={repo.id} 
                            className="border rounded-md bg-white p-4 transition-transform transform hover:scale-105 hover:shadow-lg hover:z-10 relative"
                        >
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-xl"
                            >
                                {repo.name}
                            </a>
                            <p className="text-gray-600 text-md mt-1">{repo.description || 'No description available.'}</p>
                            <span className="text-gray-500 text-sm">⭐ {repo.stargazers_count}</span>
                        </div>
                    ))}
                </div>
            )}
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
