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
        
        var promises=[];
        for(var i=0;i<jsonList.length;i++){
            (function (i){
                var promise= fetch(jsonList[i].json).then(function(response){
                    return response.json();
                }).then(data=>{
                    if(i==0){inbox=data;}
                    if(i==1){junk=data;}
                    if(i==2){sent=data;}
                    if(i==3){archive=data;}
                    if(i==4){deleted=data;}
                });

                promises.push(promise);
            })(i);
        };

        return Promise.all(promises).then(data=>{
            // debugger;
            return {inbox, junk,sent, archive,deleted};
        });
    };

        models.getInbox = function () {
            return new Promise((resolve)=>{
                return {inbox};
            });
        }

   



   
})(app.models);