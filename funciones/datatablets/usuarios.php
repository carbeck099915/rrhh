<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

 	$conexionEstablecida->exec("set names utf8");

	$query="SELECT a.id_usuario, a.cedula, a.nombre, a.apellido, a.sexo, a.fechaNacimiento, a.usuario, a.email, a.`password` AS contrasena,  a.fisicamenteEstructura, (select descripcionFisicamenteestructura from th_fisicamenteestructura where id_Fisicamenteestructura = a.fisicamenteEstructura) as fisicamenteEstructura1, a.celular, a.telefono, a.fechaInscripcion,c.nombre AS rol, c.id_rol,  a.`modalidad` , a.`puestoInstitucional`, a.`grupoOcupacional`, a.`estructura1` , a.`estructura2`, a.`fechadeIngreso`, a.`zonal`, a.`nacionalidad`, a.`hijos`, a.`ednia`,  a.estadoUsuario, a.fechaInactiva, (SELECT CONCAT(th12.apellido,' ',th12.nombre) FROM th_usuario th12 WHERE th12.id_usuario = a.PersonaACargo) as PersonaACargo,a.modalidad2 FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON b.id_usuario=a.id_usuario INNER JOIN th_roles AS c ON c.id_rol=b.id_rol  WHERE a.relacionDependencia IS NULL ORDER BY estadoUsuario asc;";
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





 