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

    utils.getId=function ($currentElement){
        return $currentElement.attr('id')
    }

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

    utils.setUnreadMailClick=function (callbackFn){
       $('.unread-mail').on('click',callbackFn);
    }

    utils.renderMailData = function (data) {

        for (var i = 0; i < data.length; i++) {
            if (data[i].unread==false){
                $('.message-list').append(`<div class ='mail' id=${data[i].mId}><p class='subject'> ${data[i].subject} </p> 
                 <p class='mail-content'>${data[i].content}</p><br></div>`);
            }
            else{
                $('.message-list').append(`<div class ='mail unread-mail' id=${data[i].mId}><p class='subject'> ${data[i].subject} </p> 
            <p class='mail-content'>${data[i].content}</p><br></div>`);
            }
        }
    }

    utils.unreadMails= function (folder,data){
        let count=0;
        for(let i =0;i< data.length;i++){
            if(data[i].unread===true){
                count++;
            }
        }
        $(`#${folder} span.unread`).text(count);
    }

    utils.readMail= function ($currentElement){
        $currentElement.removeClass('unread-mail');
    }

    utils.setEventCompose= function(callback){
        $('#compose').on('click',callback);
    }

    utils.setEventCloseCompose=function(){     
        //clear listners  
        $('.close-window').off();
        $('.delete').off();
        //add listners
        $('.close-window').on('click',utils.closeComposeWindow);
        $('.delete').on('click',utils.closeComposeWindow);
    }

    utils.popNewWindow= function (){
        $('.new-mail').removeClass('hide');
    }

    utils.closeComposeWindow=function(){        
        let result = confirm("Discard changes??");        
        if(result) {

            utils.clearInputs();
            $('.new-mail').addClass('hide');            
        }
    }

    utils.clearInputs=function(){
        $('.to').val("");
        $('.mail-subject').val("");     
        $('.email-body').val("");  
    }

    utils.setNewMailData= function(callback){
        var mail={
            mId: "guid-"+Math.floor((Math.random() * 100) + 1),  //generate random numbers from 0 to 100 
            unread: false
        };        
        $('.to').on('change',()=>{
            mail.toRecipient= $('.to').val();
        });
        $('.cc').on('change',()=>{
            mail.ccRecipient= $('.cc').val();
        });
        $('.bcc').on('change',()=>{
            mail.bccRecipient= $('.bcc').val();        
        });        
        $('.mail-subject').on('change',()=>{
            mail.subject= $('.mail-subject').val();           
        });
        $('.email-body').on('change',()=>{
            mail.content=$('.email-body').val();
        });
        $('.send').on('click',()=>{            
            //check whether valid data entered
            callback(mail);
        });        
    }


    utils.sendEmail=function(data, callback){
        $('.new-mail').addClass('hide'); // close the compose mail window
        utils.clearInputs(); 
        console.log("Email sent");        
        callback(data);
        
    }

    
})(app.utils);

