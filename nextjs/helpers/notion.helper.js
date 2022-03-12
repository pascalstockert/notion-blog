import { notionClient } from './clients.helper';

export const getPages = ( limit ) => {
  return notionClient.databases.query( {
    database_id: process.env.NOTION_DB_ID,
    page_size: limit,
    filter: {
      and: [
        {
          property: "Status",
          select: {
            equals: "Finished"
          }
        },
        {
          property: "Type",
          select: {
            equals: "Post"
          }
        }
      ]
    }
  } );
};

export const getPage = ( id ) => {
  return notionClient.pages.retrieve( {
    page_id: id
  } );
}

export const getPageBlocks = ( id ) => {
  return notionClient.blocks.children.list( {
    block_id: id
  } );
}
