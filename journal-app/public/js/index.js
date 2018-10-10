var JournalData = (function() {
  var ordered = [];
  var unordered;
  return {
    ORDERED: ordered,
    append: function(post) {
      ordered.push(post);
    },
    update: function(set) {
      Object.keys(set).forEach(function(id) {
        var journal = {};
        journal.data = set[id];
        journal.id = id;
        ordered.push(journal);
      });
      // ordered.sort(function(journ));
    },
    num: ordered.length,
    getID: function(index) {
      return ordered[index].id;
    },
    current: undefined,
  };
}());

// functions
var JournalListItem = (function() {
  var listItem = document.createElement("li");
  var listGroupItem = document.createElement("a");
  var pullLeft = document.createElement("div");
  var journalTitle = document.createElement("h4");
  var journalData = document.createElement("p");

  listItem.classList.add("list-item");
  listGroupItem.classList.add("list-group-item");
  listGroupItem.classList.add("clearfix");
  pullLeft.classList.add("pull-left");
  journalTitle.classList.add("journal-title");
  journalTitle.classList.add("list-group-item-heading");
  journalData.classList.add("journal-data");
  journalData.classList.add("list-group-item-text");

  pullLeft.append(journalTitle);
  pullLeft.append(journalData);
  listGroupItem.append(pullLeft);
  listItem.append(listGroupItem);

  function update(post, data) {
    var title = data.title;
    var text = data.text.substr(0,20);

    post.querySelector('.journal-title').textContent = title;
    post.querySelector('.journal-data').textContent = text;
  }
  return {
    create: function(data) {
      var post = listItem.cloneNode(true);
      update(post, data);
      document.getElementById('ul-list').appendChild(post);
      return post;
    },
    update: update,
  };
}());

function updatePostContainer(title, text) {
  var title_div = document.querySelector('input.app-detail-box-title');
  var textarea = document.querySelector('textarea.textarea');
  title_div.value = title;
  textarea.value = text;
}

function selectPost(entry) {
  if (!entry) return;
  if (JournalData.current && !JournalData.current.id) {
    JournalData.current.post.remove();
  }
  document.querySelector('.app-detail-box').classList.add('active');
  JournalData.current = entry;
  JournalData.ORDERED.forEach(function(journal){
    journal.post.classList.remove('active');
  });
  entry.post.classList.add('active');
  updatePostContainer(entry.data.title, entry.data.text);
  JournalListItem.update(entry.post, entry.data);
}

function addJournal() {
  if (JournalData.current && !JournalData.current.id) {
    JournalData.current.post.remove();
    JournalData.current = null;
    document.querySelector('.app-detail-box').classList.remove('active');
    return;
  }
  var newJournal = {};
  newJournal.data = {
    title: "Title",
    text: "Add text here",
    created: new Date(),
  };
  newJournal.post =  JournalListItem.create(newJournal.data);
  updatePostContainer(newJournal.data.title, newJournal.data.text);
  JournalData.ORDERED.forEach(function(journal){
    journal.post && journal.post.classList.remove('active');
  });
  newJournal.post.classList.add('active');
  JournalData.current = newJournal;
  document.querySelector('.app-detail-box').classList.add('active');
}


function saveJournal() {
  var title = document.querySelector('input.app-detail-box-title');
  var textarea = document.querySelector('textarea.textarea');
  var currentPost = JournalData.current;
  currentPost.data = {
    title: title.value,
    text: textarea.value,
    created: new Date().toISOString(),
  };
  var postID = currentPost.id;
  if (!postID) {
    currentPost.id = postID = firebase.database().ref('recipes/' + firebase.auth().currentUser.uid).push().key;
    var index = JournalData.ORDERED.length;
    JournalData.append(currentPost);
    currentPost.post.addEventListener('click', function() {
      selectPost(currentPost);
    });
  }

  JournalListItem.update(currentPost.post, currentPost.data);
  firebase.database().ref('recipes/' + firebase.auth().currentUser.uid + '/' + postID).update(currentPost.data);
}

function deleteJournal() {
  var postID = JournalData.current.id;
  firebase.database().ref('recipes/' + firebase.auth().currentUser.uid + '/' + postID).remove();
  JournalData.current.post.remove();
  var index = JournalData.ORDERED.indexOf(JournalData.current);
  JournalData.ORDERED.splice(index, 1);
  selectPost(JournalData.ORDERED[0]);
  if (!JournalData.ORDERED.length) {
    document.querySelector('.app-detail-box').classList.remove('active');
  }
}

function init() {
  Firebase.addHandler(function(currentUser){
    if (currentUser) {
      firebase.database().ref('recipes/' + currentUser.uid).once('value', function(snapshot) {
        JournalData.update(snapshot.val() || {});
        if (JournalData.ORDERED.length) {
          document.querySelector('.app-detail-box').classList.add('active');
        }
        JournalData.ORDERED.forEach(function(journal, index) {
          journal.post = JournalListItem.create(journal.data);
          journal.post.addEventListener('click', function() {
            selectPost(journal);
          });
        });
        var current = JournalData.current = JournalData.ORDERED[0];
        if (current) {
          current.post.classList.add('active');
          updatePostContainer(current.data.title, current.data.text);
        }
      });

    }
  })
  document.getElementById('new-journal').addEventListener('click', addJournal);
  document.getElementById('save-journal').addEventListener('click', saveJournal);
  document.getElementById('delete-journal').addEventListener('click', deleteJournal);
}

document.addEventListener('DOMContentLoaded', init);
