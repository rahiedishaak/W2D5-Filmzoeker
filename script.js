// Select all radio buttons
const filterRadioButtons = document.querySelectorAll('.filters');
const videosContainer = document.querySelector('#videos');

// Get all videos
const getAllVideos = () => JSON.parse(videosJSON).Movies;
let videos = getAllVideos();

// Remove duplicate videos from the videos array
const removeDuplicateVideos = array => array.reduce((unique, arrayItem) => {
    if (!unique.some(uniqueItem => uniqueItem.imdbID === arrayItem.imdbID)) unique.push(arrayItem);
    return unique;
}, []);

videos = removeDuplicateVideos(videos);

// Filter video data to get all movies from 2014 and later
const getNewestMovies = array => {
    return array.filter(item => {
        if (item.Type === 'movie') return parseInt(item.Year) >= 2014;
    });
};

// Filter video data to get all movies with a given title
const getFilteredMovies = (array, value) => array.filter(item => item.Title.includes(value) && item.Type === 'movie');

// Render videos to DOM
const renderToDOM = array => {
    videosContainer.innerHTML = '';
    array.forEach(item => {
        const title = item.Title;
        const poster = item.Poster;
        const url = `https://www.imdb.com/title/${item.imdbID}`;
        
        const liElement = document.createElement('li');

        const pElement = document.createElement('p');
        pElement.textContent = title;
        
        const aElement = document.createElement('a');
        aElement.setAttribute('href', url);
        aElement.setAttribute('target', '_blank');
        
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', poster);
        imgElement.setAttribute('alt', title);

        aElement.appendChild(imgElement);
        liElement.appendChild(aElement);
        liElement.appendChild(pElement);
        videosContainer.appendChild(liElement);
    });
};

renderToDOM(videos);

// Event Listener for each radio button
filterRadioButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        let filteredMovies;
        if (event.target.value === 'all') filteredMovies = videos
        else if (event.target.value === 'newest') filteredMovies = getNewestMovies(videos);
        else if (event.target.value === 'xmen') filteredMovies = getFilteredMovies(videos, 'X-Men');
        else if (event.target.value === 'avengers') filteredMovies = getFilteredMovies(videos, 'Avengers');
        else if (event.target.value === 'princess') filteredMovies = getFilteredMovies(videos, 'Princess');
        else if (event.target.value === 'batman') filteredMovies = getFilteredMovies(videos, 'Batman');
        renderToDOM(filteredMovies);
    });
});