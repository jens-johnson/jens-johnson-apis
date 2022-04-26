# Daily Narrative API

## Overview

This service contains functionality related to the `Daily Narrative` domain: daily summary data used to construct
daily narrative information: mood, activity, etc.

## Infrastructure

See [`docs/infrastructure`](docs/infrastructure.md) for more information.

## Development and Deployment

### Local Development

To run the service locally, invoke `npm run dev`. Under the hood, this invokes:
```shell
$ SLS_DEBUG=* serverless offline --verbose --noAuth
```
which runs serverless offline without JWT authentication so that the lambdas can be accessed via localhost.