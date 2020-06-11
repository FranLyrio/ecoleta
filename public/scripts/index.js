const buttonSearch = document.querySelector("#search");
const modal = document.querySelector("#modal");

buttonSearch.addEventListener("click", () => {
    modal.classList.toggle("hide")
});

console.log(buttonSearch);
console.log(modal);