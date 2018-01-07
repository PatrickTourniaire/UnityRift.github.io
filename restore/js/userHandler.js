
let faceBtn = $(".facebook");
let googleBtn = $(".google");

faceBtn.click(function() {
  loginUser(0)
});

googleBtn.click(function() {
  loginUser(1)
});

function loginUser(type) {

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function() {
      var google = new firebase.auth.GoogleAuthProvider();
      var facebook = new firebase.auth.FacebookAuthProvider();
      // In memory persistence will be applied to the signed in Google user
      // even though the persistence was set to 'none' and a page redirect
      // occurred.
      if (type == 0) {
        return firebase.auth().signInWithRedirect(facebook);
      } else {
        return firebase.auth().signInWithRedirect(google);
      }

    })
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(error.code, " ", error.message);
  });
}

function userDetails() {
  var user = firebase.auth().currentUser;

  if (user != null) {
    user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);

    });
  }

}
