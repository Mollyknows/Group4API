async function logout() {
  fetch("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then(window.location.reload());
}
