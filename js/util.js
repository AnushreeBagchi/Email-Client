var app = app || {};
app.utils = {};
(function (utils) {

    utils.bold_folders=function($currentElement){
        // debugger;
        $('.folder').css('font-weight','normal');
        $('.folder').css('background','#EEEEEE');
        $currentElement.css('font-weight', 'bold');
        $currentElement.css('background', '#2196f352');
    };

    //clear message-list
    utils.clear_message_list= function(){
        $('.message-list').empty();
    };

    //clear right pane- message content area
    utils.clear_message_content= function (){
        $('.message-body-subject').empty();
        $('.message-body-content').empty();
    };
})(app.utils);