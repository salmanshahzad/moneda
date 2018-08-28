export const generateRandomColour = (): string => {
    const letters = "0123456789ABCDEF";
    let colour = "#";
    for (let i = 0; i < 6; i++) {
        colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
};

export const createExpense = (userId: string, name: string) => {
    return {
        user_id: userId,
        name,
        colour: generateRandomColour(),
        budget: 0,
        type: "expense"
    };
};

export const expenses = [
    "Mortgage",
    "Utilities",
    "Home Maintenance",
    "Groceries",
    "Restaurant",
    "Car Payment",
    "Car Maintenance",
    "Gas",
    "Public Transportation",
    "Phone",
    "Travel",
    "Entertainment",
    "Electronics",
    "Gym",
    "Clothing",
    "Childcare",
    "Gifts",
    "Medical",
    "Insurance",
    "Other"
];
