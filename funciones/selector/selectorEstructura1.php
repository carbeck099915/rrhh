<?php

	require_once "../../conexion/conexion.php";

 	function getObtenerRol(){

 		extract($_POST);

		$conexionRecuperada= new conexion();
	 	$conexionEstablecida=$conexionRecuperada->cConexion();

	 	$conexionEstablecida->exec("set names utf8");

	 	$query="SELECT distinct id_estructura1, descripcionestructura1 from th_estructura1 WHERE estado = 'A';";
	 	$resultado=$conexionEstablecida->query($query);


	 	$listas="<option value='0'>--Elige un Estructura 1--</option>";

	 	while ($resultado2= $resultado->fetch()) {
	 	
	 		$listas.="<option value='".$resultado2["id_estructura1"]."'>".utf8_decode(utf8_encode($resultado2["descripcionestructura1"]))."</option>";

	 	}

	 	return $listas;


 	}

 	echo getObtenerRol();