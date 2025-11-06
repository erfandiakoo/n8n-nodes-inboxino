import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class InboxinoApi implements ICredentialType {
	name = 'inboxinoApi';

	displayName = 'Inboxino API';

	icon: Icon = { light: 'file:../icons/inboxino.svg', dark: 'file:../icons/inboxino.dark.svg' };

	documentationUrl = 'https://swagger.inboxino.com:3000/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials?.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://swagger.inboxino.com:3000',
			url: '/api/v1/health',
			method: 'GET',
		},
	};
}

