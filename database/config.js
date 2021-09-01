const mongoose = require('mongoose');
const dbConnection = async() => {

    try {

        if(process.env.NODE_ENV === 'test') {
            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);

            await mockgoose.prepareStorage()
            await mongoose.connect( process.env.DB_CNN , {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            
        } else {

            await mongoose.connect( process.env.DB_CNN , {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true
            });

            console.log('DB Online');
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }


}

module.exports = {
    dbConnection
}