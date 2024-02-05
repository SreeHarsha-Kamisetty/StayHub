// logn and Membership     Start------>
//Login
let plogIn = document.getElementById("loginModal");
let ploginBtn = document.getElementById("plogin");
let passInput = document.getElementById("password");
let shwPass = document.querySelector(".show-password");
let peamail = document.getElementById("email").value;
let password = document.getElementById("password").value;

function openLogin() {
  plogIn.style.display = "block";
  document.body.style.overflow = "hidden";
}
function closeLoginModal() {
  plogIn.style.display = "none";
  document.body.style.overflow = "auto";
}
ploginBtn.addEventListener("click", openLogin);
// Password
function togglePassword() {
  if (passInput.type === "password") {
    passInput.type = "text";
    shwPass.textContent = "Hide";
  } else {
    passInput.type = "password";
    shwPass.textContent = "Show";
  }
}

function performLogin() {
  console.log(peamail);
  console.log(password);
  closeLoginModal();
}
let pregistration = document.getElementById("registrationPage");
function showRegistrationPage() {
  plogIn.style.display = "none";
  pregistration.classList.remove("hidden");
  pregistration.style.display = "block";

  document.body.style.overflow = "hidden";
}

function showLoginForm() {
  document.getElementById("loginModal").style.display = "block";
  document.getElementById("registrationPage").classList.add("hidden");
  document.body.style.overflow = "hidden";
}
document
  .getElementById("createAccountBtn")
  .addEventListener("click", showRegistrationPage);
function closeRegForm() {
  pregistration.style.display = "none";
  document.body.style.overflow = "auto";
}

// Login and memberShip   end----->

// Card creation   start ---->

let hotelURL = "https://apicyberfusion.onrender.com/hotels";
let container = document.getElementsByClassName("a-container");
let pagination = document.getElementsByClassName("a-pagination");

fetchData(hotelURL, 1);

async function fetchData(url, pageNo, qparams = "") {
  try {
    if(localStorage.getItem("region")){
      qparams=`&region_like=${localStorage.getItem("region")}`
    }
    //else{
    //   qparams="";
    // }
    let res = await fetch(`${url}?_limit=8&_page=${pageNo}${qparams}`);
    localStorage.removeItem("region");
    let totalPost = res.headers.get("X-Total-Count");
    let totalbtns = Math.ceil(totalPost / 8);

    pagination.innerHTML = null;
    for (let i = 1; i <= totalbtns; i++) {
      pagination[0].append(getAsButton(i, qparams));
    }

    let data = await res.json();
    console.log(data);
    CreateCards(data);
  } catch (error) {
    console.log(error);
  }
}

function CreateCards(data) {
  container.innerHTML = "";
  data.forEach((element) => {
    let cardContainer = document.createElement("div");
    cardContainer.setAttribute("class", "horizontal-card");

    let image = document.createElement("img");
    image.setAttribute("class", "card-img");
    image.alt = "Card Image";
    image.src = `./${element.image}`;

    let cardDetails = document.createElement("div");
    cardDetails.setAttribute("class", "card-details");

    let h1 = document.createElement("h1");
    h1.setAttribute("class", "card-title");
    h1.textContent = element.name;

    let small = document.createElement("small");
    small.setAttribute("class", "card-text");
    small.textContent = element.address;

    let p1 = document.createElement("p");
    p1.setAttribute("class", "card-text");
    let discount = document.createElement("button");
    discount.setAttribute("class", "bg-danger");
    discount.textContent = `Discount: ${element.discount * 100}%`;
    p1.appendChild(discount);

    let p2 = document.createElement("p");
    p2.setAttribute("class", "card-text");
    let s = document.createElement("s");
    s.textContent = `Original Price: CHF ${element.price * 2}`;
    p2.appendChild(s);

    let p3 = document.createElement("p");
    p3.setAttribute("class", "card-text");
    p3.textContent = `Book now for: CHF ${element.price}`;

    let p4 = document.createElement("p");
    p4.setAttribute("class", "card-text");
    p4.textContent = `Rating: ${element.rating}`;

    let h4 = document.createElement("h4");
    h4.setAttribute("class", "card-text");
    h4.textContent = `Region: ${element.region}`;

    let h3 = document.createElement("h3");
    h3.setAttribute("class", "card-text");
    h3.textContent = `Country: ${element.country}`;

    let book = document.createElement("button");
    book.className = "page-item";
    book.setAttribute("class", "book-button");
    book.innerText = "Book Now";
    book.addEventListener('click',()=>{
      if(localStorage.getItem("login")=="true"){
      hotelid = element.id;
      localStorage.setItem('hotelid',hotelid);
      localStorage.setItem('mem_card',false);
      window.location.href = 'payment.html';
      }else{
        alert("Please login to book!")
      }
   })

    cardDetails.append(h1, small, p1, p2, p3, p4, h4, h3, book);

    // let hr1=document.createElement("hr");

    cardContainer.append(image, cardDetails);

    // let hr2=document.createElement("hr");

    container[0].append(cardContainer);
  });
}

function getAsButton(text, qparams) {
  let btn = document.createElement("button");
  btn.setAttribute("data-id", text);
  btn.setAttribute("class", "a-each-button");
  btn.textContent = text;

  btn.addEventListener("click", (e) => {
    container[0].innerHTML = "";
    pagination[0].innerHTML = "";
    fetchData(hotelURL, e.target.dataset.id, qparams);
  });
  return btn;
}
// Sorting and filtering

let sort = document.getElementById("h-sort-by");

sort.addEventListener("click", () => {
  if (sort.value != "default" && sort.value == "price-low-to-high") {
    pagination[0].innerHTML = "";
    container[0].innerHTML = "";
    fetchData(hotelURL, 1, "&_sort=price&_order=asc");
  }
  if (sort.value != "default" && sort.value == "price-high-to-low") {
    pagination[0].innerHTML = "";
    container[0].innerHTML = "";
    fetchData(hotelURL, 1, "&_sort=price&_order=desc");
  }
  if (sort.value != "default" && sort.value == "rating-low-to-high") {
    pagination[0].innerHTML = "";
    container[0].innerHTML = "";
    pagination[0].innerHTML = "";
    container[0].innerHTML = "";
    fetchData(hotelURL, 1, "&_sort=rating&_order=asc");
  }
  if (sort.value != "default" && sort.value == "rating-high-to-low") {
    pagination[0].innerHTML = "";
    container[0].innerHTML = "";
    fetchData(hotelURL, 1, "&_sort=rating&_order=desc");
  }
});
let filter = document.getElementById("h-filter-by");

filter.addEventListener("click", () => {
  // if(filter.value != 'default' && filter.value == "Basel"){
  //   pagination[0].innerHTML = ""
  //   container[0].innerHTML = ""
  //   fetchData(hotelURL,1,'&region_like=Basel');

  // }
  // if(filter.value != 'default' && filter.value == "Aargau"){
  //   pagination[0].innerHTML = ""
  //   container[0].innerHTML = ""
  //   fetchData(hotelURL,1,'&region_like=Aargau');

  // }
  // if(filter.value != 'default' && filter.value == "Zurich"){
  //   pagination[0].innerHTML = ""
  //   container[0].innerHTML = ""
  //   fetchData(hotelURL,1,'&region_like=Zurich');

  // }
  // if(filter.value != 'default' && filter.value == "Styria"){
  //   pagination[0].innerHTML = ""
  //   container[0].innerHTML = ""
  //   fetchData(hotelURL,1,'&region_like=Styria');
  // }
  // if(filter.value != 'default' && filter.value == "Carintha"){
  //   pagination[0].innerHTML = ""
  //   container[0].innerHTML = ""
  //   fetchData(hotelURL,1,'&region_like=Carintha');
  // }
  if (filter.value != "default") {
    pagination[0].innerHTML = "";
    container[0].innerHTML = "";
    fetchData(hotelURL, 1, `&region_like=${filter.value}`);
  }
});
// Search functionality
let search_input = document.getElementById("h-input-selection");
let search_button =document.getElementById("h-submit-button");
let search_text = document.getElementById('h-input');
search_button.addEventListener('click',()=>{
  if(search_input.value != "default"){
    pagination[0].innerHTML = ""
    container[0].innerHTML = ""
    console.log(search_input.value,search_text.value)
    fetchData(hotelURL,1,`&${search_input.value}_like=${search_text.value}`)
  }
})
let memberShip = document.getElementById('pmembership');
memberShip.addEventListener('click',()=>{
  console.log("clicked");
  window.location.href = 'membershipPage.html'
})
// Login-----



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

// logic for booking page access
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