<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	date_default_timezone_set("America/Guayaquil");

	$fecha_actual = date('Y-m-d');

	$hora_actual= date('H:i:s');

	$arrayactividadesConjunto = explode("_______,", $stringactividadesConjunto);
	$arrayplazoConjunto = explode("_______,", $stringplazoConjunto);
	$arrayavanceConjunto = explode("_______,", $stringavanceConjunto);
	$arrayobservacionesConjunto = explode("_______,", $stringobservacionesConjunto);
	$arraystringInsertores = explode("_______,", $stringInsertores);
	
	$contador=count($arrayactividadesConjunto);

	if (!empty($stringactividadesConjunto)) {

		for ($i=0; $i < $contador; $i++) { 

			$resultado1 = "";
			$resultado2 = "";
			$resultado3 = "";
			$resultadoObservatorios = "";
			$resultadosIncrementales ="";

			$resultado1 = str_replace("_______", "", $arrayactividadesConjunto[$i]);
			$resultado2 = str_replace("_______", "", $arrayplazoConjunto[$i]);
			$resultado3 = str_replace("_______", "", $arrayavanceConjunto[$i]);
			$resultadoObservatorios = str_replace("_______", "", $arrayobservacionesConjunto[$i]);
			$resultadosIncrementales = str_replace("_______", "", $arraystringInsertores[$i]);

				
			$query4="INSERT INTO `ezonshar_mdepsaddb`.`th_teletrabajo_conjunto` (`idTeletrabajoActividad`, `stringactividadesConjunto`, `stringplazoConjunto`, `stringavanceConjunto`, `stringconectadoConjunto`, `stringrespuestaConjunto`, `stringobservacionesConjunto`, `idTeletrabajo`, `incrementar`) VALUES (NULL, '$resultado1', '$resultado2', '$resultado3', 'N/A', 'N/A', '$resultadoObservatorios', '$idTeletrabajo', '$resultadosIncrementales');";
			$resultado4 = $conexionEstablecida->exec($query4);


		}
	
	}



	$arrayactividadesConjuntoEditas = explode("_______,", $stringactividadesConjuntoEditables);
	$arrayplazoConjuntoEditas = explode("_______,", $stringplazoConjuntoEditables);
	$arrayavanceConjuntoEditas = explode("_______,", $stringavanceConjuntoEditables);
	$arrayobservacionesConjuntoEditas = explode("_______,", $stringobservacionesConjuntoEditables);
	$arrayIdTeletrabajoEditas = explode("_______,", $stringidTeletrabajoConjuntos);

	$contador2=count($arrayactividadesConjuntoEditas);

	for ($i=0; $i < $contador2; $i++) { 

		$resultado5 = "";
		$resultado6 = "";
		$resultado7 = "";
		$resultado8 = "";
		$resultado9 ="";

		$resultado5 = str_replace("_______", "", $arrayactividadesConjuntoEditas[$i]);
		$resultado6 = str_replace("_______", "", $arrayplazoConjuntoEditas[$i]);
		$resultado7 = str_replace("_______", "", $arrayavanceConjuntoEditas[$i]);
		$resultado8 = str_replace("_______", "", $arrayobservacionesConjuntoEditas[$i]);
		$resultado9 = str_replace("_______", "", $arrayIdTeletrabajoEditas[$i]);

			
		$query5="UPDATE th_teletrabajo_conjunto SET stringactividadesConjunto='$resultado5', stringplazoConjunto='$resultado6', stringavanceConjunto='$resultado7', stringobservacionesConjunto='$resultado8' WHERE idTeletrabajoActividad='$resultado9';";
		$resultado5 = $conexionEstablecida->exec($query5);


	}


	$query22="SELECT fechaEscogida FROM th_teletrabajo WHERE idTeletrabajo='$idTeletrabajo';";

	$resultado22 = $conexionEstablecida->query($query22);

	while($registro22 = $resultado22->fetch()) {

		$fechaEscogida=$registro22['fechaEscogida'];

	}

	$query8="UPDATE th_teletrabajo SET estado='P' WHERE idTeletrabajo='$idTeletrabajo';";
	$resultado8 = $conexionEstablecida->exec($query8);
		
	$mensaje=1;
	$jason['mensaje']=$mensaje;
	$jason['fechaEscogida']=$fechaEscogida;
	echo json_encode($jason);


