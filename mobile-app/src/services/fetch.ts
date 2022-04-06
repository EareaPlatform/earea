const _fetch = async (url: string, options?: Partial<RequestInit>) => {
  let result;

  try {
    console.log(`fetchService: trying to fetch ${url}`);
    const response = await fetch(url, options);

    result = await response.json();
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.warn(`fetchService: failed to fetch ${url}.\n Error: ${err}`);
  }

  return result;
};

export const fetchService = {
  fetch: _fetch,
};
