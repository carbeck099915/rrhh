<?php

	require_once "../../conexion/conexion.php";

 	function getObtenerRol(){

 		extract($_POST);

		$conexionRecuperada= new conexion();
	 	$conexionEstablecida=$conexionRecuperada->cConexion();

	 	$conexionEstablecida->exec("set names utf8");

	 	$query="SELECT distinct id_Estructura2, descripcionEstructura2 from th_estructura2 WHERE estado = 'A';";
	 	$resultado=$conexionEstablecida->query($query);


	 	$listas="<option value='0'>--Elige un Estructura 2--</option>";

	 	while ($resultado2= $resultado->fetch()) {
	 	
	 		$listas.="<option value='".$resultado2["id_Estructura2"]."'>".utf8_decode(utf8_encode($resultado2["descripcionEstructura2"]))."</option>";

	 	}

	 	return $listas;


 	}

 	echo getObtenerRol();