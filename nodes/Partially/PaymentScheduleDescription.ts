import type { INodeProperties } from "n8n-workflow";

export const paymentScheduleOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
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
            },
            {
                name: 'Get contract PDF',
                value: 'get_contract_pdf',
            },
            {
                name: 'Create',
                value: 'create',
            },
            {
                name: 'Add contract signature',
                value: 'add_contract_signature',
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
        displayName: 'Down payment amount',
        name: 'down_payment_amount',
        type: 'number',
        required: false,
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
        required: false,
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
        required: false,
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
        displayName: 'Payment plan ID',
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
        displayName: 'Automatically schedule installments',
        name: 'auto_process',
        type: 'boolean',
        default: true,
        displayOptions: {
            show: {
                operation: ['create'],  
                resource: ['payment_schedule'],
            },
        },
        description: 'If true, the installments will be scheduled automatically according to the provided schedule',
    },
    {
        displayName: 'Payment schedule description',
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
        displayName: 'Down payment type',
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
                name: 'Percentage of plan amount',
                value: 'percentage',
            },
            {
                name: 'Fixed amount',
                value: 'fixed',
            }
        ]
    },
    {
        displayName: 'Down payment amount/percentage',
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
        displayName: 'Down payment flexible',
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
        description: 'allow the customer to choose their down payment within a specified range',
    },
    {
        displayName: 'Minimum down payment amount/percentage',
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
        displayName: 'Maximum down payment amount/percentage',
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
        displayName: 'Term units',
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
                name: 'Weeks',
                value: 'weeks',
            },
            {
                name: 'Months',
                value: 'months',
            },
            {
                name: 'Years',
                value: 'years',
            },
            {
                name: 'Fixed number of payments',
                value: 'payments',
            },
            {
                name: 'Date',
                value: 'date',
            }
        ]
    },
    {
        displayName: 'Term value',
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
        displayName: 'Final payment date',
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
        displayName: 'Term flexible',
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
        description: 'allow the customer to choose their payment frequency within the specified range',
    },
    {
        displayName: 'Minimum term',
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
        displayName: 'Maximum term',
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
        displayName: 'Frequency units',
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
                name: 'Specific days of the month',
                value: 'days_month',
            }
        ]
    },
    {
        displayName: 'Frequency value',
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
        displayName: 'Days of the month',
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
        description: 'The days of the month to process payments (comma separated)',
    },
    {
        displayName: 'Frequency flexible',
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
        description: 'allow the customer to choose their payment frequency within the specified range',
    },
    {
        displayName: 'Minimum frequency',
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
        displayName: 'Maximum frequency',
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
        displayName: 'Automatically schedule first installment',
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
        description: 'If true, the first installment will be scheduled relative to the plan opened date',
    },
    {
        displayName: 'Date of first installment',
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
        displayName: 'Contract signature',
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
        displayName: 'IP address',
        name: 'ip_address',
        type: 'string',
        required: false,
        default: '',
        displayOptions: {
            show: {
                operation: ['add_contract_signature'],
                resource: ['payment_schedule'],
            },
        },
    },
    {
        displayName: 'User agent',
        name: 'user_agent',
        type: 'string',
        required: false,
        default: '',
        displayOptions: {
            show: {
                operation: ['add_contract_signature'],
                resource: ['payment_schedule'],
            },  
        },
    }
]
