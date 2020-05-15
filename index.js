const movieArray = movies.Movies;
const movieContainer = document.getElementById("movie-container");

// function to show movies based on chosen filter
const fillMovies = (array) => {
    movieContainer.innerHTML = "";
    array.forEach((movie) => {
        const newElement = document.createElement("div");
        const posterImage = movie.Poster;
        const link = "https://www.imdb.com/title/" + movie.imdbID + "/";
        newElement.classList.add("poster-container");
        newElement.innerHTML = `<a href=` + link + ` target="_blank"><img class="poster" src=` + posterImage + ` alt="` + movie.Title + `"/></a>`;
        movieContainer.appendChild(newElement);    
    });
};

// First time: Fill the movies with the whole movie array when dom is loaded
fillMovies(movieArray);

// Get the whole filtercontainer and the filterbuttons within that container
const filterContainer = document.getElementById("filter-container");
const filterbuttons = Array.from(filterContainer.getElementsByTagName("input"));

// Function to apply the chosen filter, and call the fillMovies function to show the correct movies
const applyFilter = (filter) =>{
    if (filter == "all") {
        fillMovies(movieArray);
    } else if (filter == "latest") {                       
        const latestMovieArray = movieArray.filter((movie) => {
            const publishedYear = parseInt(movie.Year);
            return publishedYear >= 2014;
        })
        fillMovies(latestMovieArray);
    } else {
        let filteredMovies = [];        
        movieArray.forEach((movie) => {
            const movieTitle = (movie.Title).toLowerCase();
            const included = movieTitle.includes(filter);
            if (included == true) {
                filteredMovies.push(movie);                
            }
        });
        fillMovies(filteredMovies);      
    }
}

// EVENT listener for every filterbutton
filterbuttons.forEach((button) => {
    const filtername = (button.value).toLowerCase();
    button.addEventListener('click', () => {
        applyFilter(filtername);
    });
});

// Event listener for the text on the filterbutton as well (besides the radio buttons)
const filtertextbuttons = Array.from(filterContainer.getElementsByClassName("filter-button"));

filtertextbuttons.forEach((button) => {
    const filtername = (button.innerText).toLowerCase();
    
    button.addEventListener('click', () => {
        applyFilter(filtername);
        button.getElementsByTagName('input')[0].checked = true;
    });
})

// Toggle class to show/hide the search input field
const searchInput = document.getElementById('search-input');
const searchField = document.getElementById('search-field');
const toggleSearchInput = () => {
    searchField.classList.toggle("search-field-show");
    searchInput.focus();
};

const searchIcon = document.getElementById('search-icon');
searchIcon.addEventListener('click', toggleSearchInput);

// Search through the input textfield 
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
    const query = (searchInput.value).toLowerCase();
    applyFilter(query);
});

// If enter is pressed, simulate the click event
searchInput.addEventListener('keyup', (event) => {
    if (event.key == "Enter") {
        searchButton.click();
    }
})

// Fill the footer with name and current year
const fillFooter = () => {
    const footer = document.getElementsByTagName('footer')[0];
    const year = new Date().getFullYear();
    const footertext = document.createElement("p");
    footertext.innerHTML = "&copy; Natalie Castien " + year;
    footer.appendChild(footertext);
};
fillFooter();

