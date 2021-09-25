import "https://deno.land/x/dotenv@v3.0.0/load.ts";
import { Application } from "/lib/Discord/Application.ts";
import { configs } from "/config.ts";

if (!configs.token) {
  throw "INVALID ENVIRONMENT";
}

const BASE_URL = "https://discord.com/api";

const response = await fetch(`${BASE_URL}/gateway`);
const { url } = await response.json();

const app = new Application(url);
app.start();
