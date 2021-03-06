'use strict';


class Modal {
    initialize() {
        $('.modal').prop('hidden', false);
        $('.modal').on('click', '.close', function (e) {
            e.preventDefault();
            $('.modal').hide();
        })
    }
}

const modal = new Modal()

function signUp() {
    $('#suBtn').on('click', function(e) {
        e.preventDefault();
        $('.modalContent').html(signupTemplate);
        validatePass();
        $('.modal').toggle();
        modal.initialize();
    })
}


function validatePass() {
    $('.modal').find('#pwordTwo').keyup(function () {
        if ($('#pword').val() === $('#pwordTwo').val()) {
            $('#pword').css({ color: 'lightgreen' })
            $('#pwordTwo').css({ color: 'lightgreen' })
        } else {
            $('#pword').css({ color: 'red' })
            $('#pwordTwo').css({ color: 'red' })
        }
    })
};

function newPostRender() {
    $('#profileContainer').on('click', '.proPostBtn', function (e) {
        e.preventDefault();
        $('.modalContent').html(newPostTemplate);
        $('.modal').show();
        modal.initialize();
    })
}


function createNewPost() {
    $('.newPostForm').on('submit', function (e) {
        e.preventDefault();
        addNewPost();
        $('.modal').toggle();
    })

};

function showUserCard() {
    $('#profileContainer').on('click', '.listUsername', function (e) {
        e.preventDefault();
        getUserCard($(this).data('id'));
    })
}

function displayAllPosts() {
    $('.allBtn').on('click', function (e) {
        e.preventDefault();
        getPosts();
        $('#profileContainer').hide();
        $('.mainContainer').html(displayPosts);
    })
};

function getAndDisplayUsers() {
    $.getJSON(USERS_URL, function (users) {
        $('.mainContainer').html(displayUsers(users));
    });
}

function getAndDisplayPosts() {
    $.getJSON(POSTS_URL, function (posts) {
        $('.mainContainer').html(displayPosts(posts));
    })
}

function navProfile() {
    $('.containerHead').on('click', '.hBtn', function (e) {
        e.preventDefault();
        $('.mainContainer').html('');
        $('#profileContainer').show();
    })
}


function renderDeletePost() {
        $('#profileContainer').on('click', '.deletePost', function (e) {
            e.preventDefault();
            let id = $(this).data('id');
            getPostDelete(id);
            $('.modal').show();
            modal.initialize();
        });
}

function handleDeletePost() {
    $('.modal').on('click', '#delPost', function (e) {
        e.preventDefault();
        deletePost($(this).data('id'));
        $('.modal').toggle();
    })
}

function renderDeleteUser() {
    $('#profileContainer').on('click', '.deleteProfile', function (e) {
        e.preventDefault();
        $('.modalContent').html(youSureTemplate);
        $('.modal').show();
        modal.initialize();
    });
}

function handleDeleteUser() {
    $('.modalContent').on('click', '#del', function (e) {
        e.preventDefault();
        deleteUser({
            id: $('.proNamePic').data('id'),
        })
    })
}

function renderEditProfile() {
    $('#profileContainer').on('click', '.editProfile', function (e) {
        e.preventDefault();
        getUserEdit();
        $('.modal').toggle();
        modal.initialize();
    })
}

function renderEditPost() {
    $('#profileContainer').on('click', '#editPost', function (e) {
        e.preventDefault();
        let id = $(this).closest('#editPost').data('id');
        getPostEdit(id);
        $('.modal').toggle();
        modal.initialize();
    })
}

function handleEditProfile() {
    $('.modal').on('click', '#editProfileBtn', function (e) {
        e.preventDefault();
        updateUser({
            id:  $('.proNamePic').data('id'),
            email: $('#editProfile').find('.email').val(),
            nintendo: $('#editProfile').find('.nintendo').val(),
            playstation: $('#editProfile').find('.playstation').val(),
            xbox: $('#editProfile').find('.xbox').val(),
            platform: $('#editProfile').find('.platform').val()
        });
    });
}

function handleEditPost() {
    $('.modal').on('click', '#editPostBtn', function (e) {
        e.preventDefault();
        updatePost({
            id: $(this).data('id'),
            user: $('#profileContainer').find('.proNamePic').data('id'),
            title: $('#editPostForm').find('#editTitle').val(),
            content: $('#editPostForm').find('#editContent').val()
        })
    })
}



$(function () {
    signUp();
    newPostRender();
    createNewPost();
    navProfile();
    renderEditProfile();
    handleEditProfile();
    renderEditPost();
    handleEditPost();
    renderDeleteUser();
    handleDeleteUser();
    showUserCard();
    $('.containerHead').on('click', '.gBtn', function (e) {
        e.preventDefault();
        $('#profileContainer').hide();
        $('.mainContainer').html('');
        $('.mainContainer').css('flex-flow', 'row wrap');
        getAndDisplayUsers();
    })
    $('.containerHead').on('click', '.pBtn', function (e) {
        e.preventDefault();
        $('#profileContainer').hide();
        $('.mainContainer').html('');
        $('.mainContainer').css('flex-flow', 'column');
        getAndDisplayPosts();
    })
    renderDeletePost();
    handleDeletePost();
})