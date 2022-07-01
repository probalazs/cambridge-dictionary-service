import { AxiosResponse } from 'axios';
import { getRandomString } from '../test-helpers';
import { getHtml, Strategy } from './get-html';

describe('Get Html', () => {
  it('should fetch the word', () => {
    const baseUrl = getRandomString();
    const word = getRandomString();
    const get = jest.fn().mockResolvedValue(createAxiosResponse());

    getHtml(createStrategy({ get, baseUrl }))(word);

    expect(get).toBeCalledWith(`${baseUrl}/${word}`);
  });

  it('should return the fetched html', async () => {
    const html = getRandomString();
    const get = () => Promise.resolve(createAxiosResponse({ data: html }));

    const result = await getHtml(createStrategy({ get }))(getRandomString());

    expect(result).toEqual(html);
  });

  it('should urlencode word', async () => {
    const baseUrl = getRandomString();
    const word = 'this is lalala';
    const get = jest.fn().mockResolvedValue(createAxiosResponse());

    getHtml(createStrategy({ get, baseUrl }))(word);

    expect(get).toBeCalledWith(`${baseUrl}/${encodeURI(word)}`);
  });
});

function createStrategy(override: Partial<Strategy> = {}): Strategy {
  return {
    get: () => Promise.resolve(createAxiosResponse()),
    baseUrl: getRandomString(),
    ...override,
  };
}

function createAxiosResponse(
  override: Partial<AxiosResponse> = {},
): AxiosResponse {
  return { data: getRandomString(), ...override } as any;
}
