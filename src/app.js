import express from "express";
import employeesRoutes from './routes/employees.routes.js';
import indexRoutes from './routes/index.routes.js';



const app = express();

app.use(express.json())// para ver informacion de backed

app.use(indexRoutes)
app.use('/api', employeesRoutes)

// Para mostrar mesnaje de errores de rutas que no existen
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;
