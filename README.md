# n8n-nodes-sevalla

> [!NOTE]
> **Disclaimer:** Unofficial community node. Not affiliated with, endorsed by, or supported by Sevalla or n8n. Trademarks belong to their respective owners. Use at your own risk; no warranty is provided. For support, please use this repository's [Issues](https://github.com/hansdoebel/n8n-nodes-sevalla/issues).

This is an n8n community node for integrating [Sevalla](https://sevalla.com/) platform management into your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

----

## Table of Contents

- [Installation](#installation)
- [Operations](#operations)
- [Credentials](#credentials)
- [Resources](#resources)
- [Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

1. Go to **Settings** > **Community Nodes**
2. Select **Install**
3. Type `n8n-nodes-sevalla` into **npm Package Name**
4. Agree to the risks of using community nodes
5. Select **Install**

## Operations

### Applications

- **Get All** – Retrieve all applications for a company with pagination
- **Get** – Retrieve details for a specific application
- **Create** – Create a new application
- **Update** – Modify application settings (display name, build configuration, deployment settings, hibernation)
- **Delete** – Delete an application

### Deployments

- **Get** – Retrieve deployment details
- **Create** – Start a new deployment

### Databases

- **Get All** – Retrieve all databases for a company with pagination
- **Get** – Retrieve detailed database information with connection details
- **Create** – Create a new database (PostgreSQL, MySQL, MariaDB, Redis)
- **Update** – Modify database settings (display name, resource tier)
- **Delete** – Delete a database

### Networking

- **Create Internal Connection** – Connect resources (app, database, or environment resources)
- **Toggle CDN** – Enable or disable CDN
- **Toggle Edge Cache** – Enable or disable edge caching
- **Clear Cache** – Clear cached resources

### Pipelines

- **Get All** – Retrieve all pipeline configurations with pagination
- **Create Preview App** – Create a preview application in a pipeline

### Processes

- **Get** – Retrieve process information
- **Update** – Modify process settings (scaling strategy, entrypoint)

### Static Sites

- **Get All** – Retrieve all static sites for a company with pagination
- **Get** – Retrieve detailed static site information
- **Create Deployment** – Start a new static site deployment
- **Get Deployment** – Retrieve deployment details
- **Update** – Modify site settings (display name, auto-deploy, build configuration)
- **Delete** – Delete a static site

## Credentials

To use this node, you need a Sevalla API token.

### Authentication

This node uses Bearer token authentication. You will need:

- **Access Token** – Your Sevalla API access token from your Sevalla dashboard

You can verify your credentials by providing your Company ID.

To find your Company ID, open the Sevalla dashboard and copy the value of the idCompany query parameter from the page URL. For example:

https://app.sevalla.com/static-site/name/overview?idCompany=**54fb80af-576c-4fdc-ba4f-b596c83f15a1**

In this example, the Company ID is:
54fb80af-576c-4fdc-ba4f-b596c83f15a1

## Resources

- [Sevalla Homepage](https://sevalla.com/)
- [Sevalla API Documentation](https://api-docs.sevalla.com/)
- [n8n Community Nodes](https://docs.n8n.io/integrations/#community-nodes)
- [n8n Documentation for LLMs](https://docs.n8n.io/llms.txt)

## Version history

- 1.0.0 – Initial release
