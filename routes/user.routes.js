const express = require('express')
const router = express.Router()
const {
    createUser,
    loginUser,
    deleteUserById,
    updateUser,
    getUserById,
    getAllUsers
} = require('./../controllers/user.controller')
const users = require('./../middlewares/validationBody')
const validateFields = require('./../middlewares/validationResult')

router.post('/register', users, validateFields, createUser)
router.post('/login', loginUser)
router.get('/get-user/:id', getUserById)
router.get('/get-users', getAllUsers)
router.delete('/delete-user/:id', deleteUserById)
router.put('/update-user/:id', updateUser)

module.exports = router