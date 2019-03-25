
var app = app || {};


(function (app) {
    var { utils } = app;
    var { models } = app;

    var folder = document.getElementsByClassName('folder');
    var unread_mails = document.getElementsByClassName('unread-mail');
    var url; var folderClicked;
    function init() {
        models.getAllData().then(data => {
            //Populate unread  mails
            for (var key in data) {
                utils.unreadMails(key, data[key]);
            }
        });

        utils.setEventCompose(onClickCompose);
    };

    //add event liteners for new mails    
    function onClickCompose(){
        utils.popNewWindow();
        utils.setEventCloseCompose();
        utils.setEventCcBcc();
        utils.setNewMailData(checkNewMailData);
    }

     function checkNewMailData(data){                
        if(data.toRecipient===undefined || data.toRecipient.length===0){
            alert('Enter Recipient');
        }

        else if(data.subject===undefined || data.subject.length===0 ){
            let result = confirm('Do you want to send this mail without subject??');
            if(result) {
                utils.sendEmail(data, models.AddToSentItems);
            }
        }        
        else{
            utils.sendEmail(data,models.AddToSentItems);
        }
    };

    //add event listeners to folder click
    for (var i = 0; i < folder.length; i++) {
        folder[i].addEventListener('click', setupFolderClick, false);
    }

    function setupFolderClick() {
        var $currentElement = $(this);
        var id = utils.getId($currentElement);
        utils.bold_folders($currentElement);
        onFolderClick(id);
    }

    function onFolderClick(id) {
        folderClicked = id;
        switch (folderClicked) {
            case 'inbox':
                folderData=models.getInbox();
                break;
            case 'junk':
                folderData=models.getJunk();
                break;
            case 'deleted':                
                folderData=models.getDeleted();
                break;
            case 'sent':                
                folderData=models.getSent();
                break;
            case 'archive':
                folderData=models.getArchive();
                break;
        }
        utils.clear_message_list();
        utils.renderMailData(folderData);
        // on click mail
        setupMailClick();
    }

    function setupMailClick() {
        utils.hideDefaultContent();
        utils.clear_message_content();
        utils.setEventMailClick(onMailClick);
        //  utils.setUnreadMailClick(setReadMail);

    };

    function onMailClick() {
        $currentElement = $(this);
        debugger;
        utils.showDefaultContent();
        utils.clear_message_content();
        utils.right_message_data($currentElement);
        // setReadMail();
        if ($currentElement.hasClass('unread-mail')) {
            setReadMail($currentElement);
        }
    };

    function setReadMail($currentElement) {

        var id = utils.getId($currentElement);
        utils.readMail($currentElement);
        updateUnreadCount(id);
    }
    function updateUnreadCount(id) {
        let folderData;
        switch (folderClicked) {
            case 'inbox':
                models.updateInbox(id);
                folderData=models.getInbox();
                break;
            case 'junk':
                models.updateJunk(id);
                folderData=models.getJunk();
                break;
            case 'deleted':
                models.updateDeleted(id);
                folderData=models.getDeleted();
                break;
            case 'sent':
                models.updateSent(id);
                folderData=models.getSent();
                break;
            case 'archive':
                models.updateArchive(id);
                folderData=models.getArchive();
                break;
        }
        utils.unreadMails(folderClicked,folderData );
    }
    init();
})(app);



