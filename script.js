document.addEventListener("DOMContentLoaded", () => {
  const moviesContainer = document.querySelector("#movies");
  const movieDetailsContainer = document.querySelector("#my-movie-details");
  const moviePoster = document.querySelector("#movie-poster");
  const movieTitle = document.querySelector("#movie-title");
  const movieDetails = document.querySelector("#movie-details");
  const buyTicketButton = document.querySelector("#buy-ticket-button");

  let currentMovie = null;

  fetch("http://localhost:3000/films")
    .then(res => res.json())
    .then(data => {
      data.forEach(movie => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");
        movieItem.textContent = movie.title;

        movieItem.addEventListener("click", () => {
          currentMovie = movie;
          moviePoster.src = movie.poster;
          moviePoster.alt = movie.title;
          movieTitle.textContent = movie.title;
          movieDetails.innerHTML = `
              <p>${movie.description}</p>
              <p>Showtime: ${movie.showtime}</p>
              <p>Seats Left: <span id="modal-seats">${movie.capacity - movie.tickets_sold}</span></p>
          `;
        });

        moviesContainer.appendChild(movieItem);
      });
    });

  buyTicketButton.addEventListener("click", () => {
    if (currentMovie && currentMovie.capacity - currentMovie.tickets_sold > 0) {
      currentMovie.tickets_sold += 1;
      document.querySelector("#modal-seats").textContent = currentMovie.capacity - currentMovie.tickets_sold;
    }
  });
});
