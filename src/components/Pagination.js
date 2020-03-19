import React, {useState} from 'react'

const Pagination = ({postsPerPage, totalPosts, paginate, handlePreviousClick, handleNextClick, prevDisabled, nextDisabled}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    console.log(prevDisabled)
    return (
        <nav>
            <ul className="pagination">
                <li className={"page-item " + (prevDisabled ? "disabled" : "")}>
                    <a onClick={handlePreviousClick} className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
                { pageNumbers.map(number => (
                    <li key={number} className="page-item">
                    <a onClick={()=> paginate(number)} href="!#" className="page-link">
                        {number}
                    </a>
                </li>)
                )}
                <li className={"page-item " + (nextDisabled ? "disabled" : "")}>
                    <a onClick={handleNextClick} className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;