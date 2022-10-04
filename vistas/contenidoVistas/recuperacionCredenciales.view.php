<?php
	extract($_GET);
?>

<!DOCTYPE html>

<html>

<!--======================================
=            Sección del Head            =
=======================================-->

<head>

	<!--=====================================
	=            Sección Inicial            =
	======================================-->	

		<meta charset="utf-8">

		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<title>Talento Humano</title>

		<!-- para el ico de inicio -->
		<link rel="shortcut icon" type="image/png" href="../../iconos/ico_minDep.ico" />

		<!-- para dispositvos móviles -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">	

	<!--====  End of Sección Inicial  ====-->

	<!--====================================
	=            Sección de CSS            =
	=====================================-->
		
		<!-- estilos generales -->
		<link href="../../layout/styles/layout.css" rel="stylesheet" type="text/css" media="all">

		<!-- boostrap -->
		<link rel="stylesheet" type="text/css" href="../../layout/bootstrap/css/bootstrap.min.css">

		<!-- multiselect -->
		<link rel="stylesheet" type="text/css" href="../../layout/bootstrap/css/bootstrap-multiselect.css">

		<!-- font awesome -->
		<link rel="stylesheet" type="text/css" href="../../layout/font-awesome/css/font-awesome.min.css">

		<!-- datatablets -->
		<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.11/css/jquery.dataTables.css">

		<!-- temas del jquery -->
		<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />

		<!-- boostrap -->
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">

		<!-- Alertify CSS -->
	    <link rel="stylesheet" href="../../layout/alertifyjs/css/alertify.min.css">  

		<!-- Alertify theme default -->  
		<link rel="stylesheet" href="../../layout/alertifyjs/css/themes/default.min.css"/> 


		<!--=================================================
		=            Estilo personalizado en CSS            =
		==================================================-->
		
		<!-- estilo perzonalizado principal -->
		<link href="../../layout/styles/css/style.css" rel="stylesheet" type="text/css" media="all">
		
		<!--====  End of Estilo personalizado en CSS  ====-->

	
	<!--====  End of Sección de CSS  ====-->
	


	<!--============================================
	=            Sección de Java Script            =
	=============================================-->

		<!-- jquery Boostrap-->
		<script src="../../layout/bootstrap/js/jquery.min.js"></script>

		<!-- jquery 2-->
		<script src="../../layout/bootstrap/js/jquery-1.11.1.js"></script>

		<!-- ajax google -->
	  	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>


		<!-- cdn jquery ui -->
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

	    <!-- Plugins Alertify -->  
	    <script src="../../layout/alertifyjs/js/alertify.min.js"></script> 


		<!-- cloudflare -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js"></script>


		<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>

		<!-- jquery UI-->
		<script src="../../layout/bootstrap/js/jquery-ui.js"></script>

		<script src="../../js/validacion2.js"></script>

	<!--====  End of Sección de Java Script  ====-->

</head>

<!--====  End of Sección del Head  ====-->


<!--==========================
=            Menú            =
===========================-->

<body id="top">

  <!--===================================================
  =            Sección de las redes sociales            =
  ====================================================-->
  
  
  <div class="wrapper row0">

    <div id="topbar" class="clear"> 

      <div class="fl_left">

        <ul class="nospace inline">
          <li></li>
        </ul>

      </div>

      <div class="fl_right">

        <ul class="nospace faico clear">
          <li><a class="faicon-facebook" href="https://www.facebook.com/MinisterioDeporteEcuador" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
          <li><a class="faicon-twitter" href="https://twitter.com/DeporteEc" target="_blank"><i class="fab fa-twitter-square"></i></a></li>
          <li><a class="faicon-dribble" href="https://www.youtube.com/user/DeporteEc" target="_blank"><i class="fab fa-youtube-square"></i></a></li>
          <li><a class="faicon-linkedin" href="https://www.flickr.com/photos/MinisterioDeporteEcuador/" target="_blank"><i class="fab fa-flickr"></i></a></li>
        </ul>

      </div>

    </div>

  </div>
  
  <!--====  End of Sección de las redes sociales  ====-->
  

  <!--=================================================================
  =            Imagen central de la Secretaría del Deporte            =
  ==================================================================-->

  <div class="wrapper row1 estilo__fondo__header">
    
    <header id="header" class="clear">
      
<!--       <div id="logo" class="fl_left">

        <h1>
          <a href="http://www.deporte.gob.ec/" target="_blank"><img src="images/LogoMDNew-03.jpg"></a>
        </h1>

      </div>
 -->

      <div class="fl_left">
        
        <div id="logo" class="fl_left">
          <h1><a href="https://www.deporte.gob.ec/" target="_blank"><img  src="../../images/banner-talento-humano.png"></a></h1>
        </div>

      </div>

    </header>

  </div>
  
  <!--====  End of Imagen central de la Secretaría del Deporte  ====-->

<!--====  End of Menú  ====-->

<!--=======================================
=            Sección Principal            =
========================================-->

<div class="wrapper row3">

	 <main class="container clear contenedor__de__paginas"> 

	 	<div class="row" style="margin-top:4em; width: 50%;">

			<input type="hidden" id="errorTeletrabajo" name="errorTeletrabajo">
			
	 		<div class="col-md-2 col-xs-2">

            </div>
			
	 		<div class="col-md-6 col-xs-6">

                <strong class="titulos__secundarios__totales">
                	RECUPERACIÓN DE CREDENCIALES
            	</strong>

            </div>

            <div class="col-md-2 col-xs-2">

            </div>

            <br>
            <br>
            <br>
			
            <div class="col-md-6 col-xs-6">

                <strong class="titulos__secundarios">
                <span class="obligatorios">Usuario</span>

            </div>


            <div class="col-md-6 col-xs-6">

				<input  type="text" id="usuario" name="usuario" value="<?php echo $usuario;?>" readonly="" class="estilos__botones"/>

            </div>


            <div class="col-md-6 col-xs-6">

                <strong class="titulos__secundarios">
                <span class="obligatorios">Contraseña</span>

            </div>

            <div class="col-md-6 col-xs-6">

				<input  type="password" id="password1" name="password1" placeholder="Ingrese Contraseña"  class="estilos__botones"/>

            </div>

            <div class="col-md-6 col-xs-6">

                <strong class="titulos__secundarios">
                <span class="obligatorios">Repetir  Contraseña</span>

            </div>

            <div class="col-md-6 col-xs-6">

				<input  type="password" id="password2" name="password2" placeholder="Repetir Contraseña"  class="estilos__botones"/>

            </div>

            <div class="col-md-12 col-xs-12 contenedor__formulario__remarcables">

				<button type="button" class="fa fa-save" name="guardarReceteo" id="guardarReceteo">  GUARDAR</button>

            </div>

	 	</div>

	 </main>

</div>


<!--====  End of Sección Principal  ====-->

<!--=====================================
=            Footer dibujado            =
======================================-->
		
	<div class="wrapper row5">
			
		<div id="copyright" class="clear">
				
			<p class="fl_left">
					
				CONTACTO 02-3969-200
				<br>Secretaría del Deporte. 
				<br>Dirección: Gaspar de Villarroel E10-122 y 6 de Diciembre. Quito - Ecuador
				<br>
				<br>

			</p>

			<p class="fl_right">
					
				<br>
				<a href="https://www.deporte.gob.ec/">Copyright@ 2018 Secretaría del Deporte. Dirección de Tecnologías de la Información. Todos los derechos reservados.</a>

			</p>

		</div>

	</div>
		
	<!--====  End of Footer dibujado  ====-->
		

	<!--===========================================================
	=            backtop flecha para redirigir al head            =
	============================================================-->
		
	<a id="backtotop" href="#top"><i class="fa fa-chevron-up"></i></a>
		
	<!--====  End of backtop flecha para redirigir al head  ====-->
		

	</body>

</html>	