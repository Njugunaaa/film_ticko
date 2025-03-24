document.addEventListener("DOMContentLoaded", () => {
  const moviesContainer = document.querySelector("#movies");
  const movieDetailsContainer = document.querySelector("#movie-details");
  const homeScreen = document.querySelector("#home-screen");
  const moviePoster = document.querySelector("#movie-poster");
  const movieTitle = document.querySelector("#movie-title");
  const movieDescription = document.querySelector("#movie-description");
  const showtime = document.querySelector("#showtime");
  const seatsLeft = document.querySelector("#seats-left");
  const buyTicketButton = document.querySelector("#buy-ticket-button");
  const closeButton = document.querySelector("#close-button");

  fetch("http://localhost:3000/films")
    .then(res => res.json())
    .then(data => {
      data.forEach(movie => {
        const movieItem = document.createElement("li");
        movieItem.classList.add("movie-item");
        movieItem.textContent = movie.title;

        movieItem.addEventListener("click", () => {
          homeScreen.style.display = "none";
          movieDetailsContainer.style.display = "flex";
          moviePoster.src = movie.poster;
          moviePoster.alt = movie.title;
          movieTitle.textContent = movie.title;
          movieDescription.textContent = movie.description;
          showtime.textContent = movie.showtime;
          seatsLeft.textContent = movie.capacity - movie.tickets_sold;
        });

        moviesContainer.appendChild(movieItem);
      });
    });

  buyTicketButton.addEventListener("click", () => {
    let seats = parseInt(seatsLeft.textContent);
    if (seats > 0) {
      seatsLeft.textContent = seats - 1;
    } else {
      alert("Tickets are sold out.");
    }
  });

  closeButton.addEventListener("click", () => {
    movieDetailsContainer.style.display = "none";
    homeScreen.style.display = "flex";
  });
});
