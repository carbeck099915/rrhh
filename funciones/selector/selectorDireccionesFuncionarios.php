<?php

	require_once "../../conexion/conexion.php";

 	function getObtener(){

 		extract($_POST);

		$conexionRecuperada= new conexion();
	 	$conexionEstablecida=$conexionRecuperada->cConexion();

	 	$conexionEstablecida->exec("set names utf8");

	 	$query="SELECT a.id_FisicamenteEstructura,a.descripcionFisicamenteEstructura FROM th_fisicamenteestructura AS a;";
	 	$resultado = $conexionEstablecida->query($query);

		$listas="<option value='0'>--SELECCIONE UNA DIRECCIÓN--</option>";

	 	while ($resultado2=$resultado->fetch()) {
	 	
	 		$listas.="<option value='".$resultado2["id_FisicamenteEstructura"]."'>".strtoupper($resultado2["descripcionFisicamenteEstructura"])."</option>";

	 	}

	 	return $listas;


 	}

 	echo getObtener();
