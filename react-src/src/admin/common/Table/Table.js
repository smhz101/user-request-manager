import React, { useState } from "react";
import { __ } from "@wordpress/i18n";
import { Button } from "../index";
import "./Table.css";

const TableHeader = ({ headers }) => (
  <thead>
    <tr>
      {headers.map((header, index) => {
        const headerLabel = header.label.replace(/ /g, "-").toLowerCase();
        const className = `${headerLabel} ${headerLabel}-column`;
        return (
          <th key={index} className={className}>
            {__(header.label, "user-request-manager")}
          </th>
        );
      })}
    </tr>
  </thead>
);

const TableBody = ({ headers, data, renderCell }) => (
  <tbody>
    {data.map((row, rowIndex) => (
      <tr key={rowIndex}>
        {headers.map((header, cellIndex) => {
          const headerLabel = header.label.replace(/ /g, "-").toLowerCase();
          const className = `${headerLabel} ${headerLabel}-column`;
          return (
            <td key={cellIndex} className={className}>
              {renderCell ? renderCell(row, header.key) : row[header.key]}
            </td>
          );
        })}
      </tr>
    ))}
  </tbody>
);

function Table({
  headers,
  data,
  renderCell,
  addClass,
  loadMore = false,
  initialRows = 5,
}) {
  const [visibleRows, setVisibleRows] = useState(initialRows);
  const tableClass = addClass ? addClass : "widefat fixed striped urm-table";
  const slicedData = data.slice(0, loadMore ? visibleRows : undefined);

  const TableMarkup = (
    <table className={tableClass}>
      <TableHeader headers={headers} />
      <TableBody headers={headers} data={slicedData} renderCell={renderCell} />
    </table>
  );

  return loadMore ? (
    <div className="load-more-wrap recent-bids">
      {TableMarkup}
      {visibleRows < data.length && (
        <Button
          link={true}
          onClick={() => setVisibleRows(visibleRows + initialRows)}
        >
          Load More
        </Button>
      )}
    </div>
  ) : (
    TableMarkup
  );
}

export default Table;
