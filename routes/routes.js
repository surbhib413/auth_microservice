const userCtrl = require('../services/user-service')

module.exports = function (app) {

    /************* USER API  ****************/
    app.post('/createUser/', userCtrl.createUser)
    app.post('/user/', userCtrl.loginUser)
}