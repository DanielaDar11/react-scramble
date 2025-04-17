import { words } from "./constants/words";
import React from "react";
import { images } from "./constants/images";
import { useState, useEffect, useCallback } from "react";
import AfisareButoane from "./assets/componente/AfisareButoane/AfisareButoane";
import AfisareLitere from "./assets/componente/AfisareLitere/AfisareLitere";
import Buton from "./assets/componente/Button/Buton";

function App() {
  const [cuvantul, setCuvantul] = useState("");
  const [litereAmestecate, setLitereAmestecate] = useState([]);
  const [litereSelectate, setLitereSelectate] = useState([]);
  const [indexImg, setIndexImg] = useState(0);
  const [finisat, setFinisat] = useState(false);
  const [textul, setTextul] = useState("");
  const [culoare, setCuloare] = useState("");
  const [mesajul, setMesajul] = useState("");
  const [butonApasat, setButonApasat] = useState([]);

  useEffect(() => {
    cuvantAleatoriu();
  }, []);

  const cuvantAleatoriu = useCallback(() => {
    const cuvant = words[Math.floor(Math.random() * words.length)];
    const literele = cuvant.split("");
    setCuvantul(cuvant);
    setLitereAmestecate([...literele].sort(() => Math.random() - 0.5));
    setLitereSelectate([]);
    setIndexImg(0);
    setFinisat(false);
    setTextul("Unscramble the word");
    setCuloare("black");
    setMesajul("The word was :");
    setButonApasat([]);
  }, []);

  function selecteazaLitere(litera, index) {
    if (finisat || butonApasat.includes(index)) return;
    setButonApasat([...butonApasat, index]);

    const noua_litera = [...litereSelectate, litera];
    setLitereSelectate(noua_litera);

    if (noua_litera.length === cuvantul.length) {
      const cuvantFormat = noua_litera.join("");
      if (cuvantFormat === cuvantul) {
        setTextul("YOU WIN");
        setFinisat(true);
        setCuloare("green");
        setMesajul("The word was indeed:");
      } else {
        if (indexImg + 1 >= images.length) {
          setTextul("YOU LOSE");
          setFinisat(true);
          setCuloare("red");
        } else {
          setIndexImg(indexImg + 1);
          setLitereSelectate([]);
          setButonApasat([]);
        }
      }
    }
  }

  return (
    <>
      <div className="principal">
        <h1 className="titlu" style={{ color: culoare }}>
          {textul}
        </h1>
        <img src={images[indexImg]} />
        <AfisareLitere
          cuvantul={cuvantul}
          litereSelectate={litereSelectate}
          finisat={finisat}
          mesajul={mesajul}
        />
        <div>
          {!finisat ? (
            <AfisareButoane
              litereAmestecate={litereAmestecate}
              selecteazaLitere={selecteazaLitere}
              butoane={butonApasat}
            />
          ) : (
            <Buton cuvantAleatoriu={cuvantAleatoriu} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
