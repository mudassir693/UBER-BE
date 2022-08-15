import chai from 'chai';

import chaiHttp from 'chai-http'

import server from '../server.js'

chai.should()
chai.use(chaiHttp)

before(function(done){
    this.timeout(3000)
    setTimeout(done(), 3000)
})

describe('Server',()=>{
    it("should check server runs fine?",(done)=>{
        chai.request(server)
            .get('/')
            .end((err,resp)=>{
                resp.should.have.status(200)
                resp.body.should.have.property('error').eq(false)
                resp.body.should.have.property('data')
            })
            done()
    })
})