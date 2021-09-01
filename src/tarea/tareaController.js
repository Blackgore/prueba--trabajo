const { response } = require('express');
const Tarea = require('../models/tarea');



const getTareas = async(req, res) => {

    const { iduser } = req.session
    const desde = Number(req.query.desde) || 0;

    const [ tareas, total ] = await Promise.all([
        Tarea
            .find({iduser}, 'nombre iduser descripcion estado fechaCreacion fechaActualizacion')
            .skip( desde )
            .limit( 5 ),
        Tarea.countDocuments()
    ]);


    res.json({
        ok: true,
        tareas,
        total
    });

}

const crearTarea = async(req, res = response) => {

    const { nombre } = req.body;

    try {

        const existeTarea = await Tarea.findOne({ nombre });

        if ( existeTarea ) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe una tarea con el nombre ${ nombre }`
            });
        }

        const newtarea = req.body
        newtarea.iduser = req.session.iduser

        const tarea = new Tarea(newtarea);
    
        // Guardar tarea
        await tarea.save();


        res.json({
            ok: true,
            tarea,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}


const actualizarTarea = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el tarea correcto

    const { nombre, estado } = req.body 
    const  iduser  = req.session.iduser

    try {

        const tareaDB = await Tarea.findOne({iduser, nombre});
        if ( !tareaDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'La tarea no existe'
            });
        }

        const { _id } = tareaDB 
        tareaDB.estado = estado
        tareaDB.fechaActualizacion = new Date()
        // Actualizaciones
        
        const tareaActualizado = await Tarea.findByIdAndUpdate( _id, tareaDB, { new: true } );

        res.json({
            ok: true,
            tarea: tareaActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarTarea = async(req, res = response ) => {

    const { nombre } = req.body
    const iduser = req.session.iduser
    
    try {

        const tareaDB = await Tarea.findOne({ nombre, iduser });

        if ( !tareaDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un tarea por ese id'
            });
        }
        
        const { _id } = tareaDB
        await Tarea.findByIdAndDelete( _id );

        
        res.json({
            ok: true,
            msg: 'Tarea eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}



module.exports = {
    getTareas,
    crearTarea,
    actualizarTarea,
    borrarTarea
}