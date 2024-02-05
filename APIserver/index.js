

// function Hotel(name,address,price,discount,rating,image,region,country){
//     this.name = name
//     this.address = address
//     this.price = price
//     this.discount = discount
//     this.rating = rating
//     this.image = `./images/${country}/${region}/${image}.jpg`
//     this.region = region
//     this.country = country
// }
// const url = "http://localhost:3000/"
// let hotel1 = new Hotel("Seedamm Plaza","Seedammstrasse 3, Pfäffikon SZ, Zurich (region), Switzerland",220,0.5,4.5,2,"Zurich","Switzerland")
// console.log(hotel1);


// async function addData(obj){
//     let res = await fetch(`${url}hotels`, {
//         method: 'POST', 
//         headers: {
//             'Content-Type': 'application/json', 
//         },
//         body: JSON.stringify(obj),
//     })
//     let data = await res.json()
//     console.log(data)
// }
// addData(hotel1)