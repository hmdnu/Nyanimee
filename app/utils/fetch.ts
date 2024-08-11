import axios, { AxiosError } from "axios";
import { Response } from "./response";

type BaseUrl = {
  baseUrl: string;
};

export async function gofetch(baseUrl: string | BaseUrl, url?: string): Promise<Response | undefined> {
  try {
    const base = (baseUrl as BaseUrl).baseUrl || baseUrl;

    const page = await axios.get(`${base}${url || ""}`);

    if (page.status !== 200) {
      throw new Response(page.status, page.statusText);
    }

    return new Response(page.status, page.statusText, page.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return new Response(error.status, error.message);
    }
  }
}
