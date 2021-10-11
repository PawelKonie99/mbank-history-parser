export interface IOperationsData {
    date: string;
    receiver: string;
    account: string;
    category: string;
    price: string;
}

export interface IPeriodAndOperations {
    period: string;
    operationsData: IOperationsData[];
}

export interface IParsedData {
    categories: {
        clothes: IOperationsData[];
        foodAndHouse: IOperationsData[];
        socialEvents: IOperationsData[];
        fuel: IOperationsData[];
        salary: IOperationsData[];
        noCategory: IOperationsData[];
        journeys: IOperationsData[];
        others: IOperationsData[];
        eatingOut: IOperationsData[];
        sportAndHobby: IOperationsData[];
        multimediasAndBooks: IOperationsData[];
        cashWithdrawal: IOperationsData[];
        healthAndBeauty: IOperationsData[];
        personal: IOperationsData[];
    }
}

export interface IIncomeAndExpense {
    expenses: number;
    income: number;
}