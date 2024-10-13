import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class GriffyAPI {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, headers: Record<string, string> = {}) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 50000,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  }

  // GET request
  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  // POST request with generic data type
  public async post<T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  // Set headers
  public setHeaders(headers: Record<string, string>): void {
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }
}

export const griffyApi = new GriffyAPI(
  process.env.NEXT_PUBLIC_APP_BASE_URL as string
);
