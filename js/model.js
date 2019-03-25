var app = app || {};
app.models = {};
(function (models) {
    var inbox, junk, sent, archive, deleted;

    var jsonList = [{ folder: 'inbox', json: 'code/inbox.json' },
    { folder: 'junk', json: 'code/spam.json' },
    { folder: 'sent', json: 'code/sent.json' },
    { folder: 'archive', json: 'code/archive.json' },
    { folder: 'deleted', json: 'code/deleted.json' }];

    models.getAllData = function () {

        var promises = [];
        for (var i = 0; i < jsonList.length; i++) {
            (function (i) {
                var promise = fetch(jsonList[i].json).then(function (response) {
                    return response.json();
                }).then(data => {
                    if (i == 0) { inbox = data; }
                    if (i == 1) { junk = data; }
                    if (i == 2) { sent = data; }
                    if (i == 3) { archive = data; }
                    if (i == 4) { deleted = data; }
                });

                promises.push(promise);
            })(i);
        };

        return Promise.all(promises).then(data => {
            return { inbox, junk, sent, archive, deleted };
        });
    };

    models.getInbox = function () {
        return  inbox ;
    };

    models.getJunk = function () {
        return junk;
    }

    models.getDeleted = function () {
        return  deleted ;
    }

    models.getArchive = function () {
        return  archive ;
    }

    models.getSent = function () {
        return  sent ;
    }

    models.updateInbox= function (id){
        for (let i=0;i<inbox.length;i++){
            if(id===inbox[i].mId){
                inbox[i].unread=false;
            }
        }        
    }

    models.updateJunk= function (id){    
        for (let i=0;i<junk.length;i++){
            if(id===junk[i].mId){
                junk[i].unread=false;
            }
        }        
    }

    models.updateSent= function (id){
        
        for (let i=0;i<sent.length;i++){
            if(id===sent[i].mId){
                sent[i].unread=false;
            }
        }        
    }

    models.updateArchive= function (id){
        
        for (let i=0;i<archive.length;i++){
            if(id===archive[i].mId){
                archive[i].unread=false;
            }
        }        
    }

    models.updateDeleted= function (id){
        
        for (let i=0;i<deleted.length;i++){
            if(id===deleted[i].mId){
                deleted[i].unread=false;
            }
        }        
    }

    models.AddToSentItems= function(data){       
        sent.push(data);
        console.log(sent);
    }

})(app.models);