export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { Client, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("668c01730038e7f0be10");

export const storage = new Storage(client);

export { client };
