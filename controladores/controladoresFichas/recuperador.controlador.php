	<?php	

	class recuperandoDatosDeLogeo{

		public static function controladorDeSeleccionUsuarios(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

 			$centro= new recuperandoLogeo();
		  	$centro->ctrrecuperandoLogeo();

		  	$query="SELECT a.nombre,a.apellido, c.nombre AS rol, c.tipo FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_SESSION["nombre"]."';";
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$nombreBaseDeDatos=$registro['nombre'];
				

			}

			
		  	return $nombreBaseDeDatos;

		}

		/*==============================================
		=            Recupera Id de Usuario            =
		==============================================*/
		
		public static function controladorDeSeleccionIdUsuarios(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

 			$centro= new recuperandoLogeo();
		  	$centro->ctrrecuperandoLogeo();

		  	$query="SELECT a.id_usuario FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_SESSION["nombre"]."';";
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$id_usuario=$registro['id_usuario'];
				

			}

			
		  	return $id_usuario;

		}
		
		/*=====  End of Recupera Id de Usuario  ======*/

		/*==========================================
		=            Habilitar usuarios            =
		==========================================*/

		public static function controladorHabilitarUsuarios(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

 			$centro= new recuperandoLogeo();
		  	$centro->ctrrecuperandoLogeo();

		  	$query="SELECT habilitar FROM th_usuario WHERE usuario='".$_SESSION["nombre"]."';";
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$habilitar=$registro['habilitar'];
				

			}

			
		  	return $habilitar;

		}
		
		/*=====  End of Habilitar usuarios  ======*/
		

		/*==========================================
		=            Recuperando Id Rol            =
		==========================================*/
		
		public static function controladorDeSeleccionIdRolesAutonomos(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

 			$centro= new recuperandoLogeo();
		  	$centro->ctrrecuperandoLogeo();

		  	$query="SELECT c.id_rol FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario  INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_SESSION["nombre"]."';";
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$id_rol=$registro['id_rol'];
				

			}

			
		  	return $id_rol;

		}
		
		/*=====  End of Recuperando Id Rol  ======*/

		/*==================================================
		=            Recuperador de modalidades            =
		==================================================*/
		
		public static function controladorModalidades(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

 			$centro= new recuperandoLogeo();
		  	$centro->ctrrecuperandoLogeo();

		  	$query="SELECT a.modalidad2 FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario  INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_SESSION["nombre"]."';";
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$modalidad2=$registro['modalidad2'];
				

			}

			
		  	return $modalidad2;

		}		
		
		/*=====  End of Recuperador de modalidades  ======*/
		

		/*================================================
		=            Recuperando Id Rol login            =
		================================================*/
		
		public static function controladorDeSeleccionIdLoginAnticipador(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

 			$centro= new recuperandoLogeo();
		  	$centro->ctrrecuperandoLogeo();

		  	$query="SELECT a.loginOne FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario  INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_SESSION["nombre"]."';";
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$loginOne=$registro['loginOne'];
				

			}

			
		  	return $loginOne;

		}
		
		/*=====  End of Recuperando Id Rol login  ======*/
		
		
		/*==============================================
		=            Recuperar zonal nombre            =
		==============================================*/
		
		public static function controladorDeSeleccionZonal(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

 			$centro= new recuperandoLogeo();
		  	$centro->ctrrecuperandoLogeo();

		  	$query="SELECT b.descripcionZonal FROM th_usuario AS a INNER JOIN th_zonal AS b ON a.zonal=b.id_Zonal WHERE a.usuario='".$_SESSION["nombre"]."';";
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$descripcionZonal=$registro['descripcionZonal'];
				

			}

			
		  	return $descripcionZonal;

		}
		
		/*=====  End of Recuperar zonal nombre  ======*/
		
		/*==================================
		=            Estructura            =
		==================================*/
		
				
		public static function controladorDeSeleccionEstructura(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

 			$centro= new recuperandoLogeo();
		  	$centro->ctrrecuperandoLogeo();

		  	$query="SELECT b.descripcionFisicamenteEstructura FROM th_usuario AS a INNER JOIN th_fisicamenteestructura AS b ON a.fisicamenteEstructura=b.id_FisicamenteEstructura WHERE a.usuario='".$_SESSION["nombre"]."';";
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$descripcionEstructura2=$registro['descripcionFisicamenteEstructura'];
				

			}

			
		  	return $descripcionEstructura2;

		}
		
		/*=====  End of Estructura  ======*/
		
		/*======================================
		=            Jefe inmediato            =
		======================================*/
		
		public static function controladorDeSeleccionJefeInmediato(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

 			$centro= new recuperandoLogeo();
		  	$centro->ctrrecuperandoLogeo();



		  	$query="SELECT PersonaACargo FROM th_usuario WHERE usuario='".$_SESSION["nombre"]."';";
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$PersonaACargo=$registro['PersonaACargo'];
				

			}

			$query2="SELECT nombre,apellido FROM th_usuario WHERE id_usuario='$PersonaACargo';";
			$resultado2 = $conexionEstablecida->query($query2);

			while($registro2 = $resultado2->fetch()) {

				$nombre=$registro2['nombre'];
				$apellido=$registro2['apellido'];

			}

			$nombreCompleto=$nombre." ".$apellido;
			
		  	return $nombreCompleto;

		}
		
		/*=====  End of Jefe inmediato  ======*/
		



		public static function recuperandoApellido(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			// $conexionEstablecida->exec("set names utf8");

		  	$query="SELECT a.nombre,a.apellido, c.nombre AS rol, c.tipo FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_SESSION["nombre"]."';";
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				
				$apellidoBaseDeDatos=$registro['apellido'];

			}

		
		  	return $apellidoBaseDeDatos;

		}

		public static function recuperandoEmail(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

		  	$query="SELECT a.nombre,a.apellido, c.nombre AS rol, a.email, c.tipo FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_SESSION["nombre"]."';";
			$resultado = $conexionEstablecida->query($query); 

			while($registro = $resultado->fetch()) {

				$emailBaseDeDatos=$registro['email'];
				
			}

			$arrayEmail = explode(" ",$emailBaseDeDatos);
		  	

		  	$emailCompleto=$arrayEmail[0];

		  	return $emailCompleto;

		}

		public static function recuperandoTelefono(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion(); 

 			$conexionEstablecida->exec("set names utf8");

		  	$query="SELECT a.nombre,a.apellido, c.nombre AS rol, a.telefono, c.tipo FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_SESSION["nombre"]."';";
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$telefonoBaseDeDatos=$registro['telefono'];
				
			}

			$arrayTelefono = explode(" ",$telefonoBaseDeDatos);
		  	

		  	$telefonoCompleto=$arrayTelefono[0];

		  	return $telefonoCompleto;

		}	
				
		public static function recuperandoid(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

		  	$query="SELECT a.id_usuario, a.nombre,a.apellido, c.nombre AS rol, a.telefono, c.tipo FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_SESSION["nombre"]."';";
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$idBaseDeDatos=$registro['id_usuario'];
				
			}

			$arrayId = explode(" ",$idBaseDeDatos);
		  	

		  	$idCompleto=$arrayId[0];

		  	return $idCompleto;

		}

		public static function recuperandoCedula(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

		  	$query="SELECT a.id_usuario, a.nombre,a.apellido,a.cedula, c.nombre AS rol, a.telefono, c.tipo FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_SESSION["nombre"]."';";
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$idBaseDeDatos=$registro['cedula'];
				
			}

			$arrayId = explode(" ",$idBaseDeDatos);
		  	

		  	$idCompleto=$arrayId[0];

		  	return $idCompleto;

		}

		public static function recuperandoAreaDep(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion(); 

 			$conexionEstablecida->exec("set names utf8");

		  	$query="SELECT a.id_usuario, a.nombre,a.apellido, c.nombre AS rol, a.telefono, c.tipo, (select descripcionFisicamenteEstructura from th_fisicamenteestructura where id_FisicamenteEstructura = a.fisicamenteEstructura) as puestoInstitucional FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_SESSION["nombre"]."';";
			
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$idBaseDeDatos=$registro['puestoInstitucional'];
				
			}

			

		  	return $idBaseDeDatos;

		}

		public static function recuperandoCountDir(){ 
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

 			extract($_POST);

		  	$query="SELECT COUNT(DISTINCT id_generaPermiso) as conteo FROM th_generapermiso gp INNER JOIN th_usuario_roles ur on gp.id_usuario = ur.id_usuario INNER JOIN th_usuario us on gp.id_usuario = us.id_usuario where estado_permiso = 'P' and id_permisos != 7 and fisicamenteEstructura = (SELECT fisicamenteEstructura FROM th_usuario WHERE usuario = '".$_SESSION["nombre"]."') and us.id_usuario != (SELECT id_usuario FROM th_usuario WHERE usuario = '".$_SESSION["nombre"]."')and ur.id_rol = 3;";

// and ur.id_area = 2
			
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$idBaseDeDatos=$registro['conteo'];
				
			}

			

		  	return $idBaseDeDatos;

		}

		public static function recuperandoConteoTeletrabajo(){ 
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

 			extract($_POST);

		  	$query="SELECT id_usuario FROM th_usuario WHERE usuario='".$_SESSION["nombre"]."';";
			
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$id_usuario=$registro['id_usuario'];
				
			}

		  	$query2="SELECT COUNT(a.idTeletrabajo) AS contadorTeletrabajo FROM th_teletrabajo AS a INNER JOIN th_usuario AS b ON a.idUsuario=b.id_usuario WHERE a.estado='P' AND  b.PersonaACargo='$id_usuario';";
			
			$resultado2 = $conexionEstablecida->query($query2);

			while($registro2 = $resultado2->fetch()) {

				$contadorTeletrabajo=$registro2['contadorTeletrabajo'];
				
			}


		  	return $contadorTeletrabajo;

		}


		public static function recuperandoCountDir1(){ 
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

 			extract($_POST);

		  	$query="SELECT COUNT(DISTINCT id_generaPermiso) as conteo  from th_generapermiso gp INNER JOIN th_usuario u on gp.id_usuario = u.id_usuario INNER JOIN th_usuario_roles ur on ur.id_usuario = u.id_usuario where gp.estado_permiso = 'P' and  gp.id_permisos != 7 and (ur.id_rol = 2 or ur.id_rol = 3) and u.fisicamenteEstructura in (SELECT fisicamenteEstructura from th_usuario us WHERE us.PersonaACargo = (SELECT id_usuario from th_usuario us WHERE us.usuario = '".$_SESSION["nombre"]."'));";

// and ur.id_area = 2
			
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$idBaseDeDatos=$registro['conteo'];
				
			}

			

		  	return $idBaseDeDatos;

		}

		public static function recuperandoCountMx(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

 			extract($_POST);

		  	$query="SELECT COUNT(DISTINCT id_generaPermiso) as conteo FROM th_generapermiso gp INNER JOIN th_usuario_roles ur on gp.id_usuario = ur.id_usuario where (ur.id_rol = 4 or ur.id_rol = 6 or ur.id_rol = 7) and gp.estado_permiso = 'P' ;";


		  	// and ur.id_area = 2



			
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$idBaseDeDatos=$registro['conteo'];
				
			}

			

		  	return $idBaseDeDatos;

		}

	

		public static function recuperandoCountTh(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

		  	$query="SELECT COUNT(DISTINCT id_generaPermiso) as conteo1 from th_generapermiso gp where estado_permiso = 'P' and (id_permisos = 3 or id_permisos = 4 or id_permisos = 5 or id_permisos = 6);";
			
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$idBaseDeDatos=$registro['conteo1'];
				
			}

			

		  	return $idBaseDeDatos;

		}

		public static function recuperandoAreaPuesto(){
			
		  	$conexionRecuperada= new conexion();
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

		  	$query="SELECT a.id_usuario, a.nombre,a.apellido, c.nombre AS rol, a.telefono, c.tipo, (select descripcionPuestoInstitucional from th_puestoinstitucional where id_PuestoInstitucional = a.puestoInstitucional) as puestoInstitucional FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_SESSION["nombre"]."';";
			
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$idBaseDeDatos=$registro['puestoInstitucional'];
				
			}

			

		  	return $idBaseDeDatos;

		}

		public static function recuperandoCodigo(){
			
		  	$conexionRecuperada= new conexion(); 
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

		  	$query="SELECT a.id_usuario, a.nombre,a.apellido, c.nombre AS rol, a.telefono, c.tipo, a.puestoInstitucional, a.fisicamenteEstructura FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_SESSION["nombre"]."';";
			
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$idBaseDeDatos=$registro['fisicamenteEstructura'];
				
			}

			

		  	return $idBaseDeDatos;

		}

		public static function recuperandoPerAcargo(){
			
		  	$conexionRecuperada= new conexion(); 
 			$conexionEstablecida=$conexionRecuperada->cConexion();

 			$conexionEstablecida->exec("set names utf8");

		  	$query="SELECT a.id_usuario, a.nombre,a.apellido, c.nombre AS rol, a.telefono, c.tipo, a.puestoInstitucional, a.estructura2, a.personaACargo FROM th_usuario AS a INNER JOIN th_usuario_roles AS b ON a.id_usuario=b.id_usuario INNER JOIN th_roles AS c ON b.id_rol=c.id_rol WHERE a.usuario='".$_SESSION["nombre"]."';";
			
			$resultado = $conexionEstablecida->query($query);

			while($registro = $resultado->fetch()) {

				$idBaseDeDatos=$registro['personaACargo'];
				
			}

			

		  	return $idBaseDeDatos;

		}
		

		/*===============================================
		=            Funciones estructuradas            =
		===============================================*/
		
		public static function generarCodigo($longitud) {
		 	$key = '';
		 	$pattern = '1234567890abcdefghijklmnopqrstuvwxyz';
		 	$max = strlen($pattern)-1;

		 	for($i=0;$i < $longitud;$i++) $key .= $pattern{
		 		mt_rand(0,$max)
		 	};
		 	return $key;
		}
		
		/*=====  End of Funciones estructuradas  ======*/
		


	}


	
  	
