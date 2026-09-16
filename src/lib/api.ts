import { Application, Service } from "../types";
import { services as localServices } from "../data";

const json = async <T>(input: RequestInfo, init?: RequestInit): Promise<T> => {
  const response = await fetch(input, { headers: { "Content-Type": "application/json" }, ...init });
  if (!response.ok) throw new Error((await response.json().catch(() => null))?.message || "Request failed");
  return response.json();
};

export const api = {
  async getServices(): Promise<Service[]> {
    try {
      return await json<Service[]>("/api/services");
    } catch {
      return localServices;
    }
  },
  async getApplications(): Promise<Application[]> {
    try {
      return await json<Application[]>("/api/applications");
    } catch {
      return [];
    }
  },
  async createApplication(serviceId: string): Promise<Application> {
    return json<Application>("/api/applications", { method: "POST", body: JSON.stringify({ serviceId }) });
  },
  async saveInformation(id: string, information: Record<string, string>): Promise<Application> {
    return json<Application>(`/api/applications/${id}/information`, {
      method: "PATCH",
      body: JSON.stringify(information)
    });
  },
  async assess(id: string): Promise<Application> {
    return json<Application>(`/api/applications/${id}/assess`, { method: "POST" });
  }
};