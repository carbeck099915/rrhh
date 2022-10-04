<?php

	require_once "../../conexion/conexion.php";

	require_once "../../controladores/controladoresFichas/recuperador.controlador.php";  


	// requiriendo la librería Swift de php para enviar correos electronicos
	require_once "../../Swift/lib/swift_required.php";

	/*===================================================
	=            Llamando Funciòn php mailer            =
	===================================================*/
	
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require '../../PHPMailer/src/Exception.php';
	require '../../PHPMailer/src/PHPMailer.php';
	require '../../PHPMailer/src/SMTP.php';
		
	/*=====  End of Llamando Funciòn php mailer  ======*/
	


	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();


 	$nombreObjeto= new  recuperandoDatosDeLogeo();
  	$IdCompletoUsuario=$nombreObjeto->generarCodigo('5');

	extract($_POST);


	/*==========================================
	=            Selección de datos            =
	==========================================*/

	$conexionEstablecida->exec("set names utf8");
	
	$query="SELECT nombre, apellido, usuario,id_usuario FROM th_usuario WHERE cedula='$numeroCedula' AND email='$correoComparatio';";
	$resultado = $conexionEstablecida->query($query);

	while($registro = $resultado->fetch()) {

		$nombre=$registro['nombre'];
		$apellido=$registro['apellido'];
		$usuario=$registro['usuario'];
		$id_usuario=$registro['id_usuario'];

	}


	/*=====  End of Selección de datos  ======*/
	
	if (empty($usuario)) {
	
		$mensaje=2;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);

	}else{

		date_default_timezone_set("America/Guayaquil");

		$hora_actual= date('H:i:s');

		$query3="SELECT idDatosTransmititos,codigo FROM th_codigogenerado WHERE idUsuario='$id_usuario';";
		$resultado3 = $conexionEstablecida->query($query3);

		while($registro3 = $resultado3->fetch()) {

			$idDatosTransmititos=$registro3['idDatosTransmititos'];
			$codigoBaseDeDatos=$registro3['codigo'];

		}

		if (!empty($idDatosTransmititos)) {


				/*==========================================
				=            Eliminar el código            =
				==========================================*/
				
				$query3="DELETE FROM th_codigogenerado WHERE idUsuario='$id_usuario';";
				$resultado3 = $conexionEstablecida->exec($query3);
				
				/*=====  End of Eliminar el código  ======*/
				


				/*======================================
				=            Ingresar datos            =
				======================================*/
				
				$query2="INSERT INTO `ezonshar_mdepsaddb`.`th_codigogenerado` (`idDatosTransmititos`, `idUsuario`, `codigo`, `tiempo`) VALUES (NULL, '$id_usuario', '$codigoBaseDeDatos', '$hora_actual');";
				$resultado2 = $conexionEstablecida->exec($query2);
				
				/*=====  End of Ingresar datos  ======*/
				

				/*======================================================
				=            Enviar correo desde php mailer            =
				======================================================*/

				// Instantiation and passing `true` enables exceptions
				$mailSegunderos = new PHPMailer(true);

				try {

					//Server settings
				    $mailSegunderos->isSMTP();                                            // Send using SMTP
				    $mailSegunderos->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
				    $mailSegunderos->SMTPAuth   = true;                                   // Enable SMTP authentication
				    $mailSegunderos->Username   = 'ministerioDeporte2021@gmail.com';                     // SMTP username
				    $mailSegunderos->Password   = 'qkcdcbkuankaxvmx';                            // SMTP password
				    $mailSegunderos->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
				    $mailSegunderos->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

					$mailSegunderos->CharSet = 'UTF-8';
				    //Recipients
				    $mailSegunderos->setFrom('ministerioDelDeporte@deporte.gob.ec', 'Ministerio del deporte');

				    $mailSegunderos->addAddress($correoComparatio); 

				    // Content
				    $mailSegunderos->isHTML(true);                                  // Set email format to HTML
				    $mailSegunderos->Subject = 'Ministerio del deporte';
				    $mailSegunderos->Body    = "<head><!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><title>HISTORIAS CLÍNICAS</title><style type='text/css'>body {background:#EEE; padding:30px; font-size:12px;}</style></head><body><span style='font-weight:bold; font-style: oblique;'>DIRECCIÓN DE ADMINISTRACIÓN DEL TALENTO HUMANO (RECUPERACIÓN DE CONTRASEÑA),</span><br><br>El código generado tiene una vigencia de 15 minutos:<br><br><span style='font-size:12px; font-weight:bold;'>Código:</span>&nbsp;$codigoBaseDeDatos</body></html></head>"; 
				    $mailSegunderos->send();


				} catch (Exception $e) {
				    echo "Hubo un error al enviar el mensaje ".$e;
				}

				/*=====  End of Enviar correo desde php mailer  ======*/

			
				$mensaje=3;
				$jason['mensaje']=$mensaje;
				echo json_encode($jason);

		}else{

				/*======================================
				=            Ingresar datos            =
				======================================*/
				
				$query2="INSERT INTO `ezonshar_mdepsaddb`.`th_codigogenerado` (`idDatosTransmititos`, `idUsuario`, `codigo`, `tiempo`) VALUES (NULL, '$id_usuario', '$IdCompletoUsuario', '$hora_actual');";
				$resultado2 = $conexionEstablecida->exec($query2);
				
				/*=====  End of Ingresar datos  ======*/
				

				/*======================================================
				=            Enviar correo desde php mailer            =
				======================================================*/
				$email=$correoComparatio;


				// Instantiation and passing `true` enables exceptions
				$mailSegunderos = new PHPMailer(true);

				try {

					//Server settings
				    $mailSegunderos->isSMTP();                                            // Send using SMTP
				    $mailSegunderos->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
				    $mailSegunderos->SMTPAuth   = true;                                   // Enable SMTP authentication
				    $mailSegunderos->Username   = 'ministerioDeporte2021@gmail.com';                     // SMTP username
				    $mailSegunderos->Password   = 'Becquer098..';                            // SMTP password
				    $mailSegunderos->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
				    $mailSegunderos->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

					$mailSegunderos->CharSet = 'UTF-8';
				    //Recipients
				    $mailSegunderos->setFrom('ministerioDelDeporte@deporte.gob.ec', 'Ministerio del deporte');

				    $mailSegunderos->addAddress($correoComparatio); 
				    
				    // Content
				    $mailSegunderos->isHTML(true);                                  // Set email format to HTML
				    $mailSegunderos->Subject = 'Ministerio del deporte';
				    $mailSegunderos->Body    = "<head><!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><title>HISTORIAS CLÍNICAS</title><style type='text/css'>body {background:#EEE; padding:30px; font-size:12px;}</style></head><body><span style='font-weight:bold; font-style: oblique;'>DIRECCIÓN DE ADMINISTRACIÓN DEL TALENTO HUMANO (RECUPERACIÓN DE CONTRASEÑA),</span><br><br>El código generado tiene una vigencia de 15 minutos:<br><br><span style='font-size:12px; font-weight:bold;'>Código:</span>&nbsp;$codigoBaseDeDatos</body></html></head>"; 
				    $mailSegunderos->send();


				} catch (Exception $e) {
				    echo "Hubo un error al enviar el mensaje ".$e;
				}

				/*=====  End of Enviar correo desde php mailer  ======*/

				$mensaje=1;
				$jason['mensaje']=$mensaje;
				echo json_encode($jason);

		}


	}



