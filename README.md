# StockedUp

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/MrBartusek/stocked-up/ci.yaml)](https://github.com/MrBartusek/stocked-up/actions)
[![codecov](https://codecov.io/gh/MrBartusek/stocked-up/graph/badge.svg?token=pQC25vzuqW)](https://codecov.io/gh/MrBartusek/stocked-up)

> StockedUp is complete Inventory Management System that focuses on managing stock for large
> organization with multiple warehouses.

![cover](https://i.imgur.com/2xOyilY.png)

## Tech Stack

- **Nest.js** - Nest.js, Typescript-based Node.js framework is used as main backend.
- **React** - React.js alongside with Tailwind CSS and other client-side libraries is used as frontend library.
- **Amazon AWS** - AWS is used as primary hosting provider that handles server and images hosting.
- **MongoDB** - MongoDB document database is primary database used to optimize access to wast amount of organization data.
- **Redis** - Redis is used as secondary database for sessions and caching.

### Hosting

This project is designed to run on AWS using following services:

- [EC2](https://aws.amazon.com/ec2/) - for hosting server
- [S3](https://aws.amazon.com/s3/) - for attachments and profile pictures
- [IAM](https://aws.amazon.com/iam/) - for access management
