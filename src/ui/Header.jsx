import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilters } from '../context/FilterContext';
import useGetQueryParam from '../hooks/use-get-query-param';

const Header = () => {
  const navigate = useNavigate();
  const queryKeyword = useGetQueryParam();
  const { clearFilters } = useFilters();

  const [searchValue, setSearchValue] = useState(queryKeyword || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchValue}`);
    clearFilters();
  };

  return (
    <header className="bg-slate-600 py-3">
      <div className="container flex items-center justify-between">
        <a href="/">
          <h1 className="text-2xl font-bold text-white">NEWS</h1>
        </a>
        <form className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="min-w-56 rounded-l-lg bg-white px-4 py-2 text-gray-700 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-r-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
