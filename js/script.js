
var app = app || {};


(function (app) {
    var { utils } = app;

    var inbox = document.getElementById('inbox');
    var junk = document.getElementById('junk');
    var sent = document.getElementById('sent');
    var archive = document.getElementById('archive');
    var deleted = document.getElementById('deleted');
    var url;
    function init() {
        // nothing to do
    };
    function onFolderClick(url) {

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                utils.clear_message_list(); // clear exiting data 
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
        utils.clear_message_content();
        $('.mail').on('click',function(){
            $('.default-content').addClass('hide');
            utils.clear_message_content();
            $('.message-body-subject').append($(this).children('.subject').text()+ "<br/>");      
            $('.message-body-content').append($(this).children('.mail-content').text());
        });
    };

//inbox

inbox.addEventListener('click', function () {
    var $currentElement = $(this);
    url = 'code/inbox.json';
    utils.bold_folders($currentElement);
    onFolderClick(url);
});

// Junk items

junk.addEventListener('click', function () {
    url = 'code/spam.json';
    utils.bold_folders();
    onFolderClick(url);

});

//sent items
sent.addEventListener('click', function () {
    url = 'code/sent.json';
    utils.bold_folders();
    onFolderClick(url);

});

//archive
archive.addEventListener('click', function () {
    url = 'code/archive.json';
    utils.bold_folders();
    onFolderClick(url);

});

//deleted
deleted.addEventListener('click', function () {
    url = 'code/deleted.json';
    utils.bold_folders();
    onFolderClick(url);

});

    init();
})(app);




// Inbox
