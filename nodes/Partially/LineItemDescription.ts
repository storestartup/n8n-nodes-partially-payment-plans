import type { INodeProperties } from "n8n-workflow";

export const lineItemOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        required: true,
        default: 'create',
        displayOptions: {
            show: {
                resource: ['line_item'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
            },
            {
                name: 'Delete',
                value: 'delete',
            },
        ],
    },
];

export const lineItemFields: INodeProperties[] = [
    // line_item:create
    {
        displayName: 'Payment Plan ID',
        name: 'payment_plan_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {   
            show: {
                operation: ['create'],
                resource: ['line_item'],
            },
        },
    },
    {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['line_item'],
            },
        },
    },
    {
        displayName: 'Quantity',
        name: 'quantity',
        type: 'number', 
        required: true,
        default: 1,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['line_item'],
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
                resource: ['line_item'],
            },
        },
        description: 'The unit price of the line item, may be positive or negative'
    },
    {
        displayName: 'Image URL',
        name: 'image_url',
        type: 'string',
        required: false,
        default: '',
        displayOptions: {   
            show: {
                operation: ['create'],
                resource: ['line_item'],
            },
        },
    },
    {
        displayName: 'Weight',
        name: 'weight',
        type: 'number',
        required: false,
        default: 0,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['line_item'],
            },
        },
    },
    {
        displayName: 'Weight Unit',
        name: 'weight_unit',
        type: 'options',
        required: false,
        default: 'lb',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['line_item'],
            },
        },
        options: [
            {
                name: 'g',
                value: 'g',
            },
            {
                name: 'kg',
                value: 'kg',
            },
            {
                name: 'oz',
                value: 'oz',
            },
            {
                name: 'lb',
                value: 'lb',
            },
        ],
    },
    {
        displayName: 'Integration',
        name: 'integration',
        type: 'string',
        required: false,
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['line_item'],
            },
        },
        description: 'third party service to send line item to, ex. shopify or bigcommerce'
    },
    {
        displayName: 'Integration ID',
        name: 'integration_id',
        type: 'string',
        required: false,
        default: '',    
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['line_item'],
            },
        },
        description: 'id of the line item in the third party service'
    },
    {
        displayName: 'Custom metadata',
        name: 'metadata',
        type: 'fixedCollection',
        default: {},
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['line_item'],
            },
        },
        options: [
            {
                name: 'metadataValues',
                displayName: 'Metadata',
                values: [
                    {
                        name: 'name',
                        displayName: 'Name',
                        type: 'string',
                        placeholder: 'Name of the metadata key to add',
                        default: '',
                    },
                    {
                        name: 'value',
                        displayName: 'Value',
                        type: 'string',
                        placeholder: 'Value to set for the metadata key',
                        default: '',
                    }
                ]
            }
        ]
    },
    // line_item:delete
    {
        displayName: 'Line Item ID',
        name: 'line_item_id',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['delete'],
                resource: ['line_item'],
            },
        },
    },
];