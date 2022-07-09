import { configuration } from '../src/configuration';
import { main } from '../src/index';
import { expectedResponse, html, requestedWord } from './fixture';
const nock = require('nock');

describe('Main', () => {
  it('should respond with the findongs of make', async () => {
    nock(configuration.wordEndpoint).get('/make').reply(200, html);
    const request = { query: { q: requestedWord } } as any;
    const response = { json: jest.fn() } as any;

    await main(request, response);

    expect(response.json).toBeCalledWith(expectedResponse);
  });
});
