<?php

	require_once "../../conexion/conexion.php";

 	function getObtenerRol(){

 		extract($_POST);

		$conexionRecuperada= new conexion();
	 	$conexionEstablecida=$conexionRecuperada->cConexion();

	 	$conexionEstablecida->exec("set names utf8");

	 	$query="SELECT distinct id_area, descripcionArea from th_area WHERE estado = 'A';";
	 	$resultado=$conexionEstablecida->query($query);


	 	$listas="<option value='0'>--Elige una Area--</option>";

	 	while ($resultado2= $resultado->fetch()) {
	 	
	 		$listas.="<option value='".$resultado2["id_area"]."'>".utf8_decode(utf8_encode($resultado2["descripcionArea"]))."</option>";

	 	}

	 	return $listas;


 	}

 	echo getObtenerRol();