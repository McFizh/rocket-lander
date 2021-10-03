import dynamic from 'next/dynamic'
import type { NextPage } from 'next';

import Head from 'next/head';

import Grid from '@mui/material/Grid';

const CodeEditorNoSSR = dynamic(
  () => import('../components/CodeEditor'),
  { ssr: false }
);

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Rocket landing game</title>
        <meta name="description" content="Programmable rocket landing challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid container>
          <Grid item md={6}>

          </Grid>
          <Grid item md={6}>
            <CodeEditorNoSSR/>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default Home;
