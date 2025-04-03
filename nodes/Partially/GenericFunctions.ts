import {
	ICredentialDataDecryptedObject,
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';

export async function partiallyApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions | IWebhookFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body: any = {},
	qs: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('partiallyApi');
	const baseUrl = credentials.serverUrl;

	let options: IHttpRequestOptions = {
		method,
		qs,
		body,
		url: uri || `${baseUrl}/api${resource}`,
		json: true,
		headers: {
			'Content-Type': 'application/json',
            'Accept': 'application/json'
		},
	};

	if (!Object.keys(body as IDataObject).length) {
		delete options.body;
	}

	options = Object.assign({}, options, option);

	return await this.helpers.httpRequestWithAuthentication.call(this, 'partiallyApi', options);
}

/**
 * Creates a secret from the credentials for webhook signature verification
 */
export function getAutomaticSecret(credentials: ICredentialDataDecryptedObject) {
	return credentials.apiKey;
}
