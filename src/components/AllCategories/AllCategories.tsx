import { IParsedData } from "../../interfaces/operations";
import { Category } from "../Category/Category";
import { SContainer } from "./AllCategoriesStyles";

export const AllCategories = ({ categories }: IParsedData) => {
    return (
        <SContainer>
            <Category categoryName={"Ubrania"} category={categories.clothes} />
            <Category categoryName={"Chemia i dom"} category={categories.foodAndHouse} />
            <Category categoryName={"Wydarzenia"} category={categories.socialEvents} />
            <Category categoryName={"paliwo"} category={categories.fuel} />
            <Category categoryName={"Wypłata"} category={categories.salary} />
            <Category categoryName={"Wycieczki"} category={categories.journeys} />
            <Category categoryName={"Jedzenie na mieście"} category={categories.eatingOut} />
            <Category categoryName={"Sport i hobby"} category={categories.sportAndHobby} />
            <Category categoryName={"Ksiązki i multimedia"} category={categories.multimediasAndBooks} />
            <Category categoryName={"Wypłaty z bankomatu"} category={categories.cashWithdrawal} />
            <Category categoryName={"Zdrowie i uroda"} category={categories.healthAndBeauty} />
            <Category categoryName={"Osobiste"} category={categories.personal} />
            <Category categoryName={"Inne"} category={categories.others} />
            <Category categoryName={"Bez kategorii"} category={categories.noCategory} />
        </SContainer>
    );
};
