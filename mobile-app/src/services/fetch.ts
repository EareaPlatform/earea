import log from './log';

const _fetch = async (url: string, options?: Partial<RequestInit>) => {
  log.complex('fetchService', `fetching from ${url}`);
  const response = await fetch(url, options);

  if (response.status !== 200 || !response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  const result = await response.json();
  // log.complex('fetchService', 'fetched:\n', JSON.stringify(result, null, 2));

  return result;
};

export const fetchService = {
  fetch: _fetch,
};
