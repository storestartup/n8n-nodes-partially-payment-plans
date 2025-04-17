import type { INodeProperties } from "n8n-workflow";

export const installmentOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
        required: true,
        default: 'pay',
        displayOptions: {
            show: {
                resource: ['installment'],
            },
        },
        options: [
            {
                name: 'Pay',
                value: 'pay',
                description: 'Pay an installment',
																action: 'Pay an installment',
            },
            {
                name: 'List',
                value: 'list',
                description: 'List all installments',
																action: 'List an installment',
            }
        ]
    }
];

export const installmentFields: INodeProperties[] = [
    // installment:pay
    {
        displayName: 'Installment ID',
        name: 'installment_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['pay'],
                resource: ['installment'],
            },
        },
    },
    {
        displayName: 'Return URL',
        name: 'return_url',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['pay'],
                resource: ['installment'],
            },
        },
    },
    // installment:list
    {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['list'],
                resource: ['installment'],
            },
        },
    },
    {
        displayName: 'Payment Schedule ID',
        name: 'payment_schedule_id',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['list'],
                resource: ['installment'],
            },
        },
    }
];