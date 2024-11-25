import { Client } from "@thebcms/client";
export const bcms = new Client(
  "ORG_ID",
  "INSTANCE_ID",
  {
    id: "API_KEY_ID",
    secret: "API_KEY_SECRET",
  },
  {
    injectSvg: true,
  }
);