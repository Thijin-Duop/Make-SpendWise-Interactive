"use strict";

// Store the monthly budget
let monthlyBudget = 0;

// Store multiple expense records in an array
let expenses = [];

// Get HTML elements
const budgetForm = document.getElementById("budget-form");
const expenseForm = document.getElementById("expense-form");

const budgetInput = document.getElementById("monthly-budget");
const expenseNameInput = document.getElementById("expense-name");
const expenseCategoryInput = document.getElementById("expense-category");
const expenseAmountInput = document.getElementById("expense-amount");

const budgetDisplay = document.getElementById("budget-display");
const expensesDisplay = document.getElementById("expenses-display");
const balanceDisplay = document.getElementById("balance-display");
const budgetStatus = document.getElementById("budget-status");
const expenseList = document.getElementById("expense-list");
const categorySummary = document.getElementById("category-summary");
const message = document.getElementById("message");
const clearButton = document.getElementById("clear-expenses");

// Format amounts as Kenyan shillings
function formatMoney(amount) {
    return "KSh " + amount.toLocaleString("en-KE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Calculate total expenses using a loop
function calculateTotalExpenses() {
    let total = 0;

    for (const expense of expenses) {
        total += expense.amount;
    }

    return total;
}

// Display a message to the user
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

// Update the budget summary and status
function updateDashboard() {
    const totalExpenses = calculateTotalExpenses();
    const remainingBalance = monthlyBudget - totalExpenses;

    // Update the dashboard through DOM manipulation
    budgetDisplay.textContent = formatMoney(monthlyBudget);
    expensesDisplay.textContent = formatMoney(totalExpenses);
    balanceDisplay.textContent = formatMoney(remainingBalance);

    // Use conditionals to evaluate the budget
    if (monthlyBudget === 0) {
        budgetStatus.textContent =
            "Set your monthly budget to get started.";
        budgetStatus.className = "";
    } else if (remainingBalance > 0) {
        budgetStatus.textContent =
            "You are within budget. You have " +
            formatMoney(remainingBalance) + " remaining.";
        budgetStatus.className = "status-success";
    } else if (remainingBalance === 0) {
        budgetStatus.textContent =
            "You have used your entire monthly budget.";
        budgetStatus.className = "status-warning";
    } else {
        budgetStatus.textContent =
            "You have exceeded your budget by " +
            formatMoney(Math.abs(remainingBalance)) + ".";
        budgetStatus.className = "status-danger";
    }

    displayExpenses();
    displayCategorySummary();
}

// Display all expense records using a loop
function displayExpenses() {
    expenseList.replaceChildren();

    if (expenses.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 4;
        cell.textContent = "No expenses added yet.";

        row.appendChild(cell);
        expenseList.appendChild(row);
        return;
    }

    for (const expense of expenses) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = expense.name;

        const categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;

        const amountCell = document.createElement("td");
        amountCell.textContent = formatMoney(expense.amount);

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.setAttribute(
            "aria-label",
            "Delete expense: " + expense.name
        );

        // Event listener for deleting an expense
        deleteButton.addEventListener("click", function () {
            expenses = expenses.filter(function (item) {
                return item.id !== expense.id;
            });

            updateDashboard();
            showMessage("Expense deleted successfully.", "success-message");
        });

        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(amountCell);
        row.appendChild(actionCell);

        expenseList.appendChild(row);
    }
}

// Group expenses by category
function displayCategorySummary() {
    categorySummary.replaceChildren();

    if (expenses.length === 0) {
        const item = document.createElement("li");
        item.textContent = "No expenses to summarize yet.";
        categorySummary.appendChild(item);
        return;
    }

    const categoryTotals = {};

    // Loop through expenses to calculate category totals
    for (const expense of expenses) {
        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }

        categoryTotals[expense.category] += expense.amount;
    }

    // Loop through categories and display each total
    for (const category in categoryTotals) {
        const item = document.createElement("li");

        item.textContent =
            category + ": " + formatMoney(categoryTotals[category]);

        categorySummary.appendChild(item);
    }
}

// Handle the monthly budget form
budgetForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredBudget = Number(budgetInput.value);

    if (
        budgetInput.value.trim() === "" ||
        !Number.isFinite(enteredBudget) ||
        enteredBudget < 0
    ) {
        showMessage(
            "Please enter a valid, non-negative budget.",
            "error-message"
        );
        return;
    }

    monthlyBudget = enteredBudget;

    updateDashboard();
    showMessage("Monthly budget updated successfully.", "success-message");
});

// Handle adding a new expense
expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = expenseNameInput.value.trim();
    const category = expenseCategoryInput.value;
    const amount = Number(expenseAmountInput.value);

    // Validate the expense details
    if (
        name === "" ||
        category === "" ||
        expenseAmountInput.value.trim() === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        showMessage(
            "Please enter a name, category, and valid amount.",
            "error-message"
        );
        return;
    }

    // Add the new record to the array
    const newExpense = {
        id: Date.now() + Math.random(),
        name: name,
        category: category,
        amount: amount
    };

    expenses.push(newExpense);

    // Update the webpage
    updateDashboard();

    expenseForm.reset();

    showMessage("Expense added successfully!", "success-message");
});

// Handle clearing all expense records
clearButton.addEventListener("click", function () {
    if (expenses.length === 0) {
        showMessage("There are no expenses to clear.", "error-message");
        return;
    }

    const shouldClear = confirm(
        "Are you sure you want to delete all expenses?"
    );

    if (shouldClear) {
        expenses = [];
        updateDashboard();
        showMessage("All expenses have been cleared.", "success-message");
    }
});

// Display the initial dashboard
updateDashboard();