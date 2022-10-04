<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

 	$conexionEstablecida->exec("set names utf8");

	$query="SELECT id_generaPermiso, id_permisos,(select CONCAT(u.apellido,' ',u.nombre) from th_usuario u where u.id_usuario = gp.id_usuario)  as nombre, (select (SELECT tf.descripcionFisicamenteEstructura FROM th_fisicamenteestructura tf WHERE tf.id_FisicamenteEstructura = u.fisicamenteEstructura) from th_usuario u where u.id_usuario = gp.id_usuario)  as fisicamenteEstructura, (select nombrePermiso from th_permisos p where p.id_permisos = gp.id_permisos) as PERMISO, FechaGenera, case when totalDias = 0 then CONCAT(diaHoras,' - ',hora_inicio) else dia_inicio end as dia_inicio ,case when totalDias = 0 then CONCAT(diaHoras,' - ',hora_fin) else dia_fin end as dia_fin, totalHoras, CASE WHEN totalDias != 0 THEN totalDias else (ROUND((CASE WHEN ((HOUR(totalHoras) = 0) and (MINUTE(totalHoras))!=0) then ((MINUTE(totalHoras)*60)/28800) WHEN ((HOUR(totalHoras) != 0) and (MINUTE(totalHoras))=0) then ((HOUR(totalHoras)*60)*60/28800) WHEN ((HOUR(totalHoras) != 0) and (MINUTE(totalHoras))!=0) then ((((HOUR(totalHoras)*60)*60)+(MINUTE(totalHoras)*60))/28800) else 0 END ),2))END AS totalDias, estado_permiso, documento_permiso, IF(estado_permiso = 'P',(select CONCAT(u.apellido,' ',u.nombre) from th_usuario u where u.id_usuario = gp.PersonaAprueba),case when estado_permiso = 'A' then (select CONCAT(u.apellido,' ',u.nombre) from th_usuario u where u.id_usuario = gp.PersonaAprueba) when estado_permiso = 'N' then (select CONCAT(u.apellido,' ',u.nombre) from th_usuario u where u.id_usuario = gp.PersonaNiega) when estado_permiso = 'Z' then (select CONCAT(u.apellido,' ',u.nombre) from th_usuario u where u.id_usuario = gp.PersonaAnula) else '0' end) as personaAprueba, gp.ObservacionAprueba, gp.tipoImg  from th_generapermiso gp;";
 

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




