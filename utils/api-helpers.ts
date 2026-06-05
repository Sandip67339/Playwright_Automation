import { APIRequestContext } from '@playwright/test';

export class ApiHelper {
  private request: APIRequestContext;
  private baseUrl: string;

  constructor(request: APIRequestContext, baseUrl?: string) {
    this.request = request;
    this.baseUrl = baseUrl || process.env.API_BASE_URL || 'https://reqres.in/api';
  }

  async getUsers(page: number = 1) {
    return await this.request.get(`${this.baseUrl}/users`, {
      params: { page: page.toString() },
    });
  }

  async getSingleUser(id: number) {
    return await this.request.get(`${this.baseUrl}/users/${id}`);
  }

  async createUser(name: string, job: string) {
    return await this.request.post(`${this.baseUrl}/users`, {
      data: { name, job },
    });
  }

  async updateUser(id: number, name: string, job: string) {
    return await this.request.put(`${this.baseUrl}/users/${id}`, {
      data: { name, job },
    });
  }

  async deleteUser(id: number) {
    return await this.request.delete(`${this.baseUrl}/users/${id}`);
  }

  async login(email: string, password?: string) {
    const data: Record<string, string> = { email };
    if (password) data.password = password;
    return await this.request.post(`${this.baseUrl}/login`, { data });
  }

  async register(email: string, password?: string) {
    const data: Record<string, string> = { email };
    if (password) data.password = password;
    return await this.request.post(`${this.baseUrl}/register`, { data });
  }
}
