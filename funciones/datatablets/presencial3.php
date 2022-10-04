<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

 	$conexionEstablecida->exec("set names utf8");

 	extract($_POST);

	$query="SELECT a.idIngresoAdmin,a.idPrencesial,a.idUsuario,a.fecha,a.hora,(SELECT CONCAT_WS(' ',a1.nombre,a1.apellido) FROM th_usuario AS a1 WHERE a1.id_usuario=a.idUsuario) AS nombreCompleto,a.localStorage,(SELECT a2.descripcionFisicamenteEstructura FROM th_fisicamenteestructura AS a2 INNER JOIN th_usuario AS a1 ON a1.fisicamenteEstructura=a2.id_FisicamenteEstructura WHERE a1.id_usuario=a.idUsuario) AS fisicamenteEstructura,(SELECT (SELECT CONCAT_WS(' ',a4.nombre,a4.apellido) FROM th_usuario AS a4 WHERE a3.PersonaACargo=a4.id_usuario) FROM th_usuario AS a3 WHERE a3.id_usuario=a.idUsuario) AS personaACargo,(SELECT a5.descripcionPuestoInstitucional FROM th_puestoinstitucional AS a5 INNER JOIN th_usuario AS a1 ON a5.id_PuestoInstitucional=a1.puestoInstitucional WHERE a1.id_usuario=a.idUsuario) AS descripcionPuestoInstitucional,a.timbradas,(SELECT a1.horaIngreso FROM th_ingresosadmin AS a1 WHERE a1.idHoraAlmuerzo=a.idIngresoAdmin) AS horaIngreso,(SELECT a1.horaSalida FROM th_ingresosadmin AS a1 WHERE a1.idHoraAlmuerzo=a.idIngresoAdmin) AS horaSalida,(SELECT a1.horaInicio FROM th_ingresosadmin AS a1 WHERE a1.idHoraAlmuerzo=a.idIngresoAdmin) AS horaInicio,(SELECT a1.horaFin FROM th_ingresosadmin AS a1 WHERE a1.idHoraAlmuerzo=a.idIngresoAdmin) AS horaFin,(SELECT a1.horaInicio FROM th_almuerzo AS a1 WHERE a1.idUsuario=a.idUsuario) AS horaInicioAlmuerzo, (SELECT a1.horaFinal FROM th_almuerzo AS a1 WHERE a1.idUsuario=a.idUsuario) AS horaFinalAlmuerzo,a.fechaPreciona FROM th_presencial AS a ORDER BY a.fecha DESC LIMIT 	90000;";
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


 