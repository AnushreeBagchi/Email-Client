
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
                utils.renderMailData (data);
                // on click mail
                setupMailClick();
            });
    };
    function setupMailClick() {
        utils.hideDefaultContent();
        utils.clear_message_content();
        utils.setEventMailClick(onMailClick);

    };

    function onMailClick() {
        $currentElement = $(this);
        utils.showDefaultContent();
        utils.clear_message_content();
        utils.right_message_data($currentElement);
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
        var $currentElement = $(this);
        url = 'code/spam.json';
        utils.bold_folders($currentElement);
        onFolderClick(url);
    });

    //sent items
    sent.addEventListener('click', function () {
        var $currentElement = $(this);
        url = 'code/sent.json';
        utils.bold_folders($currentElement);
        onFolderClick(url);
    });

    //archive
    archive.addEventListener('click', function () {
        var $currentElement = $(this);
        url = 'code/archive.json';
        utils.bold_folders($currentElement);
        onFolderClick(url);
    });

    //deleted
    deleted.addEventListener('click', function () {
        var $currentElement = $(this);
        url = 'code/deleted.json';
        utils.bold_folders($currentElement);
        onFolderClick(url);
    });

    init();

})(app);



