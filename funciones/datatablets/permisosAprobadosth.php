<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

 	$conexionEstablecida->exec("set names utf8");

	$query="SELECT id_generaPermiso, id_permisos,(select CONCAT(u.apellido,' ',u.nombre) from th_usuario u where u.id_usuario = gp.id_usuario)  as nombre,(select nombrePermiso from th_permisos p where p.id_permisos = gp.id_permisos) as PERMISO, dia_inicio, dia_fin, totalDias, estado_permiso, documento_permiso, (select CONCAT(u.apellido,' ',u.nombre) from th_usuario u where u.id_usuario = gp.PersonaAprueba)  as personaAprueba from th_generapermiso gp where estado_permiso = 'A' and (id_permisos = 3 or id_permisos = 4 or id_permisos = 5 or id_permisos = 6);";
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




