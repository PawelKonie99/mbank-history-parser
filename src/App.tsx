import { useEffect, useState } from "react";
import { CSVReader } from "react-papaparse";
import { ParseResult } from "papaparse";

interface IOperationsData {
    date: string;
    receiver: string;
    account: string;
    category: string;
    price: string;
}

interface IPeriodAndOperations {
    period: string;
    operationsData: IOperationsData[];
}

interface IParsedData {
    clothes: IOperationsData[];
    foodAndHouse: IOperationsData[];
    socialEvents: IOperationsData[];
    fueal: IOperationsData[];
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

function App() {
    const [parsedData, setParsedData] = useState<IParsedData>();

    const handleOnDrop = (data: ParseResult<string>[]) => {
        const period = data[14].data[0];
        //slice 26 because before is useless info
        const operationsData = data.slice(26).map((item) => {
            const test = item.data[0].split(";");
            const [date, receiver, account, category, price] = test;
            return {
                date,
                receiver,
                account,
                category,
                price,
            };
        });

        setParsedData(parseOperarationsByCategory({ period, operationsData }));
    };

    const parseOperarationsByCategory = (operations: IPeriodAndOperations): IParsedData => {
        return {
            clothes: filterCategories(operations.operationsData, /obuwie/i),
            foodAndHouse: filterCategories(operations.operationsData, /chemia domowa/i),
            socialEvents: filterCategories(operations.operationsData, /wydarzenia/i),
            fueal: filterCategories(operations.operationsData, /paliwo/i),
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
        };
    };

    //todo move to helpers
    const filterCategories = (operations: IOperationsData[], regex: RegExp): IPeriodAndOperations["operationsData"] => {
        return operations.filter((element) => regex.test(element.category));
    };

    const handleOnError = (err: string) => {
        console.log(err);
    };

    const handleOnRemoveFile = () => {
        console.log("---------------------------");
    };

    // useEffect(() => {
    //     console.log("parsedData", parsedData);
    // }, [parsedData]);

    return (
        <>
            <CSVReader
                // onDrop={() => handleOnDrop}
                onDrop={handleOnDrop}
                addRemoveButton
                onRemoveFile={handleOnRemoveFile}
                onError={handleOnError}
            >
                <span>Drop CSV file here or click to upload.</span>
            </CSVReader>
            {parsedData?.clothes.map((element) => (
                <div key={element.price}>{element.price}</div>
            ))}
        </>
    );
}

export default App;
