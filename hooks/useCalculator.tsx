import { useEffect, useRef, useState } from "react";

enum Operation {
    add = '+',
    subtract = '-',
    multiply = '*',
    divide = '%',
}
export const useCalculator = () => {
    const [formula, setFormula] = useState('0');

    const [number, setNumber] = useState('0');
    const [previousNumber, setPreviousNumber] = useState('0');

    const lastOperation = useRef<Operation>(null);

    useEffect(() => {
        // TODO: calculate subtotal
        setFormula(number);
    }), [number]

    const buildNumber = (numberString: string) => {
        console.log('buildNumber', numberString);
    }

    return {
        // Props
        formula,
        number,
        previousNumber,

        // Methods
        buildNumber,
    }
}