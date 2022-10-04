<?php

	require_once "../../conexion/conexion.php";

 	function getObtenerRol(){

 		extract($_POST);

		$conexionRecuperada= new conexion();
	 	$conexionEstablecida=$conexionRecuperada->cConexion();

	 	$conexionEstablecida->exec("set names utf8");

	 	$query="SELECT distinct id_GrupoOcupacional, descripcionGrupoOcupacional from th_grupoocupacional WHERE estado = 'A';";
	 	$resultado=$conexionEstablecida->query($query);


	 	$listas="<option value='0'>--Elige un Grupo Ocupacional--</option>";

	 	while ($resultado2= $resultado->fetch()) {
	 	
	 		$listas.="<option value='".$resultado2["id_GrupoOcupacional"]."'>".utf8_decode(utf8_encode($resultado2["descripcionGrupoOcupacional"]))."</option>";

	 	}

	 	return $listas;


 	}

 	echo getObtenerRol();