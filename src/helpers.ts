import { IOperationsData, IPeriodAndOperations } from "./interfaces/operations";

export const preetyPrice = (price: string) => {
    return price?.replace("PLN", "")?.replace(",", ".").replace(" ", "");
};


export const filterCategories = (operations: IOperationsData[], regex: RegExp): IPeriodAndOperations["operationsData"] => {
    return operations.filter((element) => regex.test(element.category));
};