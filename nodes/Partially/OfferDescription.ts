import type { INodeProperties } from "n8n-workflow";

export const offerOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
        required: true,
        default: 'create',
        displayOptions: {
            show: {
                resource: ['offer'],
            },
        },
        options: [
            {
                name: 'List',
                value: 'list',
                description: 'List offers',
																action: 'List an offer',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Get an offer',
																action: 'Get an offer',
            },
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new offer',
																action: 'Create an offer',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update an offer',
																action: 'Update an offer',
            }
        ],
    },
];

export const offerFields: INodeProperties[] = [
    // offer:list
    {
        displayName: 'Limit',
        name: 'per_page',
        type: 'number',
        default: 10,
        displayOptions: {
            show: {
                operation: ['list'],  
                resource: ['offer'],
            },
        },
        description: 'Limit the number of results returned',
        typeOptions: {
            minValue: 1,
            maxValue: 100,
        },
    },
    // offer:get
    {
        displayName: 'Offer ID',
        name: 'offerId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['get'],
                resource: ['offer'],
            },
        },
    },
    // offer:create and offer:update
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
            },
        },
        description: 'The name of the offer',
    },
    {
        displayName: 'Currency',
        name: 'currency',
        type: 'string',
        required: true,
        default: 'USD',
        displayOptions: {   
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
            },
        },
        description: 'Default currency to use for payment plans if not specified',
    },
    {
        displayName: 'Automatically Schedule Installments',
        name: 'auto_process',
        type: 'boolean',
        default: true,
        displayOptions: {
            show: {
                operation: ['create', 'update'],  
                resource: ['offer'],
            },
        },
        description: 'Whether or not to automatically schedule installments according to the provided schedule',
    },
    {
        displayName: 'Payment Schedule Description',
        name: 'description',
        type: 'string',
        default: '',
        typeOptions: {
            rows: 3,
        },
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [false],
            },
        },
        description: 'A description of when you will process payments',
    },
    {
        displayName: 'Down Payment Type',
        name: 'down_payment_type',
        type: 'options',
        default: 'percentage',
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
            },
        },
        options: [
            {
                name: 'Percentage of Plan Amount',
                value: 'percentage',
            },
            {
                name: 'Fixed Amount',
                value: 'fixed',
            }
        ]
    },
    {
        displayName: 'Down Payment Amount/percentage',
        name: 'down_payment',
        type: 'number',
        default: 0,
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
            }
        }   
    },
    {
        displayName: 'Down Payment Flexible',
        name: 'down_payment_flexible',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
            }
        },
        description: 'Whether or not to allow the customer to choose their down payment within a specified range',
    },
    {
        displayName: 'Minimum Down Payment Amount/percentage',
        name: 'down_payment_min',
        type: 'number',
        default: 0,
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
                down_payment_flexible: [true],
            }
        }   
    },
    {
        displayName: 'Maximum Down Payment Amount/percentage',
        name: 'down_payment_max',
        type: 'number',
        default: 0,
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
                down_payment_flexible: [true],
            }
        }   
    },
    {
        displayName: 'Term Units',
        name: 'term_units',
        type: 'options',
        default: 'months',
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true]
            }
        },
        options: [
            {
                name: 'Date',
                value: 'date',
            },
            {
                name: 'Fixed Number of Payments', 
                value: 'payments',
            },
            {
                name: 'Months',
                value: 'months',
            },
            {
                name: 'Weeks',
                value: 'weeks',
            },
            {
                name: 'Years',
                value: 'years',
            }
        ]
    },
    {
        displayName: 'Term Value',
        name: 'term',
        type: 'number',
        default: 3,
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
                term_units: ['weeks', 'months', 'years', 'payments'],
            }
        },
        description: 'The number of weeks, months, years, or payments',
    },
    {
        displayName: 'Final Payment Date',
        name: 'term_date',
        type: 'dateTime',
        default: '',
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
                term_units: ['date'],
            }
        },
        description: 'The date of the final payment (time will be ignored)',
    },
    {
        displayName: 'Term Flexible',
        name: 'term_flexible',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
                term_units: ['weeks', 'months', 'years', 'payments'],
            }
        },
        description: 'Whether or not to allow the customer to choose their payment frequency within the specified range',
    },
    {
        displayName: 'Minimum Term',
        name: 'term_min',
        type: 'number',
        default: 1,
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
                term_flexible: [true],
            }
        },
        description: 'The minimum number of weeks, months, years, or payments',
    },
    {
        displayName: 'Maximum Term',
        name: 'term_max',
        type: 'number',
        default: 99,
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
                term_flexible: [true],
            }
        },
        description: 'The maximum number of weeks, months, years, or payments',
    },
    {
        displayName: 'Frequency Units',
        name: 'frequency_units',
        type: 'options',
        default: 'months',
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
            }
        },
        options: [
            {
                name: 'Days',
                value: 'days',
            },
            {
                name: 'Weeks',
                value: 'weeks',
            },
            {
                name: 'Months',
                value: 'months',
            },
            {
                name: 'Specific Days of the Month',
                value: 'days_month',
            }
        ]
    },
    {
        displayName: 'Frequency Value',
        name: 'frequency',
        type: 'number',
        default: 1,
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
                frequency_units: ['days', 'weeks', 'months'],
            }
        },
        description: 'The number of days, weeks, or months between payments',
    },
    {
        displayName: 'Days of the Month',
        name: 'frequency_days',
        type: 'string',
        default: '1,15',
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
                frequency_units: ['days_month'],
            }
        },
        description: 'The days of the month to process payments (comma-separated)',
    },
    {
        displayName: 'Frequency Flexible',
        name: 'frequency_flexible',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
                frequency_units: ['days', 'weeks', 'months'],
            }
        },
        description: 'Whether or not to allow the customer to choose their payment frequency within the specified range',
    },
    {
        displayName: 'Minimum Frequency',
        name: 'frequency_min',
        type: 'number',
        default: 1,
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
                frequency_units: ['days', 'weeks', 'months'],
                frequency_flexible: [true],
            }
        },
        description: 'The minimum number of days, weeks, or months between payments',
    },
    {
        displayName: 'Maximum Frequency',
        name: 'frequency_max',
        type: 'number',
        default: 99,
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
                frequency_units: ['days', 'weeks', 'months'],
                frequency_flexible: [true],
            }
        },
        description: 'The maximum number of days, weeks, or months between payments',
    },
    {
        displayName: 'Automatically Schedule First Installment',
        name: 'starts_auto',
        type: 'boolean',
        default: true,
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
            }
        },
        description: 'Whether or not to automatically schedule the first installment relative to the plan opened date',
    },
    {
        displayName: 'Date of First Installment',
        name: 'starts_date',
        type: 'dateTime',
        default: '',
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer'],
                auto_process: [true],
                starts_auto: [false],
            }
        },
        description: 'The date of the first installment (time will be ignored)',
    },
    // offer:update
    {
        displayName: 'Offer ID',
        name: 'offerId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['update'],
                resource: ['offer'],
            },
        },
    }
];

