export const preetyPrice = (price: string) => {
    return price?.replace("PLN", "")?.replace(",", ".").replace(" ", "");
};
