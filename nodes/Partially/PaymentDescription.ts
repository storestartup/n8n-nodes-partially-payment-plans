import type { INodeProperties } from "n8n-workflow";

export const paymentOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
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
																action: 'Create a payment',
            },
            {
                name: 'Confirm',
                value: 'confirm',
																action: 'Confirm a payment',
            },
            {
                name: 'List',
                value: 'list',
																action: 'List a payment',
            },
            {
                name: 'Get',
                value: 'get',
																action: 'Get a payment',
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
        default: '',
        displayOptions: {
            show: {
                operation: ['create', 'confirm'],
                resource: ['payment'],
            },
        },
        description: 'Your URL to redirect user to after 3d secure authentication'
    },
    // payment:confirm
    {
        displayName: 'Contract Signature',
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
        description: 'Customer signature for the new payment schedule contract'
    },
    // payment:list
    {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
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
        default: '',
        displayOptions: {
            show: {
                operation: ['list'],
                resource: ['payment'],
            },
        },
    },
    {
        displayName: 'Stripe Payment Intent ID',
        name: 'stripe_payment_intent_id',
        type: 'string',
        default: '',
        displayOptions: {   
            show: {
                operation: ['list'],
                resource: ['payment'],
            },
        },
    },
    {
        displayName: 'Additional Filters',
        name: 'additional_filters',
        type: 'collection',
        default: {},
        displayOptions: {
            show:    {
                operation: ['list'],
                resource: ['payment'],
            },
        },
        options: [
            {
                displayName: 'Created Date Range Maximum',
                name: 'date_max',
                type: 'dateTime',
                default: ''
            },
            {
                displayName: 'Created Date Range Minimum',
                name: 'date_min',
                type: 'dateTime',
                default: ''
            },
            {
                displayName: 'Currency',
                name: 'currency',
                type: 'string',
                default: ''
            },
            {
                displayName: 'Limit',
                name: 'per_page',
                type: 'number',
                default: 10,
                typeOptions: {
                    minValue: 1,
                    maxValue: 100
                }
            },
            {
                displayName: 'Payment Created Date',
                name: 'date',
                type: 'dateTime',
                default: ''
            },
            {
                displayName: 'Payment Status',
                name: 'status',
                type: 'options',
                default: 'paid',
                options: [
                    {
                        name: 'Failed',
                        value: 'failed',
                    },
                    {
                        name: 'Paid',
                        value: 'paid',
                    },
                    {
                        name: 'Pending',
                        value: 'pending',
                    }   
                ]
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
