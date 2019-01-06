var inbox = document.getElementById('inbox');
var junk = document.getElementById('junk');
var sent = document.getElementById('sent');
var archive = document.getElementById('archive');
var deleted = document.getElementById('deleted');

var url;

function onClick(url) {

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(data => {
            $('.message-list').empty(); // clear exiting data 
            for (var i = 0; i < data.length; i++) {
                $('.message-list').append(`<div class ='mail'><p class='subject'> ${data[i].subject} </p> 
                <p class='mail-content'>${data[i].content}</p><br></div>`);
            };

            // on click mail
            onMailClick();
        });
};

function onMailClick(){
    $('.default-content').removeClass('hide');
    $('.message-body-subject').empty();
    $('.message-body-content').empty();
    $('.mail').on('click',function(){
        $('.default-content').addClass('hide');
        $('.message-body-subject').empty();
        $('.message-body-content').empty();
        $('.message-body-subject').append($(this).children('.subject').text()+ "<br/>");      
        $('.message-body-content').append($(this).children('.mail-content').text());
    });
}

function bold(obj){
    $('.folder').css('font-weight','normal');
    $('.folder').css('background','#EEEEEE');
    obj.css('font-weight', 'bold');
    obj.css('background', '#2196f352');
};

// Inbox

inbox.addEventListener('click', function () {
    url = 'code/inbox.json';
    bold($(this));
    onClick(url);
});

// Junk items

junk.addEventListener('click', function () {
    url = 'code/spam.json';
    bold($(this));
    onClick(url);

});

//sent items
sent.addEventListener('click', function () {
    url = 'code/sent.json';
    bold($(this));
    onClick(url);

});

//archive
archive.addEventListener('click', function () {
    url = 'code/archive.json';
    bold($(this));
    onClick(url);

});

//deleted
deleted.addEventListener('click', function () {
    url = 'code/deleted.json';
    bold($(this));
    onClick(url);

});