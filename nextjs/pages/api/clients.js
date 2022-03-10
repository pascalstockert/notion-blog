import { Client } from '@notionhq/client/build/src';

export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN
});
