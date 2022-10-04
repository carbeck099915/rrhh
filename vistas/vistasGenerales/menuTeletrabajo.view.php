<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $nombreUsuario=$nombreObjeto->controladorDeSeleccionUsuarios();
  $ApellidoUsuario=$nombreObjeto->recuperandoApellido();
  // $conteo=$nombreObjeto->recuperandoCountDir1();
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
  =            Menú de la Sección Inicial           =
  =================================================-->
  
  
  <div class="wrapper row2 estilo__fondo__header">
        
    <nav id="mainav" class="menu__removible__teletrabajo"> 
      
      <ul class="clear estilo__menu__contenido">

        
        <?php if($idRolRecuperadicimos!=1){ ?>

          <li><a href="teletrabajo" class="estilo__menu__contenido">TELETRABAJO</a></li>

        <?php }?>


        <?php if($idRolRecuperadicimos==3){?>

          <li><a href="teletrabajoConsulta" class="estilo__menu__contenido">MIS REPORTES</a></li>
          <li><a href="timbradasTeletrabajoC" class="estilo__menu__contenido">MIS TIMBRADAS</a></li>

        <?php }else if($idRolRecuperadicimos==1){?>

          <li><a href="teleTrabajoAprobados" class="estilo__menu__contenido">Aprobados</a></li>
          <li><a href="teletrabajoPendientes" class="estilo__menu__contenido">Pendientes</a></li>
          <li><a href="timbradasTeletrabajoC" class="estilo__menu__contenido">TIMBRADAS</a></li>

        <?php }else{?>

          <li><a href="misReportes" class="estilo__menu__contenido">MIS REPORTES</a></li>
          <li><a href="timbradasTeletrabajoC" class="estilo__menu__contenido">MIS TIMBRADAS</a></li>

          <li>

            <a class="drop" href="#">CONSULTAR TELETRABAJO 
              <font size ="3", color ="#ff0000" class="btn btn-circle-micro btn-danger estilo__menu__contenido"><?php echo $conteo; ?></font> 
            </a>
              
               <ul>

                   <li><a href="teletrabajoConsulta" class="estilo__menu__contenido">Pendientes</a></li>
                   <li><a href="teleTrabajoAprobados" class="estilo__menu__contenido">Aprobados</a></li>
                        
               </ul>
          
          </li>

        <?php } ?>
        
        <li><a href="paginaInicial" class="estilo__menu__contenido">Menú Principal</a></li>

        <li><a href="salir2" class="estilo__menu__contenido">Salir</a></li>


      </ul>

    </nav>

  </div>
  
  <!--====  End of Menú de la Sección Inicial  ====-->
  
