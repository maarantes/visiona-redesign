import { createClient } from "@sanity/client";
import { sanityConfig } from "./config";

export const sanityClient = createClient({
  ...sanityConfig,
  token: import.meta.env.SANITY_TOKEN,
});
