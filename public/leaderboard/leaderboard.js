// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getFirestore, collection, query, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdAMUakRnOFEbXYn_YcVJ-io5HX2eNu3k",
    authDomain: "simon-game-23814.firebaseapp.com",
    projectId: "simon-game-23814",
    storageBucket: "simon-game-23814.appspot.com",
    messagingSenderId: "883071527263",
    appId: "1:883071527263:web:12f5fb15ee39ac6936aeea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


const list = document.querySelector('.list')

const q = query(collection(db, 'players'), orderBy('score', 'desc'))

// console.log(q)
let position = 1
getDocs(q)
    .then(docs => {
        docs.forEach(doc => {
            const player = doc.data()
            list.innerHTML += `
            <div class="list-item">
                <p class="position">${position}</p>
                <p class="player-name">${player.username}</p>
                <p class="score">${player.score}</p>
            </div>
            `
            position++
        })
    })