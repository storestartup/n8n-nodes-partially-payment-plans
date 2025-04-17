import type { INodeProperties } from "n8n-workflow";

export const disputeOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
        required: true,
        default: 'list',
        displayOptions: {
            show: {
                resource: ['dispute'],
            },
        },
        options: [
            {
                name: 'List',
                value: 'list',
																action: 'List a dispute',
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
        default: '',
        displayOptions: {
            show: {
                operation: ['list'],
                resource: ['dispute'],
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
                resource: ['dispute'],
            },
        },
        options: [
            {
                displayName: 'Date',
                name: 'date',
                type: 'dateTime',
                default: ''
            },
            {
                displayName: 'Date Range Maximum',
                name: 'date_range_max',
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
                displayName: 'Reason',
                name: 'reason',
                type: 'options',
                default: 'fraudulent',
                options: [
                    {
                        name: 'Customer Initiated',
                        value: 'customer_initiated'
                    },
                    {
                        name: 'Debit Not Authorized',
                        value: 'debit_not_authorized'
                    },
                    {
                        name: 'Duplicate',
                        value: 'duplicate'
                    },
                    {
                        name: 'Fraudulent',
                        value: 'fraudulent'
                    },
                    {
                        name: 'General',
                        value: 'general'
                    },
                    {
                        name: 'Incorrect Account Details',
                        value: 'incorrect_account_details'
                    },
                    {
                        name: 'Insufficient Funds',
                        value: 'insufficient_funds'
                    },
                    {
                        name: 'Other',
                        value: 'other'
                    },
                    {
                        name: 'Product Not Received',
                        value: 'product_not_received'
                    },
                    {
                        name: 'Product Unacceptable',
                        value: 'product_unacceptable'
                    },
                    {
                        name: 'Subscription Canceled',
                        value: 'subscription_canceled'
                    },
                    {
                        name: 'Subscription Not Received',
                        value: 'subscription_not_received'
                    },
                    {
                        name: 'Unrecognized',
                        value: 'unrecognized'
                    }
                ]
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                default: 'needs_response',
                options: [
                    {
                        name: 'Charge Refunded',
                        value: 'charge_refunded'
                    },
                    {
                        name: 'Charge Reversed', 
                        value: 'charge_reversed'
                    },
                    {
                        name: 'Lost',
                        value: 'lost'
                    },
                    {
                        name: 'Needs Response',
                        value: 'needs_response'
                    },
                    {
                        name: 'Under Review',
                        value: 'under_review'
                    },
                    {
                        name: 'Warning Closed',
                        value: 'warning_closed'
                    },
                    {
                        name: 'Warning Needs Response',
                        value: 'warning_needs_response'
                    },
                    {
                        name: 'Warning Under Review',
                        value: 'warning_under_review'
                    },
                    {
                        name: 'Won',
                        value: 'won'
                    }
                ]
            }
        ]
    }
];