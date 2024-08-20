<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/anagarcia3174/movie-app">
    <img src="./client/public/favicon.ico" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Comments!</h3>

  <p align="center">
    Comments! is a movie companion app that lets users post and view comments on movies at specific time-stamps.
    <br />
    <a href="https://github.com/anagarcia3174/movie-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://movie-app-client-seven.vercel.app/">Live Demo</a>
    ·
    <a href="https://github.com/anagarcia3174/movie-app/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/anagarcia3174/movie-app/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href=#key-features>Key Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a><ul>
        <li><a href=#prerequisites>Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#environment-variables">Environment Variables</a></li>
      </ul></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#screenshots">Screenshots</a></li>
    <!-- <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Comments! is a movie companion app that enhances the user viewing experience by allowing user to engage with movies in a whole new way. This web app provides users with the ability to share their thoughts and insights on specific moments throughout a movie.

### Key Features
* Timestamp-specific commenting: Users can post comments at specific moments in a movie, allowing for discussion on specific scenes, dialogues, etc.
* Collaborative viewing experience: Even if watching alone, users can connect with those who've watched that movie by reading their comments.
* Vast movie database: Integration with the TMDB api allows for a vast selection of films the user can comment on.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Node.js][Node.js]][Node-url]
* [![Express.js][Express.js]][Express-url]
* [![Firebase Authentication][Firebase]][Firebase-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![TMDB API][TMDB]][TMDB-url]



<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Getting Started

### Prerequisites
  - Set up FIREBASE project
  - Get free TMDB API Key
  - Set up MONGODB project

### Installation
To get a local copy up and running follow these simple example steps.

1. Clone the repo
   ```
   git clone https://github.com/anagarcia3174/movie-app.git
   ```

2. Install NPM packages for both client and server
   ```
   cd movie-app/client
   npm install
   cd ../server
   npm install
   ```
3. Set up environment variables (see <a href="#environment-variables">Environment Variables</a> section)
4. Modify the server code for local development:
  - Open server/index.js
  - Comment out the Vercel-Specific CORS configuration
    ```
      // Comment out or remove this block
    
        app.use(cors({
          origin: `${process.env.VERCEL_CLIENT_URL}`,
          methods: ["POST", "GET", "DELETE"],
          credentials: true
        }));
      

      // Add this line for local development

        app.use(cors());
    ```
  - Add listener at the end of the file
    ```
    // Add this at the end of the file

      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    ```
5. Start the server
   ```
   cd server
   node index.js
   ```
6. In a new terminal, start the client
   ```
   cd client
   npm start
   ```
   The app should now be running on localhost:3000 and the server on localhost:3030.

### Environment Variables
  To run this project, you will need to add the following environment variables to your .env files:

  #### Client (.env file in client folder)
  ```
  REACT_APP_FIREBASE_API_KEY=YourFirebaseApiKey
  REACT_APP_FIREBASE_AUTH_DOMAIN=YourFirebaseAuthDomain
  REACT_APP_FIREBASE_PROJECT_ID=YourFirebaseProjectId
  REACT_APP_FIREBASE_STORAGE_BUCKET=YourFirebaseStorageBucket
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YourFirebaseMessagingSenderID
  REACT_APP_FIREBASE_APP_ID=YourFirebaseAppId
  REACT_APP_VERCEL_SERVER_URL=YourServerURL (ex: http://localhost:3030)
  ```
  #### Server (.env file in server folder)
  ```
  TMDB_API_KEY=YourApiKey
  MONGODB_ATLAS_URI=YourMongodbAtlasUri
  PORT=3030
  VERCEL_CLIENT_URL= (only needed for deployment)
  FIREBASE_SERVICE_ACCOUNT_KEY=YourFirebaseServiceAccountKey
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Deployment
This project is deployed using Vercel for both the client and server.

- Frontend: The React app is deployed directly from the `client` directory.
- Backend: The Express server is deployed as a Vercel Serverless Function from the `server` directory.

To deploy your own instance:

1. Fork this repository
2. Sign up for a Vercel account if you haven't already
3. Import your forked repo into Vercel
4. Set up your environment variables in Vercel's project settings
5. Deploy!

For more detailed instructions, refer to [Vercel's documentation](https://vercel.com/docs).


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [ ] Comments on series
- [ ] Replies
- [ ] Improve comment capabilites.
    - [ ] Like/Dislike
    - [ ] Edit


See [TODO.md](https://github.com/anagarcia3174/movie-app/blob/main/TODO.md) or the [open issues](https://github.com/anagarcia3174/movie-app/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Screenshots
Here are some screenshots showcasing the key features of Comments!:

### Home Screen
<img width="1470" alt="homescreen" src="https://github.com/user-attachments/assets/0cf27d64-904b-4414-9294-b6c0d1860d34">

### Login Modal
<img width="1470" alt="Login" src="https://github.com/user-attachments/assets/9d393a2c-e1a3-4cd7-9daf-ba0d146de753">

### Movie Screen
<img width="1470" alt="comment" src="https://github.com/user-attachments/assets/f77744c0-ee83-4526-983b-e7743465159a">

### User Profile
<img width="1470" alt="profile" src="https://github.com/user-attachments/assets/5d0c6032-bc67-4bd8-8bc7-309d15d50f02">


<!-- LICENSE
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTACT -->
## Contact

Ana Garcia - anagarcia3174@gmail.com

Project Link: [https://github.com/anagarcia3174/movie-app](https://github.com/anagarcia3174/movie-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/anagarcia3174/movie-app.svg?style=for-the-badge
[contributors-url]: https://github.com/anagarcia3174/movie-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/anagarcia3174/movie-app.svg?style=for-the-badge
[forks-url]: https://github.com/anagarcia3174/movie-app/network/members
[stars-shield]: https://img.shields.io/github/stars/anagarcia3174/movie-app.svg?style=for-the-badge
[stars-url]: https://github.com/anagarcia3174/movie-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/anagarcia3174/movie-app.svg?style=for-the-badge
[issues-url]: https://github.com/anagarcia3174/movie-app/issues
[license-shield]: https://img.shields.io/github/license/anagarcia3174/movie-app.svg?style=for-the-badge
[license-url]: https://github.com/anagarcia3174/movie-app/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: client/public/homescreen.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Firebase]: https://img.shields.io/badge/Firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/
[TMDB]: https://img.shields.io/badge/TMDB-0f3a92?style=for-the-badge&logo=tmdb&logoColor=white
[TMDB-url]: https://www.themoviedb.org/documentation/api
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
