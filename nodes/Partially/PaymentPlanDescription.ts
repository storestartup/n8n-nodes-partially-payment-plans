import type { INodeProperties } from "n8n-workflow";

export const paymentPlanOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        required: true,
        default: 'create',
        displayOptions: {   
            show: {
                resource: ['payment_plan'],
            },
        },
        options: [
            {
                name: 'Create',
                value: 'create',
                description: 'Create a new payment plan',
            },
            {
                name: 'Open',
                value: 'open',
                description: 'Open a payment plan',
            },
            {
                name: 'Cancel',
                value: 'cancel',
                description: 'Cancel a payment plan',
            },
            {
                name: 'Get',
                value: 'get',
                description: 'Get a payment plan',
            },
            {
                name: 'Update',
                value: 'update',
                description: 'Update a payment plan',   
            },
            {
                name: 'List',
                value: 'list',
                description: 'List all payment plans',
            },
            {
                name: 'Send plan request',
                value: 'send_plan_request',
                description: 'Send a plan request to the customer',
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
        displayName: 'Customer details',
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
                name: 'Use existing customer id',
                value: 'existing',
            },
            {
                name: 'Provide customer details',
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
        displayName: 'Customer email',
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
        displayName: 'Customer first name',
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
        displayName: 'Customer last name',
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
        displayName: 'Additional customer fields',
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
                displayName: 'Phone number',
                name: 'phone',
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
                displayName: 'Timezone',
                name: 'timezone',
                type: 'string',
                default: '',
                description: 'Timezone (e.g. "America/New_York", "Europe/London")',
            },
            {
                displayName: 'Shipping name',
                name: 'shipto_name',
                type: 'string',
                default: '',
                description: 'Ship to name for customer payment plans',
            },
            {
                displayName: 'Shipping address',
                name: 'shipto_address',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping address line 2',
                name: 'shipto_address2',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping city',
                name: 'shipto_city',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping state',
                name: 'shipto_state',
                type: 'string',
                default: '',
                description: 'Two letter state, province, or region code (e.g. "NY", "CA", "TX")',
            },
            {
                displayName: 'Shipping zip',
                name: 'shipto_postal_code',
                type: 'string',
                default: '',
                description: 'Shipping zip or postal code',
            },
            {
                displayName: 'Shipping country',
                name: 'shipto_country',
                type: 'string',
                default: '',
                description: 'Two letter country code (e.g. "US", "CA", "UK")',
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
                name: 'Provide an offer id',
                value: 'offer_id',
            },
            {
                name: 'Provide a payment schedule',
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
        displayName: 'Automatically schedule installments',
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
        description: 'If true, the installments will be scheduled automatically according to the provided schedule',
    },
    {
        displayName: 'Payment schedule description',
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
        displayName: 'Down payment type',
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
        displayName: 'Down payment flexible',
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
        description: 'allow the customer to choose their down payment within a specified range',
    },
    {
        displayName: 'Minimum down payment amount/percentage',
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
        displayName: 'Maximum down payment amount/percentage',
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
        displayName: 'Term units',
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
        displayName: 'Final payment date',
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
        displayName: 'Term flexible',
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
        description: 'allow the customer to choose their payment frequency within the specified range',
    },
    {
        displayName: 'Minimum term',
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
        displayName: 'Maximum term',
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
        displayName: 'Frequency units',
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
                name: 'Specific days of the month',
                value: 'days_month',
            }
        ]
    },
    {
        displayName: 'Frequency value',
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
        displayName: 'Days of the month',
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
        description: 'The days of the month to process payments (comma separated)',
    },
    {
        displayName: 'Frequency flexible',
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
        description: 'allow the customer to choose their payment frequency within the specified range',
    },
    {
        displayName: 'Minimum frequency',
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
        displayName: 'Maximum frequency',
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
        displayName: 'Automatically schedule first installment',
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
        description: 'If true, the first installment will be scheduled relative to the plan opened date',
    },
    {
        displayName: 'Date of first installment',
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
                resource: ['payment_plan'],
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
    {
        displayName: 'Line items',
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
                displayName: 'Line items',
                values: [
                    {
                        name: 'name',
                        displayName: 'Name',
                        type: 'string',
                        placeholder: 'description of the line item',
                        default: '',
                        required: true,
                    },
                    {
                        name: 'quantity',
                        displayName: 'Quantity',
                        type: 'number',
                        placeholder: 'quantity of the line item',
                        default: 1,
                        required: true,
                    },
                    {
                        name: 'price',
                        displayName: 'Price',
                        type: 'number',
                        placeholder: 'unit price of the line item',
                        default: 0,
                        required: true,
                    },
                    {
                        name: 'image',
                        displayName: 'Image URL',
                        type: 'string',
                        placeholder: 'URL of the image of the line item',
                        default: '',
                    },
                    {
                        name: 'weight',
                        displayName: 'Weight',
                        type: 'number',
                        placeholder: 'weight of the line item',
                        default: 0,
                    },
                    {
                        name: 'weight_units',
                        displayName: 'Weight units',
                        type: 'options',
                        placeholder: 'units of the weight of the line item',
                        default: 'kg',
                        options: [
                            {
                                name: 'kg',
                                value: 'kg',
                            },
                            {
                                name: 'g',
                                value: 'g',
                            },
                            {
                                name: 'lb',
                                value: 'lb',
                            },
                            {
                                name: 'oz',
                                value: 'oz',
                            },
                        ]
                    },
                    {
                        name: 'product_id',
                        displayName: 'Product ID',
                        type: 'string',
                        placeholder: 'ID of the product of the line item',
                        default: '',
                    },
                    {
                        name: 'variant_id',
                        displayName: 'Variant ID',
                        type: 'string',
                        placeholder: 'ID of the variant of the line item',
                        default: '',
                    }
                ]
            }
        ]
    },
    {
        displayName: 'Additional plan fields',
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
                displayName: 'Integration',
                name: 'integration',
                type: 'string',
                default: '',
                description: 'third party integration to send payment plan to. shopify, woocommerce, bigcommerce, opencart, or prestashop',
            },
            {
                displayName: 'Plan status',
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
                displayName: 'Send plan request to customer',
                name: 'send_plan_request',
                type: 'boolean',
                default: false,
                description: 'set to true to send a plan request email to customer to complete checkout. plan must be in pending status'
            },
            {
                displayName: 'Create Stripe payment intent',
                name: 'create_stripe_payment_intent',
                type: 'boolean',
                default: false,
                description: 'set to true to create a Stripe payment_intent you can use for a Stripe payment element to capture payment method details in your UI'
            },
            {
                displayName: 'Customer IP address',
                name: 'ip_address',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Customer user agent',
                name: 'user_agent',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping name',
                name: 'shipto_name',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping address',
                name: 'shipto_address',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping address line 2',
                name: 'shipto_address2',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping city',
                name: 'shipto_city',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping state',
                name: 'shipto_state',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping zip/postal code',
                name: 'shipto_postal_code',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Shipping country',
                name: 'shipto_country',
                type: 'string',
                default: '',
            }
        ]
    },
    // payment_plan:open
    {
        displayName: 'Payment plan id',
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
        displayName: 'Customer contract signature',
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
        displayName: 'Payment method ID',
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
        displayName: 'Authorization return URL',
        name: 'return_url',
        type: 'string',
        default: '',
        required: false,
        displayOptions: {
            show: {
                operation: ['open'],
                resource: ['payment_plan'],
            },
        },
        description: 'your URL to redirect user to after 3d secure authentication',
    },
    // payment_plan:cancel
    {
        displayName: 'Payment plan id',
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
        displayName: 'Cancel associated Shopify order',
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
        displayName: 'Restock associated Shopify inventory',
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
        displayName: 'Payment plan id',
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
        displayName: 'Payment plan id',
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
        displayName: 'Search filters',
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
                displayName: 'Status',
                name: 'status',
                type: 'options',
                default: '',
                options: [
                    {
                        name: 'Checkout',
                        value: 'checkout',
                    },
                    {
                        name: 'Pending',
                        value: 'pending',
                    },
                    {
                        name: 'Open',
                        value: 'open',
                    },
                    {
                        name: 'Canceled',
                        value: 'canceled',
                    },
                    {
                        name: 'Paid',
                        value: 'paid',
                    },
                    {
                        name: 'Defaulted',
                        value: 'defaulted',
                    }
                ],
            },
            {
                displayName: 'Customer ID',
                name: 'customer_id',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Currency',
                name: 'currency',
                type: 'string',
                default: '',
            },
            {
                displayName: 'Created date',
                name: 'created_date',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Date range minimum',
                name: 'date_range_min',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Date range maximum',
                name: 'date_range_max',
                type: 'dateTime',
                default: '',
            }
        ]
    },
    // payment_plan:send_plan_request
    {
        displayName: 'Update plan status to pending',
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