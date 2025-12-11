/** @jest-environment node */

/**
 * Este archivo contiene las pruebas para la funcion handleFormDataValues, una 
 * funcion que se encarga de manejar los valores de un formulario en formato FormData
 * de forma mas rapida
 * considerando:
 * - Si el valor es un string, se convierte a JSON si es valido
 * - Si el valor es un boolean, se convierte a boolean
 * - Si el valor es un number, se convierte a number
 * - Si el valor es una fecha, se convierte a fecha
 * - Si el valor es un array, se convierte a array
 * - Si el valor es un objeto, se convierte a objeto
 */

import handleFormDataValues from "@/lib/apiUtils/handleFormDataValues";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from "dayjs";
dayjs.extend(customParseFormat);


describe('Pruebas con la funcion handleFormDataValues', () => {
    test('Debe manejar un formulario con valores simples', () => {
        const formData = new FormData();
        formData.append('name', 'John');
        formData.append('email', 'john@example.com'); 
        formData.append('age', '30');
        formData.append('roles', JSON.stringify(['admin', 'user']));
        formData.append('isActive', 'true');
        formData.append('crendentials', JSON.stringify({ 
            username: 'john', 
            password: '123456' 
        }));
        formData.append('date', '01-01-2025');

        

        const result = handleFormDataValues(formData);

        expect(result.name).toBe('John');
        expect(result.email).toBe('john@example.com');
        expect(result.age).toBe(30);
        expect(result.roles).toEqual(['admin', 'user']);
        expect(result.isActive).toBe(true);
        expect(result.crendentials).toEqual({ username: 'john', password: '123456' });
        expect(result.date).toBeInstanceOf(Date);
    });
});