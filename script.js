let incomesArray = [
  { name: "Salary", amount: 2000, recurring: true },
  { name: "Side Hustle", amount: 500, recurring: true },
  { name: "Bonus", amount: 1000, recurring: false },
  { name: "Tax Return", amount: 750, recurring: false },
  { name: "Passive Income", amount: 200, recurring: false },
];

let expensesArray = [
  { name: "Rent", amount: 800, recurring: true },
  { name: "Food", amount: 400, recurring: true },
  { name: "Utilities", amount: 100, recurring: true },
  { name: "Car Insurance", amount: 200, recurring: false },
  { name: "Car Repair", amount: 700, recurring: false },
];

document.addEventListener("DOMContentLoaded", () => {
  displayIncomes();
  displayExpenses();
});

function displayIncomes() {
  let incomesList = document.getElementById("incomes");
  let totalIncomes = 0;

  incomesList.innerHTML = "";
  incomesArray.forEach((income, index) => {
    let item = document.createElement("div");
    item.innerHTML = `
      <span class="income-name">${income.name}</span>
      - £${income.amount}
      ${income.recurring ? " - Recurring" : ""}
      <button onclick="removeIncome(${index})">&#10005</button>
    `;
    incomesList.appendChild(item);
  });
}

function displayExpenses() {
  let expensesList = document.getElementById("expenses");
  let totalExpenses = 0;

  expensesList.innerHTML = "";
  expensesArray.forEach((expense, index) => {
    let item = document.createElement("div");
    item.innerHTML = `
      <span class="expense-name">${expense.name}</span>
      - £${expense.amount}
      ${expense.recurring ? " - Recurring" : ""}
      <button onclick="removeExpense(${index})">&#10005</button>
    `;
    expensesList.appendChild(item);
  });
}

function addIncome() {
  console.log("add income button clicked");
}
function addExpense() {
  console.log("add expense button clicked");
}
function removeIncome() {
  console.log("remove income button clicked");
}
function removeExpense() {
  console.log("remove expense button clicked");
}
