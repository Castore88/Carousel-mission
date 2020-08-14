/* Declaring carousel container and images container selecting their classes declared in the html file  */

const carouselSlide = document.querySelector(".carousel-slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

/* select skeleton loader */

const fakecard = document.querySelector(".cards");

/* Number of cards that will be displayes */
let amount = 5;

/* These variables estabish the connection with the API */
const apiUrl = "https://pixabay.com/api";
const apiKey = "15632315-84389bc8e139711676dd22cda";

/* Quotes is an array of objects that will populate the descreption of every single card */
const quotes = [
  {
    name: "Luigi Pirandello",
    quote:
      "Imparerai a tue spese che nel lungo tragitto della vita incontrerai tante maschere e pochi volti.",
  },
  {
    name: "Richard Bach",
    quote:
      "Siamo tutti impostori in questo mondo, noi tutti facciamo finta di essere qualcosa che non siamo.",
  },
  {
    name: "Francesco Burdin",
    quote:
      "La morte lo colse all’improvviso. Ma con una ragguardevole presenza di spirito, rimediò buttandosi sulla poltrona e componendo il viso nella più decorosa delle espressioni. L’ipocrisia aveva vinto fino alla fine.",
  },
  {
    name: "alfcolella, Twitter",
    quote: "Il vero sta bene con tutto. Il falso, con tutti.",
  },
  {
    name: "Omero",
    quote:
      "Per me odioso, come le porte dell’Ade, è l’uomo che occulta una cosa nel suo seno e ne dice un’altra.",
  },
  {
    name: "Kurt Vonnegut",
    quote:
      "Noi siamo ciò che fingiamo di essere, quindi dobbiamo essere attenti a ciò che fingiamo di essere.",
  },
];

/* Retrieving data from the API */

/* This function tells to the getPhoto how many photo it has to get from the API  */

const fetchPhoto = async () => {
  for (let i = 0; i <= amount; i++) {
    getPhoto(i);
  }
};

/* getPhoto takes the variables apiUrl, apiKey and amount and sends a request to the API then  saves the response 
in a variable called card and finally saves the url in cardURL */

const getPhoto = async (id) => {
  const url = `${apiUrl}/?key=${apiKey}&q=nature&image_type=photo&per_page=${amount}&safesearch=true`;
  const res = await fetch(url);
  const card = await res.json();
  const cardURL =
    card.hits[Math.floor(Math.random() * card.hits.length)].largeImageURL;

  createCard(cardURL);
};

setTimeout(async () => {
  await fetchPhoto().then(fakecard.remove());
}, 3000);

/* This function has as an argument the URL of the images we want to display. 
Its goal is to create the html structure for the card that will be appended to the html file  */

const createCard = (cardURL) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("box");

  /* randomizing the text of the description */

  let number = Math.floor(Math.random() * quotes.length);

  const cardHtml = `
  
    <h3>Nature</h3>
    <img src="${cardURL}" alt="1">
    <p>${quotes[number].quote} </p>
  `;

  cardElement.innerHTML = cardHtml;
  carouselSlide.appendChild(cardElement);

  const carouselImages = document.querySelectorAll(".box img");

  /* The counter will establish which image will be showed  */

  let counter = 1;
  const size = carouselImages[0].clientWidth;

  /* btns listeners */

  prevBtn.addEventListener("click", () => {
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  });

  nextBtn.addEventListener("click", async () => {
    if (counter > amount) {
      amount++;
      const url = `${apiUrl}/?key=${apiKey}&q=nature&image_type=photo&per_page=&safesearch=true`;
      const res = await fetch(url);
      const card = await res.json();

      const cardURL =
        card.hits[Math.floor(Math.random() * card.hits.length)].largeImageURL;

      createCard(cardURL);
    }
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  });
};
