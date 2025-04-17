import type { INodeProperties } from "n8n-workflow";

export const paymentScheduleOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
        required: true,
        default: 'create',
        displayOptions: {
            show: {
                resource: ['payment_schedule'],
            },
        },
        options: [
            {
                name: 'Update',
                value: 'update',
																action: 'Update a payment schedule',
            },
            {
                name: 'Get Contract PDF',
                value: 'get_contract_pdf',
																action: 'Get contract pdf a payment schedule',
            },
            {
                name: 'Create',
                value: 'create',
																action: 'Create a payment schedule',
            },
            {
                name: 'Add Contract Signature',
                value: 'add_contract_signature',
																action: 'Add contract signature a payment schedule',
            }
        ],
    }
]   

export const paymentScheduleFields: INodeProperties[] = [
    {
        displayName: 'Payment Schedule ID',
        name: 'payment_schedule_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['update', 'get_contract_pdf', 'add_contract_signature'],
                resource: ['payment_schedule'],
            },
        },
    },
    // payment_schedule:update
    {
        displayName: 'Down Payment Amount',
        name: 'down_payment_amount',
        type: 'number',
        default: 0,
        displayOptions: {   
            show: {
                operation: ['update'],
                resource: ['payment_schedule'],
            },
        },
    },
    {
        displayName: 'Term',
        name: 'term',
        type: 'number',
        default: 3,
        displayOptions: {
            show: {
                operation: ['update'],
                resource: ['payment_schedule'],
            },
        },
    },
    {
        displayName: 'Frequency',
        name: 'frequency',
        type: 'number',
        default: 1,
        displayOptions: {
            show: {
                operation: ['update'],
                resource: ['payment_schedule'],
            },
        },
    },
    // TODO payment_schedule:create
    {
        displayName: 'Payment Plan ID',
        name: 'payment_plan_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_schedule'],
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
                resource: ['payment_schedule'],
            },
        },
    },
    {
        displayName: 'Automatically Schedule Installments',
        name: 'auto_process',
        type: 'boolean',
        default: true,
        displayOptions: {
            show: {
                operation: ['create'],  
                resource: ['payment_schedule'],
            },
        },
        description: 'Whether or not the installments will be scheduled automatically according to the provided schedule',
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
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
                auto_process: [true],
            }
        },
        description: 'Whether or not the customer to choose their down payment within a specified range',
    },
    {
        displayName: 'Minimum Down Payment Amount/percentage',
        name: 'down_payment_min',
        type: 'number',
        default: 0,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
                auto_process: [true],
                term_units: ['weeks', 'months', 'years', 'payments'],
            }
        },
        description: 'Whether or not the customer can choose their payment frequency within the specified range',
    },
    {
        displayName: 'Minimum Term',
        name: 'term_min',
        type: 'number',
        default: 1,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
                auto_process: [true],
                frequency_units: ['days', 'weeks', 'months'],
            }
        },
        description: 'Whether or not the customer can choose their payment frequency within the specified range',
    },
    {
        displayName: 'Minimum Frequency',
        name: 'frequency_min',
        type: 'number',
        default: 1,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
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
                operation: ['create'],
                resource: ['payment_schedule'],
                auto_process: [true],
            }
        },
        description: 'Whether or not the first installment will be scheduled relative to the plan opened date',
    },
    {
        displayName: 'Date of First Installment',
        name: 'starts_date',
        type: 'dateTime',
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_schedule'],
                auto_process: [true],
                starts_auto: [false],
            }
        },
        description: 'The date of the first installment (time will be ignored)',
    },
    // payment_schedule:add_contract_signature
    {
        displayName: 'Contract Signature',
        name: 'contract_signature',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {   
            show: {
                operation: ['add_contract_signature'],
                resource: ['payment_schedule'],
            },
        },
    },
    {
        displayName: 'IP Address',
        name: 'ip_address',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['add_contract_signature'],
                resource: ['payment_schedule'],
            },
        },
    },
    {
        displayName: 'User Agent',
        name: 'user_agent',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['add_contract_signature'],
                resource: ['payment_schedule'],
            },  
        },
    }
]
