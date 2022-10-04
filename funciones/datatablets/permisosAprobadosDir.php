<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

 	$conexionEstablecida->exec("set names utf8");

 	extract($_POST);

	$query="SELECT id_generaPermiso, id_permisos, CONCAT(u.apellido,' ',u.nombre) as nombre, (select nombrePermiso from th_permisos p where p.id_permisos = gp.id_permisos) as PERMISO, FechaGenera, case when totalDias = 0 then CONCAT(diaHoras,' - ',hora_inicio) else dia_inicio end as dia_inicio ,   case when totalDias = 0 then CONCAT(diaHoras,' - ',hora_fin) else dia_fin end as dia_fin ,  CASE WHEN totalDias != 0 THEN totalDias else (ROUND((CASE WHEN ((HOUR(totalHoras) = 0) and (MINUTE(totalHoras))!=0) then ((MINUTE(totalHoras)*60)/32400) WHEN ((HOUR(totalHoras) != 0) and (MINUTE(totalHoras))=0) then ((HOUR(totalHoras)*60)*60/32400) WHEN ((HOUR(totalHoras) != 0) and (MINUTE(totalHoras))!=0) then ((((HOUR(totalHoras)*60)*60)+(MINUTE(totalHoras)*60))/32400) else 0 END ),2))END AS totalDias, CASE WHEN totalDias = '' then CONCAT(totalHoras,' ','Horas') else CONCAT(totalDias,' ','Días') END resultado, CASE WHEN totalDias = '' then totalHoras else totalDias END resultadoSimple, estado_permiso, documento_permiso, (select CONCAT(u.apellido,' ',u.nombre) from th_usuario u where u.id_usuario = gp.PersonaAprueba)  as personaAprueba, gp.tipoImg from th_generapermiso gp INNER JOIN th_usuario u on gp.id_usuario = u.id_usuario where estado_permiso = 'A' and id_permisos != 7 and u.estructura2 = '$areaDirect';";




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




