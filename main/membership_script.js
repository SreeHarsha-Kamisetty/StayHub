
function visiblea(){
    var x = document.getElementById("aa");
    var y=document.getElementById("a");
  if (x.style.visibility === 'hidden') {
    x.style.visibility = 'visible';
    y.style.fontWeight=1000;
    y.style.color='red';
  } else {
    x.style.visibility = 'hidden';
    y.style.fontWeight=500;
    y.style.color='black';
  }
}

function visibleb(){
    var x = document.getElementById("bb");
    var y=document.getElementById("b");
  if (x.style.visibility === 'hidden') {
    x.style.visibility = 'visible';
    y.style.fontWeight=1000;
    y.style.color='red';
  } else {
    x.style.visibility = 'hidden';
    y.style.fontWeight=500;
    y.style.color='black';
  }
}

function visiblec(){
    var x = document.getElementById("cc");
    var y=document.getElementById("c");
  if (x.style.visibility === 'hidden') {
    x.style.visibility = 'visible';
    y.style.fontWeight=1000;
    y.style.color='red';
  } else {
    x.style.visibility = 'hidden';
    y.style.fontWeight=500;
    y.style.color='black';
  }
}

function visibled(){
    var x = document.getElementById("dd");
    var y=document.getElementById("d");
  if (x.style.visibility === 'hidden') {
    x.style.visibility = 'visible';
    y.style.fontWeight=1000;
    y.style.color='red';
  } else {
    x.style.visibility = 'hidden';
    y.style.fontWeight=500;
    y.style.color='black';
  }
}
let buy_button = document.getElementById('buy-1');
let buy_button_2 = document.getElementById('buy-2');
let buy_button_3 = document.getElementById('buy-3');

let mem_card ;
buy_button.addEventListener('click',(e) =>{
  e.preventDefault();
  localStorage.setItem('mem_card',1);
  localStorage.setItem('hotelid',false);
  console.log("Test");
  window.location.href = 'payment.html';
  
})
buy_button_2.addEventListener('click',(e) =>{
  e.preventDefault();
  localStorage.setItem('mem_card',1);
  localStorage.setItem('hotelid',false);
  console.log("Test");
  window.location.href = 'payment.html';
  
})
buy_button_3.addEventListener('click',(e) =>{
  e.preventDefault();
  localStorage.setItem('mem_card',1);
  localStorage.setItem('hotelid',false);
  console.log("Test");
  window.location.href = 'payment.html';
  
})
function checkUserLogin(){
  if(localStorage.getItem("login")=="true"){
   user_name = localStorage.getItem('user_name')
   let newUserp = document.getElementById("pright");
    newUserp.innerHTML = `<div><span id="user-image-pr" class="usericonn"><button id="logout-btnp"> ${user_name}</button></span></div>`;
    let logoutp = document.getElementById("logout-btnp");
    logoutp.addEventListener("click",(e)=>{
     // e.preventDefault();
     console.log(e);
     logoutUser();
   })
  }
}
checkUserLogin();