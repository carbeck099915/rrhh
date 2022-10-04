<?php
	require_once "../../conexion/conexion.php";

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


	extract($_POST);

	$query2="SELECT usuario,email,id_usuario FROM th_usuario WHERE usuario='$usuario';";
	$resultado2 = $conexionEstablecida->query($query2);

	while($registro2 = $resultado2->fetch()) {

		$usuarioRecuperado=$registro2['usuario'];
		$emailBaseDeDatos=$registro2['email'];
		$id_usuario=$registro2['id_usuario'];

	}

	$query3="SELECT idDatosTransmititos FROM th_codigogenerado WHERE idUsuario='$id_usuario';";
	$resultado3 = $conexionEstablecida->query($query3);

	while($registro3 = $resultado3->fetch()) {

		$idDatosTransmititos=$registro3['idDatosTransmititos'];

	}

	if (empty($usuarioRecuperado)) {
		
		$mensaje=2;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);

	}else if(empty($idDatosTransmititos)){

		$mensaje=3;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);

	}else{

		$passwordEncriptado=sha1($password1);

		$query="UPDATE th_usuario SET `password`='$passwordEncriptado' WHERE usuario='$usuario';";
		$resultado = $conexionEstablecida->exec($query);


		/*======================================================
		=            Enviar correo desde php mailer            =
		======================================================*/

		$email=$emailBaseDeDatos;

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

			$mailSegunderos->addAddress($email); 

				    // Content
			$mailSegunderos->isHTML(true);                                  // Set email format to HTML
			$mailSegunderos->Subject = 'Ministerio del deporte';
			$mailSegunderos->Body    = "<head><!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /><title>RECUPERAR CONTRASEÑA</title><style type='text/css'>body {background:#EEE; padding:30px; font-size:12px;}</style></head><body><span style='font-weight:bold; font-style: oblique;'>DIRECCIÓN DE ADMINISTRACIÓN DEL TALENTO HUMANO,</span><br><br>Se reiniciarión correctamente sus credenciales:<br><span style='font-weight:bold;'>Usuario: </span>$usuario<br><span style='font-weight:bold;'>Contraseña: </span>$password1</body></html></head>"; 
			$mailSegunderos->send();


		} catch (Exception $e) {
			echo "Hubo un error al enviar el mensaje ".$e;
		}



		/*=====  End of Enviar correo desde php mailer  ======*/

		$mensaje=1;
		$jason['mensaje']=$mensaje;	
		echo json_encode($jason);

	}


