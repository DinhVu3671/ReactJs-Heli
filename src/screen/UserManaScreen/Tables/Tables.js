import { useDispatch, useSelector } from 'react-redux';
import React, { Component, useEffect, useState } from 'react';
import { setStatePagingTable, setUserData } from '../../../redux/action';
import { usePagination, useSortBy, useTable } from 'react-table';
import UserAPI from '../../../api/userAPI';
import changeTime from '../ChangeTime/ChangeTime';

import { useTranslation } from "react-i18next";

const Tables = (({ columns, data }) => {
  const dispatch = useDispatch();
  const paging = useSelector((state) => state.setStatePaging.paging);

  const { t } = useTranslation();

  function UserManaResult(page, size, sortKey, sortDir) {
    let result = UserAPI.getAllUsers(localStorage.getItem('sessionId'), page, size, sortKey, sortDir);
    result.then(res => {
      const data = res.data.data.elements;
      let usermana = data.map((value) => {
        value.createdAt = changeTime(value.createdAt);
        value.updatedAt = changeTime(value.updatedAt);

        return value;
      }
      );
      dispatch(setStatePagingTable(res.data.data.paging));
      dispatch(setUserData(usermana));
    });
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,

    //pagination
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: paging.page - 1, pageSize: paging.size },
    manualPagination: true,
    pageCount: paging.totalPage
  }, useSortBy, usePagination)

  async function changePageSize(e) {
    setPageSize(Number(e.target.value));
    paging.size = Number(e.target.value);
    await dispatch(setStatePagingTable(paging));
    await UserManaResult(1, Number(e.target.value), paging.sortKey, paging.sortDir);
  }
  async function getPrePage() {
    previousPage();
    await UserManaResult(paging.page - 1, paging.size, paging.sortKey, paging.sortDir);
  }
  async function getNextPage() {
    nextPage();
    await UserManaResult(paging.page + 1, paging.size, paging.sortKey, paging.sortDir);
  }
  async function sortData(sortKey, sortDir) {
    await UserManaResult(1, paging.size, sortKey, sortDir);
  }
  function filterPage(arrayPages, totalPage) {
    return arrayPages.filter(page => page <= totalPage);
  }
  function getVisiblePages(page, totalPage) {
    if (totalPage < 7) {
      return filterPage([1, 2, 3, 4, 5, 6], totalPage);
    }
    else {
      if (page > 4 && page + 2 < totalPage) {
        return [1, page - 1, page, page + 1, totalPage];
      }
      else if (page > 4 && page + 2 >= totalPage) {
        return [1, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
      }
      else {
        return [1, 2, 3, 4, 5, totalPage];
      }
    }
  }

  const visiblePages = getVisiblePages(paging.page, paging.totalPage);

  async function changePage(page) {
    await UserManaResult(page, paging.size, paging.sortKey, paging.sortDir);
  }
  return (
    <React.Fragment>
      <select className="form-select" style={{ width: '9rem' }} aria-label="Default select example" value={pageSize}
        onChange={changePageSize}>
        {[10, 50, 100, 200].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {t("show")} {pageSize}
          </option>
        ))}
      </select>

      <table {...getTableProps()} className="table table-bordered table-striped">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th width={column.width}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    border: 'solid 1px gray collapse',
                  }}
                >
                  {column.render('Header')}
                  {!column.iconSort ? column.id === paging.sortKey ? paging.sortDir === 'DESC' ?
                    <i className="fas fa-long-arrow-alt-down ms-1"
                      onClick={() => sortData()}
                    ></i>
                    : <i className="fas fa-long-arrow-alt-up ms-1"
                      onClick={() => sortData(column.id, 'DESC')}
                    ></i>
                    : <i className="fas fa-arrows-alt-v ms-1"
                      onClick={() => sortData(column.id, 'ASC')}
                    ></i>
                    : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      width={cell.column.width}
                      {...cell.getCellProps()}
                      style={{
                        padding: '5px',
                        border: 'solid 1px gray collapse',
                        background: 'white',

                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* pagination */}
      <div id="table-pagination">
        <div>{t("showing")} {(paging.page - 1) * paging.size + 1} ~ {paging.page * paging.size <= paging.totalRecord ? paging.page * paging.size : paging.totalRecord} {t("recordInTotal")} {paging.totalRecord} {t("record")}</div>
        <div className="pagination">
          <nav aria-label="Page navigation example">
            <ul className="pagination btn-group">
              <li className="page-item">
                <button className="btn btn-light" onClick={getPrePage}
                  disabled={!canPreviousPage} >Previous</button>
              </li>
              {visiblePages.map((page, index, array) =>
                <li key={page} className="page-item">
                  <button className={pageIndex + 1 === page ? "btn btn-primary" : "btn btn-light btn-page"} onClick={() => { changePage(page) }}>
                    {array[index - 1] + 1 < page ? `...${page}` : page}
                  </button>
                </li>
              )}
              <li className="page-item">
                <button className="btn btn-light" onClick={getNextPage}
                  disabled={!canNextPage}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )

})
export default Tables;