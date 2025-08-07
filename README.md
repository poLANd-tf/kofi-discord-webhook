# Ko-fi & Discord Webhook Integration
Ko-fi and Discord Webhook API Integration made with [Node.js](https://nodejs.org) and the [`express`](https:///npmjs.org/package/express) library with a use of Discord.js 14

`.env` File Template:
```
PORT = 8070
VERIFICATION_TOKEN = ""
WEBHOOK_URL = ""
ENDPOINT = "/webhook-kofi"
```
- Get `VERIFICATION_TOKEN` from https://ko-fi.com/manage/webhooks > API > Webhooks > Dropdown Menu "Advanced" > Verification Token > Copy the code in the text field and paste it in the `.env` file
- Get `WEBHOOK_URL` from creating a webhook for a Discord Channel. Copy the webhook URL and paste it in the `.env` file
