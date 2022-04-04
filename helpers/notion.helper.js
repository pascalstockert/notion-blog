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
};

export const getPageBlocks = ( id ) => {
  return notionClient.blocks.children.list( {
    block_id: id
  } );
}

// PAGE INTERACTION //

export const getPageTitle = ( page ) => page.properties.Page.title[0].plain_text;

export const getPageCover = ( page ) => page.cover.file.url;

export const getPageIceBreaker = ( page ) => page.properties['Ice Breaker'].rich_text[0].plain_text;

export const getPageTags = ( page ) => page.properties.Tags.multi_select;

export const getPageSlug = ( page ) => page.properties.Slug.rich_text[0].plain_text;

// BLOCK INTERACTION //

export const resolveNotionBlock = ( block ) => {
  switch ( block.type ) {
    case 'paragraph':
      return <ParagraphModule block={ block } key={ block.id } />;
    case 'image':
      return <ImageModule block={ block } key={ block.id } />;
  }
};

export const wrapBlockInHref = ( block, url, key = null ) => {
  return <a key={ key ? key : null }
            href={ url }>{ block }</a>;
}

export const getBlockParagraph = ( block ) => {
  if ( block.paragraph.rich_text.length ) {
    return block.paragraph.rich_text.map( ( snippet, index ) => {
      let snippetBlock;
      switch ( true ) {
        case snippet.annotations.bold:
          snippetBlock = <b key={ block.id + index }>{ snippet.plain_text }</b>;
          break;
        case snippet.annotations.italic:
          snippetBlock = <i key={ block.id + index }>{ snippet.plain_text }</i>;
          break;
        case snippet.annotations.underline:
          snippetBlock = <u key={ block.id + index }>{ snippet.plain_text }</u>;
          break;
        case snippet.annotations.code:
          snippetBlock = <code key={ block.id + index }>{ snippet.plain_text }</code>;
          break;
        default:
          snippetBlock = snippet.plain_text;
      }

      if ( snippet.href ) {
        snippetBlock = wrapBlockInHref( snippetBlock, snippet.href, block.id + index );
      }

      return snippetBlock;
    } );
  }
  return '\n';
};

export const getBlockImageUrl = ( block ) => block.image.file.url;

export const getBlockImageNaturalSize = ( block ) => {
  if ( block.image.caption.length ) {
    return block.image.caption[ 0 ].plain_text
      .split( 'x' )
      .map( stringSize => Number( stringSize ) );
  }
  return undefined;
}
