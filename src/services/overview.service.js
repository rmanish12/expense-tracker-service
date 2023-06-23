const ItemRepo = require("../repository/item.repo");
const { getDates } = require("../helper/dateHelper");

const getRefinedData = (budgetType, items) => {
  const totalAmount = items.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0
  );
  const uniqueCategories = new Set();
  items.forEach(item => uniqueCategories.add(item.categoryId.name));
  const categoriesArray = [...uniqueCategories];
  const itemWiseInfo = categoriesArray.map(category => {
    const itemsWithGivenCategory = items.filter(
      item => item.categoryId.name === category
    );
    const totalAmountForCategory = itemsWithGivenCategory.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    );
    const percentageShareOfCategory =
      (totalAmountForCategory / totalAmount) * 100;
    return {
      name: category,
      amount: totalAmountForCategory,
      percentage: +percentageShareOfCategory.toFixed(2)
    };
  });

  return {
    name: budgetType,
    totalAmount,
    shares: itemWiseInfo
  };
};

const getOverview = async ({ userId, fromDate, toDate }) => {
  const { startDate, endDate } = getDates(fromDate, toDate);
  const itemsOverview = await ItemRepo.getItemsOverview({
    userId,
    fromDate: startDate,
    toDate: endDate
  });
  const incomeItems = [];
  const expenseItems = [];

  itemsOverview.forEach(item => {
    if (item.categoryId.budgetType === "INCOME") incomeItems.push(item);
    else expenseItems.push(item);
  });

  const incomeOverview = getRefinedData("income", incomeItems);
  const expenseOverview = getRefinedData("expense", expenseItems);
  const totalAmount = incomeOverview.totalAmount - expenseOverview.totalAmount;
  const overview = {
    totalAmount,
    shares: {
      income: incomeOverview,
      expense: expenseOverview
    }
  };

  return overview;
};

module.exports = { getOverview };
