import * as XLSX from "xlsx";

// Helper function to format data for each sheet
const formatSheetData = (data, type) => {
  const formattedData = [];

  data.forEach((item) => {
    if (type === "discrepancies" || type === "reconciled") {
      // For discrepancies, show source and target side by side
      formattedData.push({
        "Source ID": item.source?.ID ?? "",
        "Source Date": item.source?.Date ?? "",
        "Source Name": item.source?.Name ?? "",
        "Source Amount": item.source?.Amount ?? "",
        " ": "", // Space between source and target columns
        "Target ID": item.target?.ID ?? "",
        "Target Date": item.target?.Date ?? "",
        "Target Name": item.target?.Name ?? "",
        "Target Amount": item.target?.Amount ?? "",
      });
    } else if (type === "missing_in_source") {
      // For missing in source, only show target data
      formattedData.push({
        "Source ID": "", // No source data
        "Source Date": "",
        "Source Name": "",
        "Source Amount": "",
        " ": "", // Space between source and target columns
        "Target ID": item.ID,
        "Target Date": item.Date,
        "Target Name": item.Name,
        "Target Amount": item.Amount,
      });
    } else if (type === "missing_in_target") {
      // For missing in target, only show source data
      formattedData.push({
        "Source ID": item.ID,
        "Source Date": item.Date,
        "Source Name": item.Name,
        "Source Amount": item.Amount,
        " ": "", // Space between source and target columns
        "Target ID": "", // No target data
        "Target Date": "",
        "Target Name": "",
        "Target Amount": "",
      });
    }
  });

  return formattedData;
};

// Function to handle the download logic
const handleDownloadCSV= (reconciliation) => {
  const workbook = XLSX.utils.book_new();

  // Create data for each sheet
  const reconciledData = formatSheetData(reconciliation.reconciled, "reconciled");
  const discrepanciesData = formatSheetData(reconciliation.discrepancies, "discrepancies");
  const missingInSourceData = formatSheetData(reconciliation.missing_in_source, "missing_in_source");
  const missingInTargetData = formatSheetData(reconciliation.missing_in_target, "missing_in_target");

  // Convert the data to worksheet format
  const reconciledSheet = XLSX.utils.json_to_sheet(reconciledData);
  const discrepanciesSheet = XLSX.utils.json_to_sheet(discrepanciesData);
  const missingInSourceSheet = XLSX.utils.json_to_sheet(missingInSourceData);
  const missingInTargetSheet = XLSX.utils.json_to_sheet(missingInTargetData);

  // Append the sheets to the workbook
  XLSX.utils.book_append_sheet(workbook, reconciledSheet, "Reconciled");
  XLSX.utils.book_append_sheet(workbook, discrepanciesSheet, "Discrepancies");
  XLSX.utils.book_append_sheet(workbook, missingInSourceSheet, "Missing in Source");
  XLSX.utils.book_append_sheet(workbook, missingInTargetSheet, "Missing in Target");

  // Generate Excel file and trigger download
  XLSX.writeFile(workbook, `reconciliation_report_${new Date().toISOString()}.xlsx`);
};


export { handleDownloadCSV };
