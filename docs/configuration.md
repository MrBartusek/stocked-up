# StockedUp configuration

The recommended way to configure StockedUp is `.env` file. To configure your instance,
make sure you have `.env` file in your project directory. If that's not the case, copy `.env.example` file and rename it to `.env`

## Reference

| Name | Required | Description |
| ---- | -------- | ----------- |
| `NODE_ENV` | ❌ | Application mode. Can be `production` or `development` |
| `BASE_API_URL` | ❌ | Base API for application. This options is not required but should be configured when running in production. |
| `REDIS_HOST` | ✅ | Hostname for Redis server. |
| `REDIS_PASS` | ❌ | Password for Redis server. |
| `REDIS_PORT` | ✅ | Port for Redis server. |
| `MONGO_URL` | ✅ | URL for connecting to MongoDB. |
| `AWS_ACCESS_KEY_ID` | ✅ | Access key ID for AWS. |
| `AWS_SECRET_ACCESS_KEY` | ✅ | Secret access key for AWS. |
| `AWS_DEFAULT_REGION` | ✅ | AWS region where bucket is configured. |
| `AWS_BUCKET_NAME` | ✅ | Name of the AWS bucket to store attachments. |
| `RESEND_API_KEY` | ✅ | API key for resend. |
| `EMAIL_SENDER` | ✅ | Sender email address for outgoing emails. Like: `stockedup@example.com` |
