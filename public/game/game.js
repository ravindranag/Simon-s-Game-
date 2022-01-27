const player = localStorage.getItem('username')
console.log(player)

if (player === null) {
    location.assign('../')
}


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

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const main = document.querySelector('.main')
const leaderboard = document.querySelectorAll('.leaderboard')

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

let playerData = {}
let doesNotExists = true

getDoc(doc(db, 'players', player))
    .then(docSnap => {
        if (docSnap.exists()) {
            playerData = docSnap.data()
            doesNotExists = false
        } else {
            doesNotExists = true
        }
    })



modal.addEventListener('click', () => {
    overlay.style.display = 'none';
    main.style.filter = 'none'
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})


// $(document).keypress(function() {
//     if (!started) {
//         $("#level-title").text("Level " + level);
//         nextSequence();
//         started = true;
//     }
// });

// console.log(leaderboard)
leaderboard.forEach(btn => {
    btn.addEventListener('click', () => {
        startOver()
        location.assign('../leaderboard')
    })
})


// leaderboard.addEventListener('click', () => {
//     location.assign('../leaderboard')
// })

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {


        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {
        if (doesNotExists || playerData.score < level) {
            setDoc(doc(db, 'players', player), {
                username: player,
                score: level
            }, {
                merge: true
            })
        }


        // addDoc(collection(db, "players", 'rv'), {
        //     username: 'Ravindra',
        //     score: level
        // }).then(docRef => {
        //     console.log("Document written with ID: ", docRef.id);
        // }).catch(err => {
        //     console.log(err)
        // })

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over");
        startOver();
        overlay.style.display = 'flex'
    }

}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}