import { useRef, useEffect } from "react";

type RequestParams = any;
type RequestFunction = (params: RequestParams) => Promise<void>;

const useRequestQueue = (
  requestFunction: RequestFunction,
  dependencies: any[]
) => {
  const isRequestInProgress = useRef(false);
  const requestQueue = useRef<{ paginationData: RequestParams }[]>([]);

  const processQueue = async () => {
    if (requestQueue.current.length === 0 || isRequestInProgress.current) {
      return;
    }

    isRequestInProgress.current = true;
    const { paginationData } = requestQueue.current.shift();

    try {
      await requestFunction(paginationData);
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

  const addToQueue = (paginationData: RequestParams) => {
    requestQueue.current.push({ paginationData });
    processQueue();
  };

  return { addToQueue };
};

export default useRequestQueue;
