'use strict'

var USERS_URL = '/api/users';
var POSTS_URL = '/posts';


/*
//Get Users
function getUsers(users) {
    console.log('Getting users');
    $.ajax({
        method: 'GET',
        url: 'api/users',
        data: JSON.stringify(users),
        success: function () {
            console.log('gathered user data');
        },
        dataType: 'json',
        contentType: 'application/json'
    });
};*/

//get user by id
function getUserEdit(user) {
    let id = $('.proNamePic').data('id');
    console.log(`getting user`);
    $.ajax({
        method: 'GET',
        url: `/api/users/` + id,
        data: JSON.stringify(user),
        success: function (data) {
            console.log(`gathered user data for ${user}`);
            $('.modalContent').html(editProfileTemplate(data));
        },
        dataType: 'json',
        contentType: 'application/json'
    });
};

//Post users
function addUser(user) { 
    console.log('Adding user: ' + user.username);
    $.ajax({
        method: 'POST',
        url: '/api/users',
        data: JSON.stringify(user),
        dataType: 'json',
        contentType: 'application/json',
        success: function () {
            $('.modalContent').html(thankYou);
            modal.initialize();
        },
        error: function () {
            alert('It seems like something is missing. Make sure everything is filled in correctly and try again.');
        }
    });
}

function loginUser(user) {
    console.log(`Logging in ${user.username}`);
    $.ajax({
        method: 'POST',
        url: '/api/auth/login',
        data: JSON.stringify(user),
        contentType: 'application/json',
        success: function (data) {
            handleProfile(data);
        },
        error: function () {
            alert('Incorrect username and/or password');
        }
    })
}

function handleLoginInfo() {
    $('#logIn').on('submit', function (e) {
        e.preventDefault();
        loginUser({
            username: $(this).find('.username').val(),
            password: $(this).find('.password').val(),
        })
    })
}



function exit() {
    $('.eBtn').on('click', function () {
        let user = $('.proNamePic').data('id');
        refreshUser(user);
    })
}

function refreshUser(user) {
    $.ajax({
        method: 'POST',
        url: 'api/auth/refresh',
        data: JSON.stringify(user),
        contentType: 'application/json',
        success: location.href = location.href
    })
}


function handleProfile(data) {
    $('#landing').hide();
    $('.containerHead').css('display', 'flex');
    $('.mainContainer').css('flex-flow', 'column wrap');
    $('#profileContainer').html(profileTemplate(data.user))
    let theUser = data.user.username;
    $.getJSON(USERS_URL, function (users) {
        proUsernamesTemplate(users);
    })
    $.getJSON(POSTS_URL, function (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].user == theUser) {
                $('.proPosts').prepend(`<div class="proPostBox" data-id="${data[i].id}">` +
                   // `<div class="userPostBox"><p class="proUsernameTwo">` + data[i].user + `</p><img src="profile.jpg" alt="profile image" class="ProUserPic" /></div>` +
                    '<div class="contentBox"><h3 class="proPostTitle">' + data[i].title + '</h3>' +
                    '<p class="proPostContent">' + data[i].content + '</p>' +
                    '<p class="proDate">' + data[i].date + `</p><button class="editPost" id="editPost" data-id="${data[i].id}">Edit</button><button data-id="${data[i].id}" class="deletePost">Delete</button></div>` +
                    '</div>');
            } 
        }
    })
}

function api({ method, url, data }) {
    return $.ajax({
        url,
        method,
        data,
        dataType: 'json',
        contentType: 'application/json'
    })
}

//update user
function updateUser(user) {
    let id = $('main').find('.proNamePic').data('id');
    api({
        url: USERS_URL + '/' + id,
        method: 'PUT',
        data: JSON.stringify(user)
    })
    console.log('Updating user `' + user.id + '`');
    $('.modal').hide();
    $.getJSON(USERS_URL + '/' + id, function (user) {
        handleProfile(user);
    });
}

//update post
function updatePost(post) {
    api({
        url: POSTS_URL + `/` + post.id,
        method: 'PUT',
        data: JSON.stringify(post)
    })
    console.log(`updating post ${post.id}`);
    $('.modal').hide();
    let theUser = post.user;
    $('.proPosts').html('');
    $.getJSON(USERS_URL + '/' + theUser, function (user) {
        $.getJSON(POSTS_URL, function (data) {
            for (let i = 0; i < data.length; i++) {
                if (user.username === data[i].user) {
                    $('.proPosts').prepend(`<div class="proPostBox" data-id="${data[i].id}">` +
                        //`<div class="userPostBox"><p class="proUsernameTwo">` + data[i].user + `</p><img src="profile.jpg" alt="profile image" class="ProUserPic" /></div>` +
                        '<div class="contentBox"><h3 class="proPostTitle">' + data[i].title + '</h3>' +
                        '<p class="proPostContent">' + data[i].content + '</p>' +
                        '<p claass="comments">' + data[i].comments + '</p>' +
                        '<p class="proDate">' + data[i].date + `</p><button class="editPost" id="editPost" data-id="${data[i].id}">Edit</button><button data-id="${data[i].id}" class="deletePost">Delete</button></div>` +
                        '</div>');
                } 
            }
        })
    })
}

//delete user
function deleteUser(user) {
    let id = $('.proNamePic').data('id');
    console.log('Deleting user `' + id + '`');
    $.ajax({
        url: USERS_URL + '/' + id,
        method: 'DELETE',
        data: JSON.stringify(user),
        success: () => location.href = location.href
    });
}

function getUserCard(user) {
    //let id = $(this).data('id');
    $.ajax({
        url: USERS_URL + '/' + user,
        method: 'GET',
        data: JSON.stringify(user),
        success: function (data) {
            $('.modalContent').html(userTemplate(data));
            $('.modal').show();
            modal.initialize();
        }
    })
}


//add post
function addNewPost(post) {
    console.log('Adding new post: ' + post.title); 
    $.ajax({
        method: 'POST',
        url: POSTS_URL,
        data: JSON.stringify(post),
        success: function (post) {
            $('.modal').hide();
            $('.proPosts').prepend(`<div class="proPostBox" data-id="${post.id}">` +
               // `<div class="userPostBox"><p class="proUsernameTwo">` + post.user + `</p><img src="profile.jpg" alt="profile image" class="ProUserPic" /></div>` +
                '<div class="contentBox"><h3 class="proPostTitle">' + post.title + '</h3>' +
                '<p class="proPostContent">' + post.content + '</p>' +
                '<p class="proDate">' + post.date + '</p><button class="editPost" id="editPost">Edit</button><button class="deletePost">Delete</button></div>' +
            `</div>`);
        },
        dataType: 'json',
        contentType: 'application/json'
    });
}

//delete post
function deletePost(data) {
    console.log('Deleting post `' + data + '`');
    $.ajax({
        url: POSTS_URL + '/' + data,
        method: 'DELETE',
        success: function () {
            $('.proPosts').closest(`.proPostBox[data-id="${data}"]`).hide();
        }
    });
}

//get post for update
function getPostEdit(post) {///////////////////2
    //let id = $('#editPost').data('id');
    console.log('Updating post `' + post + '`');
    $.ajax({
        url: POSTS_URL + '/' + post,
        method: 'GET',
        data: JSON.stringify(post),
        success: function (data) {
            $('.modalContent').html(postEditTemplate(data));
        }
    });
}

function getPostDelete(post) {
    //let id = $('#editPost').data('id');
    console.log('Delete post `' + post + '`');
    $.ajax({
        url: POSTS_URL + '/' + post,
        method: 'GET',
        data: JSON.stringify(post),
        success: function (data) {
            $('.modalContent').html(deletePostTemplate(data));
        }
    });
}




function handleNewUser() {
    $('.modal').on('click', '#signupuser', function (e) {
        e.preventDefault();
        addUser({
            firstName: $('#signup').find('.firstName').val(),
            lastName: $('#signup').find('.lastName').val(),
            username: $('#signup').find('.username').val(),
            email: $('#signup').find('.email').val(),
            password: $('#signup').find('.password').val(),
            nintendo: $('#signup').find('.nintendo').val(),
            playstation: $('#signup').find('.playstation').val(),
            xbox: $('#signup').find('.xbox').val(),
            platform: $('#signup').find('.platform').val()
        });
    });
}

function today() {
    let today = new Date();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let year = today.getFullYear();
    if (day < 10) {
        day = '0' + day
    } if (month < 10) {
        month = '0' + month
    }
    today = year + '-' + month + '-' + day;
    return today;
}


function handleNewPost(user) {
    $('.modal').on('click', '#postBtn', function (e) {
        e.preventDefault();
        addNewPost({
            user_id: $('#profileContainer').find('.proNamePic').data('id'),
            title: $('.newPostForm').find('.newPostTitle').val(),
            content: $('.newPostForm').find('.newPostContent').val(),
            date: today(),
            user: user
        })
    })
}


$(function () {
    handleNewUser();
    handleNewPost();
    handleLoginInfo();
    exit();
});