export interface User {
    username: string;
    income: Income[];
    expenses: Expense[];
    transactions: Transaction[];
}

export interface Income {
    id: string;
    name: string;
    colour: string;
    income: number;
}

export interface Expense {
    id: string;
    name: string;
    colour: string;
    spent: number;
    budget: number;
}

export interface Transaction {
    id: string;
    account_id: string;
    amount: number;
    date: number;
    note: string;
}
