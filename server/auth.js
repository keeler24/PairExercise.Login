const router = require('express').Router()
const {User} = require('./db')
module.exports = router


// auth routes go below!
router.put('/login', (req, res, next) =>{
    // req.session
    const email = req.body.email
    const password = req.body.password

    User.findOne({where:{email, password}})
        .then((resp) => {
            if(resp) res.json(resp)
            else{
                const notFound = new Error('Incorrect email or password!')
                notFound.status = 401
                next(notFound)
            }
        })
        .catch(next)

})