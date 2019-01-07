var app = app || {};
app.utils = {};
(function (utils) {

    utils.bold_folders = function ($currentElement) {
        $('.folder').css('font-weight', 'normal');
        $('.folder').css('background', '#EEEEEE');
        $currentElement.css('font-weight', 'bold');
        $currentElement.css('background', '#2196f352');
    };

    //clear message-list
    utils.clear_message_list = function () {
        $('.message-list').empty();
    };

    //clear right pane- message content area
    utils.clear_message_content = function () {
        $('.message-body-subject').empty();
        $('.message-body-content').empty();
    };

    utils.right_message_data = function ($currentElement) {
        $('.message-body-subject').append($currentElement.children('.subject').text() + "<br/>");
        $('.message-body-content').append($currentElement.children('.mail-content').text());
    }

    utils.hideDefaultContent = function () {
        $('.default-content').removeClass('hide');
    }

    utils.showDefaultContent = function () {
        $('.default-content').addClass('hide');
    }

    utils.setEventMailClick = function (callbackFn) {
        $('.mail').on('click', callbackFn);
    }

    utils.renderMailData = function (data) {
        for (var i = 0; i < data.length; i++) {
            $('.message-list').append(`<div class ='mail'><p class='subject'> ${data[i].subject} </p> 
            <p class='mail-content'>${data[i].content}</p><br></div>`);
        };
    }

    utils.unreadMails= function (folder,data){
        // debugger;
        var count=0;
        for(var i =0;i< data.length;i++){
            if(data[i].unread==true){
                count++
            }
        }
        $(`#${folder} span.unread`).text(count);
    }
})(app.utils);

