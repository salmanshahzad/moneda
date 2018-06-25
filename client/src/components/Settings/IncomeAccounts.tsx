import React from "react";
import { Income } from "../../../../user";
import IncomeAccountItem from "./IncomeAccountItem";

interface IncomeAccountsProps {
    accounts: Income[];
    onUpdateIncomeAccount: (id: string, name: string, colour: string) => Promise<{}>;
}

export default (props: IncomeAccountsProps) => (
    <React.Fragment>
        {
            props.accounts.map((account, i) => (
                <IncomeAccountItem account={account} onUpdateIncomeAccount={props.onUpdateIncomeAccount} key={i} />
            ))
        }
    </React.Fragment>
);
