<?php

	require_once "../../Swift/lib/swift_required.php";
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	if (empty($sustanciasSucro) || empty($deporteViolacion) || empty($involucradoIncidente) || empty($sospechaConocimiento) || empty($nombre) || empty($apellidos)  || empty($celular)  || empty($correo)) {
		
			$mensaje=1;
			$jason['mensaje']=$mensaje;
			echo json_encode($jason);
		
	}else{

		if (empty($direccionDocumentoInterventor)) {
			
			/*=======================================================
			=            Envío del correo al interventor            =
			=======================================================*/

			$email='Carlos_Cobena@yahoo.com';

			$from="interventoresSistema@gmail.com";

			$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com',465,'ssl');

			$transport->setUsername('interventoresSistema@gmail.com');

			$transport->setPassword('Lulyamor098*');	
											
			$message = Swift_Message::newInstance();
										
			$message->setTo($email);

			$body='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>ONADE</title><style type="text/css">body {background:#EEE; padding:30px;}'.'</style>'.'</head>'.'<body><p style="font-size:14px;">'.''.$nombre.' '.$apellidos.' denuncia caso de dopaje por la violación de la regla de '.$sustanciasSucro.' en el deporte '.$deporteViolacion.'. </br></br>Se acusa por estar involucrado en este caso a '.$involucradoIncidente.' la sospecha del incidente es de '.$sospechaConocimiento.'</p></body></html>';

			$message->setSubject('Peticiones de la Onade');

			$message->setBody($body);

			$message->setContentType('text/html');

			$message->setFrom(array($from => 'Onade'));

			$mailer = Swift_Mailer::newInstance($transport);

			$mailer->send($message);

											
			/*=====  End of Envío del correo al interventor  ======*/

											
			$mensaje=2;
			$jason['mensaje']=$mensaje;
			echo json_encode($jason);

		}else{

			/*=======================================================
			=            Envío del correo al interventor            =
			=======================================================*/

			$tipo = $_FILES['documentoInterventor']['type']; 
			$tamanio = $_FILES['documentoInterventor']['size']; 
			$archivotmp = $_FILES['documentoInterventor']['tmp_name'];
			$archivotmpNombre=$_FILES['documentoInterventor']['name'];


			$email='Carlos_Cobena@yahoo.com';

			$from="interventoresSistema@gmail.com";

			$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com',465,'ssl');

			$transport->setUsername('interventoresSistema@gmail.com');

			$transport->setPassword('Lulyamor098*');	
											
			$message = Swift_Message::newInstance();
										
			$message->setTo($email);

			$body='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>ONADE</title><style type="text/css">body {background:#EEE; padding:30px;}'.'</style>'.'</head>'.'<body><p style="font-size:14px;">'.''.$nombre.' '.$apellidos.' denuncia caso de dopaje por la violación de la regla de '.$sustanciasSucro.', en el deporte '.$deporteViolacion.'. </br></br>Se acusa por estar involucrado en este caso a '.$involucradoIncidente.', la sospecha del incidente es de '.$sospechaConocimiento.'.</p></body></html>';

			$message->attach(Swift_Attachment::fromPath($_FILES['documentoInterventor']['tmp_name'])->setFilename($_FILES['documentoInterventor']['name']));

			$message->setSubject('Peticiones de la Onade');

			$message->setBody($body);

			$message->setContentType('text/html');

			$message->setFrom(array($from => 'Onade'));

			$mailer = Swift_Mailer::newInstance($transport);

			$mailer->send($message);

											
			/*=====  End of Envío del correo al interventor  ======*/

											
			$mensaje=3;
			$jason['mensaje']=$mensaje;
			echo json_encode($jason);


		}

		


	}