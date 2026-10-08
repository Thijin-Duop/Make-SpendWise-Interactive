# SpendWise Dashboard — Make It Interactive

## Project Overview

SpendWise is a personal budgeting dashboard built using HTML, CSS, and JavaScript. The application allows users to set a monthly budget, add multiple expenses, calculate their remaining balance, and view their spending by category.

This project was developed as part of the Week 6 JavaScript assignment.

## Improvements Made This Week

* Added a form for setting the monthly budget.
* Added an expense form for entering expense names, categories, and amounts.
* Implemented the ability to delete individual expenses.
* Added a button to clear all expense records.
* Displayed the budget, expenses, and remaining balance directly on the webpage.
* Added budget status messages.
* Added a category summary to show spending by category.
* Added validation for user inputs.

## How Conditionals Are Used

The project uses `if`, `else if`, and `else` statements to evaluate the remaining balance.

* If the remaining balance is positive, the user is within budget.
* If the remaining balance is zero, the entire budget has been used.
* If the remaining balance is negative, the user has exceeded the budget.

Conditionals are also used to validate user input and handle empty expense records.

## How Arrays Are Used

An array named `expenses` stores multiple expense records.

Each record contains an expense ID, name, category, and amount.

The `push()` method adds new expenses to the array, while `filter()` removes a selected expense.

## How Loops Are Used

The project uses `for...of` loops to calculate total expenses, display expense records, and calculate spending by category.

A `for...in` loop displays the category totals.

## How the DOM Is Updated

DOM manipulation updates the webpage without requiring a page reload.

JavaScript updates the budget summary, remaining balance, budget status, expense table, and category summary.

Methods such as `textContent`, `createElement()`, `appendChild()`, and `replaceChildren()` are used to update webpage elements.

## How User Interactions Are Handled

Event listeners respond to user actions.

* The budget form's `submit` event updates the monthly budget.
* The expense form's `submit` event adds a new expense.
* Delete buttons remove individual expense records.
* The Clear All button removes all expense records after confirmation.

The `preventDefault()` method prevents forms from reloading the page when submitted.

## Challenges and Solutions

**Challenge 1: Updating the dashboard after adding an expense**

Solution: Created an `updateDashboard()` function that recalculates totals and refreshes the displayed information.

**Challenge 2: Handling invalid input**

Solution: Added validation to reject empty fields, negative amounts, and invalid numbers.

**Challenge 3: Managing multiple expenses**

Solution: Used an array to store expense records and loops to process and display them.

## Technologies Used

* HTML5
* CSS3
* JavaScript

## How to Run the Project

1. Clone or download the GitHub repository.
2. Open the project folder in Visual Studio Code.
3. Ensure `index.html`, `style.css`, and `script.js` are in the same folder.
4. Open `index.html` in a web browser.
5. Set a monthly budget.
6. Add expenses and test the dashboard.
7. Try deleting expenses and clearing all records.

## Project Structure

```
SpendWise-Dashboard/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Author

Thijin Simon Duop

## Purpose

This project demonstrates the practical use of JavaScript decision making, arrays, loops, DOM manipulation, and event listeners.
