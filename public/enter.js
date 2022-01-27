// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getFirestore, collection, addDoc, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";
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


const error = document.querySelector('.error')

let playerName = localStorage.getItem('username')
if (playerName === null) {
    const playerForm = document.querySelector('form')
    playerForm.addEventListener('submit', e => {
        e.preventDefault()
        playerName = playerForm.username.value;
        console.log('entered', playerName)
        const docRef = doc(db, 'players', playerName)
        getDoc(docRef)
            .then(docSnap => {
                // console.log(docSnap.exists())
                if (docSnap.exists()) {
                    error.style.display = 'block'
                } else {
                    localStorage.setItem('username', playerName)
                    location.assign('game/')
                }
            })
            // if (docRef.exists) {
            //     error.style.display = 'block'
            // } else {
            //     localStorage.setItem('username', playerName)
            //     location.assign('game/')
            // }
    })
} else {
    location.assign('game/')
}