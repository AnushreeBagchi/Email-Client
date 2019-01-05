var inbox = document.getElementById('inbox');
var junk = document.getElementById('junk');
var sent = document.getElementById('sent');
// var junk = document.getElementById('junk');
// var junk = document.getElementById('junk');
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
    $('.message-body').empty();
    $('.mail').on('click',function(){
        // console.log();
        $('.default-content').addClass('hide');
        $('.message-body').empty();
        // debugger;
        $('.message-body').append($(this).children('.mail-content').text());
    });
}

function bold(obj){
    $('.folder').css('font-weight','normal');
    obj.css('font-weight', 'bold');
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