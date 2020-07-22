import React from "react";
import styles from "./index.module.css";
import {TweetDashboard} from "../TweetDashboard";

const App = () => (
  <>
    <header className={styles.header}>
      <h1>bluebird</h1>
      <div className={styles.desc}>
        Lorem ipsum dolor sit amt, consectetur adipiscing elit. Sed egestas diam
        vitae ligula aliquet, in commodo odio commodo. Pellentesque ullamcorper
        at ligula sed laoreet. In arcu felis, tempor vitae urna vitae, placerat
        eleifend orci. Suspendisse eget magna consectetur, ultrices lorem sed,
        venenatis dolor. Sed pharetra nisl convallis, pharetra lacus ac, laoreet
        dolor. Suspendisse risus mi, maximus ut varius at, dapibus sed eros. In
        aliquam ut ex eu tincidunt. Morbi sapien mauris, condimentum at justo
        in, fermentum sagittis sem. Nulla sollicitudin lacus metus, quis
        imperdiet odio luctus malesuada.
      </div>
    </header>
    <svg
      className={styles["header-wave"]}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 105"
    >
      <path
        fill-opacity="1"
        d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,69.3C1120,64,1280,32,1360,16L1440,0L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
      ></path>
    </svg>

    <TweetDashboard />
    {/* <svg
      className={styles["footer-wave"]}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 210"
    >
      <path
        fill-opacity="1"
        d="M0,124L80,140C160,156,320,188,480,188C640,188,800,156,960,134.7C1120,113,1280,103,1360,97.3L1440,92L1440,220L1360,220C1280,220,1120,220,960,220C800,220,640,220,480,220C320,220,160,220,80,220L0,220Z"
      ></path>
    </svg> */}
    <footer className={styles.footer}>
      © 2020 —&nbsp;
      <a href="https://isaacong.me" target="_blank" rel="noopener noreferrer">
        Isaac Ong
      </a>
    </footer>
  </>
);

export default App;
