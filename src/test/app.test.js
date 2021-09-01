process.env.NODE_ENV = 'test';

const request = require('supertest')
const app = require('../../index')
const expect = require('chai').expect;


/**
 * Prueba Listar Usuarios 
 */

describe('Probando endpoint', async () =>  {


    it ('api/usurios POST', async ()  => {

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

    it ('api/usurios GET ALL', async ()  => {

            const res = await request(app)
                .get('/api/usuarios')
                .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)

                    expect(res.body.usuarios[0]).to.contain.property('uid')
                    expect(res.body.usuarios[0]).to.contain.property('nombre')
                    expect(res.body.usuarios[0]).to.contain.property('username')
    })

    it (' api/login POST', async ()  => {

        const res = await request(app)
            .post('/api/login')
            .set('Accept', 'application/json')
            .send({
                password:"123456",
                username: "carlos2000"
            })
            .expect('Content-Type', /json/)
            .expect(200)

            expect(res.body.ok).to.equal(true)

    })

    it (' api/tareas POST', async ()  => {
        
        const res = await request(app)
            .post('/api/tareas')
            .set('Accept', 'application/json')
            .send({
                    nombre: "Tarea 90",
                    descripcion: "Descripcion Tarea 90"
                })
            .expect('Content-Type', /json/)
            .expect(200)

            console.log('res', res)

            expect(res.body.ok).to.equal(true)
            expect(res.body.tarea).to.contain.property('estado')
            expect(res.body.tarea).to.contain.property('nombre')
            expect(res.body.tarea).to.contain.property('descripcion')
            expect(res.body.tarea).to.contain.property('iduser')
            expect(res.body.tarea).to.contain.property('fechaCreacion')
            expect(res.body.tarea).to.contain.property('fechaActualizacion')
            expect(res.body.tarea).to.contain.property('uid')
    })

    it (' api/tareas GET ALL', async ()  => {

        

        const res = await request(app)
            .get('/api/tareas')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)

            expect(res.body.ok).to.equal(true)
            expect(res.body.tareas[0]).to.contain.property('estado')
            expect(res.body.tareas[0]).to.contain.property('nombre')
            expect(res.body.tareas[0]).to.contain.property('descripcion')
            expect(res.body.tareas[0]).to.contain.property('iduser')
            expect(res.body.tareas[0]).to.contain.property('fechaCreacion')
            expect(res.body.tareas[0]).to.contain.property('fechaActualizacion')
            expect(res.body.tareas[0]).to.contain.property('uid')
    })


})