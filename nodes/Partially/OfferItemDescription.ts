import type { INodeProperties } from "n8n-workflow";

export const offerItemOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        required: true,
        default: 'create',
        displayOptions: {
            show: {
                resource: ['offer_item'],
            },
        },
        options: [
            {
                name: 'List',
                value: 'list',
            },
            {
                name: 'Create',
                value: 'create',
            },
            {
                name: 'Update',
                value: 'update',
            },
            {
                name: 'Delete',
                value: 'delete',
            },
        ],
    },
];

export const offerItemFields: INodeProperties[] = [
    // offer_item:list
    {
        displayName: 'Offer ID',
        name: 'offer_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['list', 'create'],
                resource: ['offer_item'],
            },
        },
    },
    // offer_item:create
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer_item'],
            },
        },
    },
    {
        displayName: 'Amount type',
        name: 'amount_type',
        type: 'options',
        required: true,
        default: 'fixed',
        displayOptions: {
            show: {
                operation: ['create', 'update'],  
                resource: ['offer_item'],
            },
        },
        options: [
            {
                name: 'Fixed',
                value: 'fixed',
            },
            {
                name: 'Percentage',
                value: 'percentage',
            },
        ],
        description: 'Percentage will be calculated based on the payment plan subtotal',
    },
    {
        displayName: 'Amount',
        name: 'amount',
        type: 'number', 
        required: true,
        default: 0,
        displayOptions: {
            show: {
                operation: ['create', 'update'],
                resource: ['offer_item']
            },
        },
        description: 'Using a negative amount will reduce the subtotal of the payment plan',
    },
    // offer_item:update
    {
        displayName: 'Offer Item ID',
        name: 'offer_item_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['update', 'delete'],
                resource: ['offer_item'],
            },
        },
    }
];