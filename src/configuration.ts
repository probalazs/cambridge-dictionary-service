import { env } from 'process';
import { Configuration } from './interfaces';

export const configuration: Configuration = {
  wordEndpoint: env['WORD_ENPOINT']!,
};
