import type { INodeProperties } from "n8n-workflow";

export const disputeOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        required: true,
        default: 'create',
        displayOptions: {
            show: {
                resource: ['dispute'],
            },
        },
        options: [
            {
                name: 'List',
                value: 'list',
            }
        ]
    }
];

export const disputeFields: INodeProperties[] = [
    // dispute:list
    {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
        required: false,
        default: '',
        displayOptions: {
            show: {
                operation: ['list'],
                resource: ['dispute'],
            },
        },
    },
    {
        displayName: 'Additional filters',
        name: 'additionalFilters',
        type: 'collection',
        required: false,
        default: {},
        displayOptions: {
            show: {
                operation: ['list'],
                resource: ['dispute'],
            },
        },
        options: [
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                default: '',
                options: [
                    {
                        name: 'Needs response',
                        value: 'needs_response'
                    },
                    {
                        name: 'Under review',
                        value: 'under_review'
                    },
                    {
                        name: 'Won',
                        value: 'won'
                    },
                    {
                        name: 'Lost',
                        value: 'lost'
                    },
                    {
                        name: 'Charge refunded',
                        value: 'charge_refunded'
                    },
                    {
                        name: 'Charge reversed',
                        value: 'charge_reversed'
                    },
                    {
                        name: 'Warning needs response',
                        value: 'warning_needs_response'
                    },
                    {
                        name: 'Warning under review',
                        value: 'warning_under_review'
                    },
                    {
                        name: 'Warning closed',
                        value: 'warning_closed'
                    }
                ]
            },
            {
                displayName: 'Reason',
                name: 'reason',
                type: 'options',
                default: '',
                options: [
                    {
                        name: 'Fraudulent',
                        value: 'fraudulent'
                    },
                    {
                        name: 'Duplicate',
                        value: 'duplicate'
                    },
                    {
                        name: 'Other',
                        value: 'other'
                    },
                    {
                        name: 'Product unacceptable',
                        value: 'product_unacceptable'
                    },
                    {
                        name: 'Product not received',
                        value: 'product_not_received'
                    },
                    {
                        name: 'Subscription canceled',
                        value: 'subscription_canceled'
                    },
                    {
                        name: 'Subscription not received',
                        value: 'subscription_not_received'
                    },
                    {
                        name: 'Unrecognized',
                        value: 'unrecognized'
                    },
                    {
                        name: 'General',
                        value: 'general'
                    },
                    {
                        name: 'Debit not authorized',
                        value: 'debit_not_authorized'
                    },
                    {
                        name: 'Incorrect account details',
                        value: 'incorrect_account_details'
                    },
                    {
                        name: 'Insufficient funds',
                        value: 'insufficient_funds'
                    },
                    {
                        name: 'Customer initiated',
                        value: 'customer_initiated'
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
                displayName: 'Date range minimum',
                name: 'date_range_min',
                type: 'dateTime',
                default: ''
            },
            {
                displayName: 'Date range maximum',
                name: 'date_range_max',
                type: 'dateTime',
                default: ''
            }
        ]
    }
];