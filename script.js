import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvldu7im0L1uFgoqLsh8fnjq3Nav-h9W0",
  authDomain: "talkbox-df849.firebaseapp.com",
  projectId: "talkbox-df849",
  storageBucket: "talkbox-df849.appspot.com",
  messagingSenderId: "91629050667",
  appId: "1:91629050667:web:c70fe77d1d48a23a06036e",
  measurementId: "G-Y0P5TPY7X6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

var submitButton = document.getElementById('notifyme');
var hasSubmitted = false;
submitButton.addEventListener('click', sendInfo);

// Check if email is valid
function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
};

// dirty nasty uuid generation
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function sendInfo() {
  const email = document.getElementById("Email").value
    if (!validateEmail(email)) {
        document.getElementById("valid").textContent = "Please insert a valid email address.";
    } else { 
      if (!hasSubmitted) {
        // submit info to database
        document.getElementById("valid").textContent = "";
        const name = document.getElementById("Name").value;
        sendMessage(name, email);

        // update page to thank you screen
        document.getElementsByTagName("h1")[0].innerHTML = "Thank You For Joining The Waitlist!";
        document.getElementsByTagName("h2")[0].innerHTML = "You'll hear from us soon.";
        document.getElementById("input").remove();
        hasSubmitted = true;
      }
    }
}

// Send Message to Firebase
function sendMessage(name, email) {
  const database = getDatabase();

  set(ref(database, 'waitlisters/' + uuidv4()), {
    name: name,
    email: email,
  }).then(() => {
  }).catch((error) => {
    alert(error)
  })

}
