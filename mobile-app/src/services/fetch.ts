import log from './log';

const _fetch = async (url: string, options?: Partial<RequestInit>) => {
  let result;

  try {
    log.complex('fetchService', `fetching ${url}`);
    const response = await fetch(url, options);

    result = await response.json();
    // log.complex('fetchService', 'fetched:\n', JSON.stringify(result, null, 2));
  } catch (err) {
    log.warn('fetchService', `failed to fetch ${url}.\n Error: ${err}`);
  }

  return result;
};

export const fetchService = {
  fetch: _fetch,
};
