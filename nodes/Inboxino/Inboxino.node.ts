import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	Icon,
} from 'n8n-workflow';

export class Inboxino implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Inboxino',
		name: 'inboxino',
		icon: { light: 'file:inboxino.svg', dark: 'file:inboxino.dark.svg' } as Icon,
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Inboxino API',
		defaults: {
			name: 'Inboxino',
		},
		inputs: ['main'],
		outputs: ['main'],
		usableAsTool: true,
		credentials: [
			{
				name: 'inboxinoApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://swagger.inboxino.com:3000',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Message',
						value: 'message',
					},
				],
				default: 'message',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Send',
						value: 'send',
						description: 'Send a message via Inboxino',
						action: 'Send a message',
						routing: {
							request: {
								method: 'POST',
								url: '/api/v1/public-api/send-inboxino-message',
							},
						},
					},
				],
				default: 'send',
			},
			{
				displayName: 'Account',
				name: 'account',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
					},
				},
				default: '',
				description: 'The account identifier',
			},
			{
				displayName: 'Channel',
				name: 'channel',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
					},
				},
				options: [
					{
						name: 'Telegram',
						value: 'telegram',
					},
					{
						name: 'WhatsApp',
						value: 'whatsapp',
					},
					{
						name: 'Instagram',
						value: 'instagram',
					},
					{
						name: 'SMS',
						value: 'sms',
					},
				],
				default: 'telegram',
				description: 'The messaging channel to use',
			},
			{
				displayName: 'Receiver',
				name: 'receiver',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
					},
				},
				default: '',
				description: 'The receiver identifier (phone number, username, etc.)',
			},
			{
				displayName: 'Message Type',
				name: 'messageType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
					},
				},
				options: [
					{
						name: 'Audio',
						value: 'audio',
					},
					{
						name: 'Document',
						value: 'document',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Location',
						value: 'location',
					},
					{
						name: 'Text',
						value: 'text',
					},
					{
						name: 'Video',
						value: 'video',
					},
				],
				default: 'text',
				description: 'The type of message to send',
			},
			{
				displayName: 'Message Content',
				name: 'message',
				type: 'string',
				required: true,
				typeOptions: {
					rows: 4,
				},
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
						messageType: ['text'],
					},
				},
				default: '',
				description: 'The text message to send',
			},
			{
				displayName: 'Media URL',
				name: 'mediaUrl',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
						messageType: ['image', 'video', 'audio', 'document'],
					},
				},
				default: '',
				description: 'The URL of the media file to send',
			},
			{
				displayName: 'Caption',
				name: 'caption',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
						messageType: ['image', 'video', 'audio', 'document'],
					},
				},
				default: '',
				description: 'Optional caption for the media',
			},
			{
				displayName: 'Latitude',
				name: 'latitude',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
						messageType: ['location'],
					},
				},
				default: 0,
				description: 'The latitude of the location',
			},
			{
				displayName: 'Longitude',
				name: 'longitude',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['send'],
						messageType: ['location'],
					},
				},
				default: 0,
				description: 'The longitude of the location',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				if (resource === 'message' && operation === 'send') {
					const account = this.getNodeParameter('account', i) as string;
					const channel = this.getNodeParameter('channel', i) as string;
					const receiver = this.getNodeParameter('receiver', i) as string;
					const messageType = this.getNodeParameter('messageType', i) as string;

					const body: IDataObject = {
						account,
						channel,
						receiver,
						messageType,
					};

					if (messageType === 'text') {
						body.message = this.getNodeParameter('message', i) as string;
					} else if (['image', 'video', 'audio', 'document'].includes(messageType)) {
						body.mediaUrl = this.getNodeParameter('mediaUrl', i) as string;
						const caption = this.getNodeParameter('caption', i, '') as string;
						if (caption) {
							body.caption = caption;
						}
					} else if (messageType === 'location') {
						body.latitude = this.getNodeParameter('latitude', i) as number;
						body.longitude = this.getNodeParameter('longitude', i) as number;
					}

					const response = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'inboxinoApi',
						{
							method: 'POST',
							url: 'https://swagger.inboxino.com:3000/api/v1/public-api/send-inboxino-message',
							body,
							json: true,
						},
					);

					returnData.push({
						json: response as IDataObject,
						pairedItem: { item: i },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

