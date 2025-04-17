import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class PartiallyApi implements ICredentialType {
    name = 'partiallyApi';
    displayName = 'Partially API';
    properties: INodeProperties[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
												typeOptions: { password: true },
            default: '',
            required: true,
        },
        {
            displayName: 'Server URL',
            name: 'serverUrl',
            type: 'string',
            default: 'https://partial.ly',
            description: 'The server URL of the Partially API, use https://demo.partial.ly for test mode and https://partial.ly for production',
        }
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                'Authorization': '=Bearer {{$credentials.apiKey}}'
            }
        }
    };

    test: ICredentialTestRequest = {
        request: {
            method: 'GET',
            baseURL: '={{$credentials.serverUrl}}',
            url: '/api/profile',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    };
}