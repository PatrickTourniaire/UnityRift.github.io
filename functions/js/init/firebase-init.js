// Initialize Firebase
var config = {
   apiKey: "AIzaSyC-pWvVWK74FSY1AgrzHjYqVGSUrA_jI7c",
   authDomain: "it-database-d0082.firebaseapp.com",
   databaseURL: "https://it-database-d0082.firebaseio.com",
   projectId: "it-database-d0082",
   storageBucket: "",
   messagingSenderId: "542378097247"
};

// Init firebase app
firebase.initializeApp(config);

// Firebase referances
var db = firebase.database();
var projectRef = db.ref().child("projects");
var writeProject = projectRef.push();

// Add new project to firebase
function addProject(title, date, description) {
    
    writeProject.set({
        title: title,
        date: date,
        description: description
    });
    
}

