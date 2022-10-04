<?php
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $idRolRecuperadicimos=$nombreObjeto->controladorDeSeleccionIdRolesAutonomos();
  $idLoginAntiipador=$nombreObjeto->controladorDeSeleccionIdLoginAnticipador();
?>


<!--=======================================
=            Sección Principal            =
========================================-->

<div class="wrapper row3">

	 <main class="clear contenedor__de__paginas__2 estilo__fondo__main__body"> 

	 	<input type="hidden" name="idRolRecuperadicimos" id="idRolRecuperadicimos" value="<?php echo $idRolRecuperadicimos;?>">
	 	<input type="hidden" name="idLoginAntiipador" id="idLoginAntiipador" value="<?php echo $idLoginAntiipador;?>">

	 	<div class="row contenedor__elementos__diferibles">

	 		<div class="contenedores__iniciales contenedor__escritorios">

				<a class="espaciado__enlaces__iniciales" id="enlaceTalentoHumano" ><img src="images/logo-trabajo.jpg" alt="" class="imagenes__conjuntas"></a>

			</div>

			<div class="contenedores__iniciales contenedor__escritorios">

				<?php if ($idRolRecuperadicimos==1 OR $idRolRecuperadicimos=="1"): ?>

					<a class="espaciado__enlaces__iniciales" id="enlaceRecursosHumanos" href="teleTrabajoAprobados"><img src="images/Logo tletrabajo.jpg" alt="" class="imagenes__conjuntas"></a>
					
				<?php endif ?>


				<?php if ($idRolRecuperadicimos!=1 OR $idRolRecuperadicimos!="1"): ?>

					<a class="espaciado__enlaces__iniciales" id="enlaceRecursosHumanos" href="teletrabajo"><img src="images/Logo tletrabajo.jpg" alt="" class="imagenes__conjuntas"></a>	

				<?php endif ?>
			
			</div>

	 		<div class="contenedores__iniciales">

	 			<?php if ($idRolRecuperadicimos==1): ?>
	 				
					<a class="espaciado__enlaces__iniciales" id="enlacePresencial" href="reporPresencialTalentoHumano"><img src="images/presencial.jpg" alt="" class="imagenes__conjuntas"></a>

	 			<?php else: ?>
	 				
					<a class="espaciado__enlaces__iniciales" id="enlacePresencial" href="presencial"><img src="images/presencial.jpg" alt="" class="imagenes__conjuntas"></a>

	 			<?php endif ?>


			</div>

	 	</div>

	 	<div class="row contenedor__elementos__diferibles">

			<div class="titulos__relevantes contenedores__iniciales contenedor__escritorios">SOLICITUD DE PERMISOS</div>

			<div class="titulos__relevantes contenedores__iniciales espaciado__letras__sincronas contenedor__escritorios">TELETRABAJO</div>

			<div class="titulos__relevantes contenedores__iniciales espaciado__letras__sincronas" style="display: flex; flex-direction: column; align-items: center; justify-content: center;"><span>ASISTO</span><span style="font-size:10px; font-weight: bold;">(Módulo para registro del trabajo presencial)</span></div>

	 	</div>
	
	</main>

</div>

<!--====  End of Sección Principal  ====-->
