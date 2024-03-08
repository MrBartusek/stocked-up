# StockedUp | [Live Demo](https://stockedup.dokurno.dev)

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/MrBartusek/stocked-up/ci.yaml)](https://github.com/MrBartusek/stocked-up/actions) [![Website](https://img.shields.io/website?url=https%3A%2F%2Fstockedup.dokurno.dev&link=https%3A%2F%2Fstockedup.dokurno.dev)](https://stockedup.dokurno.dev)
[![codecov](https://codecov.io/gh/MrBartusek/stocked-up/graph/badge.svg?token=pQC25vzuqW)](https://codecov.io/gh/MrBartusek/stocked-up) [![Docker Image Version](https://img.shields.io/docker/v/mrbartusek/stocked-up/latest?label=docker%20version&link=https%3A%2F%2Fhub.docker.com%2Frepository%2Fdocker%2Fmrbartusek%2Fstocked-up)](https://hub.docker.com/repository/docker/mrbartusek/stocked-up/general)

[![cover](https://raw.githubusercontent.com/MrBartusek/stocked-up/master/apps/client/src/assets/hero_image.png)](https://stockedup.dokurno.dev)

[**StockedUp**](https://stockedup.dokurno.dev) is a complete Inventory Management System
that focuses on managing distributed stock for large organizations.

## Quick Start
If you want to start using StockedUp, You can see [live demo](https://stockedup.dokurno.dev) hosted on AWS.
For simplicity's sake, you can also create
[a demo account](https://stockedup.dokurno.dev/register/demo) and skip the registration process.

You can also setup local instance on your machine or deploy this project to a cloud. For instructions please reefer to the [setup guide](SETUP.md).

## About

StockedUp is an easy-to-use service that allows for managing vast amounts of inventory data
for logistical companies. The design philosophy is to separate product definitions from
actual stock data. This allows for separation between global changes of product details
(such as price or description) and stock values.

The general ideas used in StockedUp are:

- **Organization** - You can think of an organization as your company.
- **Product Definition** - Information about a product. Its name, price, description, SKU.
- **Warehouse** - Representation of the physical location where your company stores products, like a warehouse or a store.
- **Inventory** - A product inside a warehouse with quantity and its location.

## Tech Stack

- [Nest.js](https://nestjs.com) - Nest.js, a TypeScript-based Node.js framework, is used as the main backend.
- [React](https://react.dev) - React.js alongside Tailwind CSS and other client-side libraries is used as the frontend library.
- [Amazon AWS](https://aws.amazon.com) - AWS is used as the primary hosting provider that handles server hosting with [EC2](https://aws.amazon.com/ec2/) and image hosting with [S3](https://aws.amazon.com/s3/).
- [MongoDB](https://www.mongodb.com) - MongoDB (with [Mongoose ODM](https://mongoosejs.com)) is the primary database used to optimize access to vast amounts of organizational data.
- [Redis](https://redis.io) - Redis is used as a secondary database for sessions and caching.

## API

StockedUp uses a REST API authenticated using session cookies. You can explore this API
using [Swagger](https://stockedup.dokurno.dev/api) or [Postman](https://app.getpostman.com):

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/7055992-d02d47d4-a08a-4d91-99c0-1cbe6f5b2ab7?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D7055992-d02d47d4-a08a-4d91-99c0-1cbe6f5b2ab7%26entityType%3Dcollection%26workspaceId%3D264913a4-bcdd-4e43-847c-1e8cbca3334b) [![View in Swagger](https://jessemillar.github.io/view-in-swagger-button/button.svg)](https://stockedup.dokurno.dev/api)


## Contributing

Want to contribute to the project?

First of all, thanks! If you find any problems with the project or want to suggest a feature,
don't hesitate to create [an issue](https://github.com/MrBartusek/stocked-up/issues). If you want
to contribute code changes, please create [Pull Requests](https://github.com/MrBartusek/stocked-up/pulls).
