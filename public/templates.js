'use strict';

function displayUsers(data) {
    for (let i = 0; i < data.length; i++) {
        $('.mainContainer').prepend(`<div class="container userBox">` +
            `<div class="namePic"><h3 class="username">` + data[i].username + `</h3>` +
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
                `<div class="userPostBox"><p class="uName">username</p><img src="profile.jpg" alt="profile image" class="uPic" /></div>` +
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

                    <label>Username: <input type="text" class="usrLogin username" /></label>
                    <label>Password: <input type="password" class="usrLogin password" /></label>
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
                    <label><div class="sInput">Choose a Username: </div><input type="text" min="3" maxlength="15" class="username suIn" required /></label>
                    <label><div class="sInput">Password: </div><input type="password" class="password suIn" min="10" required /></label>
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
                        <h3 class="ProUsername"> + data.username + </h3>
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
            `<h3 class="listUsername">` + data[i].username + `</h3>` +
            `</div>`);
    }
}

function proPosts(data) {
    for (let i = 0; i < data.length; i++) {
        $('.proPosts').prepend('<div class="proPostBox">' +
            `<div class="userPostBox"><p class="proUsername">username</p><img src="profile.jpg" alt="profile image" class="ProUserPic" /></div>` +
            '<div class="contentBox"><h3 class="proPostTitle">' + data[i].title + '</h3>' +
            '<p class="proPostContent">' + data[i].content + '</p>' +
            '<p class="proDate">' + data[i].date + '</p></div>' +
            '</div>');
    }
}