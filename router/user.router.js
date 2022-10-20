const router = require("express").Router()

const UserController = require('../controller/user.controller')
const { tokenVerification } = require('../middleware/auth/verify.middleware')


router.post('/signup', UserController.signupUser)
router.post('/login', tokenVerification, UserController.loginUser)
// router.post('/all', tokenVerification, UserController.findAllUser)
// router.post('/all/:id', tokenVerification, UserController.findOneUser)
// router.put('/update/:id',tokenVerification, UserController.updateUser)
// router.delete('/delete/:id', tokenVerification, UserController.deleteUser)

// router.post('/activate', UserController.accountActivate)


module.exports = router;
