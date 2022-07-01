import { AxiosResponse } from 'axios';
import { GetHtml } from '../interfaces';

export type Strategy = {
  get: (url: string) => Promise<AxiosResponse>;
  baseUrl: string;
};

export const getHtml =
  (strategy: Strategy): GetHtml =>
  (word) =>
    strategy
      .get(`${strategy.baseUrl}/${encodeURI(word)}`)
      .then(({ data }) => data);
