const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
var settings = require('../setting');

const PROTO_PATH = settings.PROJECT_DIR + '/proto/auth.proto';
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const auth_proto = grpc.loadPackageDefinition(packageDefinition).auth;

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
    callback(null, { message: 'Hello ' + call.request.name });
}

const server = new grpc.Server()

server.addService(auth_proto.AuthService.service, {
    sayHello: sayHello,
})
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())

module.exports = server