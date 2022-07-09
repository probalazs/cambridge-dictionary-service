import { Configuration } from './interfaces';

export const configuration: Configuration = {
  wordEndpoint: process.env['WORD_ENDPOINT']!,
};
