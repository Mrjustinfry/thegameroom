'use strict';

/*
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
*/


function displayUsers(data) {
    for (let i = 0; i < data.length; i++) {
        $('.mainContainer').prepend(`<div class="container userBox">` +
            `<div class="namePic"><h3 class="username">` + data[i].userName + `</h3>` +
            `<img src='profile.jpg' alt="profile picture" /></div>` +
            `<div class="userInfo"><p><b>Switch Friend Code: </b></br>` + data[i].nintendo + `</p>` +
            `<p><b>PS4 Gamertag: </b></br>` + data[i].playstation + `</p>` +
            `<p><b>Xbox Gamertag: </b></br>` + data[i].xbox + `</p>` +
            `<p><b>Prefered Platform: </b></br>` + data[i].platform + `</p></div>` +
            `</div>`);
    }
};

function displayPosts(data) {
    for (let i = 0; i < data.length; i++) {
        $('.mainContainer').prepend(`<div class="container postBox" data-id="${data[i].id}">` +
                `<div class="userPostBox"><p class="uName">UserName</p><img src="profile.jpg" alt="profile image" class="uPic" /></div>` +
                '<div class="contentBox"><h3 class="title">' + data[i].title + '</h3>' +
                '<p class="content">' + data[i].content + '</p>' +
            '<p class="date">' + data[i].date + '</p></div>' +
            `<button class="deletePost">Delete</button>` +
                '</div>');//add comments
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
                        </form>`
}

function newPostTemplate() {
    return `<div class="container newPostBox">
            <form for="newPost" class="newPostForm">
                <fieldset>
                <span class="close">&times;</span>
                    <label><div class="sInput tInput">Title: </div><input type="text" class="newPostTitle suIn" /></label>
                    <label><div class="sInput pInput">Tell me about it: </div><input type="text" class="newPostContent suIn" /></label>
                    <button type="submit" id="postBtn">Post</button>
                </fieldset>
            </form>
        </div>`
}

function landingTemplate() {
    return `<div id="landing">
            <div class="gameRoomBox">
                <h1 class="mainTitle">The Game Room</h1>
            </div>
            <div class="mainInfoBox">
            <p class="mainInfo">
                The game room is a blog devoted to all things videogames. Did you save the princess in record time? Tell your friends! Find a new secret cave?
                Share your tips! Do you have something to say about that new game that just released? Write a review! Sign up for free and start posting today!
            </p>
            <form class="logIn" for="logIn">
                <fieldset>
                    <h2>Log in:</h2>
                    <label>Username: <input type="text" class="usrLogin" /></label>
                    <label>Password: <input type="password" class="usrLogin" /></label>
                    <button class="logInBtn" type="submit">Login</button>
                    <p>Not a member? </p><button id="suBtn" class="logInBtn">Sign up now!</button>
                </fieldset>
            </form>
                </div>
        </div>`
}

function signupTemplate() {
    return `<div class="signupBox">
            <form for="signup" id="signup">
                <fieldset>
                    <span class="close">&times;</span>
                    <h4 class="signUpHead">Sign Up!</h4>
                    <label><div class="sInput">First Name: </div><input type="text" min="3" class="firstName suIn" required /></label>
                    <label><div class="sInput">Last Name: </div><input type="text" min="3" class="lastName suIn" required /></label>
                    <label><div class="sInput">Email: </div><input type="email" placeholder="someone@something.com" class="email suIn" required /></label>
                    <label><div class="sInput">Choose a Username: </div><input type="text" min="3" maxlength="15" class="suIn" required /></label>
                    <label><div class="sInput">Password: </div><input type="password" class="passWord suIn" required /></label>
                    <label><div class="sInput">Re-enter Password: </div><input type="password" min="5" maxlength="20" class="passwordtwo suIn" required /></label>
                    <label><div class="sInput">Switch friend code: </div><input type="text" class="nintendo suIn" placeholder="SW-1234-5678-9000" pattern="SW[-][0-9]{4}[-][0-9]{4}[-][0-9]{4}" /></label>
                    <label><div class="sInput">PS4 Gamertag: </div><input type="text" class="playstation suIn" /></label>
                    <label><div class="sInput">Xbox Gamertag: </div><input type="text" class="xbox suIn" /></label>
                    <label>
                        <div class="sInput">
                        Preferred Platform: </div>
                        <select class="platform suIn">
                            <option value="Nintendo">Nintendo</option>
                            <option value="Playstation">Playstation</option>
                            <option value="Xbox">Xbox</option>
                            <option value="PC">PC</option>
                        </select>
                    </label>
                    <button type="submit" class="logInBtn" id="signupuser">Submit</button>
                </fieldset> 
            </form>
        </div>`
};

function headerTemplate() {
    return `<div class="toggle">
        <header class="containerHead">
            <button class="hBtn">Hub</button>
            <button class="gBtn">Gamers</button>
            <button class="mBtn"><img src="gamecontroller.png" alt="game controller" class="controller" /></button>
            <button class="pBtn">Post</button>
            <button class="eBtn">Exit</button>
        </header>
    </div>`
};

function homeTemplate() {
    return `<div class="hubContainer">
            <div class="theHub">
                <div class="section hub">
                    <button class="profileBtn btns">Check out your Profile</button>
                </div>
                <div class="section gamers">
                    <button class="gameBtn btns">Meet other Gamers</button>
                </div>
                <div class="section post">
                    <button class="postBtn btns">Write a new Post</button>
                </div>
                <div class="section exit">
                    <button class="allBtn btns">See what Everyone is talking about?</button>
                </div>
            </div>
        </div>`
}


function profileTemplate() {
    return `<div class="proHead">
                    <div class="proNamePic">
                        <h3 class="ProUsername"> + data.userName + </h3>
                        <img src='profile.jpg' alt="profile picture" />
                    </div>
                    <div class="ProUserInfo">
                        <p>Switch Friend Code: </br> + data.nintendo + </p>
                        <p>PS4 Gamertag: </br> + data.playstation + </p>
                        <p>Xbox Gamertag: </br> + data.xbox + </p>
                        <p>Prefered Platform: </br> + data.platform + </p>
                        <button class="editProfile">Edit your profile</button>
                    </div>
            </div>
            <div class="proInfo">
                    <div class="proUsers">
                    </div>
                    <div class="proPosts">
                    </div>
            </div>`
}

function proUsernamesTemplate(data) {
    for (let i = 0; i < data.length; i++) {
        $('.proUsers').prepend(`<div class="proUserBox">` +
            `<h3 class="listUsername">` + data[i].userName + `</h3>` +
            `</div>`);
    }
}

function proPosts(data) {
    for (let i = 0; i < data.length; i++) {
        $('.proPosts').prepend('<div class="proPostBox">' +
            `<div class="userPostBox"><p class="proUserName">UserName</p><img src="profile.jpg" alt="profile image" class="ProUserPic" /></div>` +
            '<div class="contentBox"><h3 class="proPostTitle">' + data[i].title + '</h3>' +
            '<p class="proPostContent">' + data[i].content + '</p>' +
            '<p class="proDate">' + data[i].date + '</p></div>' +
            '</div>');
    }
}