var express = require('express');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "bench",
  password: "bench",
  database: "benchmark"
});

var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('raiz');
});

router.get('/insert', function(req, res, next) {
	var trabajador = { trab_rpe: '12345', trab_nombre: 'Juan Perez' };

	con.query('INSERT INTO trabajadores SET ?', trabajador, function(err,res){
	  if(err) throw err;
	  console.log('INSERTANDO');
	  console.log('Last insert ID:', res.insertId);
	});
	
	
	//res.render();	
  res.send('insert');
});


router.get('/select', function(req, res, next) {
	con.query('SELECT * FROM trabajadores limit 1000',function(err,rows){
	  if(err) throw err;

	  console.log('SELECCIONANDO');
	  console.log('Data received from Db:\n');
	  console.log(rows);
	});
	

  res.send('select 22');
});

router.get('/update', function(req, res, next) {
	con.query('UPDATE trabajadores SET trab_nombre = ?',["Juan Perez Actualizado"],
	  function (err, result) {
	    if (err) throw err;
	    console.log('ACTUALIZANDO trab_id');
	    console.log('Registros cambiados ' + result.changedRows);
	  }
	);	
  res.send('update');
});

router.get('/delete', function(req, res, next) {
	var trab_id= Math.floor(Math.random() * (9000 - 0) + 0);
	console.log(trab_id);
	con.query(
	  'DELETE FROM trabajadores WHERE trab_id ='+trab_id,[],
	  function (err, result) {
	    if (err) throw err;
	    console.log('BORRANDO');
	    console.log('Borrado ' + result.affectedRows + ' registro');
	  }

	);	
  res.send('delete');
});

module.exports = router;
