import type { INodeProperties } from "n8n-workflow";

export const paymentOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        required: true,
        default: 'create',
        displayOptions: {   
            show: {
                resource: ['payment'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
            },
            {
                name: 'Confirm',
                value: 'confirm',
            },
            {
                name: 'List',
                value: 'list',
            },
            {
                name: 'Get',
                value: 'get',
            },
        ],
    },
];

export const paymentFields: INodeProperties[] = [
    // payment:create
    {
        displayName: 'Payment Plan ID',
        name: 'payment_plan_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['create', 'confirm'],
                resource: ['payment'],
            },
        },
    },
    {
        displayName: 'Amount',
        name: 'amount',
        type: 'number',
        required: true,
        default: 0,
        displayOptions: {
            show: {
                operation: ['create', 'confirm'],
                resource: ['payment'],
            },
        },
    },
    {
        displayName: 'Return URL',
        name: 'return_url',
        type: 'string',
        required: false,
        default: '',
        displayOptions: {
            show: {
                operation: ['create', 'confirm'],
                resource: ['payment'],
            },
        },
        description: 'your URL to redirect user to after 3d secure authentication'
    },
    // payment:confirm
    {
        displayName: 'Contract signature',
        name: 'contract_signature',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {   
            show: {
                operation: ['confirm'],
                resource: ['payment'],
            },
        },
        description: 'customer signature for the new payment schedule contract'
    },
    // payment:list
    {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
        required: false,
        default: '',
        displayOptions: {
            show: {
                operation: ['list'],
                resource: ['payment'],
            },
        },
    },
    {
        displayName: 'Payment Plan ID',
        name: 'payment_plan_id',
        type: 'string',
        required: false,
        default: '',
        displayOptions: {
            show: {
                operation: ['list'],
                resource: ['payment'],
            },
        },
    },
    {
        displayName: 'Stripe payment intent ID',
        name: 'stripe_payment_intent_id',
        type: 'string',
        required: false,
        default: '',
        displayOptions: {   
            show: {
                operation: ['list'],
                resource: ['payment'],
            },
        },
    },
    {
        displayName: 'Additional filters',
        name: 'additional_filters',
        type: 'collection',
        required: false,
        default: '',
        displayOptions: {
            show:    {
                operation: ['list'],
                resource: ['payment'],
            },
        },
        options: [
            {
                displayName: 'Payment status',
                name: 'status',
                type: 'options',
                required: false,
                default: '',
                options: [
                    {
                        name: 'Paid',
                        value: 'paid',
                    },
                    {
                        name: 'Pending',
                        value: 'pending',
                    },
                    {
                        name: 'Failed',
                        value: 'failed',
                    }   
                ]
            },
            {
                displayName: 'Currency',
                name: 'currency',
                type: 'string',
                required: false,
                default: ''
            },
            {
                displayName: 'Payment created date',
                name: 'date',
                type: 'dateTime',
                required: false,
                default: ''
            },
            {
                displayName: 'Created date range minimum',
                name: 'date_min',
                type: 'dateTime',
                required: false,
                default: ''
            },
            {
                displayName: 'Created date range maximum',
                name: 'date_max',
                type: 'dateTime',
                required: false,
                default: ''
            },
            {
                displayName: 'Limit',
                name: 'per_page',
                type: 'number',
                required: false,
                default: 10,
                typeOptions: {
                    minValue: 1,
                    maxValue: 100
                }
            }
        ]   
    },
    // payment:get
    {
        displayName: 'Payment ID',
        name: 'payment_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['get'],
                resource: ['payment'],
            },
        },
    },
];  
