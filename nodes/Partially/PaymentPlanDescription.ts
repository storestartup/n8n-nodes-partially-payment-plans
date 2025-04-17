import type { INodeProperties } from "n8n-workflow";

export const paymentPlanOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
								noDataExpression: true,
        required: true,
        default: 'create',
        displayOptions: {   
            show: {
                resource: ['payment_plan'],
            },
        },
        options: [
            {
                name: 'Cancel',
                value: 'cancel',
                description: 'Cancel a payment plan',
																action: 'Cancel a payment plan',
            },
            {
                name: 'Create', 
                value: 'create',
                description: 'Create a new payment plan',
																action: 'Create a payment plan',
            },
            {
                name: 'Get',
                value: 'get', 
                description: 'Get a payment plan',
																action: 'Get a payment plan',
            },
            {
                name: 'List',
                value: 'list',
                description: 'List all payment plans',
																action: 'List a payment plan',
            },
            {
                name: 'Open',
                value: 'open',
                description: 'Open a payment plan',
																action: 'Open a payment plan',
            },
            {
                name: 'Send Plan Request',
                value: 'send_plan_request',
                description: 'Send a plan request to the customer',
																action: 'Send plan request a payment plan',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a payment plan',
																action: 'Update a payment plan',   
            }
        ]
    }
];

export const paymentPlanFields: INodeProperties[] = [
    // payment_plan:create
    {
        displayName: 'Amount',
        name: 'amount',
        type: 'number',
        required: true,
        default: 0,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
            },
        },
        description: 'The amount of the payment plan',
    },
    {
        displayName: 'Currency',
        name: 'currency',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
            },
        },
        description: 'If not provided, will default to the currency in Partially settings, or the currency of the provided offer',
    },
    {
        displayName: 'Customer Details',
        name: 'customer_type',
        type: 'options',
        required: true,
        default: 'existing',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
            },
        },
        options: [
            {
                name: 'Use Existing Customer ID',
                value: 'existing',
            },
            {
                name: 'Provide Customer Details',
                value: 'new',
            }
        ],
    },
    {
        displayName: 'Customer ID',
        name: 'customer_id',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                customer_type: ['existing'],
            },
        },
    },
    {
        displayName: 'Customer Email',
        name: 'customer_email',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                customer_type: ['new'],
            },
        },
    },
    {
        displayName: 'Customer First Name',
        name: 'customer_first_name',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                customer_type: ['new'],
            },
        },
    },
    {
        displayName: 'Customer Last Name',
        name: 'customer_last_name',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                customer_type: ['new'],
            },
        },
    },
    {
        displayName: 'Additional Customer Fields',
        name: 'customerAdditionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                customer_type: ['new'],
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
    {
        displayName: 'Terms',
        name: 'terms',
        type: 'options',
        default: 'offer_id',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
            },
        },
        options: [
            {
                name: 'Provide an Offer ID',
                value: 'offer_id',
            },
            {
                name: 'Provide a Payment Schedule',
                value: 'payment_schedule',
            },
        ],
    },
    {
        displayName: 'Offer ID',
        name: 'offer_id',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['offer_id'],
            },
        },
    },
    {
        displayName: 'Automatically Schedule Installments',
        name: 'payment_schedule_auto_process',
        type: 'boolean',
        default: true,
        displayOptions: {
            show: {
                operation: ['create'],  
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
            },
        },
        description: 'Whether or not the installments will be scheduled automatically according to the provided schedule',
    },
    {
        displayName: 'Payment Schedule Description',
        name: 'payment_schedule_description',
        type: 'string',
        default: '',
        typeOptions: {
            rows: 3,
        },
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [false],
            },
        },
        description: 'A description of when you will process payments',
    },
    {
        displayName: 'Down Payment Type',
        name: 'payment_schedule_down_payment_type',
        type: 'options',
        default: 'percentage',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
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
        name: 'payment_schedule_down_payment',
        type: 'number',
        default: 0,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
            }
        }   
    },
    {
        displayName: 'Down Payment Flexible',
        name: 'payment_schedule_down_payment_flexible',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
            }
        },
        description: 'Whether or not the customer can choose their down payment within a specified range',
    },
    {
        displayName: 'Minimum Down Payment Amount/percentage',
        name: 'payment_schedule_down_payment_min',
        type: 'number',
        default: 0,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
                payment_schedule_down_payment_flexible: [true],
            }
        }   
    },
    {
        displayName: 'Maximum Down Payment Amount/percentage',
        name: 'payment_schedule_down_payment_max',
        type: 'number',
        default: 0,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
                payment_schedule_down_payment_flexible: [true],
            }
        }   
    },
    {
        displayName: 'Term Units',
        name: 'payment_schedule_term_units',
        type: 'options',
        default: 'months',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true]
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
        name: 'payment_schedule_term',
        type: 'number',
        default: 3,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
                payment_schedule_term_units: ['weeks', 'months', 'years', 'payments'],
            }
        },
        description: 'The number of weeks, months, years, or payments',
    },
    {
        displayName: 'Final Payment Date',
        name: 'payment_schedule_term_date',
        type: 'dateTime',
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
                payment_schedule_term_units: ['date'],
            }
        },
        description: 'The date of the final payment (time will be ignored)',
    },
    {
        displayName: 'Term Flexible',
        name: 'payment_schedule_term_flexible',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
                payment_schedule_term_units: ['weeks', 'months', 'years', 'payments'],
            }
        },
        description: 'Whether or not the customer can choose their payment frequency within the specified range',
    },
    {
        displayName: 'Minimum Term',
        name: 'payment_schedule_term_min',
        type: 'number',
        default: 1,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
                payment_schedule_term_flexible: [true],
            }
        },
        description: 'The minimum number of weeks, months, years, or payments',
    },
    {
        displayName: 'Maximum Term',
        name: 'payment_schedule_term_max',
        type: 'number',
        default: 99,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
                payment_schedule_term_flexible: [true],
            }
        },
        description: 'The maximum number of weeks, months, years, or payments',
    },
    {
        displayName: 'Frequency Units',
        name: 'payment_schedule_frequency_units',
        type: 'options',
        default: 'months',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
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
        name: 'payment_schedule_frequency',
        type: 'number',
        default: 1,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
                payment_schedule_frequency_units: ['days', 'weeks', 'months'],
            }
        },
        description: 'The number of days, weeks, or months between payments',
    },
    {
        displayName: 'Days of the Month',
        name: 'payment_schedule_frequency_days',
        type: 'string',
        default: '1,15',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
                payment_schedule_frequency_units: ['days_month'],
            }
        },
        description: 'The days of the month to process payments (comma-separated)',
    },
    {
        displayName: 'Frequency Flexible',
        name: 'payment_schedule_frequency_flexible',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
                payment_schedule_frequency_units: ['days', 'weeks', 'months'],
            }
        },
        description: 'Whether or not the customer can choose their payment frequency within the specified range',
    },
    {
        displayName: 'Minimum Frequency',
        name: 'payment_schedule_frequency_min',
        type: 'number',
        default: 1,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
                payment_schedule_frequency_units: ['days', 'weeks', 'months'],
                payment_schedule_frequency_flexible: [true],
            }
        },
        description: 'The minimum number of days, weeks, or months between payments',
    },
    {
        displayName: 'Maximum Frequency',
        name: 'payment_schedule_frequency_max',
        type: 'number',
        default: 99,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
                payment_schedule_frequency_units: ['days', 'weeks', 'months'],
                payment_schedule_frequency_flexible: [true],
            }
        },
        description: 'The maximum number of days, weeks, or months between payments',
    },
    {
        displayName: 'Automatically Schedule First Installment',
        name: 'payment_schedule_starts_auto',
        type: 'boolean',
        default: true,
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
            }
        },
        description: 'Whether or not the first installment will be scheduled relative to the plan opened date',
    },
    {
        displayName: 'Date of First Installment',
        name: 'payment_schedule_starts_date',
        type: 'dateTime',
        default: '',
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
                terms: ['payment_schedule'],
                payment_schedule_auto_process: [true],
                payment_schedule_starts_auto: [false],
            }
        },
        description: 'The date of the first installment (time will be ignored)',
    },
    // custom metadata
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
                resource: ['payment_plan'],
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
    {
        displayName: 'Line Items',
        name: 'line_items',
        type: 'fixedCollection',
        default: {},
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
            },
        },
        options: [
            {
                name: 'items',
                displayName: 'Line Items',
                values: [
                    {
                        displayName: 'Name',
                        name: 'name',
                        type: 'string',
                        placeholder: 'description of the line item',
                        default: '',
                        required: true,
                    },
                    {
                        displayName: 'Quantity',
                        name: 'quantity',
                        type: 'number',
                        placeholder: 'quantity of the line item',
                        default: 1,
                        required: true,
                    },
                    {
                        displayName: 'Price',
                        name: 'price',
                        type: 'number',
                        placeholder: 'unit price of the line item',
                        default: 0,
                        required: true,
                    },
                    {
                        displayName: 'Image URL',
                        name: 'image',
                        type: 'string',
                        placeholder: 'URL of the image of the line item',
                        default: '',
                    },
                    {
                        displayName: 'Weight',
                        name: 'weight',
                        type: 'number',
                        placeholder: 'weight of the line item',
                        default: 0,
                    },
                    {
                        displayName: 'Weight Units',
                        name: 'weight_units',
                        type: 'options',
                        placeholder: 'units of the weight of the line item',
                        default: 'kg',
                        options: [
                            {
                                name: 'Kg',
                                value: 'kg',
                            },
                            {
                                name: 'G',
                                value: 'g',
                            },
                            {
                                name: 'Lb',
                                value: 'lb',
                            },
                            {
                                name: 'Oz',
                                value: 'oz',
                            },
                        ]
                    },
                    {
                        displayName: 'Product ID',
                        name: 'product_id',
                        type: 'string',
                        placeholder: 'ID of the product of the line item',
                        default: '',
                    },
                    {
                        displayName: 'Variant ID',
                        name: 'variant_id',
                        type: 'string',
                        placeholder: 'ID of the variant of the line item',
                        default: '',
                    }
                ]
            }
        ]
    },
    {
        displayName: 'Additional Plan Fields',
        name: 'additional_plan_fields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                operation: ['create'],
                resource: ['payment_plan'],
            },
        },
        options: [  
            {
                displayName: 'Create Stripe Payment Intent',
                name: 'create_stripe_payment_intent',
                type: 'boolean',
                default: false,
                description: 'Whether or not to create a Stripe payment_intent you can use for a Stripe payment element to capture payment method details in your UI'
            },
            {
                displayName: 'Customer IP Address',
                name: 'ip_address',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Customer User Agent',
                name: 'user_agent',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Integration',
                name: 'integration',
                type: 'string',
                default: '',
                description: 'Third party integration to send payment plan to. shopify, woocommerce, bigcommerce, opencart, or prestashop.',
            },
            {
                displayName: 'Plan Status',
                name: 'status',
                type: 'options',
                default: 'checkout',
                options: [
                    {
                        name: 'Checkout',
                        value: 'checkout',
                    },
                    {
                        name: 'Pending',
                        value: 'pending',
                    },
                ]
            },
            {
                displayName: 'Send Plan Request to Customer',
                name: 'send_plan_request',
                type: 'boolean',
                default: false,
                description: 'Whether or not to send a plan request email to customer to complete checkout. plan must be in pending status.'
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
            },
            {
                displayName: 'Shipping Name',
                name: 'shipto_name',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping State',
                name: 'shipto_state',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping Zip/postal Code',
                name: 'shipto_postal_code',
                type: 'string',
                default: '',
            }
        ]
    },
    // payment_plan:open
    {
        displayName: 'Payment Plan ID',
        name: 'payment_plan_id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                operation: ['open'],
                resource: ['payment_plan'],
            },
        },
    },
    {
        displayName: 'Customer Contract Signature',
        name: 'customer_contract_signature',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                operation: ['open'],
                resource: ['payment_plan'],
            },
        },
    },
    {
        displayName: 'Payment Method ID',
        name: 'payment_method_id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                operation: ['open'],
                resource: ['payment_plan'],
            },
        },
    },
    {
        displayName: 'Authorization Return URL',
        name: 'return_url',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['open'],
                resource: ['payment_plan'],
            },
        },
        description: 'Your URL to redirect user to after 3d secure authentication',
    },
    // payment_plan:cancel
    {
        displayName: 'Payment Plan ID',
        name: 'payment_plan_id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                operation: ['cancel'],
                resource: ['payment_plan'],
            },
        },
    },
    {
        displayName: 'Cancel Associated Shopify Order',
        name: 'cancel_shopify',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                operation: ['cancel'],
                resource: ['payment_plan'],
            },
        },
    },
    {
        displayName: 'Restock Associated Shopify Inventory',
        name: 'cancel_shopify_restock',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                operation: ['cancel'],
                resource: ['payment_plan'],
                cancel_shopify: [true],
            },
        },
    },
    // payment_plan:update
    {
        displayName: 'Payment Plan ID',
        name: 'payment_plan_id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                operation: ['update'],
                resource: ['payment_plan'],
            },
        },
    },
    {
        displayName: 'Notes',
        name: 'merchant_notes',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                operation: ['update'],
                resource: ['payment_plan'],
            },
        },
    },
    // TODO remaining plan update fields
    // payment_plan:get
    {
        displayName: 'Payment Plan ID',
        name: 'payment_plan_id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                operation: ['get'],
                resource: ['payment_plan'],
            },
        },
    },
    // payment_plan:list
    {
        displayName: 'Limit',
        name: 'per_page',
        type: 'number',
        default: 10,
        displayOptions: {
            show: {
                operation: ['list'],  
                resource: ['payment_plan'],
            },
        },
        description: 'Limit the number of results returned',
        typeOptions: {
            minValue: 1,
            maxValue: 100,
        },
    },
    {
        displayName: 'Search Filters',
        name: 'search_filters',
        type: 'collection',
        default: {},
        displayOptions: {
            show: {
                operation: ['list'],
                resource: ['payment_plan'],
            },
        },
        options: [
            {
                displayName: 'Created Date',
                name: 'created_date',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Currency',
                name: 'currency',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Customer ID',
                name: 'customer_id',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Date Range Maximum',
                name: 'date_range_max',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Date Range Minimum',
                name: 'date_range_min',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                default: 'checkout',
                options: [
                    {
                        name: 'Canceled',
                        value: 'canceled',
                    },
                    {
                        name: 'Checkout',
                        value: 'checkout',
                    },
                    {
                        name: 'Defaulted',
                        value: 'defaulted',
                    },
                    {
                        name: 'Open',
                        value: 'open',
                    },
                    {
                        name: 'Paid',
                        value: 'paid',
                    },
                    {
                        name: 'Pending',
                        value: 'pending',
                    }
                ],
            }
        ]
    },
    // payment_plan:send_plan_request
    {
        displayName: 'Update Plan Status to Pending',
        name: 'update_plan_status_to_pending',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                operation: ['send_plan_request'],
                resource: ['payment_plan'],
            },
        },
    }
];  