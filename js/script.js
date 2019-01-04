var inbox=document.getElementById('inbox');

inbox.addEventListener('click',function (){
    console.log('clicked');
});
var inbox_data=[];

fetch('code/inbox.json')
  .then(function(response) {
    return response.json();
  })
  .then(data => {
    console.log( data[0] );
  });

// console.log(inbox_data);