`use strict`;
function refreshTime() {
  const timeDisplay = document.getElementById("time");
  const dateString = new Date().toLocaleString([], {hour: '2-digit', minute:'2-digit',  second:'2-digit', hour12: false});
  const formattedString = dateString.replace(", ", "  ");
  timeDisplay.textContent = formattedString;
}
  setInterval(refreshTime, 1000);
