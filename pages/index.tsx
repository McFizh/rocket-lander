import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import Sketch from 'react-p5';
import p5Types from 'p5';

import Head from 'next/head';

import Grid from '@mui/material/Grid';

import styles from '../styles/Home.module.css';

const CodeEditorNoSSR = dynamic(
  () => import('../components/CodeEditor'),
  { ssr: false }
);

const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5.createCanvas(500,500).parent(canvasParentRef);
};

const draw = (p5: p5Types) => {
  p5.background(0);
  p5.ellipse(0, 0, 70, 70);
};

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
            <Sketch setup={setup} draw={draw}/>
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
