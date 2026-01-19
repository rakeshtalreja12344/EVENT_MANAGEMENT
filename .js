document.addEventListener("DOMContentLoaded", function() {

    /* =====================
       EVENT SEARCH / FILTER
    ===================== */
    const eventsContainer = document.querySelector("#events .container");
    const eventCards = document.querySelectorAll(".event-card");

    const searchInput = document.createElement("input");
    searchInput.placeholder = "Search events...";
    searchInput.style.width = "100%";
    searchInput.style.padding = "10px";
    searchInput.style.marginBottom = "20px";
    eventsContainer.insertBefore(searchInput, eventsContainer.children[1]);

    searchInput.addEventListener("keyup", function() {
        const value = searchInput.value.toLowerCase();
        eventCards.forEach(card => {
            card.style.display = card.innerText.toLowerCase().includes(value) ? "flex" : "none";
        });
    });

    /* =====================
       EVENT DETAILS MODAL
    ===================== */
    let selectedEvent = "";
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span id="closeModal">&times;</span>
            <h3 id="modalTitle"></h3>
            <p id="modalDate"></p>
            <p id="modalLocation"></p>
            <p id="modalDesc"></p>
            <button id="registerBtn">Register for this Event</button>
        </div>
    `;
    document.body.appendChild(modal);

    const modalTitle = modal.querySelector("#modalTitle");
    const modalDate = modal.querySelector("#modalDate");
    const modalLocation = modal.querySelector("#modalLocation");
    const modalDesc = modal.querySelector("#modalDesc");
    const closeModal = modal.querySelector("#closeModal");
    const registerBtn = modal.querySelector("#registerBtn");

    eventCards.forEach(card => {
        card.addEventListener("click", () => {
            selectedEvent = card.querySelector("h4").innerText;
            const info = card.querySelectorAll("p");
            modalTitle.innerText = selectedEvent;
            modalDate.innerText = info[0].innerText;
            modalLocation.innerText = info[1].innerText;
            modalDesc.innerText = info[2].innerText;
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"; // prevent background scroll
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    modal.addEventListener("click", (e) => {
        if(e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    /* =====================
       REGISTRATION FORM
    ===================== */
    const regForm = document.getElementById("regForm");
    const selectedEventText = document.getElementById("selectedEventText");

    registerBtn.addEventListener("click", function() {
        selectedEventText.innerText = "Registering for: " + selectedEvent;
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    regForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();

        if(name === "" || email === "" || selectedEventText.innerText === "") {
            alert("Please fill all fields and select an event");
        } else {
            alert("Registration successful for " + selectedEventText.innerText);
            this.reset();
            selectedEventText.innerText = "";
        }
    });
});