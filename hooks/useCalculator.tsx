import { useEffect, useRef, useState } from "react";

enum Operation {
    add = '+',
    subtract = '-',
    multiply = '*',
    divide = '÷',
}
export const useCalculator = () => {
    const [formula, setFormula] = useState('0');

    const [number, setNumber] = useState('0');
    const [previousNumber, setPreviousNumber] = useState('0');

    const lastOperation = useRef<Operation>(null);

    useEffect(() => {
        if (lastOperation.current) {
            const firstFormulaPart = formula.split(' ').at(0)
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
        } else {
            setFormula(number);
        }
    }, [number]);

    useEffect(() => {
        const subResult = calculateSubResult();
        setPreviousNumber(`${subResult}`);
    }, [formula]);

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

    const setLastNumber = () => {
        calculateResult();

        if (number.endsWith('.')) {
            setPreviousNumber(number.slice(0, -1));
        }

        setPreviousNumber(number);
        setNumber('0');
    }

    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operation.divide;
    }

    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operation.multiply;
    }

    const subtractOperation = () => {
        setLastNumber();
        lastOperation.current = Operation.subtract;
    }

    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operation.add;
    }

    const calculateSubResult = () => {
        const [firstValue, operation, secondValue] = formula.split(' ');
        const num1 = Number(firstValue);
        const num2 = Number(secondValue);

        if (isNaN(num2)) return num1;

        switch (operation) {
            case Operation.add:
                return num1 + num2;
            case Operation.subtract:
                return num1 - num2;
            case Operation.multiply:
                return num1 * num2;
            case Operation.divide:
                return num1 / num2;
            default:
                throw new Error(`Operation ${operation} not supported`);
        }
    }

    const calculateResult = () => {
        const result = calculateSubResult();
        setNumber(`${result}`);

        lastOperation.current = null;
        setPreviousNumber('0');
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

        divideOperation,
        multiplyOperation,
        subtractOperation,
        addOperation,
        calculateSubResult,
        calculateResult,
    }
}