import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import TextHighlighter from '../TextHiglighter';
import { getValidUrl } from '../../../helpers/global';
import { DEFAULT_DATE_FORMAT } from '../../../helpers/constants';

const CellValue = ({ highlight, highlightText, returnElement }) => {
  return highlight && typeof returnElement === 'string' ? (
    <TextHighlighter highlightBG={'yellow'} highlightTextColor={'black'} text={returnElement} queries={highlightText} />
  ) : (
    returnElement || '-'
  );
};

const Cell = ({
  row,
  column: {
    cellColor,
    key,
    label,
    truncate,
    type,
    valueSelector,
    dateFormat = DEFAULT_DATE_FORMAT,
    highlight = false,
    highlightText = [],
    onCellClick
  },
  index,
  striped,
  isRowExpanded, // Add isRowExpanded prop
  verticalAlign,
  horizontalAlign
}) => {
  const value = useMemo(() => (valueSelector ? valueSelector(row) : row[key]), [row, key, valueSelector]);

  const renderLink = useCallback(
    (isRowExpanded, value, href) => {
      return (
        <div>
          {isRowExpanded ? (
            <a className="bg-dark" onClick={e => e.stopPropagation()} href={href}>
              {<CellValue highlight={highlight} highlightText={highlightText} returnElement={value} />}
            </a>
          ) : (
            <CellValue highlight={highlight} highlightText={highlightText} returnElement={value} />
          )}
        </div>
      );
    },
    [highlight, highlightText]
  );

  let returnElement = value;

  switch (type) {
    case 'url':
      const urlHref = getValidUrl(value);
      returnElement = isRowExpanded ? (
        <a target="_blank" href={urlHref}>
          {<CellValue highlight={highlight} highlightText={highlightText} returnElement={returnElement} />}
        </a>
      ) : (
        value
      );
      break;
    case 'email':
      returnElement = renderLink(isRowExpanded, value, `mailto:${value}`);
      break;
    case 'phone':
      returnElement = renderLink(isRowExpanded, value, `tel:${value}`);
      break;
    case 'date':
      returnElement = value ? moment(value).format(dateFormat) : null;
      break;
    default:
      break;
  }
  return truncate && returnElement ? (
    <OverlayTrigger
      delay={{ hide: 250, show: 300 }}
      overlay={props => (
        <Tooltip {...props} width={1000}>
          <CellValue highlight={highlight} highlightText={highlightText} returnElement={returnElement} />
        </Tooltip>
      )}
      placement={'left'}
    >
      <td
        className={
          isRowExpanded
            ? 'bg-primary-light fw-bold'
            : cellColor
            ? `bg-${cellColor(row)} `
            : striped && index % 2 === 0
            ? 'bg-gray'
            : 'bg-white'
        }
        style={{ textAlign: horizontalAlign, verticalAlign }}
        onClick={e => {
          if (onCellClick) {
            e.stopPropagation();
            onCellClick(row);
          }
        }}
      >
        <div className="truncate" style={{ width: 160 }}>
          <CellValue highlight={highlight} highlightText={highlightText} returnElement={returnElement} />
        </div>
      </td>
    </OverlayTrigger>
  ) : (
    <td
      className={
        isRowExpanded
          ? 'bg-primary-light fw-bold'
          : cellColor
          ? `bg-${cellColor(row)} `
          : striped && index % 2 === 0
          ? 'bg-gray'
          : 'bg-white'
      }
      onClick={e => {
        if (onCellClick) {
          e.stopPropagation();
          onCellClick(row);
        }
      }}
      style={{ textAlign: horizontalAlign, verticalAlign }}
    >
      <CellValue highlight={highlight} highlightText={highlightText} returnElement={returnElement} />
    </td>
  );
};

const TableCell = ({
  row,
  column,
  index,
  striped,
  horizontalAlign: defaultHorizontalAlign = 'center',
  verticalAlign: defaultVerticalAlign = 'middle',
  isRowExpanded
}) => {
  const { horizontalAlign = defaultHorizontalAlign, verticalAlign = defaultVerticalAlign } = column;

  const renderCellContent = () => {
    if (column.cellRenderer) {
      return (
        <td
          className={
            isRowExpanded
              ? 'bg-primary-light fw-bold'
              : column?.cellColor
              ? `bg-${column?.cellColor(row)} `
              : striped && index % 2 === 0
              ? 'bg-gray'
              : 'bg-white'
          }
          style={{ textAlign: horizontalAlign, verticalAlign }}
          onClick={e => {
            if (column?.onCellClick) {
              e.stopPropagation();
              column?.onCellClick(row);
            }
          }}
        >
          {column.cellRenderer(row) || '-'}
        </td>
      );
    } else {
      return (
        <Cell
          row={row}
          column={column}
          index={index}
          striped={striped}
          isRowExpanded={isRowExpanded}
          horizontalAlign={horizontalAlign}
          verticalAlign={verticalAlign}
        />
      );
    }
  };

  return renderCellContent();
};

export default TableCell;
