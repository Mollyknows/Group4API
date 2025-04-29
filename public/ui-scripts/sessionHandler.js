document.addEventListener("DOMContentLoaded", () => {
  console.log("hey");
  fetch("/api/auth/session")
    .then((response) => response.json())
    .then((data) => {
      const notLoggedInElements = document.querySelectorAll(".loggedout");
      const loggedInElements = document.querySelectorAll(".loggedin");
      //contains all instances where username should be filled in with session data
      const usernameSpaces = document.querySelectorAll(".username");

      if (data.isLoggedIn) {
        console.log(usernameSpaces);
        loggedInElements.forEach((item) => (item.style.display = "block"));
        notLoggedInElements.forEach((item) => (item.style.display = "none"));
        usernameSpaces.forEach(
          (item) => (item.textContent = data.user.username)
        );
      } else {
        loggedInElements.forEach((item) => (item.style.display = "none"));
        notLoggedInElements.forEach((item) => (item.style.display = "block"));
        usernameSpaces.forEach((item) => (item.textContent = ""));
      }
    });
});
