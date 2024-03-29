const uoscEvents = document.querySelector("#uoscEvents");
const eventDropDown = document.querySelector("#event");

function getCoordinators(coordinators) {
  return coordinators
    .map(
      (coordinator) =>
        `
        <li class="mb-2">
          <span>
            <strong >${coordinator.name}</strong>:

            <a href="tel:${coordinator.phone}" class="text-dark" >
            <img src="https://ureckon-21.herokuapp.com/assets/events/phone.svg" style="height: 2rem;width: 1.6rem;margin:auto auto auto 0.6rem" alt="tel"/>
            </a>
            
            <a href="mailto:${coordinator.email}" class="text-dark">
            <img src="https://ureckon-21.herokuapp.com/assets/events/email.svg" style="height: 2rem;width: 2rem;margin:auto auto auto 1.6rem" alt="email"/>
            </a>
            <br/> 
            </span>
        </li>
        `
    )
    .join("");
}

function getContent(events) {
  return events
    .map(
      (event) => `
        <div>
          <div class="box">
            <div class="image fit">
              <img src="${event.icon}" height="313" alt="" />
            </div>
            <div class="content">
              <header class="align-center">
                <h2>${event.eventName}</h2>
              </header>
              <p class="event-writeup">
                ${event.description} <br /><br/>
                <strong style="color:gray">Have more questions? Please contact:</strong> <br />
              </p>
              <ul class="text-dark">
                ${getCoordinators(event.coordinators)}
              </ul>
              <footer class="align-center mt-4">
                <a
                  target="_blank"
                  href="${event.problemStatement}"
                  class="btn ps-btn btn-lg btn-info"
                  style="color: #fff ;font-family: 'Gotham-Bold';font-size: medium;"
                  download
                  >Problem Statement</a
                >
                <a
                  href="#three"
                  class="btn btn-lg btn-success register-btn"
                  style="color: #fff ;font-family: 'Gotham-Bold'; font-size: medium;"
                  >Register</a
                >
              </footer>
            </div>
          </div>
        </div>
      `
    )
    .join("");
}

function populateDropdown(events) {
  return events
    .map(
      (event) =>
        `
        <option 
          value="${event._id}"
          data-min="${event.minParticipants}"
          data-max="${event.maxParticipants}"
        >
          ${event.eventName} &#40;${event.minParticipants} - ${event.maxParticipants} Members&#41;
        </option>
        `
    )
    .join("");
}

fetch(`${baseURL}/events/uoscEvents`, {
  method: "GET",
  mode: "cors",
  cache: "no-cache",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
})
  .then((response) => response.json())
  .then((res) => {
    uoscEvents.innerHTML = getContent(res);
    eventDropDown.innerHTML += populateDropdown(res);
  })
  .catch((err) => console.log(err));
