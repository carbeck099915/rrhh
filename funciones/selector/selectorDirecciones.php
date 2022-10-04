<?php

	require_once "../../conexion/conexion.php";

 	function getObtener(){

 		extract($_POST);

		$conexionRecuperada= new conexion();
	 	$conexionEstablecida=$conexionRecuperada->cConexion();

	 	$conexionEstablecida->exec("set names utf8");

	 	$query="SELECT b.estado,a.id_FisicamenteEstructura,a.descripcionFisicamenteEstructura FROM th_fisicamenteestructura AS a LEFT JOIN th_ingresosadmin AS b ON a.id_FisicamenteEstructura=b.idFisicamenteEstructura WHERE a.estado='A' AND (b.estado IS NULL OR b.estado='I') GROUP BY a.id_FisicamenteEstructura;";
	 	$resultado = $conexionEstablecida->query($query);


	 	while ($resultado2=$resultado->fetch()) {
	 	
	 		$listas.="<option value='".$resultado2["id_FisicamenteEstructura"]."'>".strtoupper($resultado2["descripcionFisicamenteEstructura"])."</option>";

	 	}

	 	return $listas;


 	}

 	echo getObtener();
