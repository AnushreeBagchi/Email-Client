
var app = app || {};


(function (app) {
    var { utils } = app;
    var {models}= app;
    var inbox = document.getElementById('inbox');
    var junk = document.getElementById('junk');
    var sent = document.getElementById('sent');
    var archive = document.getElementById('archive');
    var deleted = document.getElementById('deleted');
    var  folder=document.getElementsByClassName('folder');
    var unread_mails= document.getElementsByClassName('unread-mail');
    var url ;
    function init() {
        
        models.getAllData().then(data=> {
            //Populate unread  mails
            for (var key in data){
                utils.unreadMails(key,data[key]);
            }
            
        });
    };

    //add event listeners to folder click
    for (var i = 0; i < folder.length; i++) {
        folder[i].addEventListener('click', setupFolderClick, false);
    }

    function setupFolderClick(){
        var $currentElement = $(this);
        var id= utils.getId($currentElement);
        utils.bold_folders($currentElement);
        onFolderClick(id);
    }
    
    function onFolderClick (id){
            models.getAllData().then(data=>{
                utils.clear_message_list();
                utils.renderMailData(data[id]); 
                // on click mail
                setupMailClick();
            })
        }
    function setupMailClick() {
        utils.hideDefaultContent();
        utils.clear_message_content();
        utils.setEventMailClick(onMailClick);
        utils.setUnreadMailClick(setReadMail);

    };

    function setReadMail(){
        $currentElement = $(this);
        console.log($currentElement);
        var id= utils.getId($currentElement);
        utils.readMail($currentElement);
        updateUnreadCount(id);
    }
function updateUnreadCount($currentElement,id){
  debugger;
  models.getAllData().then(data=>{
    for(var folder in data)
    {
        for(var i=0;i<data[folder].length;i++)
        {
            if(data[folder][i].mId==id){
                data[folder][i].unread = false;
                console.log(data[folder][i]);
                utils.unreadMails(folder,data[folder]);
            }
        }
    }
  });
  

}

    function onMailClick() {
        $currentElement = $(this);
        utils.showDefaultContent();
        utils.clear_message_content();
        utils.right_message_data($currentElement);
    };


    

    init();

})(app);



