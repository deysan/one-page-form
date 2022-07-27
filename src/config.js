const URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/';

export const client = async (endPoint, { body, ...customConfig }) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${URL}${endPoint}`, config);

    if (!response.ok) throw new Error('failed to fetch');

    const data = await response.json();

    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

client.get = (endPoint, customConfig = {}) => {
  return client(endPoint, customConfig);
};

client.post = (endPoint, body, customConfig = {}) => {
  return client(endPoint, { ...customConfig, body });
};
