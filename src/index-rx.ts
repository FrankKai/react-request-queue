import { useEffect } from "react";
import { Subject } from "rxjs";
import { concatMap } from "rxjs/operators";

type RequestParams = any;
type RequestFunction = (params: RequestParams) => Promise<void>;

const useRequestQueueWithRxJS = (
  requestFunction: RequestFunction,
  dependencies: any[]
) => {
  const requestQueue$ = new Subject<RequestParams>();

  useEffect(() => {
    const subscription = requestQueue$
      .pipe(
        // 使用 concatMap 来确保请求按顺序执行
        concatMap((params) => requestFunction(params))
      )
      .subscribe({
        error: (error) => console.error("Error processing request:", error),
      });

    return () => {
      subscription.unsubscribe();
    };
  }, dependencies);

  const addToQueue = (params: RequestParams) => {
    requestQueue$.next(params);
  };

  return { addToQueue };
};

export default useRequestQueueWithRxJS;
