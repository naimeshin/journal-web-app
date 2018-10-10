# Project Title : Journal-Web-Application
A simple way to store your memories on the web. 


![projectdemo](https://user-images.githubusercontent.com/15827348/46714941-dee4d980-cc2b-11e8-964c-5a332b3cadfb.gif)


# Journal-web-application

- Demo : [https://relu-project.firebaseapp.com](https://relu-project.firebaseapp.com)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* latest npm  - https://www.npmjs.com/get-npm <br>
* firebase.auth() — Authentication
* firebase.database() — Realtime Database
* Firebase Referece - https://firebase.google.com/docs/web/setup <br>


### Installing


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

2. open terminal: Install the Firebase CLI

```
$ npm install -g firebase-tools

```
3. Access your Firebase projects

```
$ firebase login

```
4. Initialize your site

```
$ firebase init

```
5. Select a public root directory

```
$ public 

```
6. Deploy your site

```
$ firebase deploy

```
Your content will be deployed to your Firebase project's default Hosting site, 

```
your-firebase-project-id.firebaseapp.com.
```




## Deployment

Add additional notes about how to deploy this on a live system

## Built With

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
