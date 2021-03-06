﻿'use strict';

function displayUsers(data) {
    for (let i = 0; i < data.length; i++) {
        $('.mainContainer').prepend(`<div class="container userBox" data-id="${data[i].id}">` +
            `<div class="namePic"><h3 class="username green">` + data[i].username + `</h3>` +
            `<img src='profile.jpg' alt="profile picture" /><p class="fullName">${data[i].firstName} ${data[i].lastName}</p></div>` +
            `<div class="userInfo"><p>Switch Friend Code: </br><span class="data">` + data[i].nintendo + `</span></p>` +
            `<p>PS4 Gamertag: </br><span class="data">` + data[i].playstation + `</span></p>` +
            `<p>Xbox Gamertag: </br><span class="data">` + data[i].xbox + `</span></p></div>` +
            `</div>`);
    }
};

function displayPosts(data) {
    for (let i = 0; i < data.length; i++) {
        $('.mainContainer').prepend(`<div class="container postBox" data-id="${data[i].id}">` +
                `<div class="userPostBox"><p class="uName">`+ data[i].user+`</p><img src="profile.jpg" alt="profile image" class="uPic" /></div>` +
                '<div class="contentBox"><h3 class="title">' + data[i].title + '</h3>' +
            '<p class="content">' + data[i].content + '</p>' +
            '<p class="date">' + data[i].date + '</p></div>' +
            '<div class="commentBox"><p class="comments">' + data[i].comments + '</p >' +
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
                            <button type="submit" class="gameSearchBtn" aria="button">Search</button>
                        </form>`
}

function newPostTemplate() {
    return `<div class="container newPostBox">
            <form for="newPost" class="newPostForm">
            <span class="close">&times;</span>
                <fieldset>
                    <label><div class="sInput tInput">Title: </div><input type="text" class="newPostTitle suIn" /></label>
                    <label><div class="sInput pInput">Tell me about it: </div><textarea class="newPostContent suIn"></textarea></label>
                    <button type="submit" id="postBtn" aria="button">Post</button>
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
                    <button class="logInBtn" type="submit" aria="button">Login</button>
                    <p>Not a member? </p><button id="suBtn" class="logInBtn" aria="button">Sign up now!</button>
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
                    <p class="red">(Username and password are case-sensitive)</p>
                    <label><div class="sInput">First Name<span class="red">*</span> </div><input type="text" min="3" class="firstName suIn" required /></label>
                    <label><div class="sInput">Last Name<span class="red">*</span> </div><input type="text" min="3" class="lastName suIn" required /></label>
                    <label><div class="sInput">Email<span class="red">*</span> </div><input type="email" placeholder="someone@something.com" class="email suIn" required /></label>
                    <label><div class="sInput">Choose a Username<span class="red">*</span> </div><input placeholder="3-15 characters" type="text" min="3" maxlength="15"  class="username suIn" required /></label>
                    <label><div class="sInput">Password<span class="red">*</span> </div><input type="password" id="pword" class="password suIn" min="3" maxlength="72" required /></label>
                    <label><div class="sInput">Re-enter Password<span class="red">*</span> </div><span id="wrong"></span><input type="password" id="pwordTwo" min="3" maxlength="72" class="passwordTwo suIn" required /></label>
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
                    <button type="submit" class="logInBtn" id="signupuser" aria="button">Submit</button>
                </fieldset> 
            </form>
        <p class="red">* required</p>
        </div>`
};


function userTemplate(data) {
    return `<div class="container userBox userCard" data-id="${data.id}"><span class="close" id="ucClose">&times;</span>` +
        `<div class="namePic"><h3 class="username green">` + data.username + `</h3>` +
        `<img src='profile.jpg' alt="profile picture" /><p class="fullName">${data.firstName} ${data.lastName}</p></div>` +
        `<div class="userInfo"><p>Switch Friend Code: </br><span class="data">` + data.nintendo + `</span></p>` +
        `<p>PS4 Gamertag: </br><span class="data">` + data.playstation + `</span></p>` +
        `<p>Xbox Gamertag: </br><span class="data">` + data.xbox + `</span></p>` +
        `<p>Prefered Platform: </br><span class="data">` + data.platform + `</span></p></div>` +
            `</div>`
}

function thankYou() {
    let user = $('#signup').find('.username').val();
    return `<div class="tyBox">
            <span class="close" id="suClose">&times;</span>
                <h1 class="ty">Welcome to The Game Room <span class="green">${user}</span>!</br>Log in and start sharing!</h1>
            </div>`
}

function youSureTemplate() {
    return `<div class="tyBox">
                <h1 class="ty">Are you sure you want to delete your profile?</br>This cannot be undone.</h1>
                <div class="yesNo"><button class="deleteProfile" id="del" aria="button">DELETE</button><button class="editProfile close" id="cancel" aria="button">CANCEL</button></div>
            </div>`
}

function deletePostTemplate(data) {
    return `<div class="tyBox">
                <h1 class="ty">Are you sure you want to delete this post?</h1>
                <div class="yesNo"><button class="deleteProfile" id="delPost" data-id="${data.id}" aria="button">DELETE</button><button class="editProfile close" id="cancel" aria="button">CANCEL</button></div>
            </div>`
}

function profileTemplate(user) {
    return `<div class="proHead">
                    <div class="proNamePic" data-id="${user.id}">
                        <h3 class="proUsername">` + user.username + `</h3>
                        <img src='profile.jpg' alt="profile picture" class="proPic" />
                    </div>
                    <div class="proUserInfo">
                        <p class="m">Switch Friend Code: </br><span class="green">` + user.nintendo + `</span></p>
                        <p class="m">PS4 Gamertag: </br><span class="green">` + user.playstation + `</span></p>
                        <p class="m">Xbox Gamertag: </br><span class="green">` + user.xbox + `</span></p>
                        <button class="editProfile" aria="button">Edit your profile</button>
                        <button class="deleteProfile" aria="button">Delete your profile</button>
                    <button class="proPostBtn" aria="button">Write a new Post</button>
                    </div>
            </div>
            <div class="proInfo">
                    <div class="proUsers">
                        <div class="gamers">Gamers</div>
                    </div>
                    <div class="proPosts">
                        
                    </div>
            </div>`
}

function proUsernamesTemplate(data) {
    for (let i = 0; i < data.length; i++) {
        $('.proUsers').append(`<div class="proUserBox">` +
            `<h3 class="listUsername" aria="button" data-id="${data[i].id}">` + data[i].username + `</h3>` +
            `</div>`);
    }
}

function editProfileTemplate(data) {
    return `<div class="editProfileBox">
                <span class="close">&times;</span>
                <form for="editProfile" id="editProfile">
                <fieldset>
                    <h4 class="signUpHead">Edit your Profile</h4>
                    <label><div class="sInput">Email: </div><input value="${data.email}" type="email" class="email suIn" /></label>
                    <label><div class="sInput">PS4 Gamertag: </div><input value="${data.playstation}" type="text" class="playstation suIn" /></label>
                    <label><div class="sInput">Xbox Gamertag: </div><input value="${data.xbox}" type="text" class="xbox suIn" /></label>
                    <label><div class="sInput">Switch friend code: </div><input value="${data.nintendo}" type="text" class="nintendo suIn" pattern="SW[-][0-9]{4}[-][0-9]{4}[-][0-9]{4}" /></label>
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
                    <button type="submit" class="logInBtn" id="editProfileBtn" aria="button">Submit</button>
                </fieldset> 
            </form>
            </div>`
}

function postEditTemplate(data) {
    return `<div class="newPostBox editPostBox container">
        <form for="editPost" id="editPostForm">
        <span class="close">&times;</span>
            <fieldset>
                <label><span class="sInput tInput">Title: </span><input type="text" value="${data.title}" class="newPostTitle suIn" id="editTitle" /></label>
                <label><span class="sInput pInput">Tell me about it: </span><textarea class="newPostContent suIn" id="editContent">${data.content}</textarea></label>
                <button type="submit" id="editPostBtn" aria="button" data-id=${data.id}>Post</button>
            </fieldset>
            </form >
        </div >`
}