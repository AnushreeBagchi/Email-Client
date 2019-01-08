
var app = app || {};


(function (app) {
    var { utils } = app;
    var {models}= app;
    var inbox = document.getElementById('inbox');
    var junk = document.getElementById('junk');
    var sent = document.getElementById('sent');
    var archive = document.getElementById('archive');
    var deleted = document.getElementById('deleted');
    var unread_mails= document.getElementsByClassName('unread-mail');
    var url ;var data;
    function init() {
         //Populate unread  mails
        // for (var i =0;i<jsonList.length;i++){
        //     (function(i){
        //         fetch(jsonList[i].json).then(function(response){
        //             return response.json();
        //         })
        //         .then(data=>{
        //             utils.unreadMails(jsonList[i].folder,data);
        //         }); 
        //     }(i))
        // }

        // models.getInbox().then(data=>{
        //     console.log(data);
        // })

        models.getAllData().then(data=> {
            debugger;
            console.log(data);
        });
        
        
        // .then(data=>{
        //     console.log(data);
        // });
    };
    
    // function onFolderClick(url) {
       
    //     fetch(url)
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(data => {
    //             utils.clear_message_list(); // clear exiting data 
    //             utils.renderMailData(data);                            
    //             // on click mail
    //             setupMailClick();
    //             // models.getInbox().then(() => {
    //             //     var data  = models.getUnreadCountForInbox()
    //             // })
    //              // add listener to unread mails
    //             // unread_mails.addEventListener('click', function (){
    //             // utils.updateUnreadCount();
    //             // });
                
    //         });
    // };

    function onFolderClick (id){
        var fetchedData;
        if(id='inbox'){
            models.getInbox().then(data=>{
                fetchedData=data;
                utils.clear_message_list();
                utils.renderMailData(fetchedData);    
                // on click mail
                setupMailClick();
            });
        }
       

    }
    function setupMailClick() {
        utils.hideDefaultContent();
        utils.clear_message_content();
        utils.setEventMailClick(onMailClick);
        utils.setUnreadMailClick(updateUnreadCount);

    };

    function updateUnreadCount(){
        $currentElement = $(this);
        console.log('clicked');
        // debugger;
        utils.readMail($currentElement);

    }

    function onMailClick() {
        $currentElement = $(this);
        utils.showDefaultContent();
        utils.clear_message_content();
        utils.right_message_data($currentElement);
    };


    //inbox
    inbox.addEventListener('click', function () {
        var $currentElement = $(this);
        var id= utils.getId($currentElement);
        utils.bold_folders($currentElement);
        onFolderClick(id);
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



