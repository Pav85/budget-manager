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
  let totalIncome = 0;

  incomesList.innerHTML = "";
  incomesArray.forEach((income) => {
    incomesList.innerHTML += `
    <li class="income-item">
      <span class="income-name">${income.name}</span>
      <span class="income-amount"> - £${income.amount}</span>
      <span class="income-recurring">${
        income.recurring ? "- Recurring payment" : ""
      }</span>
    </li>
    `;
  });
}

function displayExpenses() {
  let expensesList = document.getElementById("expenses");
  let totalExpenses = 0;

  expensesList.innerHTML = "";
  expensesArray.forEach((expense) => {
    expensesList.innerHTML += `
    <li class="expense-item">
      <span class="expense-name">${expense.name}</span>
      <span class="expense-amount"> - £${expense.amount}</span>
      <span class="expense-recurring">${
        expense.recurring ? "- Recurring expense" : ""
      }</span>
    </li>
    `;
  });
}
