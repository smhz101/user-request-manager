import React from "react";
import { __ } from "@wordpress/i18n";
import "./Table.css";

/**
 * Table component to render a table with headers and data.
 *
 * @param {Object} props Component properties.
 * @param {Array<{label: string, key: string}>} props.headers Table column headers.
 * @param {Array<Object>} props.data Table data rows.
 * @param {function(Object, string): string} [props.renderCell] Optional function to render a table cell.
 * @returns {JSX.Element} Rendered table.
 */
function Table({ headers, data, renderCell }) {
  return (
    <table className="widefat fixed striped urm-table">
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
    </table>
  );
}

export default Table;
