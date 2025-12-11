/** @jest-environment node */
import getJsonFromRequest from "@/lib/apiUtils/getJSONFromRequest";
import { NextRequest } from "next/server";

/**
 * Este archivo contiene las pruebas para el getJsonFromRequest, una 
 * funcion que se encarga de obtener los datos de un request en formato JSON
 * de forma mas rapida considerando si es de tipo JSON o multipart/form-data
 */

describe('Pruebas con getJsonFromRequest', () => {
    test('', async () => {
        const testRequest: NextRequest = {
            json: async () => ({
                name: 'John',
                age: 30,
            }),
            headers: new Headers({
                'content-type': 'application/json',
            }),
        } as any;
        const result = await getJsonFromRequest(testRequest);
        expect(result).toEqual({
            name: 'John',
            age: 30,
        });
    });
});