import { useRef, useEffect } from "react";

type RequestParams = any;
type RequestFunction = (params: RequestParams) => Promise<void>;

const useRequestQueue = (
  requestFunction: RequestFunction,
  dependencies: any[]
) => {
  const isRequestInProgress = useRef(false);
  const requestQueue = useRef<{ params: RequestParams }[]>([]);

  const processQueue = async () => {
    if (requestQueue.current.length === 0 || isRequestInProgress.current) {
      return;
    }

    isRequestInProgress.current = true;
    const { params } = requestQueue.current.shift();

    try {
      await requestFunction(params);
    } catch (error) {
      console.error("Error processing request:", error);
    } finally {
      isRequestInProgress.current = false;
      processQueue();
    }
  };

  useEffect(() => {
    processQueue();
  }, dependencies);

  const addToQueue = (params: RequestParams) => {
    requestQueue.current.push({ params });
    processQueue();
  };

  return { addToQueue };
};

export default useRequestQueue;
