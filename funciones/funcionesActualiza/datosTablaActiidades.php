<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	$data=array();
	$data1=array();
	$data2=array();
	$data3=array();
	$data4=array();
	$data5=array();

	extract($_POST);


	$query="SELECT idTeletrabajoActividad,stringactividadesConjunto,stringplazoConjunto,stringavanceConjunto,stringobservacionesConjunto,incrementar FROM th_teletrabajo_conjunto WHERE idTeletrabajo='$idTeletrabajo';";

	$resultado = $conexionEstablecida->query($query);

	while($registro = $resultado->fetch()) {

		$idTeletrabajoActividad=$registro['idTeletrabajoActividad'];
		array_push($data, $idTeletrabajoActividad);


		$stringactividadesConjunto=$registro['stringactividadesConjunto'];
		array_push($data1, $stringactividadesConjunto);


		$stringplazoConjunto=$registro['stringplazoConjunto'];
		array_push($data2, $stringplazoConjunto);


		$stringavanceConjunto=$registro['stringavanceConjunto'];
		array_push($data3, $stringavanceConjunto);


		$stringobservacionesConjunto=$registro['stringobservacionesConjunto'];
		array_push($data4, $stringobservacionesConjunto);

		$incrementar=$registro['incrementar'];
		array_push($data5, $incrementar);

	}

	$query2="SELECT observacionesDadas FROM th_teletrabajo WHERE idTeletrabajo='$idTeletrabajo';";

	$resultado2 = $conexionEstablecida->query($query2);

	while($registro2 = $resultado2->fetch()) {

		$observacionesDadas=$registro2['observacionesDadas'];

	}

	$idTeletrabajo =  implode("-------", $data);
	$actividadesTeletrabajo =  implode("-------", $data1);
	$plazoTeletrabajo = implode("-------", $data2);
	$avanceTeletrabajo = implode("-------", $data3);
	$observacionesTeletrabajo = implode("-------", $data4);
	$incrementarStrings= implode("-------", $data5);

	$jason['idTeletrabajo']=$idTeletrabajo;
	$jason['actividadesTeletrabajo']=$actividadesTeletrabajo;
	$jason['plazoTeletrabajo']=$plazoTeletrabajo;
	$jason['avanceTeletrabajo']=$avanceTeletrabajo;
	$jason['observacionesTeletrabajo']=$observacionesTeletrabajo;
	$jason['incrementarStrings']=$incrementarStrings;

	$jason['observacionesDadas']=$observacionesDadas;

	echo json_encode($jason);	