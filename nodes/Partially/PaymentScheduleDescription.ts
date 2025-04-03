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
