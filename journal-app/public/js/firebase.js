var Firebase = (function() {
  var projectConfig = {
    apiKey: "<--------API-KEY----------->",
    authDomain: "<auth-Domain>",
    databaseURL: "https://<db-url>.firebaseio.com",
    projectId: "<project-id>",
    storageBucket: "<project-bucket>.appspot.com",
    messagingSenderId: "--"
  };
  firebase.initializeApp(projectConfig);
  return {
    addHandler: function(handler) {
      this.handlers.push(handler);
    },
    handlers: [],
  }
}());

var error = (function() {
  var alert = document.createElement('div');
  alert.classList.add("alert");
  alert.classList.add("alert-warning");
  alert.classList.add("alert-dismissible");
  alert.classList.add("show");
  alert.setAttribute('role', 'alert');

  var close = document.createElement('button');
  close.classList.add("close");
  close.setAttribute('type', "button");
  close.setAttribute('data-dismiss', "alert");
  close.setAttribute('aria-label', "Close");

  var closeSpan = document.createElement('span');
  closeSpan.setAttribute('aria-hidden', "true");
  closeSpan.innerHTML = '&times;';

  close.appendChild(closeSpan);

  var title = document.createElement('strong');
  title.classList.add('title');
  var message = document.createElement('span');
  message.classList.add('message');

  alert.appendChild(close);
  alert.appendChild(title);
  alert.appendChild(message);

  return function (title, message) {
    var _ = alert.cloneNode(true);
    _.querySelector(".message").appendChild(document.createTextNode(message));
    _.querySelector(".title").appendChild(document.createTextNode(title));
    _.querySelector(".close").addEventListener('click', function(e) {
      _.classList.add("dismiss");
      setTimeout(function () {
        //_.remove();
      }, 500);
    });
    document.body.insertBefore(_, document.body.firstChild);
  };
}());

function handleError (error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
  if (errorCode === 'auth/account-exists-with-different-credential') {
    alert('You have already signed up with a different auth provider for that email.');
  } else {
    console.error(error);
  }
}

function toggleSignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    provider.setCustomParameters({
      prompt: "select_account"
    })
    firebase.auth().signInWithRedirect(provider);
  }
}
function edit(user_id) {
  var database = firebase.database();
  var journals = [];
  var entry1 = {
    title: "Entry 1",
    text: "There is some journal entry",
    created: new Date().toISOString(),
  };
  journals.push(entry1);
  firebase.database().ref('recipes/' + user_id).set(journals);
}

function handleAuthStateChange(user) {
  Firebase.handlers.forEach(function(handler){
    handler(user);
  });
}

function updateLogin(user) {
  var loginToggle = document.getElementById('login-toggle');
  if (user) {
    loginToggle.textContent = user.displayName.split(' ',1) + " : Logout";
    document.querySelector('.login-container').style.display = "";
    document.querySelector('.journal-container').style.display = "block";
  } else {
    loginToggle.textContent = "Login";
    document.querySelector('.login-container').style.display = "block";
    document.querySelector('.journal-container').style.display = "";
  }
}

function init() {
  firebase.auth().getRedirectResult()
    .catch(handleError);
  Firebase.addHandler(updateLogin);
  firebase.auth().onAuthStateChanged(handleAuthStateChange);
  var loginToggle = document.getElementById('login-toggle');
  loginToggle.addEventListener('click', toggleSignIn);
  document.getElementById('login-banner').addEventListener('click', toggleSignIn);
}
document.addEventListener('DOMContentLoaded', init);
