<?php

	require_once "../../conexion/conexion.php";

 	function getObtenerRol(){

 		extract($_POST);

		$conexionRecuperada= new conexion();
	 	$conexionEstablecida=$conexionRecuperada->cConexion();

	 	$conexionEstablecida->exec("set names utf8");

	 	$query="SELECT distinct id_PuestoInstitucional, descripcionPuestoInstitucional from th_puestoinstitucional WHERE estado = 'A';";
	 	$resultado=$conexionEstablecida->query($query);


	 	$listas="<option value='0'>--Elige un Puesto Institucional--</option>";

	 	while ($resultado2= $resultado->fetch()) {
	 	
	 		$listas.="<option value='".$resultado2["id_PuestoInstitucional"]."'>".utf8_decode(utf8_encode($resultado2["descripcionPuestoInstitucional"]))."</option>";

	 	}

	 	return $listas;


 	}

 	echo getObtenerRol();