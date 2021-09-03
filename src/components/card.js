import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const card = document.createElement('div');
  const headline = document.createElement('div');
  const author = document.createElement('div');
  const container = document.createElement('div');
  const authorImg = document.createElement('img');
  const span = document.createElement('span');

  headline.textContent = article.headline;
  authorImg.src = article.authorPhoto;
  span.textContent = `By ${article.authorName}`;

  card.classList.add('card');
  headline.classList.add('headline');
  author.classList.add('author');
  container.classList.add('img-container');

  card.appendChild(headline);
  card.appendChild(author);
  author.appendChild(container);
  container.appendChild(authorImg);
  author.appendChild(span);

  card.addEventListener('click', function(event) {
    console.log(headline);
  });

  return card;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  const appendPoint = document.querySelector(`${selector}`);
  const axios = require('axios');
  const config = {
    method: 'get',
    url: 'http://localhost:5000/api/articles',
    headers: { }
  };
  axios(config)
    .then(resp => {
      const data = resp.data;
      const innerData = data.articles;
      const javascript = innerData.javascript;
      const bootstrap = innerData.bootstrap;
      const technology = innerData.technology;
      const jquery = innerData.jquery;
      const node = innerData.node;

      javascript.forEach(item => {
        const tab = Card(item);
        tab.classList.add('javascript');
        appendPoint.appendChild(tab);
      });
      bootstrap.forEach(item => {
        const tab = Card(item);
        tab.classList.add('bootstrap');
        appendPoint.appendChild(tab);
      });
      technology.forEach(item => {
        const tab = Card(item);
        tab.classList.add('technology');
        appendPoint.appendChild(tab);
      });
      jquery.forEach(item => {
        const tab = Card(item);
        tab.classList.add('jquery');
        appendPoint.appendChild(tab);
      });
      node.forEach(item => {
        const tab = Card(item);
        tab.classList.add('node.js');
        appendPoint.appendChild(tab);
      });
    })
    .catch(err => console.log(err))

    return appendPoint;
}

export { Card, cardAppender }
