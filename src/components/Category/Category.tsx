import React from "react";
import { IOperationsData } from "../../interfaces/operations";
import { SContainer } from "./CategoryStyles";

interface ICategory {
    categoryName: string;
    category: IOperationsData[];
}

export const Category = ({ categoryName, category }: ICategory) => {
    return (
        <SContainer>
            <p>{categoryName}</p>
            {category?.[0]?.category ? category.map((element, key) => <div key={key}>{element.price}</div>) : null}
        </SContainer>
    );
};
