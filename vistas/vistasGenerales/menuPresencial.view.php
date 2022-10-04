<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $nombreUsuario=$nombreObjeto->controladorDeSeleccionUsuarios();
  $ApellidoUsuario=$nombreObjeto->recuperandoApellido();
  $puesto=$nombreObjeto->recuperandoAreaPuesto();
  $idRolRecuperadicimos=$nombreObjeto->controladorDeSeleccionIdRolesAutonomos();
  $conteo=$nombreObjeto->recuperandoConteoTeletrabajo();
?> 

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
      
      <div id="logo" class="fl_left" style="position:relative; top:-35px;">

        <h1>
          <a href="http://www.deporte.gob.ec/" target="_blank"><img src="images/banner-talento-humano-teletrabajo.jpg"></a>
        </h1>

        <div class="letras__arreglos"><?php echo $nombreUsuario.' '.$ApellidoUsuario; ?></div>
        <div class="letras__arreglos"><?php echo $puesto; ?></div>

      </div>

    </header>
    
  </div>
  
  <!--====  End of Imagen central de la Secretaría del Deporte  ====-->
  

  <!--================================================
  =            Menú de la Sección Inicial         =
  =================================================-->
  
  
  <div class="wrapper row2 estilo__fondo__header">
        
    <nav id="mainav" class="menu__removible__teletrabajo"> 
      
      <ul class="clear estilo__menu__contenido">

        <?php if ($idRolRecuperadicimos!=1): ?>
          
          <li><a href="presencial" class="estilo__menu__contenido">Asisto</a></li>

          <li><a href="reporPresencial" class="estilo__menu__contenido">Registros</a></li>

        <?php endif ?>

        <?php if ($idRolRecuperadicimos!=3 && $idRolRecuperadicimos!=1): ?>

          <li class="oculto__presencial__li"><a href="revisionPresencial" class="estilo__menu__contenido">Revisar Asistencias</a></li>

          <li class="oculto__presencial__li"><a href="asignacionesPresenciales" class="estilo__menu__contenido">Configuración</a></li>

          
        <?php endif ?>

        <?php if ($idRolRecuperadicimos==1): ?>

          <li><a href="reporPresencialTalentoHumano" class="estilo__menu__contenido">Reportería Presencial</a></li>

            
            <li><a href="#" class="drop">Gestión de Horarios</a>

              <ul>

                  <li><a href="reporteHorariosEntradasSalidas" class="estilo__menu__contenido">Horarios entradas y salidas por dirección</a></li>
                  <li><a href="reporteHorariosFuncionariosSalidasEntradas" class="estilo__menu__contenido">Horarios de entradas y salidas por Funciarios</a></li>

              </ul>

            </li>         

          
        <?php endif ?>


        <li class="oculto__presencial__li"><a href="paginaInicial" class="estilo__menu__contenido">Menú Principal</a></li>

        

        <li><a href="salir2" class="estilo__menu__contenido">Salir</a></li>


      </ul>

    </nav>

  </div>
  
  <!--====  End of Menú de la Sección Inicial  ====-->
  

