// global variables
// incomes array stored in session storage or default incomes array
let incomesArray = JSON.parse(sessionStorage.getItem("incomesArray")) || [
  { name: "Salary", amount: 2000, recurring: true },
  { name: "Side Hustle", amount: 500, recurring: true },
  { name: "Bonus", amount: 1000, recurring: false },
  { name: "Tax Return", amount: 750, recurring: false },
  { name: "Passive Income", amount: 200, recurring: false },
];

// expenses array stored in session storage or default expenses array
let expensesArray = JSON.parse(sessionStorage.getItem("expensesArray")) || [
  { name: "Rent", amount: 800, recurring: true },
  { name: "Food", amount: 400, recurring: true },
  { name: "Utilities", amount: 100, recurring: true },
  { name: "Car Insurance", amount: 200, recurring: false },
  { name: "Car Repair", amount: 700, recurring: false },
];
// total of savings stored in session storage or 0
let savingsTotal = parseFloat(sessionStorage.getItem("savingsTotal")) || 0;

// when the page loads, display the incomes and expenses
document.addEventListener("DOMContentLoaded", () => {
  displayIncomes();
  displayExpenses();
  document.getElementById("savingsValue").textContent = `£${savingsTotal}`;
});

// functction that displays the incomes
function displayIncomes() {
  let incomesList = document.getElementById("incomes");
  let totalIncome = 0;

  incomesList.innerHTML = "";
  incomesArray.forEach((income, index) => {
    totalIncome += income.amount;
    let item = document.createElement("div");
    item.innerHTML = `
      <span class="income-name">${capitalise(income.name)}</span>
      - £${income.amount}
      ${income.recurring ? " - Recurring" : ""}
      <button onclick="removeIncome(${index})">&#10005;</button>
    `;
    incomesList.appendChild(item);
  });
  document.getElementById("totalIncomeValue").textContent = `£${totalIncome}`;
  calculateDisposableIncome();
}

// function that displays the expenses
function displayExpenses() {
  let expensesList = document.getElementById("expenses");
  let totalExpenses = 0;

  expensesList.innerHTML = "";
  expensesArray.forEach((expense, index) => {
    totalExpenses += expense.amount;

    let item = document.createElement("div");
    item.innerHTML = `
      <span class="expense-name">${capitalise(expense.name)}</span>
      - £${expense.amount}
      ${expense.recurring ? " - Recurring" : ""}
      <button onclick="removeExpense(${index})">&#10005;</button>
    `;
    expensesList.appendChild(item);
  });
  document.getElementById(
    "totalExpensesValue"
  ).textContent = `£${totalExpenses}`;
  calculateDisposableIncome();
}

// function that adds an income after clicking the add income button
function addIncome() {
  const incomeName = prompt("Enter income name");
  const incomeAmount = parseFloat(prompt("Enter income amount"));
  const incomeRecurring = confirm("Is this income recurring?");

  if (isNaN(incomeAmount)) {
    alert("Please enter a valid amount");
    return;
  }

  const newIncome = {
    name: incomeName,
    amount: incomeAmount,
    recurring: incomeRecurring,
  };

  incomesArray.push(newIncome);
  sessionStorage.setItem("incomesArray", JSON.stringify(incomesArray));
  displayIncomes();
}

// function that adds an expense after clicking the add expense button
function addExpense() {
  const expenseName = prompt("Enter expense name");
  const expenseAmount = parseFloat(prompt("Enter expense amount"));
  const expenseRecurring = confirm("Is this expense recurring?");

  if (isNaN(expenseAmount)) {
    alert("Please enter a valid amount");
    return;
  }
  const newExpense = {
    name: expenseName,
    amount: expenseAmount,
    recurring: expenseRecurring,
  };
  expensesArray.push(newExpense);
  sessionStorage.setItem("expensesArray", JSON.stringify(expensesArray));
  displayExpenses();
}

// function that removes an income after clicking the remove income button
function removeIncome(index) {
  incomesArray.splice(index, 1);
  sessionStorage.setItem("incomesArray", JSON.stringify(incomesArray));
  displayIncomes();
}

// function that removes an expense after clicking the remove expense button
function removeExpense(index) {
  expensesArray.splice(index, 1);
  sessionStorage.setItem("expensesArray", JSON.stringify(expensesArray));
  displayExpenses();
}

// function that calculates the disposable income
function calculateDisposableIncome() {
  const totalIncome = incomesArray.reduce(
    (acc, income) => acc + income.amount,
    0
  );
  const totalExpenses = expensesArray.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const disposableIncome = totalIncome - totalExpenses;
  document.getElementById(
    "disposableIncomeValue"
  ).textContent = `£${disposableIncome}`;
}

// function that adds savings after clicking the add savings button and updates the savings total
// and updates the disposable income
function addToSavings() {
  const savingsAmount = parseFloat(prompt("Enter savings amount"));
  if (isNaN(savingsAmount) || savingsAmount <= 0) {
    alert("Please enter a valid amount");
    return;
  }
  savingsTotal += savingsAmount;
  sessionStorage.setItem("savingsTotal", savingsTotal.toFixed(2));
  document.getElementById(
    "savingsValue"
  ).textContent = `£${savingsTotal.toFixed(2)}`;

  calculateDisposableIncome();

  const totalIncome = incomesArray.reduce(
    (acc, income) => acc + income.amount,
    0
  );
  const totalExpenses = expensesArray.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const disposableIncome = totalIncome - totalExpenses - savingsTotal;

  document.getElementById(
    "disposableIncomeValue"
  ).textContent = `£${disposableIncome}`;

  alert(
    `After saving £${savingsAmount}, you have £${disposableIncome} of disposable income left.`
  );
}

// function that capitalises the first letter of a string
function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
