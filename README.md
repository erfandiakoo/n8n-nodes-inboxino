# n8n-nodes-inboxino

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

This is an n8n community node that lets you use [Inboxino](https://inboxino.com) messaging services in your n8n workflows.

Inboxino is a unified messaging platform that allows you to send messages across multiple channels including Telegram, WhatsApp, Instagram, and SMS from a single API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage](#usage)
- [Operations](#operations)
- [Examples](#examples)
- [Resources](#resources)
- [License](#license)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Recommended)

1. Go to **Settings** → **Community Nodes** in your n8n instance
2. Click **Install**
3. Enter `n8n-nodes-inboxino` in the npm package name field
4. Click **Install**
5. Restart your n8n instance

### Manual Installation

To install manually, navigate to your n8n installation directory and run:

```bash
npm install n8n-nodes-inboxino
```

Then restart your n8n instance.

## Prerequisites

Before using this node, you need:

1. An [Inboxino](https://inboxino.com) account
2. An Inboxino API token (Bearer token)
3. At least one configured messaging channel in your Inboxino account (Telegram, WhatsApp, Instagram, or SMS)

## Credentials

To use this node, you'll need to configure the **Inboxino API** credential with your API token.

### Getting Your API Token

1. Log in to your [Inboxino dashboard](https://inboxino.com/dashboard)
2. Navigate to **API Settings** or **Developer Settings**
3. Generate or copy your API token
4. Use this token in your n8n Inboxino API credential

### Setting Up Credentials in n8n

1. In your n8n workflow, click on **Credentials** → **New**
2. Search for **Inboxino API**
3. Enter your API token
4. Click **Save**

## Compatibility

- Minimum n8n version: `1.0.0`
- Tested with n8n version: `1.70.0+`

## Usage

The Inboxino node allows you to send messages through various messaging platforms using a unified interface.

### Node Parameters

- **Resource**: Currently supports `Message`
- **Operation**: Currently supports `Send`
- **Account**: Your Inboxino account identifier
- **Channel**: Select the messaging channel:
  - Telegram
  - WhatsApp
  - Instagram
  - SMS
- **Receiver**: The recipient identifier (phone number, username, etc.)
- **Message Type**: The type of content to send:
  - Text
  - Image
  - Video
  - Audio
  - Document
  - Location

Depending on the message type selected, additional fields will appear for message content, media URLs, captions, or location coordinates.

## Operations

### Message Resource

#### Send Operation

Send a message through Inboxino to any supported channel.

**Required Fields:**
- Account ID
- Channel
- Receiver
- Message Type
- Content (varies by message type)

## Examples

### Example 1: Send a Text Message via Telegram

```json
{
  "account": "your-account-id",
  "channel": "telegram",
  "receiver": "@username",
  "messageType": "text",
  "message": "Hello from n8n! Your order #12345 has been shipped."
}
```

### Example 2: Send an Image via WhatsApp

```json
{
  "account": "your-account-id",
  "channel": "whatsapp",
  "receiver": "+1234567890",
  "messageType": "image",
  "mediaUrl": "https://example.com/image.jpg",
  "caption": "Your order confirmation"
}
```

### Example 3: Send Location via Instagram

```json
{
  "account": "your-account-id",
  "channel": "instagram",
  "receiver": "username",
  "messageType": "location",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

### Example 4: Dynamic Message from Webhook

```
Webhook Trigger
  ↓
Set Node (Extract data)
  ↓
Inboxino Node
  - Channel: Telegram
  - Receiver: {{$json.customer_phone}}
  - Message: "Hi {{$json.customer_name}}, your order is ready!"
```

### Example 5: Daily Report via WhatsApp

```
Schedule Trigger (Daily at 9 AM)
  ↓
HTTP Request (Fetch daily stats)
  ↓
Code Node (Format report)
  ↓
Inboxino Node
  - Channel: WhatsApp
  - Receiver: +1234567890
  - Message: {{$json.report}}
```

### Example 6: Multi-Channel Notification

```
Manual Trigger
  ↓
Split Out Node
  ↓
Inboxino Node (Telegram)
  ↓
Inboxino Node (WhatsApp)
  ↓
Inboxino Node (SMS)
```

## Use Cases

This node is perfect for:

- 📧 **Customer Notifications**: Send order updates, shipping confirmations, and delivery notifications
- 🚨 **Alerts & Monitoring**: Send system alerts, error notifications, and monitoring reports
- 💬 **Customer Support**: Automate responses and support ticket notifications
- 📊 **Reports**: Send daily/weekly reports to team members
- 🎯 **Marketing**: Send promotional messages and campaigns
- 🔔 **Reminders**: Send appointment reminders and follow-ups
- 🤖 **Chatbot Integration**: Build automated conversational workflows

## Features

- ✅ Support for multiple messaging channels (Telegram, WhatsApp, Instagram, SMS)
- ✅ Multiple message types (text, image, video, audio, document, location)
- ✅ Batch processing support
- ✅ Error handling with continue-on-fail option
- ✅ Dynamic field display based on message type
- ✅ Full integration with n8n's expression system

## Troubleshooting

### Common Issues

**Node not appearing in n8n:**
- Ensure the package is installed correctly
- Restart your n8n instance after installation
- Check n8n logs for any loading errors

**Authentication errors:**
- Verify your API token is correct
- Ensure the token has proper permissions in Inboxino
- Check if the token has expired

**Message sending fails:**
- Verify the receiver identifier is in the correct format for the channel
- Ensure your Inboxino account has the selected channel configured
- Check the Inboxino API documentation for channel-specific requirements

**Media messages not sending:**
- Ensure the media URL is publicly accessible
- Verify the media format is supported by the target channel
- Check file size limits for the specific channel

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Inboxino API Documentation](https://swagger.inboxino.com:3000/)
- [Inboxino Website](https://inboxino.com)

## Support

If you encounter any issues or have questions:

- 🐛 [Report bugs](https://github.com/erfandiakoo/n8n-nodes-inboxino/issues)
- 💬 [n8n Community Forum](https://community.n8n.io/)
- 📧 Contact: diakoo123@gmail.com

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development

To develop and test this node locally:

```bash
# Clone the repository
git clone https://github.com/erfandiakoo/n8n-nodes-inboxino.git
cd n8n-nodes-inboxino

# Install dependencies
npm install

# Build the node
npm run build

# Start n8n with the node loaded
npm run dev
```

## Version History

### 0.1.0 (Initial Release)
- ✨ Initial release
- ✅ Support for Telegram, WhatsApp, Instagram, and SMS channels
- ✅ Support for text, image, video, audio, document, and location message types
- ✅ Bearer token authentication

## License

[MIT](LICENSE.md)

## Author

**Erfan Diakoo**
- Email: diakoo123@gmail.com
- GitHub: [@erfandiakoo](https://github.com/erfandiakoo)

---

**Note**: This is a community-created node. It is not officially maintained by n8n or Inboxino. For official support, please refer to the respective platforms.

## Keywords

n8n, n8n-community-node-package, n8n-node, inboxino, messaging, telegram, whatsapp, instagram, sms, notifications, automation, workflow

