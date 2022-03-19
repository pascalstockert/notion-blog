import { getBlockParagraph } from '/helpers/notion.helper';

export const ParagraphModule = ( props ) => {
  const { block } = props;

  return (
    <p>{ getBlockParagraph( block ) }</p>
  )
}
