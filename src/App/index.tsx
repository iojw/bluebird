import React from "react";
import styles from "./index.module.css";
import {TweetDashboard} from "../TweetDashboard";

const App = () => (
  <>
    <div className={styles.header}>
      <h1>BLUEBIRD</h1>
    </div>
    <div className={styles.container}>
      <div className={styles.desc}>
        <p>
          Lorem ipsum dolor sit amt, consectetur adipiscing elit. Sed egestas
          diam vitae ligula aliquet, in commodo odio commodo. Pellentesque
          ullamcorper at ligula sed laoreet. In arcu felis, tempor vitae urna
          vitae, placerat eleifend orci. Suspendisse eget magna consectetur,
          ultrices lorem sed, venenatis dolor. Sed pharetra nisl convallis,
          pharetra lacus ac, laoreet dolor. Suspendisse risus mi, maximus ut
          varius at, dapibus sed eros. In aliquam ut ex eu tincidunt. Morbi
          sapien mauris, condimentum at justo in, fermentum sagittis sem. Nulla
          sollicitudin lacus metus, quis imperdiet odio luctus malesuada.
        </p>
      </div>
      <TweetDashboard />
    </div>
    <footer className={styles.footer}>
      © 2020 —&nbsp;
      <a href="https://isaacong.me" target="_blank" rel="noopener noreferrer">
        Isaac Ong
      </a>
    </footer>
  </>
);

export default App;
