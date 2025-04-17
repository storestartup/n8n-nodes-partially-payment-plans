import type { INodeProperties } from "n8n-workflow";

export const lineItemOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
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
																action: 'Create a line item',
            },
            {
                name: 'Delete',
                value: 'delete',
																action: 'Delete a line item',
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
        default: 'lb',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['line_item'],
            },
        },
        options: [
            {
                name: 'G',
                value: 'g',
            },
            {
                name: 'Kg',
                value: 'kg',
            },
            {
                name: 'Oz',
                value: 'oz',
            },
            {
                name: 'Lb',
                value: 'lb',
            },
        ],
    },
    {
        displayName: 'Integration',
        name: 'integration',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['line_item'],
            },
        },
        description: 'Third party service to send line item to, ex. shopify or bigcommerce.'
    },
    {
        displayName: 'Integration ID',
        name: 'integration_id',
        type: 'string',
        default: '',    
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['line_item'],
            },
        },
        description: 'ID of the line item in the third party service'
    },
    {
        displayName: 'Custom Metadata',
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
                        displayName: 'Name',
                        name: 'name',
                        type: 'string',
                        placeholder: 'Name of the metadata key to add',
                        default: '',
                    },
                    {
                        displayName: 'Value',
                        name: 'value',
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