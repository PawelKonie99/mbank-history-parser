import React from "react";
import { Stext } from "./TextStyles";

interface IText {
    title: string;
    content: string;
}

export const Text = ({ title, content }: IText) => {
    return (
        <Stext>
            {title}
            {content}
        </Stext>
    );
};
