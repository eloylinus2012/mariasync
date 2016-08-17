# mariasync

El presente proyecto es un desarrollo que sirve como base para el desarrollo de aplicaciones de software basadas en nodejs+mariadb 
mediante un modelo RESTful.

Contiene la plantilla inicial funcional para que se inicien desarrollos de cualquier tipo.

app.js

El controlador que atiende las operaciones se llama operaciones.js y se encuentra dentro del directorio routes.

var operaciones = require('./routes/operaciones');
app.use('/operaciones', operaciones);

Se usa la libreria mysql agregada mediante npm install mysql

La referencia en el archivo operaciones.js a la librería se atiende mediante en require:

var mysql = require('mysql');

Para crear una conexión se realiza mediante:

var con = mysql.createConnection({
  host: "localhost",
  user: "usuario",
  password: "password",
  database: "basedatos"
});

Las operaciones se encuentran implementadas de la siguiente manera tomando como ejemplo una tabla llamada trabajadores:

CREATE TABLE `trabajadores` (
  `trab_id` int(11) NOT NULL AUTO_INCREMENT,
  `trab_id_empresa` varchar(5) DEFAULT NULL,
  `trab_nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`trab_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9001 DEFAULT CHARSET=big5;

Se muestra la operación 'operaciones/insert' GET

router.get('/insert', function(req, res, next) {
	var trabajador = { trab_id_empresa: '12345', trab_nombre: 'Juan Perez' };

	con.query('INSERT INTO trabajadores SET ?', trabajador, function(err,res){
	  if(err) throw err;
	  console.log('INSERTANDO');
	  console.log('Last insert ID:', res.insertId);
	});
	
  res.send('insert');
});

El llamado a la operación insert se realiza mediante:

http://localhost:3000/operaciones/insert (GET)



