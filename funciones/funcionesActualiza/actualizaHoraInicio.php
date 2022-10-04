
<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	date_default_timezone_set("America/Guayaquil");

	$fecha_actual = date('Y-m-d');

	$query2="SELECT a.idAlmuerzo,b.fisicamenteEstructura FROM th_almuerzo AS a INNER JOIN th_usuario AS b ON a.idUsuario=b.id_usuario WHERE a.idUsuario='$idUsuario';";
	$resultado2 = $conexionEstablecida->query($query2);

	while($registro = $resultado2->fetch()) {

		$idAlmuerzo=$registro['idAlmuerzo'];
		$fisicamenteEstructura=$registro['fisicamenteEstructura'];

	}


	$query2Resultantes="SELECT b.fisicamenteEstructura AS fisicamenteDoceavas FROM th_usuario AS b WHERE b.id_usuario='$idUsuario';";
	$resultado2Resultantes = $conexionEstablecida->query($query2Resultantes);

	while($registroResultantes = $resultado2Resultantes->fetch()) {

		$fisicamenteDoceavas=$registroResultantes['fisicamenteDoceavas'];

	}


	$queryEstablecidos="SELECT idUsuario AS idUsuarioEstablecidos FROM th_ingresosadmin WHERE idUsuario='$idUsuario' AND estado='A';";
	$resultadoBseEstablecidos = $conexionEstablecida->query($queryEstablecidos);

	while($itemBaseEstablecidos = $resultadoBseEstablecidos->fetch()) {

		//CARGA VALORES EN VARIABLES DESDE BASE
		$idUsuarioEstablecidos=$itemBaseEstablecidos['idUsuarioEstablecidos'];	

	}
	
	if (empty($idUsuarioEstablecidos)) {
		$query10="SELECT horaInicio,horaAlmuerzo,horaFin  FROM th_ingresosadmin WHERE idFisicamenteEstructura='$fisicamenteDoceavas' AND idUsuario IS NULL AND estado='A';";
	}else{
		$query10="SELECT horaInicio,horaAlmuerzo,horaFin  FROM th_ingresosadmin WHERE idUsuario='$idUsuarioEstablecidos' AND estado='A';";
	}

	
	$resultadoBase = $conexionEstablecida->query($query10);

	while($itemBase = $resultadoBase->fetch()) {

		//CARGA VALORES EN VARIABLES DESDE BASE
		$horaInicio=$itemBase['horaInicio'];	
		$horaAlmuerzo=$itemBase['horaAlmuerzo'];	
		$horaFin=$itemBase['horaFin'];

		$valorHoraAlmuerzoBase= explode(":", $horaAlmuerzo);
		$valorHoraSeleccionadaInicio= explode(":", $horaInicios);
		
		$sumaValorHoras=$valorHoraSeleccionadaInicio[0]+(floatval($valorHoraAlmuerzoBase[0]/2));
		$sumaValorMinutos=$valorHoraSeleccionadaInicio[1]+(floatval($valorHoraAlmuerzoBase[1]/2));
		$jason['tempsumaHoras']=$sumaValorHoras;
		$jason['tempsumaMinutos']=$sumaValorMinutos;
		
	}
	

	if(empty($horaInicio)){

		$mensaje=2;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);

	}else if($horaInicios<$horaInicio || $horaInicios>$horaFin){


		$mensaje=3;
		$jason['mensaje']=$mensaje;
		$jason['horaInicio']=$horaInicio;
		$jason['horaFin']=$horaFin;
		echo json_encode($jason);

	}else{

		$valorFinCalculado=$sumaValorHoras.':'.$sumaValorMinutos;
		$jason['tempSumavalores']=$valorFinCalculado;
	
		if (empty($idAlmuerzo)) {
			
			$query="INSERT INTO `ezonshar_mdepsaddb`.`th_almuerzo` (`idAlmuerzo`, `idUsuario`, `horaInicio`, `horaFinal`, `fechaIngreso`) 
			VALUES (NULL, '$idUsuario', '$horaInicios', '$valorFinCalculado', '$fecha_actual');";
			$resultado = $conexionEstablecida->exec($query);

			$mensaje=1;
			$jason['mensaje']=$mensaje;
			

		}else{

			$query="UPDATE th_almuerzo SET horaInicio='$horaInicios' , horaFinal='$valorFinCalculado' WHERE idUsuario='$idUsuario';";
			$resultado = $conexionEstablecida->exec($query);

			$mensaje=1;
			$jason['mensaje']=$mensaje;	

		}

		echo json_encode($jason);	

	}

	



		


