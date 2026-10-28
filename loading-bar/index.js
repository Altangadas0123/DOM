const number = document.getElementById("number")
const text = document.getElementById("text")
const loading = document.getElementById("loading")

 
let timestamp = null;
const LOADING_DURATION_MS = 5000;
const messages = ["Preparing your space", "Bringing everything together", "Adding the finishing touches", "All set. Welcome in!"];

const renderProcess = () => {};

const updateProcess = (timestamp) => {
  console.log(timestamp);



  // requestAnimationFrame(updateProcess);
}

requestAnimationFrame(updateProcess);