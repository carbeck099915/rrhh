<?php
require_once "../../conexion/conexion.php";

$conexionRecuperada= new conexion();
 $conexionEstablecida=$conexionRecuperada->cConexion();

 $conexionEstablecida->exec("set names utf8");

//  extract($_POST);

 $query="SELECT a.idHoraAlmuerzo,a.horaAlmuerzo,STR_TO_DATE(a.horaInicio, '%H:%i:%s') AS horaInicio,STR_TO_DATE(a.horaFin, '%H:%i:%s') AS horaFin,a.idFisicamenteEstructura,b.descripcionFisicamenteEstructura,STR_TO_DATE(a.horaIngreso, '%H:%i:%s') AS horaIngreso,STR_TO_DATE(a.horaSalida, '%H:%i:%s') AS horaSalida,a.estado FROM th_ingresosadmin AS a INNER JOIN th_fisicamenteestructura AS b ON a.idFisicamenteEstructura=b.id_FisicamenteEstructura WHERE a.idUsuario IS NULL AND a.estado='A';";
	
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