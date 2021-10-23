import { useState } from "react";
import { CSVReader } from "react-papaparse";
import { ParseResult } from "papaparse";
import { IIncomeAndExpense, IOperationsData, IParsedData, IPeriodAndOperations } from "./interfaces/operations";
import { AllCategories } from "./components/AllCategories/AllCategories";
import { filterCategories, preetyPrice } from "./helpers";
import { Text } from "./components/Text/Text";
import { Balance } from "./components/Balance/Balance";

const operationObj = [
    {
        date: "",
        receiver: "",
        account: "",
        category: "",
        price: "",
    },
];

function App() {
    const [parsedData, setParsedData] = useState<IParsedData>({
        categories: {
            clothes: operationObj,
            foodAndHouse: operationObj,
            socialEvents: operationObj,
            fuel: operationObj,
            salary: operationObj,
            noCategory: operationObj,
            journeys: operationObj,
            others: operationObj,
            eatingOut: operationObj,
            sportAndHobby: operationObj,
            multimediasAndBooks: operationObj,
            cashWithdrawal: operationObj,
            healthAndBeauty: operationObj,
            personal: operationObj,
        },
    });
    const [incomeAndExpense, setIncomeAndExpense] = useState<IIncomeAndExpense>({
        expenses: 0,
        income: 0,
    });
    const [balance, setBalance] = useState<number>(0);
    // const [allOperations, setAllOperations] = useState<IPeriodAndOperations>({
    //     period: "",
    //     operationsData: [
    //         {
    //             date: "",
    //             receiver: "",
    //             account: "",
    //             category: "",
    //             price: "",
    //         },
    //     ],
    // });

    const handleOnDrop = (data: ParseResult<string>[]) => {
        const period = data[14].data[0];
        //slice 26 because before is useless info
        const operationsData = data.slice(26).map((item) => {
            const transactionData = item.data[0].split(";");
            const [date, receiver, account, category, price] = transactionData;
            return {
                date,
                receiver,
                account,
                category,
                price,
            };
        });

        parseOperarationsByCategory({ period, operationsData });
        // setAllOperations({ period, operationsData });
        sumAllOperations({ period, operationsData });
    };

    const parseOperarationsByCategory = (operations: IPeriodAndOperations) => {
        setParsedData({
            categories: {
                clothes: filterCategories(operations.operationsData, /obuwie/i),
                foodAndHouse: filterCategories(operations.operationsData, /chemia domowa/i),
                socialEvents: filterCategories(operations.operationsData, /wydarzenia/i),
                fuel: filterCategories(operations.operationsData, /paliwo/i),
                salary: filterCategories(operations.operationsData, /wynagrodzenie/i),
                noCategory: filterCategories(operations.operationsData, /bez kategorii/i),
                journeys: filterCategories(operations.operationsData, /przejazdy/i),
                others: filterCategories(operations.operationsData, /inne/i),
                eatingOut: filterCategories(operations.operationsData, /jedzenie poza domem/i),
                sportAndHobby: filterCategories(operations.operationsData, /sport i hobby/i),
                multimediasAndBooks: filterCategories(operations.operationsData, /prasa/i),
                cashWithdrawal: filterCategories(operations.operationsData, /wyp.ata/i),
                healthAndBeauty: filterCategories(operations.operationsData, /zdrowie/i),
                personal: filterCategories(operations.operationsData, /osobiste/i),
            },
        });
    };

    const handleOnError = (err: string) => {
        console.log(err);
    };

    const handleOnRemoveFile = () => {
        console.log("---------------------------");
    };

    const sumAllOperations = (operations: IPeriodAndOperations) => {
        let expenses = 0;
        let income = 0;

        operations.operationsData.forEach((element) => {
            const price = preetyPrice(element.price);
            if (element.price) {
                if (/-/i.test(price)) {
                    const positivePrice = price?.replace("-", "");

                    if (!isNaN(parseFloat(positivePrice))) {
                        expenses = expenses + parseFloat(positivePrice);
                    }
                } else {
                    income = income + parseFloat(price);
                }
            }
        });

        setIncomeAndExpense({
            expenses,
            income,
        });
    };

    const monthlyBalance = incomeAndExpense?.income - incomeAndExpense?.expenses;

    return (
        <>
            <CSVReader
                onDrop={handleOnDrop}
                addRemoveButton
                onRemoveFile={handleOnRemoveFile}
                onError={handleOnError}
                config={{
                    encoding: "utf-8",
                }}
            >
                <span>Drop CSV file here or click to upload.</span>
            </CSVReader>
            <Balance setBalance={setBalance} />
            <Text title={"Bilans konta na początku miesiąca: "} content={balance.toFixed(1).toString()} />
            <Text title={"Bilans konta na końcu miesiąca: "} content={(balance + monthlyBalance).toFixed(1).toString()} />
            <Text title={"Wydatki: "} content={incomeAndExpense?.expenses.toFixed(1).toString()} />
            <Text title={"Przychody: "} content={incomeAndExpense?.income.toFixed(1).toString()} />
            <Text title={"Bilans wydatków: "} content={monthlyBalance.toFixed(1).toString()} />

            <AllCategories categories={parsedData.categories} />
        </>
    );
}

export default App;
