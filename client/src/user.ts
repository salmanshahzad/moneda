export interface User {
    username: string;
    income: Income[];
    expenses: Expense[];
    transactions: Transaction[];
    upcomingTransactions: Transaction[];
    categoryInfo: (id: string) => {type: string, name: string};
}

export interface Category {
    id: string;
    user_id: string;
    name: string;
    colour: string;
    type: string;
}

export interface Income extends Category {
    income: number;
}

export interface Expense extends Category {
    spent: number;
    budget: number;
}

export interface Transaction {
    id: string;
    user_id: string;
    category_id: string;
    amount: number;
    date: number;
    note: string;
    upcoming: boolean;
}
