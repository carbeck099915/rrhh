<?php

	require_once "../../conexion/conexion.php";

 	function getObtenerRol(){

 		extract($_POST);

		$conexionRecuperada= new conexion();
	 	$conexionEstablecida=$conexionRecuperada->cConexion();

	 	$conexionEstablecida->exec("set names utf8");

	 	$query="SELECT distinct id_FisicamenteEstructura, descripcionFisicamenteEstructura from th_fisicamenteestructura WHERE estado = 'A';";
	 	$resultado=$conexionEstablecida->query($query);


	 	$listas="<option value='0'>--Elige un Fisicamente--</option>";

	 	while ($resultado2= $resultado->fetch()) {
	 	
	 		$listas.="<option value='".$resultado2["id_FisicamenteEstructura"]."' idRecuperado='".$resultado2["id_FisicamenteEstructura"]."' idRecodigo='".$resultado2["descripcionFisicamenteEstructura"]."'>".utf8_decode(utf8_encode($resultado2["descripcionFisicamenteEstructura"]))."</option>";


	 	}

	 	return $listas;


 	}

 	echo getObtenerRol();