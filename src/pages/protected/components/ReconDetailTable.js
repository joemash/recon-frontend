import React from "react";

const ReconciliationTable = ({ activeTab, reconciliation }) => {
  if (!reconciliation) return <div className="text-center">Loading...</div>;

  const {
    reconciled = [],
    missing_in_target = [],
    missing_in_source = [],
    discrepancies = [],
  } = reconciliation.result || {};

  const highlightDifference = (sourceValue, targetValue) => {
    return sourceValue !== targetValue ? "bg-red-200" : "";
  };

  const renderTable = (data, columns) => (
    <table className="table w-full">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((record, idx) => (
          <tr key={idx}>
            {columns.map((column) => (
              <td key={column}>{record[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderComparisonTable = (data) => (
    <table className="table w-full">
       <thead>
        <tr>
          <th colSpan="4" className="text-center bg-blue-100">Source</th>
          <th></th>
          <th colSpan="4" className="text-center bg-green-100">Target</th>
        </tr>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Date</th>
          <th>Amount</th>
          <th className="bg-gray-200"></th>
          <th>ID</th>
          <th>Name</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
     
      <tbody>
        {data.map((record, idx) => (
          <tr key={idx}>
            <td>{record.source.ID}</td>
            <td className={highlightDifference(record.source.Name, record.target.Name)}>{record.source.Name}</td>
            <td className={highlightDifference(record.source.Date, record.target.Date)}>{record.source.Date}</td>
            <td className={highlightDifference(record.source.Amount, record.target.Amount)}>{record.source.Amount}</td>
            <td className="bg-gray-100"></td>
            <td>{record.target.ID}</td>
            <td className={highlightDifference(record.source.Name, record.target.Name)}>{record.target.Name}</td>
            <td className={highlightDifference(record.source.Date, record.target.Date)}>{record.target.Date}</td>
            <td className={highlightDifference(record.source.Amount, record.target.Amount)}>{record.target.Amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container mx-auto p-4">

      {activeTab === "reconciled" && (
        <div>
            {reconciled.length > 0 ? renderComparisonTable(reconciled) : <p>No reconciled records.</p>}
        </div>
      )}

      {activeTab === "missing_in_target" && (
          <div>
            {missing_in_target.length > 0 
              ? renderTable(missing_in_target, ["ID", "Name", "Date", "Amount"]) 
              : <p>No records missing in the target.</p>}
          </div>
      )}

      {activeTab === "missing_in_source" && (
          <div>
            {missing_in_source.length > 0 
              ? renderTable(missing_in_source, ["ID", "Name", "Date", "Amount"]) 
              : <p>No records missing in the source.</p>}
          </div>
      )}

      {activeTab === "differences" && (
          <div>
            {discrepancies.length > 0 
              ? renderComparisonTable(discrepancies) 
              : <p>No discrepancies found.</p>}
          </div>
      )}
    </div>
  );
};

export default ReconciliationTable;