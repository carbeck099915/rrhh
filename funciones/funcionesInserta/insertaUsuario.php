<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);


	if (empty($cedulaUsuario) || empty($nombreUsuario) || empty($apellidoUsuario) || empty($sexoUsuario) || empty($fechaNacimientoUsuario) || empty($usuarioInicial) || empty($passwordUsuario) || empty($emailUsuario) || empty($telefonoUsuario) || empty($celularUsuario) || empty($Rol)) {
		

		 
		$mensaje=2;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);

	}else{


		date_default_timezone_set("America/Guayaquil");

		$fecha_actual = date('Y-m-d');
		$hora_actual= date('H:i:s');

		$passwordCodificado=sha1($passwordUsuario);


		$query5="SELECT (SELECT id_usuario FROM th_usuario u1 where u1.id_usuario = u.PersonaACargo) as id_PersonaACargo,(SELECT CONCAT(apellido,' ',nombre) FROM th_usuario u1 where u1.id_usuario = u.PersonaACargo) as PersonaACargo, (select descripcionFisicamenteEstructura from th_fisicamenteestructura f where f.id_FisicamenteEstructura = u.fisicamenteEstructura) as Puesto FROM th_usuario u WHERE fisicamenteEstructura = '$codigoPersonaAcargo' LIMIT 1;";
		 $resultado5 = $conexionEstablecida->query($query5);

		while($registro5 = $resultado5->fetch()) {

			$PersnACar=$registro5['id_PersonaACargo'];

		}
	

		$query="INSERT INTO `ezonshar_mdepsaddb`.`th_usuario`(`id_usuario`, `cedula`, `nombre`, `apellido`, `sexo`, `fechaNacimiento`, `usuario`, `password`, `email`, `telefono`, `celular`, `fechaInscripcion`, `modalidad`, `puestoInstitucional`, `grupoOcupacional`, `estructura1`, `estructura2`, `fisicamenteEstructura`, `zonal`, `nacionalidad`, `hijos`, `ednia` , `fechadeIngreso`, `fechaInactiva`, `loginOne`, `estadoUsuario`, `PersonaACargo`, `modalidad2`) VALUES (NULL, '$cedulaUsuario', '$nombreUsuario', '$apellidoUsuario', '$sexoUsuario', '$fechaNacimientoUsuario', '$usuarioInicial', '$passwordCodificado', '$emailUsuario', '$telefonoUsuario', '$celularUsuario', '$fecha_actual','1','$cargo','$grupoOcupacional','$estructura1','$estructura2','$codigoPersonaAcargo','$zonal','$nacionalidad','$hijos','$etnia', '$fecha_actual', null, '0', 'A','$PersnACar','$modalidad');";

		// echo($query);

		$resultado = $conexionEstablecida->exec($query);


		$query2="SELECT MAX(id_usuario) AS idMaximo FROM th_usuario;";
		$resultado2 = $conexionEstablecida->query($query2);

		while($registro = $resultado2->fetch()) {

			$idMaximoRecuperado=$registro['idMaximo'];

		}

		$query3="INSERT INTO `ezonshar_mdepsaddb`.`th_usuario_roles`(`id_usuarios_roles`, `id_usuario`, `id_rol`, `estado`) VALUES (NULL, '$idMaximoRecuperado', '$Rol', 'A');";
		$resultado3 = $conexionEstablecida->query($query3);


		if ($modalidad=="presencial") {

			$query2="INSERT INTO `ezonshar_mdepsaddb`.`th_teletrabajo_acentado` (`idTeletratabjoRealizado`, `fecha`, `hora`, `idUsuario`, `accion`, `idUsuarioHabilit`) VALUES (NULL, '$fecha_actual', '$hora_actual', '$idMaximoRecuperado', 'P', '437');";
			$resultado2 = $conexionEstablecida->exec($query2);
		}else{

			$query2="INSERT INTO `ezonshar_mdepsaddb`.`th_teletrabajo_acentado` (`idTeletratabjoRealizado`, `fecha`, `hora`, `idUsuario`, `accion`, `idUsuarioHabilit`) VALUES (NULL, '$fecha_actual', '$hora_actual', '$idMaximoRecuperado', 'T', '437');";
			$resultado2 = $conexionEstablecida->exec($query2);

		}

		
		$mensaje=1;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);

	}


