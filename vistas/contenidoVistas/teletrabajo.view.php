<?php
  $nombreObjeto= new  recuperandoDatosDeLogeo();
   $nombreUsuario=$nombreObjeto->controladorDeSeleccionUsuarios();
  $ApellidoUsuario=$nombreObjeto->recuperandoApellido();
  $idUsuario=$nombreObjeto->controladorDeSeleccionIdUsuarios();
  $nombreZonal=$nombreObjeto->controladorDeSeleccionZonal();
  $estructura=$nombreObjeto->controladorDeSeleccionEstructura();
  $nombreCompleto2=$nombreObjeto->controladorDeSeleccionJefeInmediato();
  $puesto=$nombreObjeto->recuperandoAreaPuesto();
  $nombreCompletoTeletrabajo=$ApellidoUsuario." ".$nombreUsuario;
?>

<!--=======================================
=            Sección Principal            =
========================================-->

<div class="wrapper row3">

	 <main class="clear contenedor__de__paginas"> 

	 	<div class="row contenedor__formulario">

	 	<!--========================================
		  =            Variables atraidas            =
		  =========================================-->
		  
		  <input type="hidden" id="idUsuarioRecuperandose"  name="idUsuarioRecuperandose" value="<?php echo $idUsuario;?>" />

		  <input  type="hidden" id="errorTeletrabajo" name="errorTeletrabajo"/>
		  <input  type="hidden" id="errorTeletrabajo2" name="errorTeletrabajo2"/>
		  <input  type="hidden" id="errorTeletrabajo3" name="errorTeletrabajo3"/>
		  <input  type="hidden" id="errorTeletrabajo4" name="errorTeletrabajo4"/>
		  <input  type="hidden" id="errorTeletrabajo5" name="errorTeletrabajo5"/>
		  <input  type="hidden" id="errorTeletrabajo6" name="errorTeletrabajo6"/>
		  
		  <!--====  End of Variables atraidas  ====-->

			<!--=====================================
			=            Datos Generales            =
			======================================-->

			<input type="hidden" id="relojActual" name="relojActual" >

  			<div class="tiempo__totales__cronometros"></div>

			<div class="row contenedor__formulario__elementos__flotantes">


				<div class="col-md-12 text-left contenedor__titulos__primarios">

				 	<strong class="titulos__primarios" data-toggle="tooltip" title="Por favor poner la información correspondiente al representante legal">
				 		CONTROL DE ASISTENCIA EN TELETRABAJO
				 	</strong>

				</div>

				<div class="col-md-2  contenedor__titulos__primarios">

					<button class="boton__timbradas btn btn-primary" attr="ingreso" id="inicioJornada">INICIO DE<br>JORNADA</button>
					<div class="text-center">8:00</div>
					<div class="text-center rotulo__inicio_jornada"></div>

				</div>

				<div class="col-md-2  contenedor__titulos__primarios">

					<button class="boton__timbradas btn btn-warning" attr="hora__intermedia__temprano" id="controlJornad1" >CONTROL DE<br>JORNADA 1</button>
					<div class="text-center">10:30</div>
					<div class="text-center rotulo__control__jornada1"></div>

				</div>

				<div class="col-md-2  contenedor__titulos__primarios">

					<button class="boton__timbradas btn btn-primary" attr="salida__almuerzo" id="inicioAlmuero" >INICIO<br>ALMUERZO</button>
					<div class="text-center">12:30</div>
					<div class="text-center rotulo__inicio__almuerzo"></div>

				</div>

				<div class="col-md-2  contenedor__titulos__primarios">

					<button class="boton__timbradas btn btn-primary" attr="regreso__almuerzo" id="finAlmuerzo" >FIN DE<br>ALMUERZO</button>
					<div class="text-center">13:30</div>
					<div class="text-center rotulo__fin__almuerzo"></div>

				</div>


				<div class="col-md-2  contenedor__titulos__primarios">

					<button class="boton__timbradas btn btn-warning" attr="hora__intermedia__dos" id="controlJornada1" >CONTROL DE<br> JORNADA 2</button>
					<div class="text-center">15:30</div>
					<div class="text-center rotulo__control__jornada__dos"></div>

				</div>



				<div class="col-md-2 text-left contenedor__titulos__primarios">

					<button class="boton__timbradas btn btn-primary" attr="salida__jornada__laboral" id="finJornada" >FIN DE<br>JORNADA</button>
					<div class="text-center">17:00</div>
					<div class="text-center rotulo__final__jornada"></div>

				</div>


			</div>

			<div class="" style="display: none!important;">

				<div class="row contenedor__formulario__elementos__flotantes">

					<div class="col-md-12 text-left contenedor__titulos__primarios">

					 	<strong class="titulos__primarios" data-toggle="tooltip" title="Por favor poner la información correspondiente al representante legal">
					 		ASIGNACIÓN Y EVALUACIÓN ACTIVIDADES DIARIAS EN TELETRABAJO
					 	</strong>

					</div>

				</div>

			</div>

			<br>
			<br>
			<br>

			<div class="oculto__actividades__diarias" style="display: none!important;">

				<div class="row alineando__contenidos oculto__actividades__diarias">

					<div class="row__flotante row contenedor__formulario__elementos__flotantes" style="display: none;">

							<div class="col-md-4 col-xs-12 caja">

						 		<strong class="titulos__secundarios">
						 			TIPO DE DESCONCENTRACIÓN
						 		</strong>

							</div>

							<div class="col-md-4 col-xs-12 caja">

							 	<strong class="titulos__secundarios">
						 			NOMBRES Y APELLIDOS DEL FUNCIONARIO
						 		</strong>

							</div>

							<div class="col-md-4 col-xs-12 caja">

							 	<strong class="titulos__secundarios">
						 			UNIDAD ADMINISTRATIVA
						 		</strong>

							</div>

							<div class="col-md-4 col-xs-12 caja">

								<input type="text" class="form-control" name="tipoDeDesconcentracion" id="tipoDeDesconcentracion" value="<?php echo $nombreZonal;?>" readonly=""/>

							</div>

							<div class="col-md-4 col-xs-12 caja">

								<input type="text" class="form-control" name="nombresApellidos" id="nombresApellidos" value="<?php echo $nombreCompletoTeletrabajo;?>" readonly=""/>

							</div>

							<div class="col-md-4 col-xs-12 caja">

								<input type="text" class="form-control" name="unidadAdministrativa" id="unidadAdministrativa" value="<?php echo $estructura;?>" readonly=""/>

							</div>

					</div>

					<br>

					<div class="row__flotante row contenedor__formulario__elementos__flotantes" style="display: none;">

							<div class="col-md-4 col-xs-12 caja">

						 		<strong class="titulos__secundarios">
						 			CARGO
						 		</strong>

							</div>

							<div class="col-md-4 col-xs-12 caja">

							 	<strong class="titulos__secundarios">
						 			JEFE INMEDIATO
						 		</strong>

							</div>

					</div>

					<div class="row__flotante row contenedor__formulario__elementos__flotantes" style="display: none;">

							<div class="col-md-4 col-xs-12 caja">

								<input type="text" class="form-control" name="puesto" id="puesto" value="<?php echo $puesto;?>" readonly=""/>

							</div>

							<div class="col-md-4 col-xs-12 caja">

								<input type="text" class="form-control" name="jefeInmediato" id="jefeInmediato" value="<?php echo $nombreCompleto2;?>" readonly=""/>

							</div>

					</div>


				   <!--====  End of Datos Generales  ====-->
					
					<br>
					
					<div class="col-md-12 col-xs-12 text-left contenedor__titulos__primarios">

					 	<strong class="titulos__primarios">
					 		REPORTE DE ACTIVIDADES DIARIAS
					 	</strong>

					</div>

					<div class="col-md-12 col-xs-12 text-left contenedor__titulos__primarios">

						<button id="generarFilasTabla" name="generarFilasTabla">GENERAR ACTIVIDAD</button>

					</div>

					<div class="col-md-12 col-xs-12 text-left">

						<table class="tabla__actividades__teletrabajo">

							<thead>

								<tr>
									
									<th class="estilos__filas">Nro.</th>
									<th class="estilos__filas">ACTIVIDADES(Detalle de las tareas asignadas para teletrabajar)</th>
									<th class="estilos__filas">PLAZO</th>
									<th class="estilos__filas">AVANCE / ENTREGABLE</th>
									<th class="estilos__filas">OBSERVACIONES</th>

								</tr>

							</thead>

							<tbody class="contenido__tabla__teletrabajo">
								


							</tbody>

						</table>

					</div>

					<div class="col-md-6 col-xs-6 text-left contenedor__titulos__primarios separador__elemento__disjuntos">

					 	<strong class="titulos__primarios">
					 		FECHA DE TELETRABAJO 
					 	</strong>

					</div>

					<div class="col-md-6 col-xs-6 text-left separador__elemento__disjuntos">

						<input type="text" id="fechaEscogida" name="fechaEscogida" readonly="" placeholder="Fechaenla que se realizó el teletrabjo">	

					</div>
					
					<br>
					<br>

					<div class="col-md-12 col-xs-12 text-left contenedor__titulos__primarios separador__enviador">

						<button id="enviadorTeleTrabajo" name="enviadorTeleTrabajo">ENVIAR</button>

					</div>

				</div>
		
			</div>

	 	</div>
	
	</main>

</div>

<!--====  End of Sección Principal  ====-->

<input type="hidden" id="ipEscogida" name="ipEscogida">

<input type="hidden" id="ubilat" name="ubilat" />

<input type="hidden" id="ubilon" name="ubilon" />


<!--=============================
=            Scripts            =
==============================-->
<script type="application/javascript">

function getIP(json) {

	$("#ipEscogida").val(json.ip);

}

/*===============================================================
=            Validaciones Generales para el proyecto  d          =
===============================================================*/

/*=================================================
=            Autocompletado del SELECT            =
=================================================*/
$(document).ready(function () {

/*=============================
=            Sección de tiempos            =
=============================*/
var mostrar_horaI=function(){

  // Variables Globales
  var tiempo = {}; 
  var clock = new Date("2016-06-01 5:00:00 PM"); // Obtener la fecha y almacenar en clock
  var intervalo = window.setInterval(mostrar_horaI, 1); // Frecuencia de actualización
  var i = 0; // Esta variable me ayudará a definir los estados de intervalo
  var now = new Date();  

  $(".rotulo__inicio_jornada").text((0)+":"+(clock.getMinutes()+15)+":"+(" "+clock.getSeconds()+60 - now.getSeconds()));

}


var mostrar_horaEI=function(){

  // Variables Globales
  var tiempo = {}; 
  var clock = new Date("2016-06-01 5:00:00 PM"); // Obtener la fecha y almacenar en clock
  var intervalo = window.setInterval(mostrar_horaEI, 1); // Frecuencia de actualización
  var i = 0; // Esta variable me ayudará a definir los estados de intervalo
  var now = new Date();  

  $(".rotulo__control__jornada1").text((0)+":"+(clock.getMinutes()+15)+":"+(" "+clock.getSeconds()+60 - now.getSeconds()));

}

var mostrar_horaIAl=function(){

  // Variables Globales
  var tiempo = {}; 
  var clock = new Date("2016-06-01 5:00:00 PM"); // Obtener la fecha y almacenar en clock
  var intervalo = window.setInterval(mostrar_horaIAl, 1); // Frecuencia de actualización
  var i = 0; // Esta variable me ayudará a definir los estados de intervalo
  var now = new Date();  

  $(".rotulo__inicio__almuerzo").text((0)+":"+(clock.getMinutes()+15)+":"+(" "+clock.getSeconds()+60 - now.getSeconds()));

}

var mostrar_horaIAlF=function(){

  // Variables Globales
  var tiempo = {}; 
  var clock = new Date("2016-06-01 5:00:00 PM"); // Obtener la fecha y almacenar en clock
  var intervalo = window.setInterval(mostrar_horaIAlF, 1); // Frecuencia de actualización
  var i = 0; // Esta variable me ayudará a definir los estados de intervalo
  var now = new Date();  

  $(".rotulo__fin__almuerzo").text((0)+":"+(clock.getMinutes()+15)+":"+(" "+clock.getSeconds()+60 - now.getSeconds()));

}

var mostrar_horaTE=function(){

  // Variables Globales
  var tiempo = {}; 
  var clock = new Date("2016-06-01 5:00:00 PM"); // Obtener la fecha y almacenar en clock
  var intervalo = window.setInterval(mostrar_horaTE, 1); // Frecuencia de actualización
  var i = 0; // Esta variable me ayudará a definir los estados de intervalo
  var now = new Date();  

  $(".rotulo__control__jornada__dos").text((0)+":"+(clock.getMinutes()+15)+":"+(" "+clock.getSeconds()+60 - now.getSeconds()));

}

var mostrar_horaFJ=function(){

  // Variables Globales
  var tiempo = {}; 
  var clock = new Date("2016-06-01 5:00:00 PM"); // Obtener la fecha y almacenar en clock
  var intervalo = window.setInterval(mostrar_horaFJ, 1); // Frecuencia de actualización
  var i = 0; // Esta variable me ayudará a definir los estados de intervalo
  var now = new Date();  

  $(".rotulo__final__jornada").text((0)+":"+(clock.getMinutes()+15)+":"+(" "+clock.getSeconds()+60 - now.getSeconds()));

}

/*=====  End of Sección de tiempos  ======*/


/*================================================
=            Teletrabajo validaciones            =
================================================*/
$(".oculto__actividades__diarias").hide();

var myVar = setInterval(myTimer, 1000);

function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString('en-US');

  let tiempo = t.substring(0, t.length - 6);

  $("#relojActual").val(tiempo);
  
}

var validaciones__timbradas__tele=function(){

  var paqueteDeDatos = new FormData();
  let idUsuarioRecuperandose=$("#idUsuarioRecuperandose").val();

  paqueteDeDatos.append('idUsuarioRecuperandose', idUsuarioRecuperandose);
  var destino = "funciones/selector/seleccionaTeleActivados.php";

  $.ajax({

      url: destino,
      type: 'POST',
      contentType: false,
      data: paqueteDeDatos, 
      processData: false,
      cache: false, 

      success: function(response){

        var usuarios=JSON.parse(response);
        var stringTipoT=usuarios['stringTipoT'];

        var arraystringidProyectoUnitario = stringTipoT.split('------');

        let banderaIngreso=false;
        let banderaControl1=false;
        let banderaInicioAl=false;
        let banderaFinalAl=false;
        let banderaControl2=false;
        let banderaSalidaT=false;

        for (let i=0;i<arraystringidProyectoUnitario.length;i++) {
         
          if (arraystringidProyectoUnitario[i]=="ingreso") {
            $("#inicioJornada").attr('disabled','disabled');
          }else if (arraystringidProyectoUnitario[i]=="hora__intermedia__temprano") {
            $("#controlJornad1").attr('disabled','disabled');
          }else if (arraystringidProyectoUnitario[i]=="salida__almuerzo") {
            $("#inicioAlmuero").attr('disabled','disabled');
          }else if (arraystringidProyectoUnitario[i]=="regreso__almuerzo") {
            $("#finAlmuerzo").attr('disabled','disabled');
          }else if (arraystringidProyectoUnitario[i]=="hora__intermedia__dos") {
            $("#controlJornada1").attr('disabled','disabled');
          }else if (arraystringidProyectoUnitario[i]=="salida__jornada__laboral") {
            $("#finJornada").attr('disabled','disabled');
            $(".oculto__actividades__diarias").removeAttr('style');
          }

          if (arraystringidProyectoUnitario[i]=="ingreso") {
            banderaIngreso=true;
          }

          if (arraystringidProyectoUnitario[i]=="hora__intermedia__temprano") {
            banderaControl1=true;
          }

          if (arraystringidProyectoUnitario[i]=="salida__almuerzo") {
            banderaInicioAl=true;
          }

          if (arraystringidProyectoUnitario[i]=="regreso__almuerzo") {
            banderaFinalAl=true;
          }

          if (arraystringidProyectoUnitario[i]=="hora__intermedia__dos") {
            banderaControl2=true;
          }

          if (arraystringidProyectoUnitario[i]=="salida__jornada__laboral") {
            banderaSalidaT=true;
          }

        }

        if (banderaIngreso==true && banderaControl1==false) {
          $("#controlJornad1").removeAttr('disabled');
        }else if(banderaControl1==true && banderaInicioAl==false){
          $("#inicioAlmuero").removeAttr('disabled');
        }else if(banderaInicioAl==true && banderaFinalAl==false){
          $("#finAlmuerzo").removeAttr('disabled');
        }else if(banderaFinalAl==true && banderaControl2==false){
          $("#controlJornada1").removeAttr('disabled');
        }else if(banderaControl2==true && banderaSalidaT==false){
          $("#finJornada").removeAttr('disabled');
        }

        var d = new Date();
        var t = d.toLocaleTimeString('en-US');

        let tiempo = t.substring(0, t.length - 6);

        var arrayDeCadenas = tiempo.split(":");

        if (arrayDeCadenas[0]==1) {
          tiempo=13+":"+arrayDeCadenas[1];
        }else if(arrayDeCadenas[0]==2){
          tiempo=14+":"+arrayDeCadenas[1];
        }else if(arrayDeCadenas[0]==3){
          tiempo=15+":"+arrayDeCadenas[1];
        }else if(arrayDeCadenas[0]==4){
          tiempo=16+":"+arrayDeCadenas[1];
        }else if(arrayDeCadenas[0]==5){
          tiempo=17+":"+arrayDeCadenas[1];
        }else if(arrayDeCadenas[0]==6){
          tiempo=18+":"+arrayDeCadenas[1];
        }else if(arrayDeCadenas[0]==7){
          tiempo=19+":"+arrayDeCadenas[1];
        }


        var horaActual = new Date('1/1/1990 '+tiempo);

        // horas agnosticas
        var horaAm1 = new Date('1/1/1990 8:05');


        if (horaActual>=new Date('1/1/1990 7:55') && horaActual<=new Date('1/1/1990 8:10') && banderaIngreso==false) {

          mostrar_horaI();

        }


        if(horaActual>=new Date('1/1/1990 10:25') && horaActual<=new Date('1/1/1990 10:40') && banderaControl1==false){

          mostrar_horaEI();

        }


        if(horaActual>=new Date('1/1/1990 12:25') && horaActual<=new Date('1/1/1990 12:40') && banderaInicioAl==false){

          mostrar_horaIAl();

        }

        if(horaActual>=new Date('1/1/1990 13:25') && horaActual<=new Date('1/1/1990 13:40') && banderaFinalAl==false){

          mostrar_horaIAlF();

        }

        if(horaActual>=new Date('1/1/1990 15:25') && horaActual<=new Date('1/1/1990 15:40') && banderaControl2==false){

          mostrar_horaTE();

        }

        if(horaActual>=new Date('1/1/1990 17:15') && horaActual<=new Date('1/1/1990 17:30') && banderaSalidaT==false){

          mostrar_horaFJ();

        }


        if (horaActual>new Date('1/1/1990 8:10') && banderaIngreso==false) {

          // $("#inicioJornada").attr('disabled','disabled');
          // $(".rotulo__inicio_jornada").append('<i class="fa fa-times" aria-hidden="true"></i>&nbsp;No timbró');
          // $(".rotulo__inicio_jornada").attr('style','color:red; font-weight:bold; font-size:10px;');

        }

        if (banderaIngreso==true) {
          $(".rotulo__inicio_jornada").append('<i class="fa fa-check" aria-hidden="true"></i>');
          $(".rotulo__inicio_jornada").attr('style','color:#004d40; font-weight:bold; font-size:10px;');
        }

        if(horaActual>new Date('1/1/1990 10:40') && banderaControl1==false){

          $("#controlJornad1").attr('disabled','disabled');
          $(".rotulo__control__jornada1").append('<i class="fa fa-times" aria-hidden="true"></i>&nbsp;No timbró');
          $(".rotulo__control__jornada1").attr('style','color:red; font-weight:bold; font-size:10px;');

        }

        if (banderaControl1==true) {
          $(".rotulo__control__jornada1").append('<i class="fa fa-check" aria-hidden="true"></i>');
          $(".rotulo__control__jornada1").attr('style','color:#004d40; font-weight:bold; font-size:10px;');
        }



        if(horaActual>new Date('1/1/1990 12:40') && banderaInicioAl==false){

          $("#inicioAlmuero").attr('disabled','disabled');
          $(".rotulo__inicio__almuerzo").append('<i class="fa fa-times" aria-hidden="true"></i>&nbsp;No timbró');
          $(".rotulo__inicio__almuerzo").attr('style','color:red; font-weight:bold; font-size:10px;');

        }


        if (banderaInicioAl==true) {
          $(".rotulo__inicio__almuerzo").append('<i class="fa fa-check" aria-hidden="true"></i>');
          $(".rotulo__inicio__almuerzo").attr('style','color:#004d40; font-weight:bold; font-size:10px;');
        }


        if(horaActual>new Date('1/1/1990 13:40') && banderaFinalAl==false){

          $("#finAlmuerzo").attr('disabled','disabled');
          $(".rotulo__fin__almuerzo").append('<i class="fa fa-times" aria-hidden="true"></i>&nbsp;No timbró');
          $(".rotulo__fin__almuerzo").attr('style','color:red; font-weight:bold; font-size:10px;');

        }

        if (banderaFinalAl==true) {
          $(".rotulo__fin__almuerzo").append('<i class="fa fa-check" aria-hidden="true"></i>');
          $(".rotulo__fin__almuerzo").attr('style','color:#004d40; font-weight:bold; font-size:10px;');
        }



        if(horaActual>new Date('1/1/1990 15:40') && banderaControl2==false){

          $("#controlJornada1").attr('disabled','disabled');
          $(".rotulo__control__jornada__dos").append('<i class="fa fa-times" aria-hidden="true"></i>&nbsp;No timbró');
          $(".rotulo__control__jornada__dos").attr('style','color:red; font-weight:bold; font-size:10px;');

        }

        if (banderaControl2==true) {
          $(".rotulo__control__jornada__dos").append('<i class="fa fa-check" aria-hidden="true"></i>');
          $(".rotulo__control__jornada__dos").attr('style','color:#004d40; font-weight:bold; font-size:10px;');
        }

        $(".oculto__actividades__diarias").removeAttr('style');

        if(horaActual>new Date('1/1/1990 17:30') && banderaSalidaT==false && arrayDeCadenas[0]!=7){

          $("#finJornada").attr('disabled','disabled');
          $(".rotulo__final__jornada").append('<i class="fa fa-times" aria-hidden="true"></i>&nbsp;No timbró');
          $(".rotulo__final__jornada").attr('style','color:red; font-weight:bold; font-size:10px;');
          $(".oculto__actividades__diarias").removeAttr('style');

        }


        if (banderaSalidaT==true) {
          $(".rotulo__final__jornada").append('<i class="fa fa-check" aria-hidden="true"></i>');
          $(".rotulo__final__jornada").attr('style','color:#004d40; font-weight:bold; font-size:10px;');
        }


      },
      error: function (){ 
        
      }

  });  

}

validaciones__timbradas__tele();

/*=====  End of Teletrabajo validaciones  ======*/

 });  

</script>

<script type="application/javascript" src="https://api.ipify.org?format=jsonp&callback=getIP"></script>

<!--====  End of Scripts  ====-->


