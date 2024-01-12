function Pagination({ perpge, total, paginate,currentpage  }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(total / perpge); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="container">
        <div className='my-2'>
          <ul className='pagination mb-3'>
            {pageNumbers.map(number => (
              <li key={number} className='ms-2 page-item'>
                <a onClick={() => paginate(number)} className={`page-link ${currentpage === number ? 'active' : ''}`}>
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
  
  export default Pagination;
  