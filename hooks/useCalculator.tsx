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

    const clean = () => {
        setNumber('0');
        setPreviousNumber('0');
        lastOperation.current = null;
        setFormula('0');
    }

    const toggleSing = () => {
        if (number.includes('-')) {
            setNumber(number.replace('-', ''));
        }
        else {
            setNumber('-' + number);
        }
    }

    const deleteLast = () => {
        let negative = '';
        let tempNumber = number;
        
        if (number.includes('-')) {
            negative = '-';
            tempNumber = number.substring(1);
        }
        
        if (tempNumber.length > 1) {
            setNumber(negative + tempNumber.slice(0, -1));
        }
        else {
            setNumber('0');
        }
    }

    const buildNumber = (numberString: string) => {
        // No aceptar doble punto
        if (numberString === '.' && number.includes('.')) return;

        if (number.startsWith('0') || number.startsWith('-0')) {
            // Punto decimal
            if (numberString === '.') {
                return setNumber(number + numberString);
            }

            // Evaluar si es otro cero y hay un punto
            if (numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString);
            }

            // Evaluar si es diferente de cero, no hay un punto y es el primer cero
            if (numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString);
            }

            // Evitar 0000.00
            if (numberString === '0' && !number.includes('.')) {
                return;
            }
        }

        setNumber(number + numberString);

    }

    return {
        // Props
        formula,
        number,
        previousNumber,

        // Methods
        buildNumber,
        clean,
        toggleSing,
        deleteLast,
    }
}