import { main } from '../src/index';
import { expectedResponse, requestedWord } from './fixture';

describe('Main', () => {
  it('should respond with the findongs of make', async () => {
    const request = { query: { q: requestedWord } } as any;
    const response = { json: jest.fn() } as any;

    await main(request, response);

    expect(response.json).toBeCalledWith(expectedResponse);
  });
});
