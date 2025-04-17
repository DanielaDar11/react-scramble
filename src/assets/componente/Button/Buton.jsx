import React from "react";
import styles from "./Buton.module.css";

function Buton({ cuvantAleatoriu }) {
  return (
    <button onClick={cuvantAleatoriu} className={styles.restartButton}>
      RESTART
    </button>
  );
}

export default Buton;
