<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	if (empty($idPersonaRecupera) || empty($idRecupera)) {
 
		$mensaje=2;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);
 
	}else{

					$nomImagen = str_replace ( " " , "" , $id_personaPermiso).str_replace ( ":" , "" , date("H:i:s")); 

					$tipo = $_FILES['documentoDias']['type']; 
					$archivotmp = $_FILES['documentoDias']['tmp_name'];
					$destino="../../documentos";

					if ($tipo=="application/pdf") {

							copy($archivotmp,"$destino/$nomImagen.pdf");

						}else if ($tipo=="image/jpeg" || $tipo=="image/gif" || $tipo=="image/png" || $tipo=="image/jpeg") {

							copy($archivotmp,"$destino/$nomImagen.jpg");

						}

					if ($idRecupera == '1' && ($archivotmp == '' || $archivotmp == 'undefined')){

						date_default_timezone_set("America/Guayaquil");

						$fecha_actual = date('Y-m-d');
						$hora_actual= date('H:i:s');

					

						$query="INSERT INTO `ezonshar_mdepsaddb`.`th_generapermiso`(`id_generaPermiso`,`id_usuario`,`id_permisos`,  `dia_inicio`, `dia_fin`, `hora_inicio`, `hora_fin`, `totalDias`, `totalHoras`,`estado_permiso`, `documento_permiso`, `diaHoras`, `PersonaAprueba`,`ObservacionAprueba`, `permisoEspecial`, `tipoImg`, `FechaGenera`, `HoraGenera`) VALUES (NULL, '$idPersonaRecupera', '$idRecupera', '$datepicker', '$datepicker1', '$horaIni', '$horaFin', '$totalDias', '$totalHoras', 'P', '$nomImagen',  '$datepicker2', NULL, NULL, '$infopermisoEspecial', '$tipo','$fecha_actual', '$hora_actual');";
						
						

						$resultado = $conexionEstablecida->exec($query);
					
						$mensaje=1;
						$jason['mensaje']=$mensaje;
						echo json_encode($jason);

					}else if ($archivotmp == '' || $archivotmp == 'undefined'){

						$mensaje=2;
						$jason['mensaje']=$mensaje;
						echo json_encode($jason);

					} else {

						date_default_timezone_set("America/Guayaquil");

						$fecha_actual = date('Y-m-d');
						$hora_actual= date('H:i:s');

					

					$query="INSERT INTO `ezonshar_mdepsaddb`.`th_generapermiso`(`id_generaPermiso`,`id_usuario`,`id_permisos`,  `dia_inicio`, `dia_fin`, `hora_inicio`, `hora_fin`, `totalDias`, `totalHoras`,`estado_permiso`, `documento_permiso`, `diaHoras`, `PersonaAprueba`,`ObservacionAprueba`, `permisoEspecial`, `tipoImg`, `FechaGenera`, `HoraGenera`) VALUES (NULL, '$idPersonaRecupera', '$idRecupera', '$datepicker', '$datepicker1', '$horaIni', '$horaFin', '$totalDias', '$totalHoras', 'P', '$nomImagen',  '$datepicker2', NULL, NULL, '$infopermisoEspecial', '$tipo','$fecha_actual', '$hora_actual');";
					
					

					$resultado = $conexionEstablecida->exec($query);
				
					$mensaje=1;
					$jason['mensaje']=$mensaje;
					echo json_encode($jason);

					}
					
		
		

	}


