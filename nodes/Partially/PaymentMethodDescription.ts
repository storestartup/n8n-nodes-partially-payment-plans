import type { INodeProperties } from "n8n-workflow";

export const paymentMethodOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
        required: true,
        default: 'list',
        displayOptions: {
            show: {
                resource: ['payment_method'],
            },
        },
        options: [
            {
                name: 'List',
                value: 'list',
																action: 'List a payment method',
            },
            {
                name: 'Delete',
                value: 'delete',
																action: 'Delete a payment method',
            },
        ],
    },
];

export const paymentMethodFields: INodeProperties[] = [
    // payment_method:list
    {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['list'],
                resource: ['payment_method'],
            },
        },
    },
    // payment_method:delete
    {
        displayName: 'Payment Method ID',
        name: 'payment_method_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['delete'],
                resource: ['payment_method'],   
            },
        },
    },
];