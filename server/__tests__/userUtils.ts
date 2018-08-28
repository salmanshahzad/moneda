import { generateRandomColour, createExpense } from "../src/userUtils";

describe("generateRandomColour", () => {
    it("returns a valid hex colour", () => {
        const colour = generateRandomColour();
        expect(colour).toHaveLength(7);
        expect(colour).toMatch(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
    });
});

describe("createExpense", () => {
    it("returns an expense in the correct format", () => {
        const expense = createExpense("s", "Test Expense");
        expect(expense.user_id).toBe("s");
        expect(expense.name).toBe("Test Expense");
        expect(expense.colour).toMatch(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
        expect(expense.budget).toBe(0);
        expect(expense.type).toBe("expense");
    });
});
