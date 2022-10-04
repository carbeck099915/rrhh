<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

 	$conexionEstablecida->exec("set names utf8");

 	extract($_POST);

	$query="SELECT a.idUsuario,a.fecha,a.hora,CONCAT_WS(' ',b.nombre,b.apellido) AS nombreCompleto,a.localStorage,a.estado,a.observaNegacion  FROM th_presencial AS a INNER JOIN th_usuario AS b ON a.idUsuario=b.id_usuario WHERE b.PersonaACargo='$idPersonaRecuperaPresencial' ORDER BY a.fecha DESC;";


	$resultado = $conexionEstablecida->query($query);

	if (!$resultado) {
		echo "error";
	}else{
		$arreglo=array();
		while($data=$resultado->fetch()){
			$arreglo["data"][]=$data;
		}
		echo json_encode($arreglo);
	}




 