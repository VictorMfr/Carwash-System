import stepperStep from "@/types/v2/form/formVariants/formStepper/stepperStep/stepperStep";
import { financeStepFields } from "./fields/fields";

export const financeStep: stepperStep = {
    title: 'Datos financieros',
    description: 'Datos financieros del stock',
    fields: financeStepFields,
    config: { spacing: 2 },
}

// {
//     label: 'Datos financieros',
//     title: 'Datos financieros',
//     description: 'Datos financieros del stock',
//     config: {},
//     validation: financialValidation,
//     data: [

//         {
//             field: 'charge_switch',
//             headerName: 'Monto en dolares',
//             inputConfig: {
//                 size: 6,
//                 id: 'charge_switch',
//                 switch: {
//                     label: 'Monto en dolares',
//                     swapIds: [
//                         {
//                             id: 'bol_charge',
//                             value: {
//                                 field: 'dollar_charge',
//                                 headerName: 'Monto en dolares',
//                                 inputConfig: {
//                                     size: 12,
//                                     id: 'dollar_charge',
//                                     number: { adornment: () => <>$</>, adornmentPosition: 'start' }
//                                 },
//                             }
//                         }
//                     ]
//                 }
//             },
//             renderCell: (params: any) => (
//                 <Fragment>
//                     {params.row.dollar_charge !== null && params.row.dollar_charge !== undefined
//                         ? Number(params.row.dollar_charge).toFixed(2)
//                         : ''}
//                 </Fragment>
//             )
//         },
//         {
//             field: 'rate_switch',
//             headerName: 'Tasa de cambio BCV',
//             inputConfig: {
//                 dataGridHidden: true,
//                 size: 6,
//                 id: 'rate_switch',
//                 switch: { label: 'Tasa de cambio BCV', disableIds: [{ id: 'dollar_rate', value: dollarRate[0].promedio }] }
//             }
//         },
//         {
//             field: 'bol_charge',
//             headerName: 'Monto en bolívares',
//             inputConfig: { size: 6, id: 'bol_charge', number: { adornment: () => <>Bs</>, adornmentPosition: 'start' } }
//         },

//         {
//             field: 'dollar_rate',
//             headerName: 'Tasa de cambio',
//             inputConfig: { size: 6, id: 'dollar_rate', number: { adornment: () => <>Bs/$</>, adornmentPosition: 'start' } }
//         },
//         {
//             field: 'charge_account',
//             headerName: 'Cuenta a cobrar',
//             inputConfig: {
//                 size: 6,
//                 id: 'charge_account',
//                 autocomplete: {
//                     url: '/api/finance/account',
//                     label: 'Cuenta a cobrar',
//                     loadingType: 'screen',
//                     newItemLabel: 'Agregar cuenta a cobrar',
//                     labelField: 'name',
//                     config: {
//                         create: {
//                             description: 'Agregar cuenta a cobrar',
//                             name: 'Agregar cuenta a cobrar',
//                         }
//                     },
//                     formData: {
//                         createFillField: 'name',
//                         columns: {

//                             data: AccountFormData.data
//                         }
//                     }
//                 }
//             },
//         },
//         {
//             field: 'method',
//             headerName: 'Método de pago',
//             inputConfig: {
//                 size: 6,
//                 id: 'method',
//                 autocomplete: {
//                     url: '/api/finance/method',
//                     label: 'Método de pago',
//                     loadingType: 'screen',
//                     newItemLabel: 'Agregar método de pago',
//                     labelField: 'name',
//                     config: {
//                         create: {
//                             description: 'Agregar método de pago',
//                             name: 'Agregar cuenta a cobrar',
//                         }
//                     },
//                     confirm: {
//                         title: 'Agregar método de pago',
//                         message: '¿Estás seguro de querer agregar este método de pago?',
//                         successMessage: 'Método de pago agregado correctamente',
//                     }
//                 }
//             },
//         },
//     ]
// },