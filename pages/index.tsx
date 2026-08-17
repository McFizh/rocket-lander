import { useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons';

import { StoreContext } from '../utils/Store';

import styles from '../styles/Home.module.css';
import { GameEngine } from '../utils/GameEngine';
import dynamic from 'next/dynamic';

const GameCanvasNoSSR = dynamic(
  () => import('../components/GameCanvas'),
  { ssr: false }
);

const CodeEditorNoSSR = dynamic(
  () => import('../components/CodeEditor'),
  { ssr: false }
);

const engine = new GameEngine();

const formatMissionTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const Home: NextPage = () => {
  const { running, fuel, error, elapsedSeconds } = useContext(StoreContext);

  const onResetClicked = () => {
    engine.reset();
  };

  const onPlayPauseClicked = () => {
    if(!running) {
      engine.start();
    } else {
      engine.pause();
    }
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
            <GameCanvasNoSSR engine={engine}/>
          </div>
          <div className={styles.gridActionArea}>
            <div className={styles.gridInfoArea}>
              Mission time:<br/>
              <span className={styles.missionTime}>{formatMissionTime(elapsedSeconds)}</span><br/>
              <br/>
              Fuel remaining:<br/>
              <span className={styles.missionTime}>{fuel} %</span><br/>
              <br/>
              {error && <span role="alert">Script error: {error}</span>}
            </div>
            <div className={styles.gridButtonArea}>
              <Button variant="contained" onClick={onResetClicked}>
                <FontAwesomeIcon icon={ faSync } />
              </Button>
              <Button variant="contained" onClick={onPlayPauseClicked}>
                <FontAwesomeIcon icon={ running ? faPause : faPlay} />
              </Button>
            </div>
          </div>
          <div>
            <CodeEditorNoSSR engine={engine}/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
