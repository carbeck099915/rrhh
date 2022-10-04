<?php

/*==============================================
=            Controlando el ingreso            =
==============================================*/

	class ControladorIngreso{


		/*=======================================
		=            Ingreso General            =
		=======================================*/
		
		public static function ctrIngreso(){

			$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();


			if (isset($_POST["ingresarUsuario"])) {

				if (empty($_POST["usuario"]) || empty($_POST["password"])) {

 					echo '<script>

 								$(".agrupador__elementos__inicio").addClass("error");

						          swal({
						            type: "error",
						            title: "Porfavor ingrese usuario y contraseña",
						            showConfirmButton: true,
						            confirmButtonText: "Cerrar"
						          });

				        	</script>'; 

 				}else{

					$password2=sha1($_POST["password"]);

					$query="SELECT a.usuario, a.`password` AS contrasena,a.estadoUsuario ,b.estado, c.id_rol, a.loginOne FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario  INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_POST["usuario"]."' AND a.`password`='$password2' AND a.estadoUsuario='A';";

					$resultado = $conexionEstablecida->query($query);

					while($registro = $resultado->fetch()) {

						$usuarioReferenciado=$registro['usuario'];
						$password=$registro['contrasena'];
						$estado=$registro['estadoUsuario'];
						$idRol=$registro['id_rol'];
						$idArea=$registro['id_area'];
						$id_loginOne=$registro['loginOne'];

					}

					if ($usuarioReferenciado && $password && $estado && $idRol==1 && $id_loginOne == 1) {
						
						session_start();

						$_SESSION["iniciarSesion"]="ok";
						$_SESSION["nombre"]=$usuarioReferenciado;
						$_SESSION['testing'] = time(); 
						    
						echo '<script>window.location="paginaInicial"</script>';

					} else if ($usuarioReferenciado && $password && $estado && $idRol ==3 && $id_loginOne == 1) {
						
						session_start();

						$_SESSION["iniciarSesion"]="ok";
						$_SESSION["nombre"]=$usuarioReferenciado;
						$_SESSION['testing'] = time(); 
						    
						echo '<script>window.location="paginaInicial"</script>';

					} else if ($usuarioReferenciado && $password && $estado && $idRol ==2 && $id_loginOne == 1) {
						
						session_start(); 

						$_SESSION["iniciarSesion"]="ok";
						$_SESSION["nombre"]=$usuarioReferenciado;
						$_SESSION['testing'] = time(); 
						    
						echo '<script>window.location="paginaInicial"</script>';

					} else if ( $usuarioReferenciado && $password && $estado && ($idRol ==4 || $idRol ==7 || $idRol ==6)  && $id_loginOne == 1) {
						
						session_start();

						$_SESSION["iniciarSesion"]="ok";
						$_SESSION["nombre"]=$usuarioReferenciado;
						$_SESSION['testing'] = time(); 
						    
						echo '<script>window.location="paginaInicial"</script>';

					} else if ( $usuarioReferenciado && $password && $estado && $idRol ==5   && $id_loginOne == 1) {
						// ($idRol ==5 || $idRol ==6) 
						session_start();

						$_SESSION["iniciarSesion"]="ok";
						$_SESSION["nombre"]=$usuarioReferenciado;
						$_SESSION['testing'] = time(); 
						    
						echo '<script>window.location="paginaInicial"</script>';

					}else if ( $usuarioReferenciado && $password && $estado && ($idRol ==1 || $idRol ==2 || $idRol ==3 || $idRol ==4 || $idRol ==6 || $idRol ==5 || $idRol ==7) && $id_loginOne == 0) {
						
						session_start();

						$_SESSION["iniciarSesion"]="ok";
						$_SESSION["nombre"]=$usuarioReferenciado;
						$_SESSION['testing'] = time(); 
						    
						echo '<script>window.location="paginaInicial"</script>';

					}


					else{


	 					echo '<script>

	 								$(".agrupador__elementos__inicio").addClass("error");

							          swal({
							            type: "error",
							            title: "Usuario o Contraseña no validos",
							            showConfirmButton: true,
							            confirmButtonText: "Cerrar"
							          });

					        	</script>'; 


					}
				
 				}

			}


		}

		
		/*=====  End of Ingreso General  ======*/

	}

/*=====  End of Controlando el ingreso  ======*/
