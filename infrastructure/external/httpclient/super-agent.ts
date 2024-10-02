import { HttpClient } from '@infrastructure/external/httpclient';
import SuperAgent from 'superagent';

export class SuperAgentHttpClient implements HttpClient {
  private requestCreator: SuperAgent.Agent;

  constructor() {
    this.requestCreator = SuperAgent.agent();
  }

  public addBearerToken(token?: string) {
    if (!token) return;
    this.requestCreator = SuperAgent.agent().auth(token, { type: 'bearer' });
  }

  async get<TResponse>(url: string, params: object) {
    const { body, error, status } = await this.requestCreator.get(url).query(params);
    return { response: <TResponse>body, error, status };
  }

  async post<TResponse>(url: string, payload: object) {
    const { body, error, status } = await this.requestCreator.post(url).send(payload);
    return { response: <TResponse>body, error, status };
  }

  async put<TResponse>(url: string, payload: object) {
    const { body, error, status } = await this.requestCreator.put(url).send(payload);
    return { response: <TResponse>body, error, status };
  }

  async delete<TResponse>(url: string) {
    const { body, error, status } = await this.requestCreator.delete(url);
    return { response: <TResponse>body, error, status };
  }
}
