import dynamic from 'next/dynamic';
import type { NextPage } from 'next';

import Head from 'next/head';

import Grid from '@mui/material/Grid';

import styles from '../styles/Home.module.css';

const CodeEditorNoSSR = dynamic(
  () => import('../components/CodeEditor'),
  { ssr: false }
);

const GameCanvasNoSSR = dynamic(
  () => import('../components/GameCanvas'),
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

      <main className={styles.main}>
        <Grid container>
          <Grid item md={12}>
            <h1 className={styles.title}>Rocket Lander</h1>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={6}>
            <GameCanvasNoSSR/>
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
