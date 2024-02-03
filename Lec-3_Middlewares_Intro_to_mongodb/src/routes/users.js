const express = require('express');

const router = express.Router();

// Assignaments:

// create a data.json file and put users data there
// read file and content from the file
// store into a variable users from file.


let users = [
    {id: 1, name:'Ashwani'},
    {id: 2, name:'Durgesh'},
    {id: 3, name:'Geetha'},
    {id: 4, name:'Sanket'},
    {id: 5, name:'Umesh'},
];

router.get('/', (req, res)=>{ // -> /-> /api/users 
    try{
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('x-api-key', '12DEFarrt$$55');
        res.status(200).json(users);
    }catch(error) {
        res.status(500).json({error: 'Internal Server Error'})
    }
});

router.get('/:id', (req, res)=>{ // -> /-> /api/users/:id 
    try{
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('x-api-key', '12DEFarrt$$55');
       
        const id = parseInt(req.params.id);
        const user = users.find(user=> user.id === id);

        if(!user) {
           return res.status(404).json({error: 'User not found!'});
        }

        res.status(200).json(user);
    }catch(error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.post('/', (req, res)=>{
    try{

        const { name } = req.body;

        if(!name){
            return res.status(400).json({error: 'Name is required'});
        }

        const id  = users.length + 1;

        const newUser = {id, name};

        users.push(newUser);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(newUser);
    }catch(error) {
       res.status(500).json({error: 'Internal Server Error'});
    }
});

router.put('/:id', (req, res) => { // update the request
   try{

        const id = parseInt(req.params.id);

        const idx = users.findIndex(user => user.id === id);

        if(idx === -1) {
            return res.status(404).json({error: 'User not found!'});
        }

        users[idx] = {...users[idx], ...req.body};

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({message: 'User name has been updated successfully!'});
   } catch(error){
     res.status(500).json({error: 'Internal Server Error'});
   }
});


router.delete('/:id', (req, res)=>{

    try{

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({message: 'User has been delete!'});
    } catch(error){
     res.status(500).json({error: 'Internal Server Error'});
   }

});



module.exports = router;