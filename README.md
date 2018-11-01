# node-fomo

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/geoffdutton/node-fomo?branch=master)](https://travis-ci.org/geoffdutton/node-fomo)
[![Coverage Status](https://coveralls.io/repos/github/geoffdutton/node-fomo/badge.svg?branch=master)](https://coveralls.io/github/geoffdutton/node-fomo?branch=master)

The _unoffical_ Node SDK for the [Fomo API service](https://fomo.com)

API docs: [https://docs.fomo.com](https://docs.fomo.com)

__NOTE__: This is a work in progress.

## To-Do's
- [x] Implement event routes
- [x] Begin tests
- [ ] Figure out why the `updateEvent` isn't working
- [ ] Handle non-successful responses (4XX, 5XX errors)
- [ ] Handle events not found
- [ ] Implement [Create a Template](https://docs.fomo.com/reference#create-a-template)
- [ ] Implement [Manage Applications](https://docs.fomo.com/reference#application-get-statistics)
- [ ] Better documentation
- [ ] Publish to NPM with properly ignoring test files

Pull requests welcome!

## Development

This was developed using Node 8.10. It might work in lower versions.

Install dependences
```bash
yarn
```

Run tests with coverage
```bash
yarn test
```

Optionally run tests in watch mode
```bash
yarn tdd
```

## Credits
- https://github.com/usefomo/fomo-nodejs-sdk
