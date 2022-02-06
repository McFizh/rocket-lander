import { useContext } from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from 'next';
import Head from 'next/head';

import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons';

import { StoreContext } from '../utils/Store';

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
  const { running, setRunning } = useContext(StoreContext);

  const onResetClicked = () => {
    setRunning(false);
  };

  const onPlayPauseClicked = () => {
    setRunning(!running);
  };

  return (
    <div>
      <Head>
        <title>Rocket landing game</title>
        <meta name="description" content="Programmable rocket landing challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.gridContainer}>
            <h1 className={styles.title}>Rocket Lander</h1>
        </div>

        <div className={styles.gridContainer}>
          <div>
            <GameCanvasNoSSR/>
          </div>
          <div className={styles.gridActionArea}>
            <div className={styles.gridInfoArea}>
              Mission time:<br/>
              <span className={styles.missionTime}>00:00</span><br/>
              <br/>
              Fuel remaining:<br/>
              <span className={styles.missionTime}>100 %</span><br/>
            </div>
            <div className={styles.gridButtonArea}>
              <Button variant="contained" onClick={onResetClicked}>
                <FontAwesomeIcon icon={ faSync} />
              </Button>
              <Button variant="contained" onClick={onPlayPauseClicked}>
                <FontAwesomeIcon icon={ running ? faPause : faPlay} />
              </Button>
            </div>
          </div>
          <div>
            <CodeEditorNoSSR/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
