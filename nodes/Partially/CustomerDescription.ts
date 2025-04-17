import type { INodeProperties } from "n8n-workflow";

export const customerOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
        required: true,
        default: 'create',
        displayOptions: {
            show: {
                resource: ['customer'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new customer',
																action: 'Create a customer',
            },
            {
                name: 'GDPR Remove', 
                value: 'gdpr_remove',
                description: 'Remove a customer for GDPR',
																action: 'GDPR Remove a customer',
            },
            {
                name: 'Get',
                value: 'get',   
                description: 'Get a customer',
																action: 'Get a customer',
            },
            {
                name: 'Search All',
                value: 'search_all',
                description: 'Search all customers',
																action: 'Search all a customer',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a customer',
																action: 'Update a customer',
            },
        ],
    }
];

export const customerFields: INodeProperties[] = [
    // customer:create
    {
        displayName: 'Email',
        name: 'email',
        type: 'string',
								placeholder: 'name@email.com',
        required: true,
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['customer'],
            },
        },
        description: 'The email address of the customer',
    },
    {
        displayName: 'First Name',
        name: 'first_name',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['customer'],
            },
        }
    },
    {
        displayName: 'Last Name',
        name: 'last_name',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['customer'],
            },
        }
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['customer'],
            },
        },
        options: [
            {
                displayName: 'Language',
                name: 'language',
                type: 'string',
                default: '',
                description: 'Two letter language code (e.g. "en", "fr", "de")',
            },
            {
                displayName: 'Phone Number', 
                name: 'phone',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping Address',
                name: 'shipto_address',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping Address Line 2',
                name: 'shipto_address2',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping City',
                name: 'shipto_city',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping Country',
                name: 'shipto_country',
                type: 'string',
                default: '',
                description: 'Two letter country code (e.g. "US", "CA", "UK")',
            },
            {
                displayName: 'Shipping Name',
                name: 'shipto_name',
                type: 'string',
                default: '',
                description: 'Ship to name for customer payment plans',
            },
            {
                displayName: 'Shipping State',
                name: 'shipto_state',
                type: 'string',
                default: '',
                description: 'Two letter state, province, or region code (e.g. "NY", "CA", "TX")',
            },
            {
                displayName: 'Shipping Zip',
                name: 'shipto_postal_code',
                type: 'string',
                default: '',
                description: 'Shipping zip or postal code',
            },
            {
                displayName: 'Timezone',
                name: 'timezone',
                type: 'string',
                default: '',
                description: 'Timezone (e.g. "America/New_York", "Europe/London")',
            },
            
        ]
    },
    // customer:get
    {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                operation: ['get'],
                resource: ['customer'],
            },
        },
    },
    // customer:update
    {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                operation: ['update'],
                resource: ['customer'],
            },  
        },
    },
    // TODO maybe add a JSON parameters field to directly set json, see Zendesk node
    // https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Zendesk/TicketDescription.ts
    {
        displayName: 'Update Fields',
        name: 'updateFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                operation: ['update'],
                resource: ['customer'],
            },
        },
        options: [
            {
                displayName: 'First Name',
                name: 'first_name',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Language',
                name: 'language',
                type: 'string',
                default: '',
                description: 'Two letter language code (e.g. "en", "fr", "de")',
            },
            {
                displayName: 'Last Name',
                name: 'last_name',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Phone Number',
                name: 'phone',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping Address',
                name: 'shipto_address',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping Address Line 2',
                name: 'shipto_address2',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping City',
                name: 'shipto_city',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping Country',
                name: 'shipto_country',
                type: 'string',
                default: '',
                description: 'Two letter country code (e.g. "US", "CA", "UK")',
            },
            {
                displayName: 'Shipping Name',
                name: 'shipto_name',
                type: 'string',
                default: '',
                description: 'Ship to name for customer payment plans',
            },
            {
                displayName: 'Shipping State',
                name: 'shipto_state',
                type: 'string',
                default: '',
                description: 'Two letter state, province, or region code (e.g. "NY", "CA", "TX")',
            },
            {
                displayName: 'Shipping Zip',
                name: 'shipto_postal_code',
                type: 'string',
                default: '',
                description: 'Shipping zip or postal code',
            },
            {
                displayName: 'Timezone',
                name: 'timezone',
                type: 'string',
                default: '',
                description: 'Timezone (e.g. "America/New_York", "Europe/London")',
            },
        ]
    },
    // customer:search_all
    {
        displayName: 'Search Query',
        name: 'q',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['search_all'],
                resource: ['customer'],
            },
        },
        description: 'Search for email if query contains an @, otherwise will search for partial match on first and last names'
    },
    {
        displayName: 'Limit',
        name: 'per_page',
        type: 'number',
        default: 10,
        displayOptions: {
            show: {
                operation: ['search_all'],  
                resource: ['customer'],
            },
        },
        description: 'Limit the number of results returned',
        typeOptions: {
            minValue: 1,
            maxValue: 100,
        },
    },
    // customer:gdpr_remove
    {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                operation: ['gdpr_remove'],
                resource: ['customer'],
            },
        },
    },
];