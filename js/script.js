
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
    var url ;var folderClicked;
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
            folderClicked=id;
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
        //  utils.setUnreadMailClick(setReadMail);

    };

    function onMailClick() {
        $currentElement = $(this);
       
        var abc= $currentElement.attr('class');
        utils.showDefaultContent();
        utils.clear_message_content();
        utils.right_message_data($currentElement);
        // setReadMail();
        if($currentElement.hasClass('unread-mail')){
            setReadMail();
        }
    };

    function setReadMail(){
        $currentElement = $(this);
        var id= utils.getId($currentElement);
        debugger;
        utils.readMail($currentElement);
        updateUnreadCount(id);
    }
function updateUnreadCount(id){
  models.getAllData().then(data=>{
        for(var i=0;i<data[folderClicked].length;i++)
        {
            if(data[folderClicked][i].mId==id){
                data[folderClicked][i].unread = false;
                console.log(data[folderClicked][i]);
                utils.unreadMails(folderClicked,data[folderClicked]);
            }
        }
    }
)}




    

    init();

})(app);



