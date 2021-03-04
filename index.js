const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql');
const GrpcService = require("./services/grpc-service")
const schema = require('./schema/schema');
require('./db/connection')

const port = process.env.PORT || 2000

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Accept,Content-Length, X-Requested-With, X-PINGOTHER');
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};
app.use(allowCrossDomain);

require('./routes/routes')(app)

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    // pass in a schema property
    schema,
    graphiql: true
}));

app.get('/', (req, res) => {
    res.send('FAB authentication microservice')
})


/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
    callback(null, { message: 'Hello ' + call.request.name });
}

console.log('grpc server running at http://127.0.0.1:50051')
GrpcService.start()


app.listen(port, () => console.log(`app listening on port ${port}!`))