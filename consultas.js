const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1313',
    database: 'bancosolar',
    port: 5432
   
})

const insertar = async (datos) => {

    const consulta = {
        text: "INSERT INTO usuarios (nombre, balance) VALUES ($1, $2)",
        values: datos,
    }
    try {
        const result = await pool.query(consulta)
        return result.rows[0]
    } catch (error) {
        console.log(error.code)
        return error
    }
}

const consultar = async () => {
    try {
        const result = await pool.query(`SELECT * FROM usuarios`)
        return result.rows
    } catch (error) {
        console.log(error.code)
        return error
    }
}

const eliminar = async (id) => {
    
    try {
        const result = await pool.query(
            `DELETE FROM usuarios WHERE id = '${id}'`
        )
        return result
    } catch (error) {
        console.log(error.code)
        return error
    }
}

const editar = async (datos) => {
    const consulta = {
        text: `UPDATE usuarios SET nombre = $2, balance = $3 WHERE id = $1`,
        values: datos,
    }
    try {
        const result = await pool.query(consulta)
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
        return error
    } 
}
    const realizaTransferencia = async (datos) => {

        const consultaRealizarTransferencia = {
            text: `INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *`,
            values: datos
        }
 
        const consultaEmisor = {
            text: `UPDATE usuarios SET balance = balance - $1 WHERE id = $2 RETURNING *`,
            values: [datos[2], datos[0]]
        }
        const consultaReceptor = {
            text: `UPDATE usuarios SET balance = balance - $1 WHERE id = $2 RETURNING *`,
            values: [datos[2], datos[1]]
        }
    try {
        await pool.query('BEGIN')
        const result = await pool.query(consultaRealizarTransferencia)
        await pool.query(consultaEmisor)
        await pool.query(consultaReceptor)
        await pool.query('COMMIT')
        return result.rows[0]
    } catch (error) {
        await client.query('ROLLBACK')
        return error
    }
}
const consultaTransferencia = async () => {
    const consulta = {
        text: 'SELECT * FROM transferencias'
    }

    try {
        const usuariosObjetos = await consultarUsuario()
        const result = await pool.query(consulta)
        const resultRows = result.rows

        const resultadoUsuarios= resultRows.map((transferencia) => {
            let emisor
            let receptor
            usuariosObjetos.forEach((usuario) => {
                if (usuario.id === transferencia.emisor) {
                    emisor = usuario.nombre
                }
            })

            usuariosObjetos.forEach((usuario) => {
                if (usuario.id === transferencia.receptor) {
                    receptor = usuario.nombre
                }
            })

            return [transferencia.id, emisor, receptor, transferencia.monto]
        })

        return resultadoUsuarios
    } catch (error) {        
        return error
    }
}
module.exports = { insertar, consultar, eliminar, editar, realizaTransferencia, consultaTransferencia }