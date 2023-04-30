import { InternalResponseInterface } from "../interface/internal.response";

const BASE_URL = process.env.REACT_APP_BASE_URL;

/**
 * Fetches data from a URL and returns the response.
 * @param url - The URL to fetch data from.
 * @param options - The options to pass to the fetch function (optional).
 * @returns The response as an InternalResponseInterface object.
 * @returns The response as the specified type ["json", "plain"]
 * @returns maximun waits before killing the request
 */
export const fetchUrl = async (url: string, options?: any, responseType: string = "plain", timeout: number = 5000): Promise<InternalResponseInterface> => {
    console.log(BASE_URL)
    const response: InternalResponseInterface = {
      error: false,
      errorTrace: null,
      response: null,
    };
  
    try {
      const fetchPromise = fetch(url, options);
      const timeoutPromise = new Promise<InternalResponseInterface>((reject) => {
        const response: InternalResponseInterface = {
          error: true,
          errorTrace: null,
          response: "Timeout",
        };
        setTimeout(() => reject(response), timeout);
      });
  
      const fetchResponse = await Promise.race([fetchPromise, timeoutPromise]) as any;
      let data;
      switch(responseType) {
        case "json": {
            data = await fetchResponse.json();
            break;
        }
        case "plain": { 
            data = await fetchResponse.text();
            break;
        }
      }
      response.response = data;
    } catch (error: any) {
      response.error = true;
      response.errorTrace = error.message;
    }
  
    return response;
  };
  