import {
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	IHookFunctions,
	NodeApiError,
	NodeConnectionType
} from 'n8n-workflow';
import * as crypto from 'crypto';
import { partiallyApiRequest } from './GenericFunctions';

export class PartiallyTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Partially Trigger',
		name: 'partiallyTrigger',
		icon: 'file:partially.svg',
		group: ['trigger'],
		version: 1,
		description: 'Handle Partially events via webhooks',
		defaults: {
			name: 'Partially Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'partiallyApi',
				required: true
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'lastNode',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: [
					{
						name: 'Checkout Abandoned',
						value: 'checkout_abandoned',
					},
					{
						name: 'Dispute Closed',
						value: 'dispute_closed',
					},
					{
						name: 'Dispute Created',
						value: 'dispute_created',
					},
					{
						name: 'Payment Failed',
						value: 'payment_failed',
					},
					{
						name: 'Payment Succeeded', 
						value: 'payment_succeeded',
					},
					{
						name: 'Plan Defaulted',
						value: 'plan_defaulted',
					},
					{
						name: 'Plan Opened',
						value: 'plan_opened',
					},
					{
						name: 'Plan Paid',
						value: 'plan_paid',
					},
					{
						name: 'Refund Created',
						value: 'refund_created',
					}
				],
				default: 'plan_opened',
				required: true,
				description: 'The event to listen for',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;
				this.logger.info('Checking if webhook exists for event: ' + event+' at url: '+webhookUrl);
				const hooks = await partiallyApiRequest.call(this, 'GET', '/webhook');
				this.logger.info('Hooks: ' + JSON.stringify(hooks));
				for (const hook of hooks) {
					if (hook.url === webhookUrl && (hook.event == event || hook.event == '*')) {
						this.logger.info('Webhook found');
						webhookData.webhookId = hook.id;
						return true;
					}
				}
				this.logger.info('Webhook not found');
				return false;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;
				this.logger.info('Creating webhook for event: ' + event + ' at url: ' + webhookUrl);
				const hook = await partiallyApiRequest.call(this, 'POST', '/webhook', {
					url: webhookUrl,
					event: event,
				});
				this.logger.info('successfully created webhook: ' + JSON.stringify(hook));
				webhookData.webhookId = hook.id;
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const webhookId = webhookData.webhookId;
				this.logger.info('Deleting webhook: ' + webhookId);
				const hook = await partiallyApiRequest.call(this, 'DELETE', '/webhook/' + webhookId);
				this.logger.info('successfully deleted webhook: ' + JSON.stringify(hook));
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const apiKey = (await this.getCredentials('partiallyApi'))?.apiKey as string;
		const req = this.getRequestObject();
		const bodyData = this.getBodyData();
		const signature = req.headers['partially-signature'] || req.headers['Partially-Signature'];

		if (!signature) {
			throw new NodeApiError(this.getNode(), {
				message: 'Missing Partially-Signature header',
				code: 'MISSING_PARTIALLY_SIGNATURE_HEADER',
			});
		}

		// Create HMAC SHA-256 hash of the request body
		const hmac = crypto.createHmac('sha256', apiKey);
		// Use the raw body string if available, otherwise stringify the parsed body
		let bodyString;
		if (req.rawBody) {
			this.logger.debug('using raw body');
			bodyString = req.rawBody;
		} else {
			this.logger.debug('using parsed body');
			bodyString = JSON.stringify(bodyData);
		}
		const expectedSignature = hmac.update(bodyString).digest('hex');

		// Log for debugging
		this.logger.debug('Body string being signed: ' + bodyString);
		this.logger.debug('Received signature: ' + signature);
		this.logger.debug('Expected signature: ' + expectedSignature);

		// Compare signatures
		if (signature !== expectedSignature) {
			throw new NodeApiError(this.getNode(), {
				message: 'Invalid webhook signature',
				code: 'INVALID_WEBHOOK_SIGNATURE',
			});
		}

		const returnData: IWebhookResponseData = {
			workflowData: [
				[
					{
						json: bodyData,
					},
				],
			],
		};
		return returnData;
	}
} 