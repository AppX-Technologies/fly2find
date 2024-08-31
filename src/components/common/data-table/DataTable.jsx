import { debounce, snakeCase } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Table } from 'react-bootstrap';
import { GripVertical, PlusCircle } from 'react-bootstrap-icons';
import ColumnFilterCell from './ColumnFilterCell';
import SortSwitch from './SortSwitch';
import TableCell from './TableCell';
import CircularProgressBar from '../circular-progress';

/**
 * Types: ["text", "url" , "email", "phone", "date"]
 * when type is date, a dateFormat is taken [have some value by default]
 * valueSelector function can be used if data is not directly row[key];
 * A custom cellRenderer function, if type is none of the above
 * Sorting on each column
 * Search on each column
 * Pagination
 *
 * May be for later?
 *  Row and column coloring callbacks
 *  Provide a prop isInput, to change the cell to a formcontrol
 */
const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? '#f7ebd6' : 'white',

  ...draggableStyle,
  zIndex: isDragging ? 1000 : 'auto',
  Cursor: 'pointer'
});

const DataTable = ({
  columns,
  data = [],
  rowKey,
  headerHorizontalAlign = 'center',
  headerVerticalAlign = 'middle',
  dataHorizontalAlign = 'center',
  dataVerticalAlign = 'middle',
  allowSort = true,
  sortOptions, // { key: 'columnName', order: 'asc' or 'desc' }
  onSortChange, // function to handle sort changes
  allowFilter = true,
  filterValues = [], // Array of objects: [{ key: 'columnName', value: 'searchTerm' }, ...]
  onFilterValuesChange,
  bottomOffset = 10, //in px
  onBottomReached,
  loadingMoreData,
  loadingFirstPageData,
  onRowClick,
  expandedRowKeys = [], // array of rowKey which are expanded
  renderExpandedRow,

  showEditMultipleRow,
  renderEditMultipleRow,

  showNewRow,
  renderNewRow,

  striped = false,
  maxTableHeight = '100vh',
  draggable = false,
  onDragEnd,

  headerFontSize = 'inherit',
  columnFontSize = 'inherit'
}) => {

  const tableContainerRef = useRef(null); // Create a ref for the table

  useEffect(() => {
    const debouncedHandleScroll = debounce(() => {
      if (loadingMoreData) return;
      const element = tableContainerRef.current;
      if (element) {
        const distanceFromBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
        console.log({ distanceFromBottom, bottomOffset });

        if (distanceFromBottom <= bottomOffset) {
          onBottomReached && onBottomReached();
        }
      }
    }, 100); // 100ms is the debounce period

    const element = tableContainerRef.current;
    if (element) {
      element.addEventListener('scroll', debouncedHandleScroll);

      // Cleanup
      return () => {
        element.removeEventListener('scroll', debouncedHandleScroll);
        debouncedHandleScroll.cancel(); // Cancel the debounced call if component unmounts
      };
    }
  }, [bottomOffset, onBottomReached]);

  useEffect(() => {
    if (showNewRow) {
      setTimeout(() => {
        const trElement = document.getElementById(`data-table-new-row`);
        const offset = -80; // Adjust this value based on the height of your fixed element
        const containerElement = tableContainerRef.current;
        if (trElement && containerElement) {
          containerElement.scroll({
            top: trElement.offsetTop + offset,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [showNewRow]);

  useEffect(() => {
    if (showEditMultipleRow) {
      setTimeout(() => {
        const trElement = document.getElementById(`data-table-edit-multiple-row`);
        const offset = -80; // Adjust this value based on the height of your fixed element
        const containerElement = tableContainerRef.current;
        if (trElement && containerElement) {
          containerElement.scroll({
            top: trElement.offsetTop + offset,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [showEditMultipleRow]);

  // Function to handle sort icon click
  const handleSort = columnName => {
    let order = 'desc';
    if (sortOptions && sortOptions.key === columnName && sortOptions.order === 'desc') {
      order = 'asc';
    }
    onSortChange({ key: columnName, order });
  };

  // Function to handle search input changes
  const handleColumnFilterChange = (columnKey, columnFilterValue) => {
    const updatedSearchValues = filterValues.filter(sv => sv.key !== columnKey);
    if (columnFilterValue) {
      updatedSearchValues.push({ key: columnKey, value: columnFilterValue });
    }
    onFilterValuesChange(updatedSearchValues);
  };

  return (
    <div className="position-relative w-100">
      {loadingFirstPageData && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-50"
          style={{ zIndex: 10 }}
        >
          <CircularProgressBar size={20} />
        </div>
      )}
      <div
        id="table-container"
        ref={tableContainerRef}
        className={`position-relative w-100 ${loadingFirstPageData ? 'overflow-hidden' : 'overflow-auto'}`}
        style={{ maxHeight: maxTableHeight }} // Ensure this container has a max-height or fixed height
      >
        <Table bordered className="mid">
          <thead className="sticky-header">
            <tr className="">
              {draggable && <th className="text-white bg-dark"> </th>}
              {columns.map(({ key, label, labelRenderer, width, disableSort }) => (
                <th
                  key={key}
                  className={`text-white bg-dark ${!disableSort && 'hover'}`}
                  style={{
                    minWidth: width,
                    textAlign: headerHorizontalAlign,
                    verticalAlign: headerVerticalAlign
                  }}
                  onClick={() => allowSort && !disableSort && handleSort(key)}
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: ['start', 'left'].includes(headerHorizontalAlign) ? 'fit-content' : '',
                      fontSize: headerFontSize
                    }}
                  >
                    {labelRenderer ? labelRenderer(key) : label}
                    {allowSort && !disableSort && (
                      <SortSwitch sortOrder={sortOptions?.key === key ? sortOptions.order : ''} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
            {allowFilter && (
              <tr>
                {/* Search fields */}
                {columns.map(column => (
                  <th key={column.key} className="p-1 bg-white">
                    {!column.disableSearch && (
                      <ColumnFilterCell
                        column={column}
                        filterValues={filterValues}
                        onColumnFilterChange={handleColumnFilterChange}
                      />
                    )}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable isDropDisabled={!draggable} droppableId="droppable">
              {provided => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {showNewRow && (
                    <>
                      <tr
                        id="data-table-new-row"
                        className="bg-primary-light border-primary-dark"
                        style={{ borderWidth: 2 }}
                      >
                        <td colSpan={columns.length} className=" text-dark">
                          <div className=" d-flex align-items-center">
                            <h6 className="mid mb-0 fw-bold">
                              <PlusCircle className="mx-2" />
                              Add new row
                            </h6>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-primary-dark" style={{ borderWidth: 2 }}>
                        <td colSpan={columns.length} className="bg-light p-0">
                          <div style={{ width: '95vw' }} className="">
                            {renderNewRow && renderNewRow()}
                          </div>
                        </td>
                      </tr>
                    </>
                  )}

                  {data.length > 0 ? (
                    <>
                      {data.map((row, index) => (
                        <>
                          <Draggable
                            isDragDisabled={!draggable}
                            key={row[rowKey]}
                            draggableId={'q-' + row[rowKey]}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <tr
                                id={`data-row-${row[rowKey]}`}
                                className={`hover ${
                                  expandedRowKeys.includes(row[rowKey]) ? 'border-primary-dark' : ''
                                }`}
                                ref={provided.innerRef}
                                style={{
                                  ...getItemStyle(snapshot.isDragging, provided.draggableProps.style),
                                  zIndex: 0,
                                  fontSize: columnFontSize,
                                  borderWidth: expandedRowKeys.includes(row[rowKey]) ? 2 : 1
                                }}
                                onClick={e => {
                                  let selection = window.getSelection().toString();
                                  if (selection.length <= 0 && onRowClick) {
                                    onRowClick && onRowClick(row);
                                  }
                                }}
                              >
                                {draggable && (
                                  <td
                                    style={{ width: '2%' }}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <GripVertical />
                                  </td>
                                )}
                                {columns.map((column, colIndex) => (
                                  <TableCell
                                    key={column.key}
                                    row={row}
                                    index={index}
                                    striped={striped}
                                    column={column}
                                    horizontalAlign={dataHorizontalAlign}
                                    verticalAlign={dataVerticalAlign}
                                    isRowExpanded={expandedRowKeys.includes(row[rowKey])}
                                  />
                                ))}
                              </tr>
                            )}
                          </Draggable>
                          {expandedRowKeys.includes(row[rowKey]) && (
                            <tr className={`border-primary-dark`} style={{ borderWidth: 2 }}>
                              <td colSpan={columns.length} className="bg-light bg-opacity-50 p-0" style={{ zIndex: 0 }}>
                                <div style={{ width: '95vw' }} className="">
                                  {renderExpandedRow && renderExpandedRow(row)}
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={columns.length}>
                        <h6 className="text-muted text-center mb-0">Nothing to show</h6>
                      </td>
                    </tr>
                  )}

                  {loadingMoreData && (
                    <tr>
                      <td className="text-start" colSpan={columns.length}>
                        <div className="d-flex justify-content-center align-items-center">
                          <CircularProgressBar size={16} />
                          <h6 className="mx-2 mb-0 smallFont text-muted fw-bold">Please wait...</h6>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
