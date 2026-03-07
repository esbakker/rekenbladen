import {Config} from './model/config';

export const configToBase64 = (config?: Config) => config ? btoa(JSON.stringify(config)) : '';
export const getConfigQueryParam = (): string | undefined => {
  const configParam = location.search.split('config=')[1];
  return configParam ? decodeURIComponent(configParam) : undefined;
}
