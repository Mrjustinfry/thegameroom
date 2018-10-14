'use strict'

var USERS_URL = '/users';
var POSTS_URL = '/posts';

//Get Users
function getUsers(users) {
    console.log('Getting users');
    $.ajax({
        method: 'GET',
        url: USERS_URL,
        data: JSON.stringify(users),
        success: function () {
            console.log('gathered user data');
        },
        dataType: 'json',
        contentType: 'application/json'
    });
};

//get user by id
function getUser(user) {
    console.log(`getting user`);
    $.ajax({
        method: 'GET',
        url: USERS_URL + `/` + user.id,
        data: JSON.stringify(user),
        success: function () {

            console.log(`gathered user data for ${user.id}`);
        },
        dataType: 'json',
        contentType: 'application/json'
    });
};

//Post users
function addUser(user) {
    console.log('Adding user: ' + user);
    $.ajax({
        method: 'POST',
        url: USERS_URL,
        data: JSON.stringify(user),
        success: function () {
            $('.hubContainer').hide();
            $('.containerHead').css('display', 'flex');
            $('.mainContainer').html(homeTemplate); 
        },
        dataType: 'json',
        contentType: 'application/json'
    });
}

function api({method, url, data }) {
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
    api({
        url: USERS_URL + '/' + user.id,
        method: 'PUT',
        data: JSON.stringify(user)
    })
    console.log('Updating user `' + user.id + '`');
   /* $.ajax({
        url: USERS_URL + '/' + user.id,
        method: 'PUT',
        data: JSON.stringify(user),
        success: success, //fix this
        dataType: 'json',
        contentType: 'application/json'
        
    });*/
}

//delete user
function deleteUser(userId) {
    console.log('Deleting user `' + userId + '`');
    $.ajax({
        url: USERS_URL + '/' + userId,
        method: 'DELETE',
        success: success //fix this
    });
}


//add post
function addNewPost(post) {
    console.log('Adding new post: ' + post);
    $.ajax({
        method: 'POST',
        url: POSTS_URL,
        data: JSON.stringify(post),
        success: function (data) {
            handleNewPost(data);
            $('.newPostTitle').val('');
            $('.newPostContent').val('');
            $('.containerHead').css('display', 'flex');
            $('.hubContainer').hide();
            getAndDisplayPosts();
        }, 
        dataType: 'json',
        contentType: 'application/json'
    });
}

//delete post
function deletePost(postId) {
    console.log('Deleting post `' + postId + '`');
    $.ajax({
        url: POSTS_URL + '/' + postId,
        method: 'DELETE',
        success: function () {
            console.log('Successfully deleted post');
        }
    });
}

//update post
function updatePost(post) {
    console.log('Updating post `' + post.id + '`');
    $.ajax({
        url: POSTS_URL + '/' + post.id,
        method: 'PUT',
        data: post,
        success: success
    });
}


function handleNewUser() {
    $(document.body).on('click', '#signupuser', function (e) {
        e.preventDefault();
        addUser({
            firstName: $('#signup').find('.firstName').val(),
            lastName: $('#signup').find('.lastName').val(),
            userName: $('#signup').find('.suIn').val(),
            email: $('#signup').find('.email').val(),
            passWord: $('#signup').find('.passWord').val(),
            nintendo: $('#signup').find('.nintendo').val(),
            playstation: $('#signup').find('.playstation').val(),
            xbox: $('#signup').find('.xbox').val(),
            platform: $('#signup').find('.platform').val()
        });
    });
}

function handleNewPost() {
    $(document.body).on('click', '#postBtn', function (e) {
        e.preventDefault();
        addNewPost({
            title: $('.newPostForm').find('.newPostTitle').val(),
            content: $('.newPostForm').find('.newPostContent').val()
        })
    })
}

$(function () {
    handleNewUser();
    handleNewPost();
});