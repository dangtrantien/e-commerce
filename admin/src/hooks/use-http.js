import { useCallback } from 'react';

// ==================================================

const useHttp = () => {
  const sendRequest = useCallback(async (requestConfig) => {
    const response = await fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : 'GET',
      credentials: 'include',
      headers: requestConfig.headers ? { ...requestConfig.headers } : {},
      body: requestConfig.body ? requestConfig.body : null,
    });

    const resData = await response.json();

    if (!response.ok) {
      return { error: true, message: resData.message };
    }

    return resData;
  }, []);

  return sendRequest;
};

export default useHttp;
