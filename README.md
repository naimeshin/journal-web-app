# Project Title : Journal-Web-Application
A simple way to store your memories on the web. 

![naimesh-demo-app-gif](https://user-images.githubusercontent.com/15827348/46746751-b8e82500-cc7d-11e8-853a-b426037f9210.gif)

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation-Instructions](#installation-instructions)
- [Deployment](#deployment)
- [Biggest-issue-encounter](#biggest-issue-encounter)
- [What-i-learned](#what-i-learned)
- [Project-functionality](#project-functionality)
- [What-can-be-done-differently](#What-can-be-done-differently)

# Journal-web-application

- Demo : [https://relu-project.firebaseapp.com](https://relu-project.firebaseapp.com)

## Technology 


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* latest npm  - https://www.npmjs.com/get-npm <br>
* firebase.auth() — Authentication
* firebase.database() — Realtime Database
* Firebase Referece - https://firebase.google.com/docs/web/setup <br>


### Installation-Instructions 


Download this project or repo, then add the following things:  

1) Add firebase to your app :  

*   Create firebase account and add project configuration details in project @ journal-app/public/js/firebase.js 
>   https://firebase.google.com/docs/web/setup

```
  <script>
  // Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };
  firebase.initializeApp(config);
</script>
```


## Deployment

1. open terminal: Install the Firebase CLI

```
$ npm install -g firebase-tools

```
2. Access your Firebase projects

```
$ firebase login

```
3. Initialize your site

```
$ firebase init

```
4. Select a public root directory

```
$ public 

```
5. Deploy your site

```
$ firebase deploy

```
Your content will be deployed to your Firebase project's default Hosting site, 

```
your-firebase-project-id.firebaseapp.com.
```

## Biggest-issue-encounter 

* Designed project on small version; Few issues encounter with firebase configuration,database and authentication.
* Ongoing Issue: Incognito browsers creates bug for storeing data on firebase-database.

## What-i-learned 
* Design static website and deploy on firebase 
* firebase google auth 
* firebase database CRUD implementation

## Project-functionality 

* Authenticate Google User
* SignIn - SignOut users
* Create new journal
* Delete new and old journals
* Save new journal
* Update old journals
* Read all journals
* Cancel editing new or old journal

# What-can-be-done-differently

* Implement this project using Angular2/6 with Firebase which may be helpful for a component based apporach. 
* Responsive for small screen size (Screen size less than 800px)

## Author

* **Naimesh Narsinghani**

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.


