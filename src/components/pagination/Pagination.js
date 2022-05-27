import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookActions, fetchAsyncBooks } from '../../store/bookSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './pagination.css';

const Pagination = props => {
    const dispatch = useDispatch();
    const totalElements = useSelector((state) => state.books.totalElements);
    const currentPage = useSelector((state) => state.books.currentPage);
    const pageSize = useSelector((state) => state.books.pageSize);
    const [siblingCount, setSiblingCount] = useState(1);

    const onPageChange = (currentPage) => {
        dispatch(bookActions.setCurrentPage(currentPage)); 
        dispatch(fetchAsyncBooks(currentPage, pageSize));  
    };

    const DOTS = '...';

    const range = (start, end) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
    };

    const usePagination = ({
        totalElements,
        pageSize,
        siblingCount = 1,
        currentPage
    }) => {
        const paginationRange = useMemo(() => {
            const totalPageCount = Math.ceil(totalElements / pageSize);

            // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
            const totalPageNumbers = siblingCount + 5;

            /*
            If the number of pages is less than the page numbers we want to show in our
            paginationComponent, we return the range [1..totalPageCount]
            */
            if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
            }

            const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
            const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
            );

            /*
            We do not want to show dots if there is only one position left 
            after/before the left/right page count as that would lead to a change if our Pagination
            component size which we do not want
            */
            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

            const firstPageIndex = 1;
            const lastPageIndex = totalPageCount;

            if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, totalPageCount];
            }

            if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
                totalPageCount - rightItemCount + 1,
                totalPageCount
            );
            return [firstPageIndex, DOTS, ...rightRange];
            }

            if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
            }
        }, [totalElements, pageSize, siblingCount, currentPage]);

        return paginationRange;
    };

    const paginationRange = usePagination({
        currentPage,
        totalElements,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    };

    const onNext = () => {
        onPageChange(currentPage + 1);
        console.log(currentPage);
        console.log(totalElements);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const lastPage = paginationRange[paginationRange.length - 1];

    return (
        <div className='pagination-wrapper'>
        <div className='pagination-container'>
            <div className='previous-page pagination-arrow'>
                <button className='arrow left btn-sm btn-outline-primary' disabled={currentPage <= 1} onClick={onPrevious}><FontAwesomeIcon icon={faArrowLeft} className="user-icon" /></button>
            </div>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                return <p className="pagination-item dots" key={index}>&#8230;</p>;
                }
                return (
                    <p key={index} className={(pageNumber === currentPage)? "pagination-item selected-page" : "pagination-item"} selected={pageNumber === currentPage} onClick={() => onPageChange(pageNumber)} >{pageNumber}</p>
                )
            })}
            <div className='next-page pagination-arrow' >
                <button className='arrow right btn-sm btn-outline-primary' disabled={currentPage >= lastPage} onClick={onNext}><FontAwesomeIcon icon={faArrowRight} className="user-icon" /></button>
            </div>
        </div>
        </div>
    );
};

export default Pagination;
