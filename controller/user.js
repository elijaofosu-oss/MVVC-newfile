const database = require('../model/database.json');
const fs = require('fs')

const saveToDB = (data)=> {
    return new Promise((resolve, reject) => {
        fs.writeFile('./model/database.json', data, (error, data)=> {
            if (error) {
                reject('Error writing to file')
            } else {
                resolve('File written successfully')
            }
        })
    })
}
const saveLogsToDB = (data)=> {
    return new Promise((resolve, reject) => {
        fs.appendFile('./model/logger.txt',data, (error, data)=> {
            if (error) {
                reject(error)
            } else {
                resolve('File written successfully')
            }
        })
    })
}

    const allUser = (req, res)=> {
    const users = database;
    res.status(200).json({data: users})
}

    const newUser = async (req, res)=> {
    const name = req.body.name;
    const gender = req.body.gender;
    const id = database.length + 1
    const user = {
        id: id,
        name: name,
        gender: gender,
    }
    // Update the Database Array
    database.push(user)
    await saveToDB(JSON.stringify(database, null, 2))
    // Send a response
    res.status(201).json({
        message: 'User created successfully',
        data: user
    })
}
const getOneUser = (req,res)=> {
    const id = req.params.id;
    const user = database.find((el) => el.id === +id)

    if(!user){
       return res.status(404).json('User not found')
    }   
    res.status(200).json({data: user})
}
 
const updateUser = async (req, res)=>{
    // const id = Number(req.params.id)
    const id = req.params.id;
    const user = database.find((el) => el.id === +id)

    if(user == null){
        return res.status(404).json({message: "User not found"})
    }

    if(req.body.name){
        user.name = req.body.name;
    }
    if (req.body.gender){
        user.gender = req.body.gender;
    }
    res.status(200).json({data: user})
     await saveToDB(JSON.stringify(database, null, 2))
}

const deleteUser = async (req, res)=> {
    const id = req.params.id;
    const index = database.findIndex((el) => el.id === +id)

    if(index === -1){
        return res.status(404).json({message: "User not found"})
    }

    const deletedUser = database.splice(index, 1)[0]
     await saveToDB(JSON.stringify(database, null, 2))
       res.status(200).json({data: deletedUser})
}

module.exports = {
    allUser,
    newUser,
    getOneUser,
    updateUser,
    deleteUser,
    saveLogsToDB



}