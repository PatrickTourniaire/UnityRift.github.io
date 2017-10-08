// Initialize Firebase
var config = {
   apiKey: "###",
   authDomain: "###",
   databaseURL: "###",
   projectId: "###",
   storageBucket: "",
   messagingSenderId: "###"
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

projectRef.on('child_added', function(data) {
    var data = {
        title: data.val().title,
        date: data.val().date,
        key: data.key
    }
    
    newProject(data.key, data);
    
});

projectRef.on('child_changed', function(data) {
    changeProject();
});

projectRef.on('child_removed', function(data) {
    removeProject(data.key);
});

    
function newProject(key, data) {
    var template = $("#card-tenplate").html();
    var card = Mustache.render(template, data);
    
    $(".content-grid").append(card);
}

function removeProject(key) {
    $("." + key).remove();
}
