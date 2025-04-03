import type { IDataObject, IExecuteFunctions } from "n8n-workflow";

export function perpareOfferData(context: IExecuteFunctions, itemIndex: number): IDataObject {
    const data: IDataObject = {};
    const name = context.getNodeParameter('name', itemIndex) as string;
    data.name = name;
    const currency = context.getNodeParameter('currency', itemIndex) as string;
    if (currency) data.currency = currency;
    data.auto_process = context.getNodeParameter('auto_process', itemIndex) as boolean;
    if (data.auto_process) {
        data.down_payment_type = context.getNodeParameter('down_payment_type', itemIndex) as string;
        data.down_payment = context.getNodeParameter('down_payment', itemIndex) as number;
        data.down_payment_flexible = context.getNodeParameter('down_payment_flexible', itemIndex) as boolean;
        if (data.down_payment_flexible) {
            data.down_payment_min = context.getNodeParameter('down_payment_min', itemIndex) as number;
            data.down_payment_max = context.getNodeParameter('down_payment_max', itemIndex) as number;
        }
        data.term_units = context.getNodeParameter('term_units', itemIndex) as string;
        if (data.term_units === 'date') {
            const termDate = context.getNodeParameter('term_date', itemIndex) as string;
            data.term_date = new Date(termDate).toISOString().split('T')[0];
        }
        else {
            data.term = context.getNodeParameter('term', itemIndex) as number;
            data.term_flexible = context.getNodeParameter('term_flexible', itemIndex) as boolean;
            if (data.term_flexible) {
                data.term_min = context.getNodeParameter('term_min', itemIndex) as number;
                data.term_max = context.getNodeParameter('term_max', itemIndex) as number;
            }
        }
        data.frequency_units = context.getNodeParameter('frequency_units', itemIndex) as string;
        if (data.frequency_units === 'days_month') {
            const daysString = context.getNodeParameter('frequency_days', itemIndex) as string;
            data.frequency_days = daysString.split(',').map(Number);
        }
        else {
            data.frequency = context.getNodeParameter('frequency', itemIndex) as number;
            data.frequency_flexible = context.getNodeParameter('frequency_flexible', itemIndex) as boolean;
            if (data.frequency_flexible) {
                data.frequency_min = context.getNodeParameter('frequency_min', itemIndex) as number;
                data.frequency_max = context.getNodeParameter('frequency_max', itemIndex) as number;
            }   
        }
        data.starts_auto = context.getNodeParameter('starts_auto', itemIndex) as boolean;
        if (data.starts_auto === false) {
            data.starts_date = context.getNodeParameter('starts_date', itemIndex) as string;
        }
    }
    else {
        data.description = context.getNodeParameter('description', itemIndex) as string;
    }
    return data;
}