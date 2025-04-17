import {
    IDataObject,
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    NodeConnectionType
} from "n8n-workflow";

import {
    customerOperations,
    customerFields,
} from "./CustomerDescription";

import {
    paymentPlanOperations,
    paymentPlanFields,
} from "./PaymentPlanDescription";

import {
    offerOperations,
    offerFields,
} from "./OfferDescription";

import {
    offerItemOperations,
    offerItemFields,
} from "./OfferItemDescription";

import {
    paymentMethodOperations,
    paymentMethodFields,
} from "./PaymentMethodDescription";

import {
    lineItemOperations,
    lineItemFields,
} from "./LineItemDescription";

import {
    paymentOperations,
    paymentFields,
} from "./PaymentDescription";

import {
    paymentScheduleOperations,
    paymentScheduleFields,
} from "./PaymentScheduleDescription";

import {
    installmentOperations,
    installmentFields,
} from "./InstallmentDescription";

import {
    refundOperations,
    refundFields,
} from "./RefundDescription";

import {
    disputeOperations,
    disputeFields,
} from "./DisputeDescription";

import { partiallyApiRequest } from "./GenericFunctions";
import { perpareOfferData } from "./OfferFunctions";

export class Partially implements INodeType {
    description: INodeTypeDescription = {
        displayName: "Partially",
        name: "partially",
        icon: "file:icon-color.svg",
        group: ["transform"],
        version: 1,
								subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
        description: "Partially Payment Plans API",
        defaults: {
            name: "Partially",
        },
        credentials: [
            {
                name: "partiallyApi",
                required: true
            },
        ],
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                required: true,
                default: 'customer',
                options: [
                    {
                        name: 'Customer',
                        value: 'customer',
                    },
                    {
                        name: 'Dispute',
                        value: 'dispute',
                    },
                    {
                        name: 'Installment', 
                        value: 'installment',
                    },
                    {
                        name: 'Line Item',
                        value: 'line_item',
                    },
                    {
                        name: 'Offer',
                        value: 'offer',
                    },
                    {
                        name: 'Offer Item',
                        value: 'offer_item',
                    },
                    {
                        name: 'Payment',
                        value: 'payment',
                    },
                    {
                        name: 'Payment Method',
                        value: 'payment_method',
                    },
                    {
                        name: 'Payment Plan',
                        value: 'payment_plan',
                    },
                    {
                        name: 'Payment Schedule',
                        value: 'payment_schedule',
                    },
                    {
                        name: 'Refund',
                        value: 'refund',
                    }
                ],
            },
            ...customerOperations,
            ...customerFields,
            ...paymentPlanOperations,
            ...paymentPlanFields,
            ...offerOperations,
            ...offerFields,
            ...offerItemOperations,
            ...offerItemFields,
            ...paymentMethodOperations,
            ...paymentMethodFields,
            ...lineItemOperations,
            ...lineItemFields,
            ...paymentOperations,
            ...paymentFields,
            ...paymentScheduleOperations,
            ...paymentScheduleFields,
            ...installmentOperations,
            ...installmentFields,
            ...refundOperations,
            ...refundFields,
            ...disputeOperations,
            ...disputeFields,
        ]
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        let responseData;
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;
        
        for (let i = 0; i < items.length; i++) {
            if (resource === 'customer') {
                // https://developer.partial.ly/#create-a-new-customer
                if (operation === 'create') {
                    const email = this.getNodeParameter('email', i) as string;
                    const firstName = this.getNodeParameter('first_name', i) as string;
                    const lastName = this.getNodeParameter('last_name', i) as string;

                    const data: IDataObject = {
                        email,
                        first_name: firstName,
                        last_name: lastName,
                    };

                    const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
                    Object.assign(data, additionalFields);

                    responseData = await partiallyApiRequest.call(this, 'POST', '/customers', data);
                    this.logger.info('Customer created: ' + JSON.stringify(responseData));
                    returnData.push(responseData);  
                }
                // https://developer.partial.ly/#get-a-specific-customer
                if (operation === 'get') {
                    const customerId = this.getNodeParameter('customer_id', i) as string;
                    responseData = await partiallyApiRequest.call(this, 'GET', `/customer/${customerId}`);
                    this.logger.info('Customer retrieved: ' + JSON.stringify(responseData));
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#update-a-customer
                if (operation === 'update') {
                    const customerId = this.getNodeParameter('customer_id', i) as string;
                    const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

                    responseData = await partiallyApiRequest.call(this, 'PUT', `/customer/${customerId}`, updateFields);
                    this.logger.info('Customer updated: ' + JSON.stringify(responseData));
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#list-all-customers
                if (operation === 'search_all') {
                    const q = this.getNodeParameter('q', i) as string;
                    const perPage = this.getNodeParameter('per_page', i) as number;
                    const body: IDataObject = {};
                    const qs: IDataObject = {};
                    if (q) {
                        qs.q = q;
                    }
                    if (perPage) {
                        qs.per_page = perPage;
                    }
                    responseData = await partiallyApiRequest.call(this, 'GET', '/customer', body, qs);
                    this.logger.info('Customers retrieved: ' + JSON.stringify(responseData));
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#remove-a-customer-for-gdpr
                if (operation === 'gdpr_remove') {
                    const customerId = this.getNodeParameter('customer_id', i) as string;
                    responseData = await partiallyApiRequest.call(this, 'PUT', `/customer/gdpr_remove/${customerId}`);
                    this.logger.info('Customer removed for GDPR: ' + JSON.stringify(responseData));
                    returnData.push(responseData);
                }
            }
            if (resource === 'payment_plan') {
                // https://developer.partial.ly/#create-a-new-payment-plan
                if (operation === 'create') {
                    const data: IDataObject = {};
                    const amount = this.getNodeParameter('amount', i) as number;
                    data.amount = amount;
                    const currency = this.getNodeParameter('currency', i) as string;
                    if (currency) data.currency = currency;
                    // see if we're setting a customer id or providing customer details
                    const customerType = this.getNodeParameter('customer_type', i) as string;
                    if (customerType === 'existing') {
                        const customerId = this.getNodeParameter('customer_id', i) as string;
                        data.customer_id = customerId;
                    } else {
                        const customerData: IDataObject = {};
                        const email = this.getNodeParameter('customer_email', i) as string;
                        customerData.email = email;
                        const firstName = this.getNodeParameter('customer_first_name', i) as string;
                        if (firstName) customerData.first_name = firstName;
                        const lastName = this.getNodeParameter('customer_last_name', i) as string;
                        if (lastName) customerData.last_name = lastName;
                        const customerAdditionalFields = this.getNodeParameter('customerAdditionalFields', i) as IDataObject;
                        Object.assign(customerData, customerAdditionalFields);
                        data.customer = customerData;
                    }

                    // terms type, providing an offer id or payment schedule
                    const termsType = this.getNodeParameter('terms', i) as string;
                    if (termsType === 'offer_id') {
                        const offerId = this.getNodeParameter('offer_id', i) as string;
                        data.offer_id = offerId;
                    }
                    else if (termsType === 'payment_schedule') {
                        const paymentSchedule: IDataObject = {};
                        paymentSchedule.auto_process = this.getNodeParameter('payment_schedule_auto_process', i) as boolean;
                        if (paymentSchedule.auto_process) {
                            // auto payment schedule
                            // down payment
                            paymentSchedule.down_payment_type = this.getNodeParameter('payment_schedule_down_payment_type', i) as string;
                            paymentSchedule.down_payment = this.getNodeParameter('payment_schedule_down_payment', i) as number;
                            paymentSchedule.down_payment_flexible = this.getNodeParameter('payment_schedule_down_payment_flexible', i) as boolean;
                            if (paymentSchedule.down_payment_flexible) {
                                paymentSchedule.down_payment_min = this.getNodeParameter('payment_schedule_down_payment_min', i) as number;
                                paymentSchedule.down_payment_max = this.getNodeParameter('payment_schedule_down_payment_max', i) as number;
                            }
                            // term
                            paymentSchedule.term_units = this.getNodeParameter('payment_schedule_term_units', i) as string;
                            if (paymentSchedule.term_units === 'date') {
                                const termDate = this.getNodeParameter('payment_schedule_term_date', i) as string;
                                this.logger.debug('term date: ' + termDate);
                                // Format date as YYYY-MM-DD
                                const formattedDate = new Date(termDate).toISOString().split('T')[0];
                                paymentSchedule.term_date = formattedDate;
                            }
                            else {
                                paymentSchedule.term = this.getNodeParameter('payment_schedule_term', i) as number;
                                paymentSchedule.term_flexible = this.getNodeParameter('payment_schedule_term_flexible', i) as boolean;
                                if (paymentSchedule.term_flexible) {
                                    paymentSchedule.term_min = this.getNodeParameter('payment_schedule_term_min', i) as number;
                                    paymentSchedule.term_max = this.getNodeParameter('payment_schedule_term_max', i) as number;
                                }
                            }

                            // frequency
                            paymentSchedule.frequency_units = this.getNodeParameter('payment_schedule_frequency_units', i) as string;
                            if (paymentSchedule.frequency_units === 'days_month') {
                                const daysString = this.getNodeParameter('payment_schedule_frequency_days', i) as string;
                                paymentSchedule.frequency_days = daysString.split(',').map(Number);
                            }
                            else {
                                paymentSchedule.frequency = this.getNodeParameter('payment_schedule_frequency', i) as number;
                                paymentSchedule.frequency_flexible = this.getNodeParameter('payment_schedule_frequency_flexible', i) as boolean;
                                if (paymentSchedule.frequency_flexible) {
                                    paymentSchedule.frequency_min = this.getNodeParameter('payment_schedule_frequency_min', i) as number;
                                    paymentSchedule.frequency_max = this.getNodeParameter('payment_schedule_frequency_max', i) as number;
                                }
                            }
                            
                            // starts auto
                            const startsAuto = this.getNodeParameter('payment_schedule_starts_auto', i) as boolean;
                            if (startsAuto === false) {
                                paymentSchedule.starts_auto = startsAuto;
                                const startsDate = this.getNodeParameter('payment_schedule_starts_date', i) as string;
                                paymentSchedule.starts_date = new Date(startsDate).toISOString().split('T')[0];
                            }
                        }
                        else {
                            // manual payment schedule
                            paymentSchedule.description = this.getNodeParameter('payment_schedule_description', i) as string;
                        }
                        
                        data.payment_schedule = paymentSchedule;
                    }

                    const meta: IDataObject = {};
                    const metadata = this.getNodeParameter('metadata', i) as IDataObject;
                    if (metadata && metadata.metadataValues) {
                        const values = metadata.metadataValues as IDataObject[];
                        this.logger.info('metadata values: ' + JSON.stringify(values));
                        values.forEach((value: IDataObject) => {
                            meta[value.name as string] = value.value as string;
                        });
                    }

                    // check for line items
                    const lineItems = this.getNodeParameter('line_items', i) as IDataObject;
                    if (lineItems && lineItems.items) {
                        const items = lineItems.items as IDataObject[];
                        if (items.length > 0) {
                            this.logger.info('line items: ' + JSON.stringify(items));
                            const lines: IDataObject[] = [];
                            items.forEach((item: IDataObject) => {
                                const line: IDataObject = {};
                                line.name = item.name as string;
                                line.quantity = item.quantity as number;
                                line.price = item.price as number;
                                const image = item.image as string;
                                if (image) line.image = image;
                                const weight = item.weight as number;   
                                if (weight) {
                                    line.weight = weight;
                                    line.weight_units = item.weight_units as string;
                                }
                                const itemMeta: IDataObject = {};
                                const productId = item.product_id as string;
                                if (productId) itemMeta.product_id = productId;
                                const variantId = item.variant_id as string;
                                if (variantId) itemMeta.variant_id = variantId;
                                if (productId || variantId) {
                                    line.meta = itemMeta;
                                }
                                lines.push(line);
                            });
                            meta.line_items = lines;
                        }
                    }

                    data.meta = meta;

                    const additionalFields = this.getNodeParameter('additional_plan_fields', i) as IDataObject;
                    Object.assign(data, additionalFields);
                    this.logger.info('creating payment plan with data: ' + JSON.stringify(data));
                    responseData = await partiallyApiRequest.call(this, 'POST', '/payment_plan', data);
                    this.logger.info('Payment plan created: ' + JSON.stringify(responseData));
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#open-a-payment-plan
                else if (operation === 'open') {
                    const paymentPlanId = this.getNodeParameter('payment_plan_id', i) as string;
                    const signature = this.getNodeParameter('customer_contract_signature', i) as string;
                    const paymentMethodId = this.getNodeParameter('payment_method_id', i) as string;
                    const params: IDataObject = {
                        payment_schedule: {
                            contract_signature: signature,
                        },
                        payment_method_id: paymentMethodId,
                    };
                    const returnUrl = this.getNodeParameter('return_url', i) as string;
                    if (returnUrl) params.return_url = returnUrl;
                    responseData = await partiallyApiRequest.call(this, 'PUT', `/payment_plan/open/${paymentPlanId}`, params);
                    this.logger.info('Payment plan opened: ' + JSON.stringify(responseData));
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#cancel-a-payment-plan
                else if (operation === 'cancel') {
                    const paymentPlanId = this.getNodeParameter('payment_plan_id', i) as string;
                    const cancelShopify = this.getNodeParameter('cancel_shopify', i) as boolean;
                    const cancelShopifyRestock = this.getNodeParameter('cancel_shopify_restock', i) as boolean;
                    const params: IDataObject = {};
                    if (cancelShopify) {
                        params.cancel_shopify = cancelShopify;
                        params.cancel_shopify_restock = cancelShopifyRestock;
                    }
                    responseData = await partiallyApiRequest.call(this, 'PUT', `/payment_plan/cancel/${paymentPlanId}`, params);
                    this.logger.info('Payment plan canceled: ' + JSON.stringify(responseData));
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#update-a-payment-plan
                else if (operation === 'update') {
                    const paymentPlanId = this.getNodeParameter('payment_plan_id', i) as string;
                    const updates: IDataObject = {};
                    const notes = this.getNodeParameter('merchant_notes', i) as string;
                    if (notes) updates.merchant_notes = notes;
                    // TODO remaining update fields
                    responseData = await partiallyApiRequest.call(this, 'PUT', `/payment_plan/${paymentPlanId}`, updates);
                    this.logger.info('Payment plan updated: ' + JSON.stringify(responseData));
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#retrieve-a-payment-plan
                else if (operation === 'get') {
                    const paymentPlanId = this.getNodeParameter('payment_plan_id', i) as string;
                    responseData = await partiallyApiRequest.call(this, 'GET', `/payment_plan/${paymentPlanId}`);
                    this.logger.info('Payment plan retrieved: ' + JSON.stringify(responseData));
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#list-all-plans
                else if (operation === 'list') {
                    const body: IDataObject = {};
                    const qs: IDataObject = {};
                    const perPage = this.getNodeParameter('per_page', i) as number;
                    if (perPage) qs.per_page = perPage;
                    const searchFilters = this.getNodeParameter('search_filters', i) as IDataObject;
                    Object.assign(qs, searchFilters);
                    if (searchFilters.created_date) {
                        qs.date = new Date(searchFilters.created_date as string).toISOString().split('T')[0];
                    }
                    if (searchFilters.date_range_min && searchFilters.date_range_max) {
                        const minDate = new Date(searchFilters.date_range_min as string).toISOString().split('T')[0];
                        const maxDate = new Date(searchFilters.date_range_max as string).toISOString().split('T')[0];
                        const range = `${minDate}|${maxDate}`;
                        qs.dateRange = range;
                    }
                    
                    responseData = await partiallyApiRequest.call(this, 'GET', '/payment_plan', body, qs);
                    this.logger.info('Payment plans retrieved: ' + JSON.stringify(responseData));
                    returnData.push(responseData);
                }   
                // https://developer.partial.ly/#send-plan-request-email
                else if (operation === 'send_plan_request') {
                    const paymentPlanId = this.getNodeParameter('payment_plan_id', i) as string;
                    const updatePlanStatusToPending = this.getNodeParameter('update_plan_status_to_pending', i) as boolean;
                    const body: IDataObject = {};
                    const qs: IDataObject = {};
                    if (updatePlanStatusToPending) {
                        qs.update_status = 'pending';
                    }
                    responseData = await partiallyApiRequest.call(this, 'POST', `/payment_plan/send_plan_request/${paymentPlanId}`, body, qs);
                    this.logger.info('Payment plan request sent: ' + JSON.stringify(responseData));
                    returnData.push(responseData);
                }
            }
            if (resource === 'offer') {
                // https://developer.partial.ly/#list-all-offers
                if (operation === 'list') {
                    const body: IDataObject = {};
                    const qs: IDataObject = {};
                    const perPage = this.getNodeParameter('per_page', i) as number;
                    if (perPage) qs.per_page = perPage;
                    responseData = await partiallyApiRequest.call(this, 'GET', '/offer', body, qs);
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#get-a-specific-offer
                else if (operation === 'get') {
                    const offerId = this.getNodeParameter('offer_id', i) as string;
                    responseData = await partiallyApiRequest.call(this, 'GET', `/offer/${offerId}`);
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#create-a-new-offer
                else if (operation === 'create') {
                    const data = perpareOfferData(this, i);
                    responseData = await partiallyApiRequest.call(this, 'POST', '/offer', data);
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#update-an-offer
                else if (operation === 'update') {
                    const offerId = this.getNodeParameter('offer_id', i) as string;
                    const updates = perpareOfferData(this, i);
                    responseData = await partiallyApiRequest.call(this, 'PUT', `/offer/${offerId}`, updates);
                    returnData.push(responseData);
                }
            }
            if (resource === 'offer_item') {
                // https://developer.partial.ly/#list-offer-items
                if (operation === 'list') {
                    const body: IDataObject = {};
                    const qs: IDataObject = {
                        offer_id: this.getNodeParameter('offer_id', i) as string,
                    };
                    responseData = await partiallyApiRequest.call(this, 'GET', `/offer_item`, body, qs);
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#create-a-new-offer-item
                else if (operation === 'create') {
                    const data: IDataObject = {};
                    data.name = this.getNodeParameter('name', i) as string;
                    data.offer_id = this.getNodeParameter('offer_id', i) as string;
                    data.amount_type = this.getNodeParameter('amount_type', i) as string;
                    data.amount = this.getNodeParameter('amount', i) as number;
                    responseData = await partiallyApiRequest.call(this, 'POST', '/offer_item', data);
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#update-offer-item
                else if (operation === 'update') {
                    const offerItemId = this.getNodeParameter('offer_item_id', i) as string;
                    const updates: IDataObject = {};
                    updates.name = this.getNodeParameter('name', i) as string;
                    updates.amount_type = this.getNodeParameter('amount_type', i) as string;
                    updates.amount = this.getNodeParameter('amount', i) as number;
                    responseData = await partiallyApiRequest.call(this, 'PUT', `/offer_item/${offerItemId}`, updates);
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#delete-offer-item
                else if (operation === 'delete') {
                    const offerItemId = this.getNodeParameter('offer_item_id', i) as string;
                    responseData = await partiallyApiRequest.call(this, 'DELETE', `/offer_item/${offerItemId}`);
                    returnData.push(responseData);
                }
            }
            if (resource === 'payment_method') {
                // https://developer.partial.ly/#list-payment-methods
                if (operation === 'list') {
                    const body: IDataObject = {};
                    const qs: IDataObject = {
                        customer_id: this.getNodeParameter('customer_id', i) as string,
                    };
                    responseData = await partiallyApiRequest.call(this, 'GET', '/payment_method', body, qs);
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#delete-payment-method
                else if (operation === 'delete') {
                    const paymentMethodId = this.getNodeParameter('payment_method_id', i) as string;
                    responseData = await partiallyApiRequest.call(this, 'DELETE', `/payment_method/${paymentMethodId}`);
                    returnData.push(responseData);
                }
            }
            if (resource === 'line_item') {
                // https://developer.partial.ly/#create-a-line-item
                if (operation === 'create') {
                    const data: IDataObject = {};
                    data.payment_plan_id = this.getNodeParameter('payment_plan_id', i) as string;
                    data.description = this.getNodeParameter('description', i) as string;
                    data.quantity = this.getNodeParameter('quantity', i) as number;
                    data.amount = this.getNodeParameter('amount', i) as number;
                    const image = this.getNodeParameter('image_url', i) as string;
                    if (image) data.image = image;
                    const weight = this.getNodeParameter('weight', i) as number;
                    if (weight) {
                        data.weight = weight;
                        data.weight_units = this.getNodeParameter('weight_unit', i) as string;
                    }
                    const integration = this.getNodeParameter('integration', i) as string;
                    if (integration) {
                        data.integration = integration;
                        data.integration_id = this.getNodeParameter('integration_id', i) as string;
                    }

                    const metadata = this.getNodeParameter('metadata', i) as IDataObject;
                    if (metadata && metadata.metadataValues) {
                        const values = metadata.metadataValues as IDataObject[];
                        if (values.length > 0) {
                            const meta: IDataObject = {};
                            values.forEach((value: IDataObject) => {
                                meta[value.name as string] = value.value as string;
                            });
                            data.meta = meta;
                        }
                    }

                    responseData = await partiallyApiRequest.call(this, 'POST', '/line_item', data);
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#delete-a-line-item
                else if (operation === 'delete') {
                    const lineItemId = this.getNodeParameter('line_item_id', i) as string;
                    responseData = await partiallyApiRequest.call(this, 'DELETE', `/line_item/${lineItemId}`);
                    returnData.push(responseData);
                }
            }
            if (resource === 'payment') {
                // https://developer.partial.ly/#create-a-payment
                if (operation === 'create') {
                    const data: IDataObject = {};
                    data.payment_plan_id = this.getNodeParameter('payment_plan_id', i) as string;
                    data.amount = this.getNodeParameter('amount', i) as number;
                    const returnUrl = this.getNodeParameter('return_url', i) as string;
                    if (returnUrl) data.return_url = returnUrl;
                    responseData = await partiallyApiRequest.call(this, 'POST', '/payment', data);
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#confirm-a-payment
                else if (operation === 'confirm') {
                    const data: IDataObject = {
                        contract_signature: this.getNodeParameter('customer_contract_signature', i) as string,    
                        payment_plan_id: this.getNodeParameter('payment_plan_id', i) as string,
                        amount: this.getNodeParameter('amount', i) as number,
                    };
                    const returnUrl = this.getNodeParameter('return_url', i) as string;
                    if (returnUrl) data.return_url = returnUrl;
                    responseData = await partiallyApiRequest.call(this, 'POST', `/payment/confirm`, data);
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#list-payments
                else if (operation === 'list') {
                    const body: IDataObject = {};
                    const qs: IDataObject = {};
                    const perPage = this.getNodeParameter('per_page', i) as number;
                    if (perPage) qs.per_page = perPage;
                    const customerId = this.getNodeParameter('customer_id', i) as string;
                    if (customerId) qs.customer_id = customerId;
                    const paymentPlanId = this.getNodeParameter('payment_plan_id', i) as string;
                    if (paymentPlanId) qs.payment_plan_id = paymentPlanId;
                    const stripePaymentIntentId = this.getNodeParameter('stripe_payment_intent_id', i) as string;
                    if (stripePaymentIntentId) qs.q = stripePaymentIntentId;

                    const searchFilters = this.getNodeParameter('search_filters', i) as IDataObject;
                    
                    if (searchFilters.status) {
                        qs.status = searchFilters.status as string;
                    }
                    if (searchFilters.currency) {
                        qs.currency = searchFilters.currency as string;
                    }
                    if (searchFilters.date) {
                        qs.date = new Date(searchFilters.date as string).toISOString().split('T')[0];
                    }
                    if (searchFilters.date_range_min && searchFilters.date_range_max) {
                        const minDate = new Date(searchFilters.date_range_min as string).toISOString().split('T')[0];
                        const maxDate = new Date(searchFilters.date_range_max as string).toISOString().split('T')[0];
                        const range = `${minDate}|${maxDate}`;
                        qs.dateRange = range;
                    }
                    responseData = await partiallyApiRequest.call(this, 'GET', '/payment', body, qs);
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#retrieve-a-payment
                else if (operation === 'get') {
                    const paymentId = this.getNodeParameter('payment_id', i) as string;
                    responseData = await partiallyApiRequest.call(this, 'GET', `/payment/${paymentId}`);
                    returnData.push(responseData);
                }
            }
            if (resource === 'payment_schedule') {
                // https://developer.partial.ly/#update-a-payment-schedule
                if (operation === 'update') {
                    const paymentScheduleId = this.getNodeParameter('payment_schedule_id', i) as string;
                    const updates: IDataObject = {};
                    const downPaymentAmount = this.getNodeParameter('down_payment_amount', i) as number;
                    if (downPaymentAmount) updates.down_payment_amount = downPaymentAmount;
                    const term = this.getNodeParameter('term', i) as number;
                    if (term) updates.term = term;
                    const frequency = this.getNodeParameter('frequency', i) as number;
                    if (frequency) updates.frequency = frequency;
                    responseData = await partiallyApiRequest.call(this, 'PUT', `/payment_schedule/${paymentScheduleId}`, updates);
                    returnData.push(responseData);
                }
                // TODO https://developer.partial.ly/#get-contract-pdf
                // this one returns PDF binary, not json like other operations
                // need to figure out how to handle this in n8n
                
                // https://developer.partial.ly/#create-a-payment-schedule
                if (operation === 'create') {
                    const data = perpareOfferData(this, i);
                    data.payment_plan_id = this.getNodeParameter('payment_plan_id', i) as string;
                    data.amount = this.getNodeParameter('amount', i) as number;
                    responseData = await partiallyApiRequest.call(this, 'POST', '/payment_schedule', data);
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#add-a-contract-signature
                if (operation === 'add_contract_signature') {
                    const paymentScheduleId = this.getNodeParameter('payment_schedule_id', i) as string;
                    const data: IDataObject = {};
                    data.contract_signature = this.getNodeParameter('contract_signature', i) as string;
                    const ipAddress = this.getNodeParameter('ip_address', i) as string;
                    if (ipAddress) data.ip_address = ipAddress;
                    const userAgent = this.getNodeParameter('user_agent', i) as string;
                    if (userAgent) data.user_agent = userAgent;
                    responseData = await partiallyApiRequest.call(this, 'POST', `/payment_schedule/add_contract_signature/${paymentScheduleId}`, data);
                    returnData.push(responseData);
                }
            }
            if (resource === 'installment') {
                // https://developer.partial.ly/#pay-scheduled-installment
                if (operation === 'pay') {
                    const installmentId = this.getNodeParameter('installment_id', i) as string;
                    const data: IDataObject = {};
                    const returnUrl = this.getNodeParameter('return_url', i) as string;
                    if (returnUrl) data.return_url = returnUrl;
                    responseData = await partiallyApiRequest.call(this, 'PUT', `/installment/pay/${installmentId}`, data);
                    returnData.push(responseData);
                }
                // https://developer.partial.ly/#list-installments
                if (operation === 'list') {
                    const body: IDataObject = {};
                    const qs: IDataObject = {};
                    const customerId = this.getNodeParameter('customer_id', i) as string;
                    if (customerId) qs.customer_id = customerId;
                    const paymentScheduleId = this.getNodeParameter('payment_schedule_id', i) as string;
                    if (paymentScheduleId) qs.payment_schedule_id = paymentScheduleId;
                    responseData = await partiallyApiRequest.call(this, 'GET', '/installment', body, qs);
                    returnData.push(responseData);
                }
            }
            if (resource === 'refund') {
                // https://developer.partial.ly/#refund-a-payment
                if (operation === 'create') {
                    const data: IDataObject = {};
                    data.payment_id = this.getNodeParameter('payment_id', i) as string;
                    data.amount = this.getNodeParameter('amount', i) as number;
                    const notes = this.getNodeParameter('notes', i) as string;
                    if (notes) data.notes = notes;
                    responseData = await partiallyApiRequest.call(this, 'POST', '/refund', data);
                    returnData.push(responseData);
                }   
                // https://developer.partial.ly/#list-refunds
                if (operation === 'list') {
                    const body: IDataObject = {};
                    const qs: IDataObject = {};
                    const customerId = this.getNodeParameter('customer_id', i) as string;
                    if (customerId) qs.customer_id = customerId;
                    const additionalFilters = this.getNodeParameter('additionalFilters', i) as IDataObject;
                    if (additionalFilters.reason) qs.reason = additionalFilters.reason as string;
                    if (additionalFilters.date) qs.date = new Date(additionalFilters.date as string).toISOString().split('T')[0];
                    if (additionalFilters.date_range_min && additionalFilters.date_range_max) {
                        const minDate = new Date(additionalFilters.date_range_min as string).toISOString().split('T')[0];
                        const maxDate = new Date(additionalFilters.date_range_max as string).toISOString().split('T')[0];
                        const range = `${minDate}|${maxDate}`;
                        qs.dateRange = range;
                    }
                    responseData = await partiallyApiRequest.call(this, 'GET', '/refund', body, qs);
                    returnData.push(responseData);
                }
            }
            if (resource === 'dispute') {
                // https://developer.partial.ly/#disputes
                if (operation === 'list') {
                    const body: IDataObject = {};
                    const qs: IDataObject = {};
                    const customerId = this.getNodeParameter('customer_id', i) as string;
                    if (customerId) qs.customer_id = customerId;
                    const additionalFilters = this.getNodeParameter('additionalFilters', i) as IDataObject;
                    if (additionalFilters.status) qs.status = additionalFilters.status as string;
                    if (additionalFilters.reason) qs.reason = additionalFilters.reason as string;
                    if (additionalFilters.date) qs.date = new Date(additionalFilters.date as string).toISOString().split('T')[0];
                    if (additionalFilters.date_range_min && additionalFilters.date_range_max) {
                        const minDate = new Date(additionalFilters.date_range_min as string).toISOString().split('T')[0];
                        const maxDate = new Date(additionalFilters.date_range_max as string).toISOString().split('T')[0];
                        const range = `${minDate}|${maxDate}`;
                        qs.dateRange = range;
                    }
                    responseData = await partiallyApiRequest.call(this, 'GET', '/dispute', body, qs);
                    returnData.push(responseData);  
                }
            }
        }
        return [this.helpers.returnJsonArray(returnData)];
    }
}
    