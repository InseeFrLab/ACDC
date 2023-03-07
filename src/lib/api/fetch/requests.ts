/* eslint-disable @typescript-eslint/no-explicit-any */
import fetcher from './fetcher';

export const getRequest = (url: string) => fetcher(url, 'GET', null);

export const postRequest = (url: string, body: any) =>
  fetcher(url, 'POST', body);

export const putRequest = (url: string, body: any) => fetcher(url, 'PUT', body);

export const deleteRequest = (url: string) => fetcher(url, 'DELETE', null);
