import React from 'react';

const ControlPanel = (props) => {
    const { file, pageNumber, numPages, setPageNumber } = props;
  
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === numPages;
  
    const firstPageClass = isFirstPage ? 'disabled' : 'clickable';
    const lastPageClass = isLastPage ? 'disabled' : 'clickable';
  
    const goToFirstPage = () => {
      if (!isFirstPage) setPageNumber(1);
    };
    const goToPreviousPage = () => {
      if (!isFirstPage) setPageNumber(pageNumber - 1);
    };
    const goToNextPage = () => {
      if (!isLastPage) setPageNumber(pageNumber + 1);
    };
    const goToLastPage = () => {
      if (!isLastPage) setPageNumber(numPages);
    };
  
    const onPageChange = (e) => {
      const { value } = e.target;
      setPageNumber(Number(value));
    };
  
    return (
      <div className="control-panel m-3 p-3 d-flex align-items-baseline justify-content-between">
        <div className="d-flex justify-content-between align-items-baseline">
          <i
            className={`fas fa-fast-backward mx-3 ${firstPageClass}`}
            onClick={goToFirstPage}
          />
          <i
            className={`fas fa-backward mx-3 ${firstPageClass}`}
            onClick={goToPreviousPage}
          />
          <span>
            Page{' '}
            <input
              name="pageNumber"
              type="number"
              min={1}
              max={numPages || 1}
              className="p-0 pl-1 mx-2"
              value={pageNumber}
              onChange={onPageChange}
            />{' '}
            of {numPages}
          </span>
          <i
            className={`fas fa-forward mx-3 ${lastPageClass}`}
            onClick={goToNextPage}
          />
          <i
            className={`fas fa-fast-forward mx-3 ${lastPageClass}`}
            onClick={goToLastPage}
          />
        </div>
      </div>
    );
  };
  
export default ControlPanel;