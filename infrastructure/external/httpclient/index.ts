export const HTTP_CLIENT_TYPE = Symbol.for('HttpClient');

type HttpClientResponse<T> = {
  response: T;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  error: any;
  status: number;
};

export interface HttpClient {
  get<T>(url: string, params: object): Promise<HttpClientResponse<T>>;
  post<T>(url: string, payload: object): Promise<HttpClientResponse<T>>;
  put<T>(url: string, payload: object): Promise<HttpClientResponse<T>>;
  delete<T>(url: string): Promise<HttpClientResponse<T>>;
  addBearerToken(token?: string): void;
}
