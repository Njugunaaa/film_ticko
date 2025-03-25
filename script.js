document.addEventListener("DOMContentLoaded", () => {
  const moviesContainer = document.querySelector("#movies")
  const movieDetailsContainer = document.querySelector("#movie-details")
  const homeScreen = document.querySelector("#home-screen")
  const moviePoster = document.querySelector("#movie-poster")
  const movieTitle = document.querySelector("#movie-title")
  const movieDescription = document.querySelector("#movie-description")
  const showtime = document.querySelector("#showtime")
  const seatsLeft = document.querySelector("#seats-left")
  const closeButton = document.querySelector("#close-button")

  fetch("http://localhost:3000/films")
    .then(res => res.json())
    .then(data => {
      data.forEach(movie => {
        let movieItem = document.createElement("li")
        movieItem.classList.add("movie-item")
        movieItem.innerHTML=`
        <p>${movie.title}</p>
        <button class="deleteBtn" data-id=${movie.id}>🗑️</button>
        `
        movieItem.addEventListener("click", () => {
          homeScreen.style.display = "none"
          movieDetailsContainer.style.display = "flex"
          moviePoster.src = movie.poster
          moviePoster.alt = movie.title
          movieTitle.textContent = movie.title
          movieDescription.textContent = movie.description
          showtime.textContent = movie.showtime
          seatsLeft.textContent = movie.capacity - movie.tickets_sold

          let buyTicketButton = document.querySelector("#buy-ticket-button")
          buyTicketButton.textContent="Buy Tickett"
          buyTicketButton.setAttribute('data-id', movie.id)

          buyTicketButton.addEventListener("click", () => {
            let seats = seatsLeft.textContent
            let filmId=buyTicketButton.getAttribute("data-id")
            seats = seats - 1
            seatsLeft.textContent = seats
            if(seats === 0){
              buyTicketButton.textContent="Tickets Sold Out"
              buyTicketButton.disabled=true
            }
            

            fetch(`http://localhost:3000/films/${filmId}`,{
              method:"PATCH",
              headers:{
                "Accept":'application/json',
                "Content-Type":'application/json'
              },
              body:JSON.stringify({seatsLeft:seats})
            }).then(res=>res.json())
            .then(data=>{
              console.log(data);
              seatsLeft.textContent=data.seatsLeft
            }).catch(err=>console.log(err))
          })
        })

        let deleteBtn=movieItem.querySelector(".deleteBtn")
        deleteBtn.addEventListener("click",()=>{
          let filmId=deleteBtn.getAttribute("data-id")
          fetch (`http://localhost:3000/films/${filmId}`,{
            method:"DELETE"
          })
          .then(res=>res.json()).then(()=>{
            movieItem.remove()
          }).catch(err=>{console.log(err)})
        })
        moviesContainer.appendChild(movieItem)
      })
    })

  closeButton.addEventListener("click", () => {
    movieDetailsContainer.style.display = "none"
    homeScreen.style.display = "flex"
  })
})
