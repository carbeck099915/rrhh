<!--=======================================
=            Sección Principal           =
========================================-->

<div class="wrapper row3 estilo__fondo__main__body">
     
    <div class="container__ingresos contenedor__principal__de__formularios">
    	
    	<form method="post" class="formulario__inicial">
    		
    		   <div class="form-group inputs__enfoque__nueo">
	            <div class="input-group">
	              <span class="input-group-addon"><i class="fa fa-user"></i></span>
	                <input class="form-control inpunt-lg validacionLetrasMinusculas" type="text" name="usuario" id="usuario"  placeholder="Ingresar usuario" style="padding:2em;">
	            </div>
          	</div>

          	<div class="form-group inputs__enfoque__nueo">
            	<div class="input-group">
              	<span class="input-group-addon"><i class="fa fa-key"></i></span>
                	<input class="form-control inpunt-lg" type="password" name="password" id="password" placeholder="Ingresar password" style="padding:2em;">
            	</div>
          	</div>

          	<button type="submit" name="ingresarUsuario" id="ingresarUsuario" class="btn registro">Acceder  <i class="fa fa-hdd-o"></i></button>

            <br>

            <a class="recuperar__credenciales" data-toggle='modal' data-target='#formularioRecuperador'>Recuperar contraseña</a>
            <br>

            <a class="recuperar__credenciales" data-toggle='modal' data-target='#formulario__documentos__talento' style="text-align:center;">Fomulario de Vacaciones<br>Hoja de Salida</a>

            <?php
               $ingreso= new ControladorIngreso();
               $ingreso->ctrIngreso();
            ?>

    	</form>

    </div>

 </div>

<!--====  End of Sección Principal  ====-->


<!--=============================
=            Modales            =
==============================-->

<div id="formularioRecuperador" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">

    <div class="modal-dialog modal-lg">

        <div class="modal-content">

          <div class="modal-header header__banner__ingresos">
            
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h6><strong><center>RECUPERACIÓN DE CONTRASEÑA</center></strong></h6>
            
          </div>
          
          <div class="modal-body">
          
            <div class="box-body">
                
              <div class="form-group">

                <div class="row row__flexible">

                    <!--=============================
                    =            Errores            =
                    ==============================-->
                    
                    <input type="hidden" name="errorTeletrabajo" id="errorTeletrabajo">
                    
                    <!--====  End of Errores  ====-->
                    

                      <div class="col-md-12 col-xs-12">

                        <strong class="titulos__secundarios">
                          <span class="obligatorios">Es obligatorio que usted ingrese los campos requeridos tales como correo electronico y cédula con la finalidad de comprobar sus credenciales.</span>

                      </div>
                      <br>


                      <div class="col-md-6 col-xs-6">

                        <strong class="titulos__secundarios2">
                          <span class="obligatorios">*</span>Cédula de Identidad del Funcionario
                        </strong>              

                      </div>
                      <br>


                      <div class="col-md-6 col-xs-6">
                          <input  type="text" id="numeroCedula" name="numeroCedula" class="recuperar__obligatorios cedulaEvaporandoseFuncionalidades" />

                           <span  class="counter"></span><br>
                           
                      </div>

                      <br>
                      <br>

                      <div class="col-md-6 col-xs-3">

                        <strong class="titulos__secundarios2">
                          <span class="obligatorios">*</span>Correo Electronico
                        </strong>

                      </div>


                      <div class="col-md-2 col-xs-3">
                          <input  type="text" id="correoComparatio" name="correoComparatio" class="recuperar__obligatorios" />
                      </div>


                      <div class="col-md-4 col-xs-1 posicionamiento__letrados">

                          @deporte.gob.ec

                      </div>


                </div>

                <br>

                <div class="row row__flexible dando__alineación">

                      <div class="col-md-12 col-xs-12 validacion__cuenta__escondidad">

                        <strong class="titulos__secundarios3">
                            Ingrese Código de validación de cuenta
                        </strong>

                      </div>

                      <br>

                      <div class="col-md-12 col-xs-12 validacion__cuenta__escondidad">
                          <input  type="text" id="codigoDeValidacion" name="codigoDeValidacion"/>
                      </div>

                </div>
              <br>

                <div class="row">

                      <div class="col-md-12 col-xs-12 validacion__cuenta__escondidad">
                          <div class="mensaje__de__actividad"></div>
                      </div>

                </div>

              </div>
            
            </div>
          
          </div>

          <div class="modal-footer">

            <button type="button" class="fa fa-save" name="guardarRecupera" id="guardarRecupera">  GUARDAR</button>

            <button type="button" class="fa fa-save validacion__cuenta__escondidad" name="codigoDeValidacionCuenta" id="codigoDeValidacionCuenta">  CONTINUAR</button>

          </div>

        </div>
  
    </div>

</div>

<!--====  End of Modales  ====-->

<!--==========================================
=            Documentos Descargar            =
===========================================-->

<div id="formulario__documentos__talento" class="modal" role="dialog" aria-labelledby="myModalLabel">

    <div class="modal-dialog">

        <div class="modal-content">

          <div class="modal-header header__banner__ingresos">
            
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h6><strong><center>FORMULARIO DE VACACIONES<br>Hoja de Salida</center></strong></h6>
            
          </div>
          
          <div class="modal-body">
          
            <div class="box-body">

              <a target="_blank" href="images/FORMULARIO DE VACACIONES OK.pdf">Formulario de vacaciones</a>

              <br>

              <a target="_blank" href="images/HOJA DE SALIDA OK.pdf">Hoja de Salida</a>
            
            </div>
          
          </div>

        </div>
  
    </div>

</div>


<!--====  End of Documentos Descargar  ====-->
