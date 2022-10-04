<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $idUsuario=$nombreObjeto->controladorDeSeleccionIdUsuarios();
  $nombreUsuarioCompleto=$nombreObjeto->controladorDeSeleccionUsuarios();
  $habilitantes=$nombreObjeto->controladorHabilitarUsuarios();
?> 

<!-- escript para presencial -->

<style>

    @media screen and (min-width:210px) and (max-width:800px){

        .boton__personalizado{
            color:white;
            background:#2979ff;
            width: 100%;
            padding: .2em;
        }  

    }

</style>

<script src="js/script.js?v=1.2.1"></script>

    <div class="wrapper row3">

    <main class="clear contenedor__de__paginas"> 

       <input type="hidden" name="habilitantes" id="habilitantes" value="<?php echo $habilitantes;?>">  

       <div id="box1">

            <div id="inputs">

			    <h1 name="dataNombre" id="dataNombre">
			    	ASISTO
				</h1>

                <hr style="border: 1px solid black; width: 50%; position: relative; left: 20%;">

            	<ul id="msg">

                	<li style="font-weight: bold; font-size:15px; list-style-type: circle!important;">
                		El módulo solo puede ser utilizado desde un dispositivo celular
                	</li>

                    <br>

                    <li style="font-weight: bold; font-size:15px; list-style-type: circle!important;">
                        Puede ingresar al aplicativo desde su dispositivo celular escaneando el código QR ubicado en la parte izquierda
                    </li>

                    <br>

                    <li style="font-weight: bold; font-size:15px; list-style-type: circle!important;">
                        Puede ingresar al aplicativo desde su dispositivo celular escribiendo la url:&nbsp;&nbsp;
                        <a href="https://servicios.deporte.gob.ec/rrhh/ingreso" target="_blank" style="color:blue; font-weight: bold;">https://servicios.deporte.gob.ec/rrhh/ingreso</a>
                    </li>


                </ul>
                
                <div id="qrb">
					<button name="qrButton" id="qrButton" id></button>
	        	</div>

            </div>
            <br>


            <div id="outputbox">
                <img src="images/dep2.png" />
            </div>

     </div>

     <div id="box2" class="box2">

        <input  type="hidden" name="msg2" id="msg2" value="<?php echo $idUsuario;?>">

		<div class="nombre__completo"><?php echo $nombreUsuarioCompleto;?></div>

		<input type="hidden" name="ubilat" id="ubilat"/>
		<input type="hidden" name="ubilon" id="ubilon"/>
		<input type="hidden" name="storagel" id="storagel"/>

        <br>

        <div class="contenedor__ubicacion">

            <input type="hidden" id="horasRestar" name="horasRestar" value="00" />

            <input type="hidden" id="minutosRestar" name="minutosRestar" value="00" />

            <input type="hidden" id="segundosRestar" name="segundosRestar" value="00" />

            <div class="contenedor__ubicacion">
                <div class="letras__declaratorias">Calcular ubicación</div>
                &nbsp;
                <i class="fas fa-angle-right clase__iconicas"></i>
            </div>


            <div class="contenedor__botones__inciales">

                <button id="ingresoCalculas" name="ingresoCalculas" etiqueta="INGRESO" class="boton__personalizado" style="padding:1em;">INGRESO</button>
                <br>
                <button id="salidaAlmuerzo" name="salidaAlmuerzo" etiqueta="SALIDA ALMUERZO" class="boton__personalizado" style="padding:1em;">SALIDA ALMUERZO</button>
                <br>
                <button id="regresoAlmuerzo" name="regresoAlmuerzo" etiqueta="REGRESO ALMUERZO" class="boton__personalizado" style="padding:1em;">REGRESO ALMUERZO</button>
                <br>
                <button id="salidaSecretaria" name="salidaSecretaria" etiqueta="SALIDA" class="boton__personalizado" style="padding:1em;">SALIDA</button>

                <input type="hidden" id="etiquetaMostrar" name="etiquetaMostrar" />

            </div>


            <!-- <div id="startbtn" style="padding:2em;">
                <img src="images/ubi.png" />
                <br>
                <br>
                <img id="img2" src="images/listo2.png" />
            </div> -->

        </div>


        <br>

        <a data-toggle="modal" data-target="#cambioClave2" style="font-weight: bold; cursor:pointer;">Terminos y Condiciones</a>

        <br>
        <br>

        <button  id="ingresar" name="ingresar">REGISTRAR</button>

        <br>
        <br>

        <div class="tipo__de__timbrada" style="color: white;font-size: 20px;"></div>

        <br>

		<div name="ubilatm" id="ubilatm">No Ubicación latitud</div>

        <br>

		<div name="ubilonm" id="ubilonm">No Ubicación longitud</div>


        <div class="git__registro"></div>

        <br>
		   
    </div>

    <div class="mensaje__movil__escritorio">

        USTED ESTÁ ACTIVADO SOLO PARA DISPOSITIVOS DE ESCRITORIO

    </div>

 </main>

</div>


<script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>
            
<script src="https://rawgit.com/schmich/instascan-builds/master/instascan.min.js"></script>



<div class="modal fade" id="cambioClave2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div class="modal-dialog modal-dialog-centered">

    <div class="modal-content">

      <div class="modal-body">

        <div class="box-body">

            •  Me responsabilizo actual y permanentemente por el buen uso de la clave de acceso registrada para acceder “Sistema de Gestión de Talento Humano Automatizado”.<br><br>

            • En virtud de la presente declaración, renuncio a instaurar por este motivo cualquier tipo de acción civil, penal o administrativa en contra del Ministerio del Deporte y de sus representantes legales y demás servidores por el contenido erróneo de la información.

        </div>

      </div>

      <div class="modal-footer">

        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Aceptar</button>

      </div>

    </div>

  </div>

</div>  