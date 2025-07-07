import React from 'react';
import useLocalStorage from '../hooks/Storage';
import {
  User,
  MessageCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import '../styles/App.css';

const Dashboard = ({ comments, onViewProfile }) => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [sortConfig, setSortConfig] = useLocalStorage('sortConfig', { key: null, direction: null });
  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 1);
  const [pageSize, setPageSize] = useLocalStorage('pageSize', 10);

  const filteredComments = comments.filter(comment =>
    comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedComments = [...filteredComments].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key], bVal = b[sortConfig.key];
    if (sortConfig.direction === 'ascending') return aVal < bVal ? -1 : 1;
    if (sortConfig.direction === 'descending') return aVal > bVal ? -1 : 1;
    return 0;
  });

  const totalPages = Math.ceil(sortedComments.length / pageSize);
  const currentComments = sortedComments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') direction = 'descending';
    else if (sortConfig.key === key && sortConfig.direction === 'descending') direction = null;
    setSortConfig({ key: direction ? key : null, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="icon" />;
    if (sortConfig.direction === 'ascending') return <ArrowUp className="icon" />;
    if (sortConfig.direction === 'descending') return <ArrowDown className="icon" />;
    return <ArrowUpDown className="icon" />;
  };

  return (
    <div className="dashboard-bg">
      <div className="container-wrapper">
        <div className="dashboard-header">
          <div>
            <h1 className='header'>Swift</h1>
            
          </div>
          <button className="profile-btn" onClick={onViewProfile}>
            <User className="icon" />
            View Profile
          </button>
        </div>

        <div className="dashboard-controls">
          <div class="sort-parameters">
          <button onClick={() => handleSort('postId')}>Sort Post ID {getSortIcon('postId')}</button>
          <button onClick={() => handleSort('postId')}>Sort Name {getSortIcon('name')}</button>
          <button onClick={() => handleSort('postId')}>Sort Email {getSortIcon('email')}</button>
        </div>
          <div className="search-box">
            <Search className="icon search-icon" />
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search..."
            />

          </div>
          
        </div>
        

        <table className="comment-table">
          <thead>
            <tr>
              <th>Post ID </th>
              <th>Name </th>
              <th>Email </th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {currentComments.map(comment => (
              <tr key={comment.id}>
                <td>{comment.postId}</td>
                <td>{comment.name}</td>
                <td>{comment.email}</td>
                <td className="truncate">{comment.body}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {currentComments.length === 0 && (
          <div className="empty-message">
            <MessageCircle className="icon" />
            No matching comments found
          </div>
        )}

        <div className="pagination">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            <ChevronLeft className="icon" />
          </button>
          {Array.from({ length: totalPages.length }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            <span>1-{totalPages.length}</span></button>
          ))}
          
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            <ChevronRight className="icon" />
          </button>
          <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className='select-box'>
            <option value={10}>10 Pages</option>
            <option value={50}>50 Pages</option>
            <option value={100}>100 Pages</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;