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
        // TODO: calculate subtotal
        // setPrevNumber(number);
    }, [number]);

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
        // TODO: Calculate subtotal

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
    }
}