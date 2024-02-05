const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const bodyParser = require('body-parser');
// Use middleware to parse JSON request bodies
server.use(bodyParser.json());

//LOGIN
server.post('/login',(req,res)=>{
    const {email,password,username} = req.body;

    const user = router.db.get('users').find({email}).value();
    if(!user){
        return res.status(500).json("Invalid User")
    }
    if(password === user.password){
        const token = "Valid User"
        res.status(200).json({user})
    }
    else{
        return res.status(401).json({message:'Invalid credentials'})
    }
})

// Register
server.post('/register',(req,res) =>{
    const {email,password,username} = req.body;

    const existingUser = router.db.get('users').find({email}).value();
    if(existingUser){
        return res.status(400).json({message: 'User exists'});
    }
    const lastUserId = router.db.get('users').value().reduce((maxId,user) =>Math.max(maxId,user.id),0);
    const newUserId = lastUserId +1;
    const newUser = {
        id:newUserId,
        email,password,username
    }
    router.db.get('users').push(newUser).write();
    res.json({message: 'User Registered'});
})
// server.post('/hotels',(req,res) =>{
//     const {name,address,price,discount,rating,image,region,country} = req.body;
//     const hotelId = router.db.get('hotels').value().reduce((maxId,hotel) =>Math.max(maxId,hotel.id),0);
//     const newhotelId = hotelId +1;
//     const newhotel = {
//         id:newhotelId,
//         name,address,price,discount,rating,image,region,country
//     }
//     router.db.get('hotels').push(newhotel).write();
//     res.json({newhotel});
// })
server.use(middlewares)
server.use(router)
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
