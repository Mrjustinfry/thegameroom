'use strict';


function getUsers(callbackFn) {
    setTimeout(function () { callbackFn(MOCK_USER_DATA) }, 1);
}

function getPosts(callbackFn) {
    setTimeout(function () { callbackFn(MOCK_POST_DATA) }, 1);
}

function getAndDisplayUsers() {
    getUsers(displayUsers);
};

function getAndDisplayPosts() {
    getPosts(displayPosts);
};

function getAndNewPost() {
    getUsers(newPostTemplate)
}

$(function () {
    $('.mBtn').on('click', function (e) {
        e.preventDefault();
        getAndDisplayPosts();
    })
    $('.pBtn').on('click', function (e) {
        e.preventDefault()
        getAndNew();
    })
    $('.gBtn').on('click', function (e) {
        e.preventDefault();
        getAndDisplayUsers();
    })
    $('.hBtn').on('click', function (e) {
        e.preventDefault();
        getAndDisplayPosts();
    })
    $('.logInBtn').on('click', function (e) {
        e.preventDefault();
        $('.toggle').toggle();
        getAndDisplayPosts();
    })
    $('.suBtn').on('click', function (e) {
        e.preventDefault();
        $('main').html(signupTemplate)
    })
})