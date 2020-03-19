const service = require('../services/user-service')
class UserController {
    constructor(){}
    addUser = async (req, res) => {
        try {
            const result = await service.createUser(req)
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error:e.message})
        }
    }
    deleteUser = async (req, res) => {
        try {
            const result = await service.removeUser(req.params.id, res)
            console.log("hi");
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    updateUser = async (req, res) => {
        try {
            
            const result = await service.uptodateUser(req)
            console.log("asdas");
            res.status(201).send(result)
        } catch (e) {
            res.status(400).send({error: e.message})
        }
    }
    
    getUser = async (req, res) => {
        try {            
            const result = await service.readUser(req.params)
            res.status(201).send(result)
        } catch (e) {
            console.log("oshibka");
            res.status(400).send({error:e.message})
        }
    }
    
}

module.exports = UserController;