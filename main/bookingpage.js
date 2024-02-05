let bookedhotels = document.getElementById('bookedhotels')
let userid
userid = localStorage.getItem('userid'); // to load bookings for current logged in user 
let baseserverUrl = `https://apicyberfusion.onrender.com/users/${userid}`

async function fetchBookedData(url) {
    try {
        let res = await fetch(`${url}`);
        let data = await res.json();
        console.log(data);
        bookingCard(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


fetchBookedData(baseserverUrl)

function bookingCard(data) {
    let cardlist = document.createElement('div');
    cardlist.className = 'card-list';

    data.bookings.forEach((item) => {
        let shbzcard = document.createElement('div')
        shbzcard.className = 'shbzcard'

        let cardimgbody = document.createElement('div');
        cardimgbody.className = 'shbzcardimgbody';
        let bookedcardimg = document.createElement('img');
        bookedcardimg.className = 'shbzcardimg'
        bookedcardimg.src = `./${item.image}`;
        bookedcardimg.setAttribute('alt', 'image')


        let bookedcardElem = document.createElement('div');
        bookedcardElem.className = 'shbzcardelements';

        let bookedcardhead = document.createElement('h2');
        bookedcardhead.className = 'shbzcardheading';
        bookedcardhead.innerHTML = item.name;

        let bookedcardaddress = document.createElement('p');
        bookedcardaddress.className = 'shbzcardaddress';
        bookedcardaddress.innerHTML = item.address;

        let bookedcardcountry = document.createElement('p');
        bookedcardcountry.className = 'shbzcardcountry';
        bookedcardcountry.innerHTML = `${item.region}, ${item.country}`;
        

        bookedcardElem.append(bookedcardhead, bookedcardaddress, bookedcardcountry)

        cardimgbody.append(bookedcardimg)

        shbzcard.append(cardimgbody, bookedcardElem)
        cardlist.append(shbzcard)

    })
    bookedhotels.append(cardlist)

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