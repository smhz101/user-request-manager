// Table.js
import React from "react";
import "./Table.css";

function Table({ headers, data, renderCell }) {
  return (
    <table className="urm-table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, cellIndex) => (
              <td key={cellIndex}>
                {renderCell ? renderCell(row, header.key) : row[header.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
