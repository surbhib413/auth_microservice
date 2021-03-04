const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

//import sinon
const sinon = require('sinon')
const user = require('../controller/user')



describe('User', function () {

    describe('sayHello', function () {
        it('app should return hello', function () {
            assert.equal(user.test(), 'hello')
        })
    });

    describe('testing using spies', function () {
        it("should return index page", function () {
            let req = {};
            let res = {
                send: sinon.spy()
            }
            user.getIndexPage(req, res);
            console.log(res.send);
            // `res.send` called once
            expect(res.send.calledOnce).to.be.true;
            // expect to get argument `bla` on first call
            expect(res.send.firstCall.args[0]).to.equal("Hey");
        });
    });

    describe('testing using stubs', function () {
        it("should send hey when user is logged in", function () {
            // instantiate a user object with an empty isLoggedIn function
            let loggedUser = {
                isLoggedIn: function () { }
            }

            // Stub isLoggedIn function and make it return true always
            const isLoggedInStub = sinon.stub(loggedUser, "isLoggedIn").returns(true);

            // pass user into the req object
            let req = {
                user: loggedUser
            }


            let res = {
                // replace empty function with a spy
                send: sinon.spy()
            }

            user.checkLoggedUser(req, res);
            // let's see what we get on res.send
            // console.log(res.send);
            // `res.send` called once
            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.equal("Hey you are already logged in");

            // assert that the stub is logged in at least once
            expect(isLoggedInStub.calledOnce).to.be.true;
        });
    });


});