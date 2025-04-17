import React from "react";

function AfisareCuvant({ cuvantul, litereSelectate }) {
  return (
    <>
      {cuvantul
        .split("")
        .map((litera, index) =>
          litereSelectate[index] ? litereSelectate[index] : "_"
        )
        .join(" ")}
    </>
  );
}

export default AfisareCuvant;
