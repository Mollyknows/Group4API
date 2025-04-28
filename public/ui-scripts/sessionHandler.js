const { response } = require("express");

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/auth/session")
    .then((response) => response.json())
    .then((data) => {
      const notLoggedInElements = document.querySelectorAll(".loggedOut");
      const loggedInElements = document.querySelector(".loggedin");
      const userDisplay = document.getElementById("userDisplay");
    });
});
