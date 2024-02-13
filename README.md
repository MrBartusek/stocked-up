# StockedUp | [Live Demo](https://stockedup.dokurno.dev)

[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/MrBartusek/stocked-up/ci.yaml)](https://github.com/MrBartusek/stocked-up/actions) [![Website](https://img.shields.io/website?url=https%3A%2F%2Fstockedup.dokurno.dev&link=https%3A%2F%2Fstockedup.dokurno.dev)](https://stockedup.dokurno.dev)
[![codecov](https://codecov.io/gh/MrBartusek/stocked-up/graph/badge.svg?token=pQC25vzuqW)](https://codecov.io/gh/MrBartusek/stocked-up) [![Docker Image Version](https://img.shields.io/docker/v/mrbartusek/stocked-up/latest?label=docker%20version&link=https%3A%2F%2Fhub.docker.com%2Frepository%2Fdocker%2Fmrbartusek%2Fstocked-up)](https://hub.docker.com/repository/docker/mrbartusek/stocked-up/general)

[![cover](https://i.imgur.com/2xOyilY.png)](https://stockedup.dokurno.dev)

[**StockedUp**](https://stockedup.dokurno.dev) is a complete Inventory Management System that focuses on managing distributed stock for large organizations.

## Quick Start

If you want to start using StockedUp, I host fully fledged [live demo](https://stockedup.dokurno.dev).
For simplicity sake, you can also create [a demo account](https://stockedup.dokurno.dev/register/demo) and
skip registration process.

## About

StockedUp is a easy to use interface that allows for managing wast amounts of inventory data
for logistical companies. The design philosophy is to separate product definitions from
actual stock data in warehouses. This allow for global changes of product details (such as price, or description)
to be reflected across all warehouses.

The general ideas used in StockedUp are:

- **Organization** - You can think of organization as your company. It hosts all of the information about it.
- **Product Definition** - Information about an product. It's name, price, description, SKU.
- **Warehouse** - Representation of physical location where your company stores products. Like warehouse, port or a shop.
- **Inventory** - A product inside a warehouses with quantity and it's location.

## Tech Stack

- [Nest.js](https://nestjs.com) - Nest.js, Typescript-based Node.js framework is used as main backend.
- [React](https://react.dev) - React.js alongside with Tailwind CSS and other client-side libraries is used as frontend library.
- [Amazon AWS](https://aws.amazon.com) - AWS is used as primary hosting provider that handles server hosting with [EC2](https://aws.amazon.com/ec2/) and images hosting with [S3](https://aws.amazon.com/s3/)
- [MongoDB](https://www.mongodb.com) - MongoDB (with [mongose ODM](https://mongoosejs.com)) is primary database used to optimize access to wast amount of organization data.
- [Redis](https://redis.io) - Redis is used as secondary database for sessions and caching.

## API

StockedUp uses Rest API authenticated using session cookies. You can explore this API
using [Swagger](https://stockedup.dokurno.dev/api) or [Postman](https://app.getpostman.com):

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/7055992-d02d47d4-a08a-4d91-99c0-1cbe6f5b2ab7?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D7055992-d02d47d4-a08a-4d91-99c0-1cbe6f5b2ab7%26entityType%3Dcollection%26workspaceId%3D264913a4-bcdd-4e43-847c-1e8cbca3334b)

## Contributing

Want to contribute to the project?

First of all, thanks! If you find and problems with the project or want to suggest a feature
don't hesitate to create [an issue](https://github.com/MrBartusek/stocked-up/issues). If you want
to contribute code changes, please create a [Pull Requests](https://github.com/MrBartusek/stocked-up/pulls).
