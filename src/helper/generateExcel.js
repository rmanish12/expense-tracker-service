const excelJS = require("exceljs");

const formatSheetHeader = workbook => {
  workbook.eachSheet(workSheet => {
    workSheet.getRow(1).eachCell(cell => {
      cell.font = { bold: true };
    });
  });

  return workbook;
};

const setColumns = (workbook, columns) => {
  workbook.eachSheet(workSheet => {
    workSheet.columns = columns;
  });

  return workbook;
};

const generateExcel = async itemData => {
  const items = itemData.map(item => {
    const obj = {
      budgetType: item.categoryInfo.budgetType,
      category: item.categoryInfo.name,
      amount: item.amount,
      dateOfTransaction: item.dateOfTransaction,
      description: item.description
    };
    return obj;
  });

  const incomeItems = [];
  const expenseItems = [];

  items.forEach(item => {
    if (item.budgetType === "INCOME") incomeItems.push(item);
    else if (item.budgetType === "EXPENSE") expenseItems.push(item);
  });

  const workbook = new excelJS.Workbook();

  const columns = [
    { header: "Budget Type", key: "budgetType", width: 10 },
    { header: "Category", key: "category", width: 10 },
    { header: "Amount", key: "amount", width: 10 },
    { header: "Date of transaction", key: "dateOfTransaction", width: 20 },
    { header: "Description", key: "description", width: 10 }
  ];

  const workSheet1 = workbook.addWorksheet("Overview");
  const workSheet2 = workbook.addWorksheet("Income");
  const workSheet3 = workbook.addWorksheet("Expense");

  const workBookWithSheetColumns = setColumns(workbook, columns);

  workSheet1.addRows(items);
  workSheet2.addRows(incomeItems);
  workSheet3.addRows(expenseItems);

  const formattedWorkbook = formatSheetHeader(workBookWithSheetColumns);

  return formattedWorkbook;
};

module.exports = { generateExcel };
