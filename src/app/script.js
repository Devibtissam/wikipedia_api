import { fetchData } from './util/fetchData.js';

const submitForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search');
const resultsContainer = document.querySelector('.search-result');

const Params = {
  origin: '*',
  format: 'json',
  action: 'query',
  prop: 'extracts',
  exchars: 250,
  exintro: true,
  explaintext: true,
  generator: 'search',
  gsrlimit: 20,
};

const displayResults = (results) => {
  // clear previous results
  resultsContainer.innerHTML = '';
  const resultItems = Object.values(results);
  const showResults = resultItems
    .map((result) => ({
      id: result.pageid,
      title: result.title,
      text: result.extract,
    }))
    .map(
      (result) =>
        `<div class="search-result__item">
            <h2 class="search-result__item__title">
                <a href="https://en.wikipedia.org/?curid=${result.id}" target="_blank">${result.title}</a>
            </h2>
            <p class="search-result__item__desc">
               ${result.text}
            </p>
        </div>`
    )
    .join('');

  resultsContainer.innerHTML = showResults;
};

const getData = async (params) => {
  const datafetched = await fetchData(params);
  const { pages } = datafetched;
  displayResults(pages);
};

submitForm.addEventListener('submit', (e) => {
  e.preventDefault();
  Params.gsrsearch = `${searchInput.value}`;
  getData(Params);
});
