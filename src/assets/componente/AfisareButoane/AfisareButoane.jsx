import React from "react";
import styles from "./AfisareButoane.module.css";

function AfisareButoane({ litereAmestecate, selecteazaLitere, butoane }) {
  return (
    <>
      {litereAmestecate.map((litera, index) => {
        return (
          <button
            key={index}
            onClick={() => selecteazaLitere(litera, index)}
            className={styles.buton}
            disabled={butoane.includes(index)}
          >
            {litera}
          </button>
        );
      })}
    </>
  );
}
export default AfisareButoane;
