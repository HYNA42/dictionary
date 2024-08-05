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
      //   console.log("InformationsToShow", inforamtionsNeeded);

      renderToHTML(inforamtionsNeeded);
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
    meanings: meanings,
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
const renderToHTML = (data) => {
  //Afficher la carte
  const card = document.querySelector(".js-card");
  card.classList.remove("card--hidden");

  //   console.log(data);
  //1 mot
  const title = document.querySelector(".js-card-title");
  title.textContent = data.word;
  //2 phonetics
  const phonetics = document.querySelector(".js-card-phonetic");
  phonetics.textContent = data.phonetics;
  //3 prononciation
  const prononciation = document.querySelector(".js-card-phonetic");
  phonetics.textContent = data.phonetics;
  // console.log(title)

  //creation d'éléments HTML dynamiques
  const list = document.querySelector(".js-card-list");
  // console.log(list)

  list.innerHTML = ""; //réinitialiser le rendu

  for (let i = 0; i < data.meanings.length; i++) {
    const meaning = data.meanings[i];
    const partOfSpeech = meaning.partOfSpeech;
    const definition = meaning.definitions[0].definition;
    // console.log("meanigs", meaning);
    // console.log("partOfSpeech", partOfSpeech);
    // console.log("definition", definition);
    //solution 1 : avec un innerHTML incremente
    // list.innerHTML += `
    //     <p class="card__part-of-speech">${partOfSpeech}</p>
    //     <p class="card__definition">${definition}</p>
    // `;

    //solution 2 : avec la création d'éléments
    const li = document.createElement("li");
    li.classList.add("card__meaning");
    const pPartOfSpeech = document.createElement("p");
    pPartOfSpeech.classList.add("card__part-of-speech");
    pPartOfSpeech.textContent = partOfSpeech;

    const pDefinition = document.createElement("p");
    pDefinition.classList.add("card__definition");
    pDefinition.textContent = definition;

    li.appendChild(pPartOfSpeech);
    li.appendChild(pDefinition);
    list.appendChild(li);
  }

  //Ajout de l'audio en js
  const button = document.querySelector(".js-card-button");
  // console.log(button)
  // console.log(data.pronon)
  const audio = new Audio(data.pronon);
  button.addEventListener("click", () => {
    console.log(data.pronon);
    audio.play();
    button.classList.remove("card__player--off");
    button.classList.add("card__player--on");
  });
  audio.addEventListener("ended", () => {
    console.log("FIN");
    button.classList.remove("card__player--on");
    button.classList.add("card__player--off");
  });
  //   console.log("AJOUTER les infos sur ma page HTML", data);
};

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
