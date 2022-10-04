<?php
/*=============================================
=         CONEXIÓN A LA BASE DE DATOS =
=============================================*/
class conexion{
	
	public function cConexion(){

		try{

			error_reporting(0);

			$hostname= "127.0.0.1";
			$username= "ccesar";
			$password= "";
			$database= "ezonshar_mdepsaddb";


		    $conexion = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);

		    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		    return $conexion;
		    
		}catch(PDOException $e){

		    echo "ERROR: " . $e->getMessage();

		}

	}

}
