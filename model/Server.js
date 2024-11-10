import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import tiendaRoutes from "../routes/tienda.routes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.cors = cors;
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.set('view engine', 'ejs');
        this.app.use( this.cors() );
        this.app.use( express.json() );
        this.app.use( bodyParser.urlencoded({extended: true}) )
        this.app.use( express.static('public') );

    }

    routes(){
        this.app.use('/api', tiendaRoutes);
    }

    listen(){
        this.app.listen(this.port, '0.0.0.0', () =>{
            console.log(`Server port ${ this.port }`);
        });
    }
}