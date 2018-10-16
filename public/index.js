'use strict';

function modalOpen() {
    $('.modal').prop('hidden', false);
}

function modalClose() {
    $('.close').on('click', function (e) {
        e.preventDefault();
        $('.modal').prop('hidden', true);
    })
}
/*
const modal = {
    open: () => {
        $('.modal').prop('hidden', false);
    },
    close: () => {
        $('.close').on('click', function (e) {
            e.preventDefault();
            $('.modal').prop('hidden', true);
        })
    }
}*/


class Modal {
    initialize() {
        $('.modal').prop('hidden', false);
        $('.close').on('click', function (e) {
            e.preventDefault();
            $('.modal').prop('hidden', true);
        })
    }
}

const modal = new Modal()

function signUp() {
    $('#suBtn').on('click', function(e) {
        e.preventDefault();
        $('.modalContent').html(signupTemplate);
        modal.initialize();
    })
}

function newPostRender() {
    $(document.body).on('click', '.postBtn', function (e) {
        e.preventDefault();
        $('.modalContent').html(newPostTemplate);
        modal.initialize();
    })
}

function handleGamers() {
    $('main').find('.gameBtn').on('click', function (e) {
        e.preventDefault();
        $('.hubContainer').toggle();
        $('.mainContainer').html(getUsers);
    })
}

function handleLogin() {
    $('.logInBtn').on('click', function (e) {
        e.preventDefault();
        $('#landing').hide(); //fix this
        $('.mainContainer').html(homeTemplate);
    })
};

function createNewPost() {
    $('.newPostForm').on('submit', function (e) {
        e.preventDefault();
        addNewPost();
        $('.modal').toggle();
    })

};

function displayAllPosts() {
    $('.allBtn').on('click', function (e) {
        e.preventDefault();
        getPosts();
        $('.mainContainer').html(displayPosts);
    })
};

function getAndDisplayUsers() {
    console.log('Retrieving users')
    $.getJSON(USERS_URL, function (users) {
        $('.mainContainer').html(displayUsers(users));
    });
}

function getAndDisplayPosts() {
    console.log('Retrieving posts')
    $.getJSON(POSTS_URL, function (posts) {
        $('.mainContainer').html(displayPosts(posts));
    })
}

function handleProfile() {
        $('.hubContainer').hide();
        $('.containerHead').css('display', 'flex');
        $('.mainContainer').css('flex-flow', 'column wrap');
        $('.mainContainer').html(profileTemplate);
        $.getJSON(USERS_URL, function (users) {
            proUsernamesTemplate(users);
        })
        $.getJSON(POSTS_URL, function (posts) {
            proPosts(posts);
        })
}

function handleDeletePost() {
        $(document.body).on('click', '.deletePost', function (e) {
            e.preventDefault();
            alert('Are you sure you want to delete this post?');
            if (confirm('This post has been deleted')) {
                deletePost(
                    $('.postBox').data('id'));
                getAndDisplayPosts();
            } else {
                getAndDisplayPosts();
            }
        });
}

$(function () {
    signUp();
    newPostRender();
   // handleLogin();
    createNewPost();
    $(document.body).on('click', '.gameBtn', function (e) {
        e.preventDefault();
        $('.hubContainer').hide();
        $('.containerHead').css('display', 'flex');
        $('.mainContainer').css('flex-flow', 'row wrap');
        getAndDisplayUsers();
    })
    $(document.body).on('click', '.profileBtn', function (e) {
        e.preventDefault();
        handleProfile();
    })
    $(document.body).on('click', '.hBtn', function (e) {
        e.preventDefault();
        handleProfile();
    })
    $(document.body).on('click', '.allBtn', function (e) {
        e.preventDefault();
        $('.hubContainer').hide();
        $('.containerHead').css('display', 'flex');
        $('.mainContainer').css('flex-flow', 'column');
        getAndDisplayPosts();
    })
    $(document.body).on('click', '.gBtn', function (e) {
        e.preventDefault();
        $('.mainContainer').html('');
        $('.mainContainer').css('flex-flow', 'row wrap');
        getAndDisplayUsers();
    })
    $(document.body).on('click', '.pBtn', function (e) {
        e.preventDefault();
        $('.mainContainer').html('');
        $('.mainContainer').css('flex-flow', 'column');
        getAndDisplayPosts();
    })
    $('.eBtn').on('click', function () {
        location.href = location.href;
    })
    handleDeletePost();
})