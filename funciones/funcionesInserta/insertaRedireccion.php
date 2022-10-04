<?php
	require_once "../../conexion/conexion.php";

	extract($_POST);

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();
	

 	$conexionEstablecida->exec("set names utf8");
	
	$query="SELECT usuario,id_usuario FROM th_usuario WHERE cedula='$numeroCedula';";
	$resultado = $conexionEstablecida->query($query);

	while($registro = $resultado->fetch()) {

		$usuario=$registro['usuario'];
		$id_usuario=$registro['id_usuario'];

	}

	$query2="SELECT idDatosTransmititos FROM th_codigogenerado WHERE idUsuario='$id_usuario' AND codigo='$codigoDeValidacion';";
	$resultado2 = $conexionEstablecida->query($query2);

	while($registro2 = $resultado2->fetch()) {

		$idDatosTransmititos=$registro2['idDatosTransmititos'];

	}

	if (empty($idDatosTransmititos)) {
		
		$mensaje=2;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);

	}else{

		$mensaje=1;
		$jason['mensaje']=$mensaje;
		$jason['usuario']=$usuario;
		echo json_encode($jason);

	}

	