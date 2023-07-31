// @ts-ignore
import packageJson from 'package.json'
const appVersion: string = packageJson.version;
const apiUrl = 'http://localhost:8080';

export const environment = {
  production: false,
  appVersion,
  mockData: false,
  apiUrl
};
