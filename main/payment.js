const btn1 = document.querySelector("#rQbtn-r-1");
const btn2 = document.querySelector("#rQbtn-r-2");
const btn3 = document.querySelector("#rQbtn-r-3");
const btn4 = document.querySelector("#rQbtn-r-4");
const btn5 = document.querySelector("#rQbtn-r-5");
const btn6 = document.querySelector("#rQbtn-r-6");
const btn7 = document.querySelector("#rQbtn-r-7");

let list = document.querySelectorAll(".r-Queue");

btn1.addEventListener("click", function () {
  toggleDivVisibility(this.id);
});
btn2.addEventListener("click", function () {
  toggleDivVisibility(this.id);
});
btn3.addEventListener("click", function () {
  toggleDivVisibility(this.id);
});
btn4.addEventListener("click", function () {
  toggleDivVisibility(this.id);
});
btn5.addEventListener("click", function () {
  toggleDivVisibility(this.id);
});
btn6.addEventListener("click", function () {
  toggleDivVisibility(this.id);
});
btn7.addEventListener("click", function () {
  toggleDivVisibility(this.id);
});

function toggleDivVisibility(btnId) {
  const divId = `rQ-${btnId.split("-")[2]}`; // Extract the number from the button ID
  const divToToggle = document.getElementById(divId);

  if (divToToggle.style.display === "none") {
    divToToggle.style.display = "block";
  } else {
    divToToggle.style.display = "none";
  }
}

function validateDeliveryForm() {
  // Get the values of the input fields
  var emailValue = document.getElementById("formGroupExampleInput").value;
  var firstNameValue = document.getElementById("firstName").value;
  var lastNameValue = document.getElementById("lastName").value;
  var countyValue = document.getElementById("exampleSelect").value;
  var addressValue = document.getElementById("formGroupExampleInput1").value;
  var cardValue = document.getElementById("rCard").value;
  var cvvValue = document.getElementById("rcvv").value;
  var phoneValue = document.getElementById("Phone").value;
  var dobValue = document.getElementById("d-o-b").value;

  // Checking if any of the required fields are empty
  if (
    emailValue === "" ||
    firstNameValue === "" ||
    lastNameValue === "" ||
    countyValue === "Choose a county" ||
    addressValue === "" ||
    cardValue === "" ||
    cvvValue === "" ||
    phoneValue === "" ||
    dobValue === ""
  ) {
    alert("All * fields are mandatory. Please fill in all required fields.");
  } else {
    alert("Payment  successful!");
  }
}

// Script for the payment section
let payment_desc = document.getElementById('payment-desc');
let payment_price = document.getElementById('payment-price');
console.log(payment_desc.innerText)
console.log(payment_price.innerText)

// checking which hotel card is checked
let total_price = document.getElementById('total-price');
let checkbox_2 = document.getElementById('rcheckbox-2');
let checkbox_2_text = document.getElementById('rcheckbox-2-text');
let checkbox_2_price = document.getElementById('rcheckbox-2-price');
checkbox_2.addEventListener('click',()=>{
  console.log(checkbox_2.checked)
  if(checkbox_2.checked){
    checkbox_3.checked = false;
    checkbox_4.checked = false;
    payment_desc.innerText = checkbox_2_text.innerText;
    payment_price.innerText = checkbox_2_price.innerText;
    total_price.innerText = checkbox_2_price.innerText;
  }
})

let checkbox_3 = document.getElementById('rcheckbox-3');
let checkbox_3_text = document.getElementById('rcheckbox-3-text');
let checkbox_3_price = document.getElementById('rcheckbox-3-price');
checkbox_3.addEventListener('click',()=>{
  console.log(checkbox_3.checked)
  if(checkbox_3.checked){
    checkbox_2.checked = false
    checkbox_4.checked = false
    payment_desc.innerText = checkbox_3_text.innerText;
    payment_price.innerText = checkbox_3_price.innerText;
    total_price.innerText = checkbox_3_price.innerText;
  }
})

let checkbox_4 = document.getElementById('rcheckbox-4');
let checkbox_4_text = document.getElementById('rcheckbox-4-text');
let checkbox_4_price = document.getElementById('rcheckbox-4-price');
checkbox_4.addEventListener('click',()=>{
  console.log(checkbox_4.checked)
  if(checkbox_4.checked){
    checkbox_2.checked = false;
    checkbox_3.checked = false;
    payment_desc.innerText = checkbox_4_text.innerText;
    payment_price.innerText = checkbox_4_price.innerText;
    total_price.innerText = checkbox_4_price.innerText;
  }
})
// for loading the hotel booking in payment 
let hotelid = localStorage.getItem('hotelid');
let mem_card = localStorage.getItem('mem_card');
if(hotelid != "false"){
  let container1 = document.getElementById('main-container')
  let details =[];
container1.innerHTML = ""
fetch(`https://apicyberfusion.onrender.com/hotels/${hotelid}`)
.then(res => res.json())
.then(data =>{
  details.push(data);
  CreateCards(details);
})

console.log("Hotel id is ",hotelid)
function CreateCards(details) {
  let container = document.getElementsByClassName("a-container");
  // container.innerHTML = "";
  details.forEach((element) => {
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

    // let book = document.createElement("button");
    // book.className = "page-item";
    // book.setAttribute("class", "book-button");
    // book.innerText = "Book Now";

    cardDetails.append(h1, small, p1, p2, p3, p4, h4, h3);

    // let hr1=document.createElement("hr");

    cardContainer.append(image, cardDetails);

    // let hr2=document.createElement("hr");

    container1.append(cardContainer);
    container[0].append(container1)
    payment_desc.innerText = element.name
    payment_price.innerText = `${element.price} CHF`
    total_price.innerText = `${element.price} CHF`
  });
}

}
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