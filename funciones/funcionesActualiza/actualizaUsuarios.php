<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	date_default_timezone_set("America/Guayaquil");

	$fecha_actual = date('Y-m-d');
	$hora_actual= date('H:i:s');


	if($PersonaACargo == '0'){

		$query="UPDATE th_usuario SET usuario='$usuarioModificado', telefono='$telefonoModificado', celular='$celularModificado', email='$emailModificado' , `puestoInstitucional` = '$cargoActualiza', `grupoOcupacional` = '$grupoOcuActualiza', `estructura1` = '$estructura11', `estructura2` = '$estructura2Actualiza', `fisicamenteEstructura` = '$estructuraFisiActualiza', `zonal` = '$zonalActualiza', `nacionalidad` = '$nacionalidadActualiza', `hijos` = '$hijosActualiza', `ednia` = '$etniaActualiza',modalidad2='$modalidades' WHERE id_usuario='$idUsuarios';";
	$resultado = $conexionEstablecida->exec($query);

	$query2="UPDATE `ezonshar_mdepsaddb`.`th_usuario_roles` SET `id_rol` = '$rol2'  WHERE `id_usuario` = '$idUsuarios';";
	$resultado2 = $conexionEstablecida->exec($query2);


		if ($modalidades=="presencial") {

			$query2="INSERT INTO `ezonshar_mdepsaddb`.`th_teletrabajo_acentado` (`idTeletratabjoRealizado`, `fecha`, `hora`, `idUsuario`, `accion`, `idUsuarioHabilit`) VALUES (NULL, '$fecha_actual', '$hora_actual', '$idUsuarios', 'P', '437');";
			$resultado2 = $conexionEstablecida->exec($query2);
		}else{

			$query2="INSERT INTO `ezonshar_mdepsaddb`.`th_teletrabajo_acentado` (`idTeletratabjoRealizado`, `fecha`, `hora`, `idUsuario`, `accion`, `idUsuarioHabilit`) VALUES (NULL, '$fecha_actual', '$hora_actual', '$idUsuarios', 'T', '437');";

		}
	

	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason);

	}else {

		$query="UPDATE th_usuario SET usuario='$usuarioModificado', telefono='$telefonoModificado', celular='$celularModificado', email='$emailModificado' , `puestoInstitucional` = '$cargoActualiza', `grupoOcupacional` = '$grupoOcuActualiza', `estructura1` = '$estructura11', `estructura2` = '$estructura2Actualiza', `fisicamenteEstructura` = '$estructuraFisiActualiza', `zonal` = '$zonalActualiza', `nacionalidad` = '$nacionalidadActualiza', `hijos` = '$hijosActualiza', `ednia` = '$etniaActualiza', PersonaACargo = '$PersonaACargo',modalidad2='$modalidades'  WHERE id_usuario='$idUsuarios';";
	$resultado = $conexionEstablecida->exec($query);

	$query2="UPDATE `ezonshar_mdepsaddb`.`th_usuario_roles` SET `id_rol` = '$rol2'  WHERE `id_usuario` = '$idUsuarios';";
	$resultado2 = $conexionEstablecida->exec($query2);


		if ($modalidades=="presencial") {

			$query2="INSERT INTO `ezonshar_mdepsaddb`.`th_teletrabajo_acentado` (`idTeletratabjoRealizado`, `fecha`, `hora`, `idUsuario`, `accion`, `idUsuarioHabilit`) VALUES (NULL, '$fecha_actual', '$hora_actual', '$idUsuarios', 'P', '437');";
			$resultado2 = $conexionEstablecida->exec($query2);
		}else{

			$query2="INSERT INTO `ezonshar_mdepsaddb`.`th_teletrabajo_acentado` (`idTeletratabjoRealizado`, `fecha`, `hora`, `idUsuario`, `accion`, `idUsuarioHabilit`) VALUES (NULL, '$fecha_actual', '$hora_actual', '$idUsuarios', 'T', '437');";

		}


	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason);
	}





	