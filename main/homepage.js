//Login
let plogIn = document.getElementById("loginModal")
let ploginBtn = document.getElementById("plogin")
let passInput = document.getElementById("password");
let shwPass = document.querySelector(".show-password");
let peamail = document.getElementById('email').value;
let password = document.getElementById('password').value; 
let mainSection = document.getElementById("container");
let pagination = document.getElementById("p-pagination");
let signout = document.getElementById("signout");

// Adding user input---
let addNameInput = document.getElementById("regName");
let addEmailInput = document.getElementById("regEmail");
let addPassInput = document.getElementById("regPassword");
let userCreateBtn = document.getElementById("p-reg-btnn");
// let userRegBtn = document.getElementById("showRegistrationPage");
let userURL = "https://apicyberfusion.onrender.com/users";

let newUserp = document.getElementById("pright");

// Loginn--
let addUsernameLogin = document.getElementById("email");
let addPassLogin = document.getElementById("password");
let loginBtn = document.getElementById("prlogin-btn")

function openLogin(){
    plogIn.style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function closeLoginModal(){
    plogIn.style.display = 'none';
    document.body.style.overflow = 'auto';
}
ploginBtn.addEventListener("click",openLogin);
// Password
function togglePassword(){
  if(passInput.type === 'password'){
    passInput.type = 'text';
    shwPass.textContent = 'Hide';
  }else{
    passInput.type = 'password';
    shwPass.textContent = 'Show';
  }
}

function performLogin(){
  console.log(peamail);
  console.log(password);
  closeLoginModal();

}
let pregistration = document.getElementById('registrationPage');
function showRegistrationPage() {
    plogIn.style.display = 'none';
    pregistration.classList.remove('hidden');
    pregistration.style.display = 'block';

    document.body.style.overflow = 'hidden';
  }

  function showLoginForm() {
    document.getElementById('loginModal').style.display = 'block';
    document.getElementById('registrationPage').classList.add('hidden');
    document.body.style.overflow = 'hidden'; 
  }
  document.getElementById('createAccountBtn').addEventListener('click', (e)=>{
    e.preventDefault();
    showRegistrationPage();
  });
  function closeRegForm(){
    pregistration.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Bottom cards----Top offers--


let hotelURL = "https://apicyberfusion.onrender.com/hotels";
async function fetchData(url,pageNum){
  try{
    let res = await fetch(`${url}?_limit=6&_page=${pageNum||1}`);
    
    let totalBtn = res.headers.get("X-Total-Count");
    let numOfBtn = Math.ceil(totalBtn/5)
    createBtn(numOfBtn);
    let data = await res.json();
    renderCard(data);
    console.log(data);
  }
  catch(error){
    console.log(error);
  }
}
fetchData(hotelURL);

function renderCard(data){
  mainSection.innerHTML = "";
  const cardList = document.createElement("div");
  cardList.className = "p-cardlist";
  data.forEach((item)=>{
    let card = createCard(item);
    cardList.append(card);
  })
  mainSection.append(cardList);
}
function createCard(item){
  const card = document.createElement("div");
  card.className = "p-card";

  const image = document.createElement("img");
  image.src = `./${item.image}`;
  card.appendChild(image);

  const title = document.createElement("h3");
  title.className = "p-title";
  title.textContent = item.name;
  card.appendChild(title);

  const address = document.createElement("h6");
  address.className = "p-address"
  address.textContent = item.address;
  card.appendChild(address);

  const price = document.createElement("p");
  price.className = "p-price"
  price.textContent = `CHF ${item.price}`;
  card.appendChild(price);

  return card;

}

// Buttons//
let currentPage = 1; // Initialize with the first page
const maxButtonsToShow = 5;

function createBtn(number) {
  pagination.innerHTML = "";

  const startPage = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
  const endPage = Math.min(number, startPage + maxButtonsToShow - 1);

  if (currentPage > 0) {
    const prevBtn = createPaginationButton('Prev', currentPage - 1);
    pagination.appendChild(prevBtn);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = createPaginationButton(i, i);
    pagination.appendChild(pageBtn);
  }

  if (currentPage < number) {
    const nextBtn = createPaginationButton('Next', currentPage + 1);
    pagination.appendChild(nextBtn);
  }
}

function createPaginationButton(text, pageNum) {
  const pageBtn = document.createElement('button');
  pageBtn.className = "pagination-btn"
  pageBtn.innerText = text;
  pageBtn.addEventListener('click', () => {
    currentPage = pageNum;
    fetchData(hotelURL, pageNum);
    createBtn(number);
  });
  return pageBtn;
}

// Adding new user--
async function createNewData(url){
  try{
    const newUserData={
      email:addEmailInput.value,
      password:addPassInput.value,
      username:addNameInput.value,
    };
    let res = await fetch(url,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(newUserData),
    });
    const updateData = await res.json();
    console.log(updateData)
    localStorage.setItem('userid',updateData.id)
    localStorage.setItem('user_name',updateData.username)
    localStorage.setItem('login',true)
   
  }catch(error){
    console.log(error);
  }
}
userCreateBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  createNewData(userURL);
  alert("Registered Successfully....!")
  // const userNamep = addNameInput.value;
  closeRegForm();
  user_name = localStorage.getItem('user_name')
  newUserp.innerHTML = `<div><span id="user-image-pr" class="usericonn"><button id="logout-btnp"> ${user_name}</button></span></div>`;
  let logoutp = document.getElementById("logout-btnp");
   logoutp.addEventListener("click",(e)=>{
    // e.preventDefault();
    console.log(e);
    logoutUser();
  })

  // signout.style.display = 'block';
})
// Login data-------

let userid; // to store userid on login 
let user_name; // to store username on login
// localStorage.setItem('login',login);
async function loginData(){
  try{
   let res = await fetch(`https://apicyberfusion.onrender.com/users?email_like=${addUsernameLogin.value}`)
   let data = await res.json();
    
      console.log(data[0]);
      console.log(data[0].email,data[0].username,data[0].password);
      userid = data[0].id;
      user_name = data[0].username
      console.log(userid,user_name)
      
      if(addUsernameLogin.value ==  data[0].email && addPassLogin.value == data[0].password){
        alert("login successfull..");
        // store the userid,username and login in local storage for future use.
       let login = true;
        localStorage.setItem('userid',userid)
      localStorage.setItem('user_name',user_name);
      localStorage.setItem('login',login);
      user_name = localStorage.getItem('user_name')
        newUserp.innerHTML = `<div><span id="user-image-pr" class="usericonn"><button id="logout-btnp"> ${user_name}</button></span></div>`;
        let logoutp = document.getElementById("logout-btnp");
         logoutp.addEventListener("click",(e)=>{
          // e.preventDefault();
          console.log(e);
          logoutUser();
        })
      }else{
        alert("Invalid username and password")
      }
  }catch(error){
    console.log(error);
  }
}
loginBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  loginData();
})

// logic for booking button 

let booking = document.getElementById('booking');

booking.addEventListener('click',(e) =>{
  e.preventDefault();
  let login = localStorage.getItem('login');
  if(login == "true"){
    window.location.href = 'bookingpage.html'
  }
  else{
    alert("Please login to access your bookings")
  }
})


// Logout---
function logoutUser(){
  let login = false;
  alert("Logout Successfully");
  localStorage.setItem("login",login);
  newUserp.innerHTML = `<div id="pright">
  <div>
    <a href="./membershipPage.html"
      ><button id="pmembership">Membership</button></a
    >
    <button id="plogin">Log In</button>
  </div>

</div>`;

let plogIn = document.getElementById("loginModal")
let ploginBtn = document.getElementById("plogin")
let passInput = document.getElementById("password");
let shwPass = document.querySelector(".show-password");
let peamail = document.getElementById('email');
let password = document.getElementById('password'); 
let loginBtn2 = document.getElementById("loginclick");
ploginBtn.addEventListener("click",openLogin);
peamail.value= "";
password.value="";
}
// Serach
let searchRegBtn = document.getElementById("reg-serach");
let selectRegBtn = document.getElementById("select-reg");
searchRegBtn.addEventListener("click",(e)=>{
  e.preventDefault();
   console.log(selectRegBtn.value);
   localStorage.setItem("region", selectRegBtn.value);
   window.location.href="hotelPage.html";
})
// Check login
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