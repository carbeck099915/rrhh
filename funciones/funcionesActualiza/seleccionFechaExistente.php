<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);


	$query2="SELECT fechaEscogida FROM th_teletrabajo WHERE idUsuario='$idUsuario' AND fechaEscogida='$fecha';";
	$resultado2 = $conexionEstablecida->query($query2);

	while($registro2 = $resultado2->fetch()) {

		$fechaEscogida=$registro2['fechaEscogida'];
				

	}

	$jason['fechaEscogida']=$fechaEscogida;
	echo json_encode($jason);