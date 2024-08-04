console.log("V1 : Mon dico anglais");
/**
 * MON PROGRAMME
 * > je veux pouvoir donner la définition d'un mot à mes utilisateurs
 *
 *
 * 1. Récupérer le mot saisi par l'utilisateur
 * 2. Envoyer le mot à l'API (https://dictionaryapi.dev)
 * 3. Récupérer la data JSON  du mot
 * 4. Afficher les inforamtion de mon mot sur ma page (HTML)
 * 5. Ajouter un lecteur pour écouter la prononciation du mot
 *
 *
 *
 */

/**ETAPE 1 : récuperer mon mot */
// let wordToSearch = "";
const watchSubmit = () => {
  const form = document.querySelector("#form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const wordToSearch = data.get("search");
    // console.log("LANCER ICI LE FETCH");
    apiCall(wordToSearch);
  });
};

/**ETAPE 2 : envoyer le mot à l'API */
const apiCall = (word) => {
  //   console.log("WORLD TO SEARCH : ", word);
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((response) => response.json())
    .then((data) => {
      const wordInformations = data[0];
      //   console.log(wordInformations);
      /**ETAPE 3 : récupérer la data
       * 1) Mot
       * 2) Ecriture phonétique
       * 3) Prononciation (audio)
       * 4) définitions
       */
      const inforamtionsNeeded = extractData(data[0]);
        console.log("InformationsToShow", inforamtionsNeeded);
        
        renderToHTML(inforamtionsNeeded)
        
    })
    .catch((er) => {
      console.log(er);
    });
};

const extractData = (data) => {
  /**1 le mot */
  const word = data.word;
  /**2 phonétique */
  const phonetics = findProp(data.phonetics, "text");
  /**3 audio */
  const pronon = findProp(data.phonetics, "audio");
  /**4 meanings */
  const meanings = data.meanings;

  return {
    word: word,
    phonetics: phonetics,
    pronon: pronon,
  };
};
const findProp = (array, name) => {
  //   console.log("array", array);
  //   console.log("name", name);
  //Elle parcours un tableau d'objet
  for (let i = 0; i < array.length; i++) {
    //Et cherche dans ce tableau, si l'objet en cours contient une certaine propriété
    const currentObject = array[i];
    const hasProp = currentObject.hasOwnProperty(name);
    //   console.log("Value to return ", currentObject[name]);
    //Alors elle renvoie cette propriété
    if (hasProp) return currentObject[name];
    // console.log("HAS prop : ", hasProp);
  }
  //   console.log("propToFind", propToFind);
};


/**ETAPE 4 : afficher les informations de mon mot sur ma page HTML*/
const renderToHTML = () => {
    console.log("Jouter les infos sur ma page")
}







//LANCEMENT DU PROGRAMME
watchSubmit();

// const extractData = (data) => {
//     /**1 le mot */
//     const word = wordInformations.word;
//     /**2 phonétique */
//     const phonetics = findProp(wordInformations.phonetics, "text");
//     /**3 audio */
//     const pronon = findProp(wordInformations.phonetics, "audio");
//     /**4 meanings */
//     const meanings = wordInformations.meanings;
//   };
