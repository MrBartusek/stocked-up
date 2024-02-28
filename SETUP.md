# StockedUp Setup Guide

Welcome to the setup guide! This document will guide you thought the process for running StockedUp by yourself. If you want to actually check out StockedUp I would recommend the [live demo](https://stockedup.dokurno.dev).

This guide will help you to:
- Setup local development environment to contribute to the project.
- Create a self-hosted StockedUp instance on your computer.
- Setup a self-hosted StockedUp instance or any cloud service.

## Prerequisites
Before proceeding any further, you'll need to configure couple of external services that StockedUp uses. We use [Resend](https://resend.com/) to send transactional e-mails. We also use -[AWS S3](https://aws.amazon.com/s3/) for hosting attachments and profile pictures.

### Resend
To send transactional e-mails we use [Resend](https://resend.com/). Please follow this guide to configure a domain and obtain Resend API key.

1. Create a [Resend](https://resend.com/overview) account.
1. Configure a [Domain](https://resend.com/domains) that will be used to send E-mails.
1. Generate [API Key](https://resend.com/api-keys). Please select *Sending Access* under *Permissions* and correct *Domain*.
1. Save this API key for later configuration.

### Amazon AWS S3 Bucket
To store product images as well as user avatars we use [Amazon Web Services S3 Bucket](https://aws.amazon.com/s3/). StockedUp usage falls under AWS Free Tier. Creating an AWS account will start a 12 month Free Tier period. Please follow this guide to create S3 bucket and obtain credentials.

1. Create a [AWS](https://aws.amazon.com) account.
1. [Create new S3 bucket](https://s3.console.aws.amazon.com/s3/bucket/create) you can chose any name and any region. We don't require ACLs to be enabled.
1. Create new [IAM user](https://us-east-1.console.aws.amazon.com/iam/home). 
1. Add new policy to this user. The easiest way is to use inline policy.
    - Navigate to created user and find *Permissions policies* section. Click *Add permissions* -> *Create inline policy*
    - Allow for: `List -> ListBucket`, `Read -> GetObject`, `Write -> DeleteObject`, `Write -> PutObject`
    - Allow for resources: `arn:aws:s3:::[YOUR BUCKET NAME]/*`, `arn:aws:s3:::[YOUR BUCKET NAME]`
    - Save this policy under name of your choice
1. Create new Access key for your user.
    - Navigate to created user and select *Security Credentials* tab. 
    - Click *Create Access Key*
    - Select *Other* and click *Next*
    - Chose any name
    - Click Create access key
1. Save *Access key* and *Secret access key* for later configuration.

## Setup

Depending on your needs you can deploy StockedUp locally or using Docker container. If you wish to make this setup permanent, deploy using containers. If you want to contribute to this project, setup it manually.


### Docker Setup

We have also configured [Docker](https://www.docker.com) for simpler deployments on web servers.

1. Clone this repository:
    ```sh
    git clone https://github.com/MrBartusek/stocked-up.git
    cd stocked-up
    ```
1. Run the project with compose
    ```sh
    docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d
    ```

### Local Setup

Setup DokChat by manually configuring Node.js, Redis and MongoDB. You can also call this approach Bare Metal.

Make sure you have installed and working on your system:
- Latest [Node.js LTS](https://nodejs.org/en) release
- Running [Redis](https://redis.io) server. (I would recommend to use WSL if you are on Windows)
- Running [MongoDB](https://www.mongodb.com) server.

1. Clone this repository:
    ```sh
    git clone https://github.com/MrBartusek/stocked-up.git
    cd stocked-up
    ```
2. Instal dependencies using NPM
    ```sh
    npm i
    ```
3. Copy `.env.example` file and rename it to `.env`. Fill this configuration file with your API keys and other configuration options. For reference see [configuration guide](./docs/configuration.md)
4. Run project using `npm run dev` in watch mode.

You may also wish to build this project and serve it in production mode. To do this follow this guide:
1. Change following options in `.env`:
    - set `NODE_ENV` to `production`
    - set `BASE_API_URL` to your api URL (`http://localhost:3000/api` for local builds)
1. Build the project
    ```sh
    npm run build
    ```
1. Start the project
    ```sh
    npm run start
    ```
