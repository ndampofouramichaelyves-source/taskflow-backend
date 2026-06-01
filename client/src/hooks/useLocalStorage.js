import { useState, useEffect } from "react";

export function useLocalStorage(cle, valeurInitiale) {
  const [valeur, setValeur] = useState(() => {
    const donnees = localStorage.getItem(cle);
    return donnees ? JSON.parse(donnees) : valeurInitiale;
  });

  useEffect(() => {
    localStorage.setItem(cle, JSON.stringify(valeur));
  }, [cle, valeur]);

  return [valeur, setValeur];
}