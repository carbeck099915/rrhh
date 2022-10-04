<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

 	$conexionEstablecida->exec("set names utf8");

 	extract($_POST);

	$query="SELECT id_usuario,CONCAT_WS(' ',a.nombre,a.apellido) AS nombreCompleto,a.habilitar,b.horaInicio,b.horaFinal,a.modalidad2 FROM th_usuario AS a LEFT JOIN th_almuerzo AS 
	b ON a.id_usuario=b.idUsuario WHERE a.PersonaACargo='$idPersonaRecuperaPresencial' AND a.estadoUsuario='A';";

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




 