import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Post({ data }) {

  const router = useRouter();
  const { id } = router.query;

  return (
    <>

      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.title}></meta>
      </Head>

      <h1>{data.title}</h1>
      <p>#{data.id}</p>

    </>
  )
}

export async function getStaticProps({ params }) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await req.json();

  return {
    props: { data }
  };

}

export async function getStaticPaths() {
  const paths = [{ params: { id: 'test' } }];

  return {
    paths,
    fallback: false
  };
}
