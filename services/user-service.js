const utility = require("../utilities/utility")
const user = require("../db/modals/user")

createUser = async (req, res) => {
    try {
        const isValid = await utility.validateData(req, res)
        if (isValid) {
            const data = req.body
            const hashedPassword = utility.hashPassword(data.password)
            data.password = hashedPassword
            const result = await createNewUser(data)

            res.message = 'user registered successfully'
            utility.handleInfo(req, res, [])
        }
    } catch (err) {
        console.log(err)
        utility.handleError(req, res)
    }
}

loginUser = async (req, res) => {
    try {
        const result = await getUserById({ user_id: req.body.user_id })
        console.log("login result",result);
        if(result){
            console.log("after login",result);
            const isCorrect = utility.comparePassword(req.body.password, result.password)
            if (isCorrect) {
                const token = utility.generateJwtToken(result)
                const data = { 'token': token ,
                                'role' : result.role,
                                'profile_name':result.profile_name,
                                'profile_url':result.profile_url}
            
                res.message = "valid credentials"
                utility.handleInfo(req, res, [data])
            }
            else{
                utility.handleInvalidInfo(req,res);
            }
        }
        else{
            utility.handleInvalidInfo(req,res);
        }
        
    } catch (err) {
        console.log(err)
        utility.handleError(req, res)
    }
}

getUserList = async () => {
    const query = {
        text: 'SELECT * FROM users'
    }
    try {
        const result = await pool.query(query)
        return result.rows
    } catch (err) {
        console.log(err)
    }
}

getUserById = async (query) => {
    return new Promise((resolve, reject) => {
        user.findOne(query, (err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}

createNewUser = async (data) => {
    return new Promise((resolve, reject) => {
        let _user = new user(data)
        _user.save((err, result) => {
            err ? reject(err) : resolve(result)
        })
    })
}





// exports.test = function () {
//     return 'hello'
// }

module.exports = {
    createUser,
    loginUser,
    getUserList,
    getUserById,
    createNewUser,
    test: () => {
        return 'hello';
    },
    getIndexPage: (req, res) => {
        res.send("Hey");
    },
    checkLoggedUser: (req, res) => {
        if (req.user.isLoggedIn()) {
            res.send("Hey you are already logged in");
        } else {
            res.send("Ooops. You need to log in to access this page");
        }
    }
}