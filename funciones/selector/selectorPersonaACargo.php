<?php

	require_once "../../conexion/conexion.php";

 	function getObtenerPersonaACargo(){

 		extract($_POST);

		$conexionRecuperada= new conexion();
	 	$conexionEstablecida=$conexionRecuperada->cConexion();

	 	$conexionEstablecida->exec("set names utf8");

	 	$query="SELECT CONCAT(a.apellido,' ',a.nombre) as personaACargo, a.id_usuario FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON b.id_usuario=a.id_usuario INNER JOIN th_roles AS c ON c.id_rol=b.id_rol WHERE b.id_rol != 3 and b.id_rol != 1 ORDER BY a.apellido asc;";
	 	$resultado=$conexionEstablecida->query($query);


	 	$listas="<option value='0'>--Elige una Area--</option>";

	 	while ($resultado2= $resultado->fetch()) {
	 	
	 		$listas.="<option value='".$resultado2["id_usuario"]."'>".utf8_decode(utf8_encode($resultado2["personaACargo"]))."</option>";

	 	}

	 	return $listas;


 	}

 	echo getObtenerPersonaACargo(); 