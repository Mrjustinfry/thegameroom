'use strict'

var USERS_URL = '/users';
var POSTS_URL = '/posts';


//Post users
function addUser(user) {
    console.log('Adding user: ' + user);
    $.ajax({
        method: 'POST',
        url: USERS_URL,
        data: JSON.stringify(user),
        success: function (data) {
            getAndDisplayUsers();
        },
        dataType: 'json',
        contentType: 'application/json'
    });
}

//update user
function updateUser(user) {
    console.log('Updating user `' + user.id + '`');
    $.ajax({
        url: USERS_URL + '/' + item.id,
        method: 'PUT',
        data: JSON.stringify(user),
        success: function (data) {
            getAndDisplayUsers()
        },
        dataType: 'json',
        contentType: 'application/json'
    });
}

//delete user
function deleteUser(userId) {
    console.log('Deleting user `' + userId + '`');
    $.ajax({
        url: USERS_URL + '/' + userId,
        method: 'DELETE',
        success: getAndDisplayUsers()
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
        success: getAndDisplayPosts()
    });
}

//update post
function updatePost(post) {
    console.log('Updating post `' + post.id + '`');
    $.ajax({
        url: POSTS_URL + '/' + post.id,
        method: 'PUT',
        data: post,
        success: function (data) {
            getAndDisplayPosts();
        }
    });
}


function createUser() {
    $('#signup').on('submit', function (e) {
        e.preventDefault();
        addUser({
            firstName: $(e.currentTarget).find('.firstName').val(),
            lastName: $(e.currentTarget).find('.lastName').val(),
            userName: $(e.currentTarget).find('.userName').val(),
            passWord: $(e.currentTarget).find('.passWord').val(),
            nintendo: $(e.currentTarget).find('.switch').val(),
            playstation: $(e.currentTarget).find('.playstation').val(),
            xbox: $(e.currentTarget).find('.xbox').val()
        })
    })
};

function addUser(user) {
    console.log('Adding user: ' + user);
    $.ajax({
        method: 'POST',
        url: USERS_URL,
        data: JSON.stringify(user),
        success: function (data) {
            getAndDisplayUsers();
        },
        dataType: 'json',
        contentType: 'application/json'
    });
}
