import { notionClient } from './clients.helper';
import { ParagraphModule } from '../modules/notion-blocks/paragraph.module';
import { ImageModule } from '../modules/notion-blocks/image.module';

// NOTION API HELPERS //

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

// PAGE INTERACTION //

export const getPageTitle = ( page ) => page.properties.Page.title[0].plain_text;

export const getPageCover = ( page ) => page.cover.file.url;

// BLOCK INTERACTION //

export const resolveNotionBlock = ( block ) => {
  switch ( block.type ) {
    case 'paragraph':
      return <ParagraphModule block={ block } key={ block.id } />;
    case 'image':
      return <ImageModule block={ block } key={ block.id } />;
  }
};

export const getBlockParagraph = ( block ) => block.paragraph.rich_text[0].plain_text;

export const getBlockImageUrl = ( block ) => block.image.file.url;
