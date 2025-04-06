function toggle() {
  if (
    document.getElementById("sidebar").style.width != "0rem" &&
    document.getElementById("sidebar").style.width != ""
  ) {
    closeSidebar();
    return;
  }
  openSidebar();
}

function openSidebar() {
  document.getElementById("sidebar").style.width = "12.5rem";
  document.getElementById("main").style.marginRight = "12.5rem";
}

function closeSidebar() {
  document.getElementById("sidebar").style.width = "0rem";
  document.getElementById("main").style.marginRight = "0rem";
}
