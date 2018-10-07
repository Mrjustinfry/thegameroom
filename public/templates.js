'use strict';

var MOCK_POST_DATA = {
    "mockPosts": [
        {
            "id": "12345",
            "title": "Coolest Game Ever!",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in ligula nec elit placerat luctus." +
                "Vivamus pellentesque bibendum iaculis.Suspendisse interdum neque nec nisl tincidunt, et efficitur elit laoreet." +
                "Quisque dapibus, mauris id aliquet finibus, nulla lacus sagittis turpis, eget convallis erat nisl eu velit.Nunc dictum libero leo," +
                "a semper massa venenatis commodo.Maecenas nunc felis, mollis eu hendrerit id, commodo id ipsum.Nam aliquet congue ipsum, in lobortis elit" +
                "mollis sit amet.Aenean sollicitudin accumsan felis, sed pellentesque elit euismod sed.Nulla arcu orci, pellentesque vel viverra id, vestibulum id leo." +
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "userName": "John Doe",
            "date": new Date().toLocaleString()
        },
        {
            "id": "23456",
            "title": "Worst Game Ever!",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in ligula nec elit placerat luctus." +
                "Vivamus pellentesque bibendum iaculis.Suspendisse interdum neque nec nisl tincidunt, et efficitur elit laoreet." +
                "Quisque dapibus, mauris id aliquet finibus, nulla lacus sagittis turpis, eget convallis erat nisl eu velit.Nunc dictum libero leo," +
                "a semper massa venenatis commodo.Maecenas nunc felis, mollis eu hendrerit id, commodo id ipsum.Nam aliquet congue ipsum, in lobortis elit" +
                "mollis sit amet.Aenean sollicitudin accumsan felis, sed pellentesque elit euismod sed.Nulla arcu orci, pellentesque vel viverra id, vestibulum id leo." +
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "userName": "Jane Doe",
            "date": new Date().toLocaleString()
        },
        {
            "id": "34567",
            "title": "Check it out!",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in ligula nec elit placerat luctus." +
                "Vivamus pellentesque bibendum iaculis.Suspendisse interdum neque nec nisl tincidunt, et efficitur elit laoreet." +
                "Quisque dapibus, mauris id aliquet finibus, nulla lacus sagittis turpis, eget convallis erat nisl eu velit.Nunc dictum libero leo," +
                "a semper massa venenatis commodo.Maecenas nunc felis, mollis eu hendrerit id, commodo id ipsum.Nam aliquet congue ipsum, in lobortis elit" +
                "mollis sit amet.Aenean sollicitudin accumsan felis, sed pellentesque elit euismod sed.Nulla arcu orci, pellentesque vel viverra id, vestibulum id leo." +
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "userName": "Jim Doe",
            "date": new Date().toLocaleString()
        },
        {
            "id": "45678",
            "title": "You've got to see this!",
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in ligula nec elit placerat luctus." +
                "Vivamus pellentesque bibendum iaculis.Suspendisse interdum neque nec nisl tincidunt, et efficitur elit laoreet." +
                "Quisque dapibus, mauris id aliquet finibus, nulla lacus sagittis turpis, eget convallis erat nisl eu velit.Nunc dictum libero leo," +
                "a semper massa venenatis commodo.Maecenas nunc felis, mollis eu hendrerit id, commodo id ipsum.Nam aliquet congue ipsum, in lobortis elit" +
                "mollis sit amet.Aenean sollicitudin accumsan felis, sed pellentesque elit euismod sed.Nulla arcu orci, pellentesque vel viverra id, vestibulum id leo." +
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "userName": "Mary Doe",
            "date": new Date().toLocaleString()
        }
    ]
};

var MOCK_USER_DATA = {
    "mockUsers": [
        {
            "firstName": "Justin",
            "lastName": "Fry",
            "userName": "justinfry",
            "passWord": "12345",
            "email" : "abc@def.ghi",
            "nintendo": "SW-1234-1234-1234",
            "playstation": "justinfry",
            "xbox": "justinfry",
            "platform": "Nintendo"
        },
        {
            "firstName": "George",
            "lastName": "Washington",
            "userName": "georgewashington",
            "passWord": "12345",
            "email": "abc@def.ghi",
            "nintendo": "SW-2345-2345-2345",
            "playstation": "george",
            "xbox": "washington",
            "platform": "Nintendo"
        },
        {
            "firstName": "Barrack",
            "lastName": "Obama",
            "userName": "bobama",
            "passWord": "12345",
            "email": "abc@def.ghi",
            "nintendo": "SW-3456-3456-3456",
            "playstation": "barbama",
            "xbox": "barrack",
            "platform": "Playstation"
        },
        {
            "firstName": "Ronald",
            "lastName": "Reagan",
            "userName": "rreagan",
            "passWord": "12345",
            "email": "abc@def.ghi",
            "nintendo": "SW-4567-4567-4567",
            "playstation": "Ronnie",
            "xbox": "StarFire",
            "platform": "Xbox"
        },
        {
            "firstName": "Richard",
            "lastName": "Nixon",
            "userName": "iamnotacrook",
            "passWord": "12345",
            "email": "abc@def.ghi",
            "nintendo": "SW-4321-4321-4321",
            "playstation": "Nix",
            "xbox": "DickNixon",
            "platform": "Nintendo"
        },
        {
            "firstName": "Abraham",
            "lastName": "Lincoln",
            "userName": "honestabe",
            "passWord": "12345",
            "email": "abc@def.ghi",
            "nintendo": "SW-0101-0202-3030",
            "playstation": "Alinc",
            "xbox": "FourScore",
            "platform": "Nintendo"
        }
    ]
};


function displayUsers(data) {
    for (let index in data.mockUsers) {
        $('main').append(`<div class="container userBox">` +
            `<h3 class="username">` + data.mockUsers[index].userName + `</h3>` +
            `<img src='profile.jpg' alt="profile picture" />` +
            `<p><span class="bold">Switch Friend Code: </span>` + data.mockUsers[index].switch + `</p>` +
            `<p><span class="bold">PS4 Gamertag: </span>` + data.mockUsers[index].playstation + `</p>` +
            `<p><span class="bold">Xbox Gamertag: </span>` + data.mockUsers[index].xbox + `</p>` +
            `</div>`);
    }
};

function displayPosts(data) {
    for (let index in data.mockPosts) {
        $('main').append('<div class="container postBox">' +
            '<h3 class="title">' + data.mockPosts[index].title + '</h3>' +
            '<p class="content">' + data.mockPosts[index].content + '</p>' +
            '<p class="author">' + data.mockPosts[index].userName + '</p>' +
            '<p class="date">' + data.mockPosts[index].date + '</p>' +
            '</div>');
    }
};

function gameSearchTemplate() {
    return ` <form for="gameSearch">
                        <label>Search for a game: <input type="text" /> </label>
                            <div class="gameInfo" >
                                <h4>${gameTitle}</h4>
                                <img src="gameImage" alt="game image" />
                                <p class="genre">Genre: <span class="genreInfo">${genre}</span></p>
                                <p class="platform">Platform: <span class="platformInfo">${platform}</span></p>
                                <p class="esrb">ESRB: <span class="esrbInfo">${esrb}</span></p>
                                <p class="rating">Rating: <span class="ratingInfo">${rating}</span></p>
                            </div>
                            <button type="submit" class="gameSearchBtn">Search</button>
                        </form>`;
}

function newPostTemplate(data) {
    $('main').html(`<div class="container newPostForm">
            <form for="newPost">
                <fieldset>
                    <img src="/profile.jpg" alt="profile picture" />
                    <h4 class="username">` + data.mockUsers[0].userName + `</h4>
                    <label>Tell us all about it: <input type="text" class="newPostForm" /></label>
                    <button type="submit" class="postBtn">Post</button>
                </fieldset>
            </form>
        </div>`);
}

function homeTemplate() {
    return `<div class="mainContainer">
        <div class="left">
            <h1 class="mainTitle">The Game Room</h1>
            <img src="gamecontroller.png" alt="controller icon" />
            <h2>Welcome to The Game Room!</h2>
            <p class="mainInfo">
                The game room is a blog devoted to all things videogames. Did you save the princess in record time? Tell your friends! Find a new secret cave?
                Share your tips! Do you have something to say about that new game that just released? Write a review!</br>Sign up for free and start posting today!
            </p>
        </div>
        <div class="right">
            <form class="logIn" for="logIn">
                <fieldset>
                    <h2>Log in:</h2>
                    <label>Username: <input type="text" class="usrLogin" /></label>
                    <label>Password: <input type="password" /></label>
                    <button class="logInBtn" type="submit">Login</button>
                    <p>Not a member? <button class="suBtn">Sign up now!</button></p>
                </fieldset>
            </form>
        </div>
    </div>`
}

function signupTemplate() {
    return `<div class="signupBox">
            <form for="signup" id="signup">
                <fieldset>
                    <h4 class="signUpHead">Sign Up!</h4>
                    <label>First Name: <input type="text" min="3" class="firstName" required /> </label>
                    <label>Last Name: <input type="text" min="3" class="lastName" required /></label>
                    <label>Choose a Username: <input type="text" min="3" maxlength="15" class="userName" required /></label>
                    <div id="#"></div>
                    <label>Password: <input type="password" required /></label>
                    <label>Re-enter Password: <input type="password" min="5" maxlength="20" required /></label>
                    <div id="#"></div>
                    <label>Switch friend code: <input type="text" class="switch" placeholder="SW-1234-5678-9000" pattern="SW[-][0-9]{4}[-][0-9]{4}[-][0-9]{4}" /></label>
                    <label>PS4 Gamertag: <input type="text" class="ps4" /></label>
                    <label>Xbox Gamertag: <input type="text" class="xbox" /></label>
                    <label>
                        Preferred Platform:
                        <select>
                            <option value="Nintendo">Nintendo</option>
                            <option value="Playstation">Playstation</option>
                            <option value="Xbox">Xbox</option>
                            <option value="PC">PC</option>
                        </select>
                    </label>
                    <button>Submit</button>
                </fieldset>
            </form>
        </div>`
};


