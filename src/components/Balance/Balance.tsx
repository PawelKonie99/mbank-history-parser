import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface IBilance {
    setBalance: Dispatch<SetStateAction<number>>;
}

export const Balance = ({ setBalance }: IBilance) => {
    // const handleSubmit = () => {};

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBalance(parseFloat(event.target.value));
    };

    return (
        <form>
            <label>
                Wpisz stan konta z początku miesiąca
                <input type="number" name="name" onChange={handleChange} />
            </label>
        </form>
    );
};
