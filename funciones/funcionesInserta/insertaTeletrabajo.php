<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	date_default_timezone_set("America/Guayaquil");

	$fecha_actual = date('Y-m-d');

	$hora_actual= date('H:i:s');

	$stringactividadesConjunto = htmlspecialchars($stringactividadesConjunto, ENT_QUOTES);
	$stringobservacionesConjunto = htmlspecialchars($stringobservacionesConjunto, ENT_QUOTES);

	$arrayactividadesConjunto = explode("_______,", $stringactividadesConjunto);
	$arrayplazoConjunto = explode("_______,", $stringplazoConjunto);
	$arrayavanceConjunto = explode("_______,", $stringavanceConjunto);
	$arrayconectadoConjunto = explode("_______,", $stringconectadoConjunto);
	$arrayrespuestaConjunto = explode("_______,", $stringrespuestaConjunto);
	$arrayobservacionesConjunto = explode("_______,", $stringobservacionesConjunto);
	
	$contador=count($arrayactividadesConjunto);


	$query2="SELECT idUsuario FROM th_teletrabajo WHERE idUsuario='$idUsuarioRecuperandose' AND fechaEscogida='$fechaEscogida';";
	$resultado2 = $conexionEstablecida->query($query2);

	while($registro2 = $resultado2->fetch()) {

		$idUsuarioBseDeDatos=$registro2['idUsuario'];
				

	}

	if (empty($idUsuarioBseDeDatos)) {
		
		$query="INSERT INTO `ezonshar_mdepsaddb`.`th_teletrabajo` (`idTeletrabajo`, `tipoDeDesconcentracion`, `idUsuario`, `unidadAdministrativa`, `puesto`, `jefeInmediato`, `stringactividadesConjunto`, `stringplazoConjunto`, `stringavanceConjunto`, `stringconectadoConjunto`, `stringrespuestaConjunto`, `stringobservacionesConjunto`, `fecha`, `hora`, `fechaEscogida`, `estado`) VALUES (NULL, '$tipoDeDesconcentracion', '$idUsuarioRecuperandose', '$unidadAdministrativa', '$puesto', '$jefeInmediato', '$stringactividadesConjunto', '$stringplazoConjunto', '$stringavanceConjunto', 'N/A', 'N/A', '$stringobservacionesConjunto','$fecha_actual','$hora_actual','$fechaEscogida','P');";
		$resultado = $conexionEstablecida->exec($query);

		$query3="SELECT MAX(idTeletrabajo) AS maximo FROM th_teletrabajo;";
		$resultado3 = $conexionEstablecida->query($query3);

		while($registro3 = $resultado3->fetch()) {

			$maximo=$registro3['maximo'];
					

		}

		$sumador=0;

		for ($i=0; $i < $contador; $i++) { 

			$resultado1 = "";
			$resultado2 = "";
			$resultado3 = "";
			$resultadoObservatorios = "";

			$resultado1 = str_replace("_______", "", $arrayactividadesConjunto[$i]);
			$resultado2 = str_replace("_______", "", $arrayplazoConjunto[$i]);
			$resultado3 = str_replace("_______", "", $arrayavanceConjunto[$i]);
			$resultadoObservatorios = str_replace("_______", "", $arrayobservacionesConjunto[$i]);

			$sumador=$i+1;
			
			$query4="INSERT INTO `ezonshar_mdepsaddb`.`th_teletrabajo_conjunto` (`idTeletrabajoActividad`, `stringactividadesConjunto`, `stringplazoConjunto`, `stringavanceConjunto`, `stringconectadoConjunto`, `stringrespuestaConjunto`, `stringobservacionesConjunto`, `idTeletrabajo`, `incrementar`) VALUES (NULL, '$resultado1', '$resultado2', '$resultado3', 'N/A', 'N/A', '$resultadoObservatorios', '$maximo', '$sumador');";
			$resultado4 = $conexionEstablecida->exec($query4);


		}
		
		$mensaje=1;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);

	}else{

		$mensaje=2;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);


	}


