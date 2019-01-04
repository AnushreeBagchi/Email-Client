var inbox=document.getElementById('inbox');
var subject= document.getElementById('subject');

function onClickInbox(){
    fetch('code/inbox.json')
    .then(function(response) {
    return response.json();
    })
    .then(data => {
    console.log( data );
    for (var i =0; i< data.length;i++){
    $('#mail').append(`<p class='subject'> ${data[i].subject} </p> `);
    $('#mail').append(`<p class='mail-content'>${data[i].content}</p><br>`);
    }
    });
}

inbox.addEventListener('click',function (){
    console.log('clicked');
    onClickInbox();
});
