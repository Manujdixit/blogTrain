export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { Client, Storage } from "appwrite";

const ENDPOINT = import.meta.env.VITE_APP_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APP_APPWRITE_PROJECT_ID;

const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);

export const storage = new Storage(client);

export { client };
