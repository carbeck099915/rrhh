<?php

	class ControladorPlantilla{

		public static function ctrPlantilla(){

			include "vistas/plantilla/plantilla.php";

		}

		public static function ctrHead(){

			include "vistas/vistasGenerales/head.view.php";
			
		}

		public static function ctrMenu(){

			if (isset($_GET["ruta"])) {

				if($_GET["ruta"]=="paginaInicial"){

					include "vistas/vistasGenerales/menu2.view.php";

				}else if($_GET["ruta"]=="teletrabajo" || $_GET["ruta"]=="teletrabajoConsulta" || $_GET["ruta"]=="misReportes" || $_GET["ruta"]=="teleTrabajoAprobados" || $_GET["ruta"]=="teletrabajoPendientes" || $_GET["ruta"]=="timbradasTeletrabajoC"){

					include "vistas/vistasGenerales/menuTeletrabajo.view.php";
					
				}else if ($_GET["ruta"]=="ingreso") {

			  		include "vistas/vistasGenerales/menu.view.php";

			  	}else if($_GET["ruta"]=="administracionRoles" || $_GET["ruta"]=="administracionUsuarios" || $_GET["ruta"]=="administracionPermisos"  || $_GET["ruta"]=="permisosAprobadosth"   || $_GET["ruta"]=="permisosNegadosth" || $_GET["ruta"]=="permisosTodosth"  || $_GET["ruta"]=="administracionAreas" || $_GET["ruta"]=="permisosAnuladosth"  || $_GET["ruta"]=="administracionTalentoH"){

			  		include "vistas/vistasGenerales/menuGeneral.view.php";

			  	}else if($_GET["ruta"]=="administracionFuncionarios"  || $_GET["ruta"]=="permisosPorUsuarios" || $_GET["ruta"]=="vacacionesFuncionario"){

			  		include "vistas/vistasGenerales/menuRolSecundario.view.php";

			  	}else if($_GET["ruta"]=="administracionDirectores" || $_GET["ruta"]=="permisosAprobadosDir" || $_GET["ruta"]=="administracionPermisosDirector" || $_GET["ruta"]=="administracionDirectores"  || $_GET["ruta"]=="permisosPorUsuariosDir"){

			  		include "vistas/vistasGenerales/menuRolDirector.view.php";

			  	}else if($_GET["ruta"]=="administracionCordinadores" || $_GET["ruta"]=="administracionCordinado" || $_GET["ruta"]=="permisosAprobadosCor" || $_GET["ruta"]=="permisosPorDirCor" || $_GET["ruta"]=="administracionPermisosCordinado" ){

			  		include "vistas/vistasGenerales/menuRolCordinador.view.php";

			  	}else if($_GET["ruta"]=="administracionPermisosMAutoridad" || $_GET["ruta"]=="permisosAprobadosMax"){

			  		include "vistas/vistasGenerales/menuRolMaximaAutoridad.view.php";

			  	}else if($_GET["ruta"]=="presencial" || $_GET["ruta"]=="reporPresencial" || $_GET["ruta"]=="revisionPresencial" || $_GET["ruta"]=="reporPresencialTalentoHumano" || $_GET["ruta"]=="asignacionesPresenciales" || $_GET["ruta"]=="reporteHorariosEntradasSalidas" || $_GET["ruta"]=="reporteHorariosFuncionariosSalidasEntradas"){

			  		include "vistas/vistasGenerales/menuPresencial.view.php";

			  	}
			  	
			}else{

				include "vistas/vistasGenerales/menu.view.php";
				
				
			}

		}

		public static function ctrContenidoIndex(){

			  if (isset($_GET["ruta"])) {

			  	if ($_GET["ruta"]=="index" || $_GET["ruta"]=="ingreso" || $_GET["ruta"]=="administracionRoles" || $_GET["ruta"]=="administracionUsuarios"  || $_GET["ruta"]=="rolSecundario" ||  $_GET["ruta"]=="salir" || $_GET["ruta"]=="salir2" || $_GET["ruta"]=="administracionFuncionarios" || $_GET["ruta"]=="geoLocalizacion" || $_GET["ruta"]=="administracionPermisos"  || $_GET["ruta"]=="permisosAprobadosth" || $_GET["ruta"]=="permisosAprobadosDir" || $_GET["ruta"]=="administracionPermisosDirector" || $_GET["ruta"]=="administracionDirectores" || $_GET["ruta"]=="permisosPorUsuarios"  || $_GET["ruta"]=="permisosPorUsuariosDir" || $_GET["ruta"]=="permisosNegadosth" || $_GET["ruta"]=="permisosTodosth" || $_GET["ruta"]=="administracionAreas" || $_GET["ruta"]=="permisosAnuladosth" || $_GET["ruta"]=="administracionCordinadores" || $_GET["ruta"]=="administracionCordinado" || $_GET["ruta"]=="permisosAprobadosCor" || $_GET["ruta"]=="ContrasenaInicial" || $_GET["ruta"]=="permisosPorDirCor" || $_GET["ruta"]=="administracionPermisosCordinado" || $_GET["ruta"]=="administracionPermisosMAutoridad" || $_GET["ruta"]=="permisosAprobadosMax" || $_GET["ruta"]=="vacacionesFuncionario"  || $_GET["ruta"]=="administracionTalentoH" || $_GET["ruta"]=="teletrabajo" || $_GET["ruta"]=="teletrabajoConsulta" || $_GET["ruta"]=="paginaInicial" || $_GET["ruta"]=="misReportes" || $_GET["ruta"]=="teleTrabajoAprobados" || $_GET["ruta"]=="recuperacionCredenciales" || $_GET["ruta"]=="teletrabajoPendientes" || $_GET["ruta"]=="presencial" || $_GET["ruta"]=="reporPresencial" || $_GET["ruta"]=="revisionPresencial" || $_GET["ruta"]=="reporPresencialTalentoHumano" || $_GET["ruta"]=="asignacionesPresenciales" || $_GET["ruta"]=="reporteHorariosEntradasSalidas" || $_GET["ruta"]=="reporteHorariosFuncionariosSalidasEntradas" || $_GET["ruta"]=="timbradasTeletrabajoC") {

			  			include "vistas/contenidoVistas/".$_GET["ruta"].".view.php";

			  	}

			  }else{
			  	
			  	include "vistas/contenidoVistas/ingreso.view.php";

			  }

		}

		public static function ctrFooter(){

			include "vistas/vistasGenerales/footer.view.php";

		}

	}