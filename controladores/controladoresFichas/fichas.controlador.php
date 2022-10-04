<?php

	session_start();

	class recuperandoLogeo{

		public static function ctrrecuperandoLogeo(){

			if (isset($_SESSION["iniciarSesion"]) && $_SESSION["iniciarSesion"]=="ok"){			


				// echo "<script> var a='si'; var contadorAfk = 0;  var contadorAfk = setInterval(ctrlTiempo, 60000);  $(this).mousemove(function (e) { contadorAfk = 0; }); $(this).keypress(function (e) { contadorAfk = 0; }); function ctrlTiempo(){ contadorAfk++; if(contadorAfk>=50){  var paqueteDeDatos = new FormData(); paqueteDeDatos.append('datoEnviado', a); var destino = 'funciones/funcionesActualiza/actualizaActividad.php'; $.ajax({  url: destino, type: 'POST', contentType: false, data: paqueteDeDatos, processData: false,  cache: false, success: function(response){ swal({ type: 'info', title: 'Su sesión caduco por inactividad', showConfirmButton: true, confirmButtonText: 'Click para volver a iniciar sesión'}).then(function(result){ if(result.value){ window.location='ingreso'; }}); }, error: function (){ alert('Algo ha fallado.'); } }); } } </script>";


				}else{
				 	
				 echo '<script>window.location = "ingreso";</script>';
				 
			}				
		}

	}