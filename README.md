<h1>Social Media Site</h1>

    <h2>Description</h2>
    <p>I've made the backend for this website</p>

    <h2>Table of Contents</h2>
    <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#routes">Routes</a></li>
        <li><a href="#middleware">Middleware</a></li>
        <li><a href="#models">Models</a></li>
    </ul>

    <h2 id="installation">Installation</h2>
    <ol>
        <li>Clone the repository: https://github.com/Kashishkashyap/socialMediaBackend.git</li>
        <li>Install dependencies:</li>
        <code>npm install</code>
    </ol>

    <h2 id="usage">Usage</h2>
    <ol>
        <li>Start the server:</li>
        <code>npm start</code>
        <li>Access the application in your web browser at <code>http://localhost:port</code> where <code>port</code>
            is the port number specified in your server configuration.</li>
    </ol>

    <h2 id="routes">Backend Routes</h2>
    <p>List of routes and their descriptions go here.</p>
    <ul>
        <li><code>POST v1/api/users/auth/signup Description: Register a new user</li>
        <li><code>POST v1/api/users/auth/signin Description: Login user</li>
        <li><code>GET /v1/api/users/:id Description: Get user profile by ID</li>
        <li><code>PUT /v1/api/users/edit/:id Description: Update user profile by ID</li>
        <li><code>DELETE /v1/api/users/:id Description: Delete user profile by ID</li>
        <li><code>POST /v1/api/posts/create Description: Create a new post</li>
        <li><code>GET /v1/api/posts/:id Description: Get post by ID</li>
        <li><code>PUT /v1/api/posts/:id Description: Update post by ID</li>
        <li><code>DELETE /v1/api/posts/:id Description: Delete post by ID</li>
    </ul>
    <h2>Frontend Endpoints</h2>
        <h2>Authentication Routes</h2>
  <ul>
    <li><code>/login</code>: Allows users to log in to their accounts.</li>
    <li><code>/register</code>: Allows users to create new accounts.</li>
  </ul>

  <h2>User Profile Routes</h2>
  <ul>
    <li><code>/view</code>: Displays the user profile information.</li>
    <li><code>/view/update</code>: Allows users to update their profile information.</li>
    <li><code>/view/delete</code>: Allows users to delete their profile.</li>
  </ul>

  <h2>Post Management Routes</h2>
  <ul>
    <li><code>/post/create</code>: Allows users to create new posts.</li>
    <li><code>/post/view/:id</code>: Displays detailed information about a specific post.</li>
    <li><code>/post/update/:id</code>: Allows users to update their posts.</li>
    <li><code>/post/delete/:id</code>: Allows users to delete their posts.</li>
  </ul>
    
    <h2 id="middleware">Middleware</h2>
    <p>List of middleware and their descriptions go here.</p>
    <ul>
        <li><code>auth.js</code>: Description: To check if the user is authorized to do the action or not.</li>
    </ul>

    <h2 id="models">Models</h2>
    <p>List of models and their descriptions go here.</p>
    <ul>
        <li><code>User schema</code></li>
        <li><code>Post schema</code></li>
        <li><code>Follow schema</code></li>
    </ul>
