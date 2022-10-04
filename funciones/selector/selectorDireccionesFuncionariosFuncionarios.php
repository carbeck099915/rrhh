<?php

	require_once "../../conexion/conexion.php";

 	function getObtener(){

 		extract($_POST);

		$conexionRecuperada= new conexion();
	 	$conexionEstablecida=$conexionRecuperada->cConexion();

	 	$conexionEstablecida->exec("set names utf8");

	 	$query="SELECT id_usuario,CONCAT_WS(' ',a.nombre,a.apellido) AS nombreCompleto FROM th_usuario AS a LEFT JOIN th_ingresosadmin AS b ON a.id_usuario=b.idUsuario WHERE a.fisicamenteEstructura='$fisicamenEstructuras' AND a.estadoUsuario='A' AND (b.estado IS NULL OR b.estado='I') GROUP BY a.id_usuario;";
	 	$resultado = $conexionEstablecida->query($query);


	 	while ($resultado2=$resultado->fetch()) {
	 	
	 		$listas.="<option value='".$resultado2["id_usuario"]."'>".strtoupper($resultado2["nombreCompleto"])."</option>";

	 	}

	 	return $listas;


 	}

 	echo getObtener();
