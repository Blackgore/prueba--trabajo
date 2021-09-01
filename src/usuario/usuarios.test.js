process.env.NODE_ENV = 'test';

const request = require('supertest')
const app = require('../../index')
const expect = require('chai').expect;
const mock = require('./usuariosMock')
/**
 * Prueba Listar Usuarios 
 */

describe('/api/usuarios/ api', async () =>  {


    it ('POST', async ()  => {

        const res = await request(app)
            .post('/api/usuarios')
            .set('Accept', 'application/json')
            .send({
                nombre: "carlos1",
                password:"123456",
                username: "carlos2000"
            })
            .expect('Content-Type', /json/)
            .expect(200)


            expect(res.body.ok).to.equal(true)
                expect(res.body.usuario).to.contain.property('uid')
                expect(res.body.usuario).to.contain.property('nombre')
                expect(res.body.usuario).to.contain.property('username')

    })

    it ('GET ALL', async ()  => {

            const res = await request(app)
                .get('/api/usuarios')
                .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)

                    expect(res.body.usuarios[0]).to.contain.property('uid')
                    expect(res.body.usuarios[0]).to.contain.property('nombre')
                    expect(res.body.usuarios[0]).to.contain.property('username')
        })

})
