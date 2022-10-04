<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	$fecha_actual = date('Y-m-d');

	$query="INSERT INTO `ezonshar_mdepsaddb`.`th_presencial` (`idPrencesial`, `idUsuario`, `fecha`, `hora`, `localStorage`, `estado`, `observaNegacion`, `fechaNiega`, `horaNiega`, `timbradas`, `fechaPreciona`) VALUES (NULL, '$funcionarioEscogido', '$fechaEscogidaPresencial', '$horaPresencial', 'Ingresado por superior inmediato', 'I', NULL, NULL, NULL,'$etiquetaSeleccionables','$fecha_actual');";
	$resultado = $conexionEstablecida->exec($query);
	
		
	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason);
