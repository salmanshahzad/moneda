export interface User {
    username: string;
    password: string;
    income: Income[];
    expenses: Expense[];
}

export interface Income {
    name: string;
    colour: string;
    income: number;
    transactions: Transaction[];
}

export interface Expense {
    name: string;
    colour: string;
    spent: number;
    budget: number;
    transactions: Transaction[];
}

export interface Transaction {
    amount: number;
    account: string;
    note: string;
    date: number;
}
