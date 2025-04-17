import type {INodeProperties} from "n8n-workflow";

export const refundOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
        required: true,
        default: 'create',
        displayOptions: {
            show: {
                resource: ['refund'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a refund',
																action: 'Create a refund',
            },
            {
                name: 'List',
                value: 'list',
                description: 'List all refunds',
																action: 'List a refund',
            }
        ]
    }
];

export const refundFields: INodeProperties[] = [
    // refund:create
    {
        displayName: 'Payment ID',
        name: 'payment_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['refund'],
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
                operation: ['create'],
                resource: ['refund'],
            },
        },
    },
    {
        displayName: 'Notes',
        name: 'notes',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['refund'],
            },
        },
    },
    // refund:list
    {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
        default: '',
        displayOptions: {   
            show: {
                operation: ['list'],
                resource: ['refund'],
            },
        },
    },
    {
        displayName: 'Additional Filters',
        name: 'additionalFilters',
        type: 'collection',
        default: {},
        displayOptions: {
            show: {
                operation: ['list'],
                resource: ['refund'],
            },
        },
        options: [
            {
                displayName: 'Reason',
                name: 'reason',
                type: 'options',
                default: 'requested_by_customer',
                options: [
                    {
                        name: 'Requested by Customer',
                        value: 'requested_by_customer',
                    },
                    {
                        name: 'Fraudulent',
                        value: 'fraudulent',
                    },
                    {
                        name: 'Duplicate',
                        value: 'duplicate',
                    }
                ]
            },
            {
                displayName: 'Date',
                name: 'date',
                type: 'dateTime',
                default: ''
            },
            {
                displayName: 'Date Range Minimum',
                name: 'date_range_min',
                type: 'dateTime',
                default: ''
            },
            {
                displayName: 'Date Range Maximum',
                name: 'date_range_max',
                type: 'dateTime',
                default: ''
            }
        ]
    }
];