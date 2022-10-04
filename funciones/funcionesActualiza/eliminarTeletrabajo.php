<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

 	

	extract($_POST);

	$data=array();

	$query25="SELECT COUNT(idTeletrabajoActividad) AS contadorSilencioso FROM th_teletrabajo_conjunto WHERE idTeletrabajo='$idTeletrabajoSolitario';";
	$resultado25 = $conexionEstablecida->query($query25);

	while($registro25 = $resultado25->fetch()) {

		$contadorSilencioso=$registro25['contadorSilencioso'];
				

	}

	if ($contadorSilencioso==1) {

		$mensaje=2;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);


	}else{

		$query="DELETE FROM th_teletrabajo_conjunto WHERE idTeletrabajoActividad='$idTeletrabajoAsociativo';";
		$resultado = $conexionEstablecida->exec($query);

		$query4="SELECT idTeletrabajoActividad FROM th_teletrabajo_conjunto WHERE idTeletrabajo='$idTeletrabajoSolitario';";
		$resultado4 = $conexionEstablecida->query($query4);

		while($registro4 = $resultado4->fetch()) {

			$idTeletrabajoActividad=$registro4['idTeletrabajoActividad'];
			array_push($data, $idTeletrabajoActividad);

		}

		$sumador=0;

		$contador=count($data);

		for ($i=0; $i < $contador; $i++) { 
			
			$sumador=$sumador+1;

			$query3="UPDATE th_teletrabajo_conjunto SET incrementar='$sumador' WHERE idTeletrabajoActividad='$data[$i]';";
			$resultado3 = $conexionEstablecida->exec($query3);

		}


		$mensaje=1;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);

	}