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
            {category.map((element, key) => (
                <div key={key}>{element.price}</div>
            ))}
        </SContainer>
    );
};
