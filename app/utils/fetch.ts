import axios, { AxiosError } from "axios";
import { Response } from "./response";

export async function fetch(url: string): Promise<Response | undefined> {
  try {
    const page = await axios.get(url);

    if (page.status !== 200) {
      throw new Response(page.status, page.statusText);
    }

    return new Response(page.status, page.statusText, page.data);
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError) {
      return new Response(error.status, error.message);
    }
  }
}
