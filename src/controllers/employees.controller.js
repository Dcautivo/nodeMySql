import { pool } from '../db.js'
//Obtener todo el empleado de BD
export const getEmployees = async (req, res) => {

    try {

        const [rows] = await pool.query('SELECT * FROM employee')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: "Error en obtener empleados"
        })
    }

}
//Obtener un solo empleado de BD
export const getEmployee = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])
        //Mensaje cuando no encuentra empleados
        if (rows.length <= 0) return res.status(404).json({
            message: 'Empleados no funciona'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'No encontro empleado'
        })
    }
}


//Agregar emepleado a BD
export const createEmployees = async (req, res) => {

    const { name, salary } = req.body

    try {
        const [rows] = await pool.query('INSERT INTO employee(name, salary) VALUES (?, ?)', [name, salary])

        res.send({//Inserta a base datos
            id: rows.insertId,
            name,
            salary,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


//Eliminar empleados
export const deleteEmployees = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])
        //Mensaje al eliminar
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Employee not found'
        })

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


//Actualizar empleados
export const updateEmployees = async (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body

    try {
        //Actualizar empleados en base de datos
        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id])
        //Mensaje al actualizar empleados en base de datos
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Employee no found'
        })

        const [rows] = await pool.query('SELECT * FROM employee WHERE id= ?', [id])

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}