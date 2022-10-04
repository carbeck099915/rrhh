
<!--=======================================
=            sección principal            =
========================================-->

<div class="wrapper row3">
    
	<div class="contenedor__tablas contenedor__tablas__polifacetico__usuarios" style="width:90%;">

   <button class="btn btn-primary boton__agregar__rol" data-toggle="modal" data-target="#agregarUsuario">Agregar Usuario</button>

		<table id="tablaUsuariosGenerales" name="tablaUsuariosGenerales">

			 <thead>

			   	<tr>

			     	<th>Cédula</th>
			     	<th>Nombres</th>
            <th>Rol</th>
			      <th>Fecha de Nacimiento</th>
            <th>Usuario</th>
            <th>Fisicamente Estructura</th>
           <!--  <th>Telefono</th>
            <th>Celular</th> -->
            <th>Fecha de Ingreso</th>
            <th>Editar</th>
            <th>Editar Contraseña</th>
            <th>Inactivar</th>
			   	</tr>

			  </thead>

			<tfoot>


			   	<tr>

			      <th>Cédula</th>
            <th>Nombres</th>
            <th>Rol</th>
            <th>Fecha de Nacimiento</th>
            <th>Usuario</th>
            <th>Fisicamente Estructura</th>
           <!--  <th>Telefono</th>
            <th>Celular</th> -->
            <th>Fecha de Ingreso</th>
            <th>-</th>
            <th>-</th>
            <th>-</th>
			   	</tr>

      </tfoot>

		</table>  

	</div>


 </div>

<!--====  End of sección principal  ====-->

<!--=====================================
=            Agregar Usuario            =
======================================-->

<div id="agregarUsuario" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">

  <div class="modal-dialog modal-lg">

    <div class="modal-content">

      <div class="modal-header" style="background: #3c8dbc; color: white">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Agregar Usuario</h4>
      </div>

      <div class="modal-body">
        <div class="box-body">

          <table class="table table-borderless">
            <tr>
              <td>
                <label>Ingrese Cedula</label>
                <div class="form-group">
                  <div class="input-group">
                      <input class="form-control inpunt-lg validacionesNumericas" name="cedulaUsuario" id="cedulaUsuario" maxlength="10" />
                      <span class="input-group-addon usuarioValidaCedula"><i class="fa fa-search col-lg-4"></i></span>
                  </div>
                </div>

              
                
              </td>
            
              <td colspan="2"><label>Nombre</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fas fa-user"></i></span>
                        <input class="form-control inpunt-lg" name="nombreUsuario" id="nombreUsuario"  readonly="" />
                    </div>
                  </div>
              </td>
              <td colspan="2">
                <label>Apellido</label>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-user"></i></span>
                      <input class="form-control inpunt-lg" name="apellidoUsuario" id="apellidoUsuario"  readonly="" />
                  </div>
                </div>
              </td>
            </tr>
          </table>
          <table class="table table-bordered">

            <tr>
              <td>
                <label>Fecha Nacimiento</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fas fa-user"></i></span>
                      <input class="form-control inpunt-lg" type="input" name="fechaNacimientoUsuario" id="fechaNacimientoUsuario" readonly=""  />
                    </div>
                  </div>
              </td>

              <td>
                <label>Sexo</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fas fa-user"></i></span>
                      <input class="form-control inpunt-lg validacionLetrasMayusculas" type="input" name="sexoUsuario" id="sexoUsuario" readonly="" />
                    </div>
                  </div>
              </td>
              
              <td>
                <label>Telefono</label>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-phone"></i></span>
                      <input class="form-control inpunt-lg validacionesNumericas" type="input" name="telefonoUsuario" id="telefonoUsuario" placeholder="022222222" maxlength="9">
                  </div>
                </div>
              </td>
              <td>
                <label>Celular</label>

                <div class="form-group">
                  <div class="input-group">
                      <span class="input-group-addon"><i class="fas fa-mobile-alt"></i></span>
                      <input class="form-control inpunt-lg validacionesNumericas" type="input" name="celularUsuario" id="celularUsuario" placeholder="0999999999" maxlength="10" />
                  </div>
                </div>
              </td>
            </tr>
            </table>
            <table class="table table-bordered">
            <tr>
              <td>
                <label>Rol</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                        <select class="form-control inpunt-lg roles__generados" name="Rol" id="Rol">
                          <option value="">--Seleccione un rol--</option>
                          <option value="1">ADMINISTRADOR</option>
                          <option value="2">DIRECTOR/A</option>
                          <option value="3">FUNCIONARIO/A</option>
                          <option value="4">CORDINADOR/A</option>
                          <option value="5">MINISTRO/A DEL DEPORTE</option>
                          <option value="6">VICEMINISTRO / A</option>
                          <option value="7">SUBSECRETARIOS</option>
                          <option value="8">TRANSPORTE AEREO</option>
                          <option value="9">TRANSPORTE TERRESTRE</option>
                          <option value="10">OBSERVADOR</option>
                          <option value="11">SECRETARIO COMITE</option>
                          <option value="12">CONSULTA</option>
                        </select>
                    </div>
                  </div>
              </td>
               <td>
                <label>Modalidad</label>
                  <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fas fa-mobile-alt"></i></span>
                        
                        <select class="form-control inpunt-lg" name="modalidad" id="modalidad">
                          <option value="presencial">Presencial</option>
                          <option value="teletrabajo">Teletrabajo</option>
                        </select>
                    </div>
                  </div>
              </td>
              <td>
                <label>Puesto Institucional (Cargo)</label>


                  <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fas fa-mobile-alt"></i></span>
                       
                        <select class="form-control inpunt-lg" name="cargo" id="cargo">
                          <option value="">--Elige un Puesto Institucional--</option>
                          <option value="1">ABOGADO 3</option>
                          <option value="2">ABOGADO DE ASUNTOS DEPORTIVOS 1</option>
                          <option value="3">ABOGADO DE ASUNTOS DEPORTIVOS 2</option>
                          <option value="4">ABOGADO DE ASUNTOS DEPORTIVOS 3</option>
                          <option value="5">ABOGADO DE ASUNTOS JURIDICOS 1</option>
                          <option value="6">ABOGADO DE ASUNTOS JURIDICOS 2</option>
                          <option value="7">ABOGADO DE ASUNTOS JURIDICOS 3</option>
                          <option value="8">ABOGADO REGIONAL </option>
                          <option value="9">ABOGADO REGIONAL 3</option>
                          <option value="10">ADMINISTRADOR DE CENTRO ACTIVO</option>
                          <option value="11">ANALISTA ADAPTABLE E INCLUYENTE REGIONAL</option>
                          <option value="12">ANALISTA DE ACTIVOS FIJOS</option>
                          <option value="13">ANALISTA DE ADMINISTRACION DE PROCESOS 1</option>
                          <option value="14">ANALISTA DE ADMINISTRACION DE PROCESOS 3</option>
                          <option value="15">ANALISTA DE ADQUISICIONES</option>
                          <option value="16">ANALISTA DE BIENESTAR SOCIAL</option>
                          <option value="17">ANALISTA DE CAPACITACION 1</option>
                          <option value="18">ANALISTA DE CAPACITACION 2</option>
                          <option value="19">ANALISTA DE CENTRO ACTIVO</option>
                          <option value="20">ANALISTA DE COMUNICACIÓN SOCIAL</option>
                          <option value="21">ANALISTA DE COMUNICACIÓN SOCIAL REGIONAL</option>
                          <option value="22">ANALISTA DE CONTABILIDAD</option>
                          <option value="23">ANALISTA DE CONTABILIDAD REGIONAL</option>
                          <option value="24">ANALISTA DE CONVENIOS NACIONALES E INTERNACIONALES</option>
                          <option value="25">ANALISTA DE DEPORTE ADAPTADO E INCLUYENTE 1</option>
                          <option value="26">ANALISTA DE DEPORTE ADAPTADO E INCLUYENTE 3</option>
                          <option value="27">ANALISTA DE DEPORTE ADAPTADO E INCLUYENTE REGIONAL</option>
                          <option value="28">ANALISTA DE DEPORTE REGIONAL</option>
                          <option value="29">ANALISTA DE DEPORTES 1</option>
                          <option value="30">ANALISTA DE DEPORTES 3</option>
                        </select>

                    </div>
                  </div>
              </td>
             </tr>
            </table>
            <table class="table table-bordered">
            <tr> 
              <td>
                <label>Grupo Ocupacional</label>
                  <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fas fa-mobile-alt"></i></span>
                        
                        <select class="form-control inpunt-lg" name="grupoOcupacional" id="grupoOcupacional">
                          <option value="">--Elige un Grupo Ocupacional--</option>
                          <option value="1">NIVEL 1</option>
                          <option value="2">NIVEL 3</option>
                          <option value="3">NIVEL 7</option>
                          <option value="4">NIVEL 8</option>
                          <option value="5">NIVEL JERARQUICO SUPERIOR 1</option>
                          <option value="6">NIVEL JERARQUICO SUPERIOR 2</option>
                          <option value="7">NIVEL JERARQUICO SUPERIOR 4</option>
                          <option value="8">NIVEL JERARQUICO SUPERIOR 5</option>
                          <option value="9">NIVEL JERARQUICO SUPERIOR 6</option>
                          <option value="10">NIVEL JERARQUICO SUPERIOR 7</option>
                          <option value="11">NIVEL JERARQUICO SUPERIOR 8</option>
                          <option value="12">SERVIDOR PUBLICO 1</option>
                          <option value="13">SERVIDOR PUBLICO 12 DE LA SALUD</option>
                          <option value="14">SERVIDOR PUBLICO 2</option>
                          <option value="15">SERVIDOR PUBLICO 3</option>
                          <option value="16">SERVIDOR PUBLICO 4</option>
                          <option value="17">SERVIDOR PUBLICO 5</option>
                          <option value="18">SERVIDOR PUBLICO 6</option>
                          <option value="19">SERVIDOR PUBLICO 7</option>
                          <option value="20">SERVIDOR PUBLICO 7 DE LA SALUD</option>
                          <option value="21">SERVIDOR PUBLICO 9 DE LA SALUD</option>
                          <option value="22">SERVIDOR PUBLICO DE APOYO 1</option>
                          <option value="23">SERVIDOR PUBLICO DE APOYO 3</option>
                          <option value="24">SERVIDOR PUBLICO DE APOYO 4</option>
                          <option value="25">SERVIDOR PUBLICO DE SERVICIOS 2</option>
                          <option value="26">SERVIDOR PUBLICO DE APOYO 2</option>
                        </select>

                    </div>
                  </div>
              </td>
              <td>
                <label>Estructura 1</label>
                  <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fas fa-mobile-alt"></i></span>
                        
                        <select class="form-control inpunt-lg" name="estructura1" id="estructura1">
                          <option value="">--Elige un Estructura 1--</option>
                          <option value="1">COORDINACION GENERAL ADMINISTRATIVA FINANCIERA</option>
                          <option value="2">COORDINACION DE ADMINISTRACION E INFRAESTRUCTURA DEPORTIVA</option>
                          <option value="3">SUBSECRETARIA DE DEPORTE DE ALTO RENDIMIENTO</option>
                          <option value="4">SUBSECRETARIA DE DESARROLLO DE LA ACTIVIDAD FISICA</option>
                          <option value="5">COORDINACION GENERAL DE PLANIFICACION Y GESTION ESTRATEGICA</option>
                          <option value="6">DESPACHO DE SECRETARIA</option>
                          <option value="7">SUBSECRETARIA DE DEPORTE Y ACTIVIDAD FISICA</option>
                        </select>
                    </div>
                  </div>
              </td>
            </tr>
          </table>
          <table class="table table-bordered">
            <tr> 
              <td>
                <label>Estructura 2</label>
                  <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fas fa-mobile-alt"></i></span>
                        
                        <select class="form-control inpunt-lg" name="estructura2" id="estructura2">
                          <option value="">--Elige un Estructura 2--</option>
                          <option value="1">COORDINACION DE ADMINISTRACION E INFRAESTRUCTURA DEPORTIVA</option>
                          <option value="2">COORDINACION GENERAL ADMINISTRATIVA FINANCIERA</option>
                          <option value="3">COORDINACION GENERAL DE PLANIFICACION Y GESTION ESTRATEGICA</option>
                          <option value="4">DESPACHO DE SECRETARIA</option>
                          <option value="5">DIRECCION ADMINISTRATIVA</option>
                          <option value="6">DIRECCION DE ADMINISTRACION DE INSTALACIONES DEPORTIVAS</option>
                          <option value="7">DIRECCION DE ADMINISTRACION DEL TALENTO HUMANO</option>
                          <option value="8">DIRECCION DE ASESORIA JURIDICA</option>
                          <option value="9">DIRECCION DE ASUNTOS DEPORTIVOS</option>
                          <option value="10">DIRECCION DE AUDITORIA INTERNA</option>
                          <option value="11">DIRECCION DE COMUNICACIÓN SOCIAL</option>
                          <option value="12">DIRECCION DE DEPORTE CONVENCIONAL PARA EL ALTO RENDIMIENTO</option>
                          <option value="13">DIRECCION DE DEPORTE FORMATIVO Y EDUCACION FISICA</option>
                          <option value="14">DIRECCION DE DEPORTE PARA PERSONAS CON DISCAPACIDAD</option>
                          <option value="15">DIRECCION DE INFRAESTRUCTURA DEPORTIVA</option>
                          <option value="16">DIRECCION DE INVESTIGACION Y COOPERACION EN CULTURA FISICA</option>
                          <option value="17">DIRECCION DE MEDICINA, CIENCIAS APLICADAS Y JUEGO LIMPIO</option>
                          <option value="18">DIRECCION DE PLANIFICACION E INVERSION</option>
                          <option value="19">DIRECCION DE RECREACION</option>
                          <option value="20">DIRECCION DE SEGUIMIENTO DE PLANES PROGRAMAS Y PROYECTOS</option>
                          <option value="21">DIRECCION DE SERVICIOS, PROCESOS Y CAMBIO Y CULTURA</option>
                          <option value="22">DIRECCION DE TECNOLOGIAS DE INFORMACION Y COMUNICACIÓN</option>
                          <option value="23">DIRECCION FINANCIERA</option>
                          <option value="24">SUBSECRETARIA DE DEPORTE DE ALTO RENDIMIENTO</option>
                          <option value="25">SUBSECRETARIA DE DEPORTE Y ACTIVIDAD FISICA</option>
                          <option value="26">SUBSECRETARIA DE DESARROLLO DE LA ACTIVIDAD FISICA</option>
                          <option value="27">COORDINACION ZONAL 1</option>
                          <option value="28">COORDINACION ZONAL 2</option>
                          <option value="29">COORDINACION ZONAL 3</option>
                          <option value="30">COORDINACION ZONAL 4</option>
                          <option value="31">COORDINACION ZONAL 6</option>
                          <option value="32">COORDINACION ZONAL 7</option>
                          <option value="33">COORDINACION ZONAL 8</option>
                        </select>
                    </div>
                  </div>
              </td>
            <td>
              <label>Fisicamente Estructura 2</label>
                <div class="form-group">
                  <div class="input-group">
                      <span class="input-group-addon"><i class="fas fa-mobile-alt"></i></span>
                      
                      <select class="form-control inpunt-lg" name="estructurafisica2" id="estructurafisica2">
                              </select>

                      <input type="hidden" name="codigoPersonaAcargo" id="codigoPersonaAcargo">
                  </div>
                </div>
              </td>
            </tr>
          </table>
            <table class="table table-bordered">
            <tr>

              <td>
                <label>Email</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fas fa-user"></i></span>
                        <input class="form-control"  type="input" name="emailUsuario" id="emailUsuario" placeholder="email@hotmail.com" />
                    </div>
                  </div>
              </td> 
              <td>
                <label>Nacionalidad</label>
                  <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fas fa-mobile-alt"></i></span>
                        <input class="form-control inpunt-lg validacionLetrasMayusculas" type="input" name="nacionalidad" id="nacionalidad" readonly="" />
                    </div>
                  </div>
              </td>
               </tr>
            </table>
            <table class="table table-bordered">
            <tr>
               <td>
                <label>Hijos</label>
                  <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fas fa-mobile-alt"></i></span>
                        
                        <select class="form-control" type="text" name="hijos" id="hijos">

                          <option value="">--Selccione Si/No--</option>
                          <option value="SI">SI</option>
                          <option value="NO">NO</option>
                          
                        
                        </select>

                    </div>
                  </div>
              </td>
              <td>
                <label>Etnia</label>
                  <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fas fa-mobile-alt"></i></span>
                        

                        <select class="form-control" type="text" name="etnia" id="etnia">

                          <option value="">--Selccione Etnia--</option>
                          <option value="AFROECUATORIANO/AFRO">AFROECUATORIANO/AFRO</option>
                          <option value="BLANCO/A">BLANCO/A</option>
                          <option value="INDIGENA">INDIGENA</option>
                          <option value="MESTIZO/A">MESTIZO/A</option>
                          <option value="MONTUBIO/A">MONTUBIO/A</option>
                          <option value="MULATO/A">MULATO/A</option>
                          <option value="NEGRO/A">NEGRO/A</option>
                          <option value="Otro/a">Otro/a</option>
                          
                        
                        </select>

                    </div>
                  </div>
              </td>
              <td>
                <label>Zonal</label>
                  <div class="form-group">
                    <div class="input-group">
                        <span class="input-group-addon"><i class="fas fa-mobile-alt"></i></span>
                      
                         <select class="form-control inpunt-lg" name="zonal" id="zonal">
                          <option value="">--Seleccione una zonal--</option>
                          <option value="1">PLANTA CENTRAL</option>
                          <option value="2">ZONAL 1</option>
                          <option value="3">ZONAL 2</option>
                          <option value="4">ZONAL 3</option>
                          <option value="5">ZONAL 4</option>
                          <option value="7">ZONAL 6</option>
                          <option value="8">ZONAL 7</option>
                          <option value="9">ZONAL 8</option>
                         </select>
                    </div>
                  </div>
              </td>
               </tr>
            </table>
            <table  class="table table-bordered">
            <tr> 
               <td>
                <label>Usuario</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fas fa-user"></i></span>
                        <input class="form-control inpunt-lg validacionLetrasMinusculas" type="input" name="usuarioInicial" id="usuarioInicial" />
                    </div>
                  </div>
              </td>
              <td>
                <label>Contraseña</label>
                  <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-user"></i></span>
                      <input class="form-control inpunt-lg" type="input" name="passwordUsuario" id="passwordUsuario" />
                  </div>
                </div>
              </td>
              
            </tr>
          </table>
        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">No</button>
        <button type="submit" id="agregarUsuarioInserta" name="agregarUsuarioInserta" class="btn btn-primary">Si</button>
      </div>

    </div>

  </div>

</div>

<!--====  End of Agregar Usuario  ====-->


<!--========================================================
=            Modal de edición de Roles Usuarios            =
=========================================================-->

<div id="edicionUsuarios" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">

  <div class="modal-dialog modal-lg">

    <div class="modal-content">

      <div class="modal-header" style="background: #3cbc80; color: white">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Usuarios</h4>
      </div>

      <div class="modal-body">
        <div class="box-body">

          <input class="form-control inpunt-lg" type="hidden" name="idUsuarios" id="idUsuarios"/>

          <table class="table table-bordered">
            <tr>
              <td colspan="2">
                <label>Modalidad</label>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                      <select class="form-control inpunt-lg" name="modalidades" id="modalidades">
                        <option value="presencial">Presencial</option>
                        <option value="teletrabajo">Teletrabajo</option>
                      </select>
                  </div>
                </div>
              </td>
            </tr>
          </table>

          <table class="table table-bordered">
            <tr>
              <td colspan="2">
                <label>Roles</label>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                      <select class="form-control inpunt-lg" name="rol2" id="rol2">
                          <option value="">--Seleccione un rol--</option>
                          <option value="1">ADMINISTRADOR</option>
                          <option value="2">DIRECTOR/A</option>
                          <option value="3">FUNCIONARIO/A</option>
                          <option value="4">CORDINADOR/A</option>
                          <option value="5">MINISTRO/A DEL DEPORTE</option>
                          <option value="6">VICEMINISTRO / A</option>
                          <option value="7">SUBSECRETARIOS</option>
                          <option value="8">TRANSPORTE AEREO</option>
                          <option value="9">TRANSPORTE TERRESTRE</option>
                          <option value="10">OBSERVADOR</option>
                          <option value="11">SECRETARIO COMITE</option>
                          <option value="12">CONSULTA</option>
                      </select>
                  </div>
                </div>
              </td>
            </tr>
          </table>
          <table class="table table-bordered">
            <tr>
               <td>
                <label>Puesto Institucional (Cargo)</label>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                     <select class="form-control inpunt-lg" name="cargoActualiza" id="cargoActualiza">
                      </select>
                  </div>
                </div>
              </td>
            </tr>            
         </table>
          
          <table class="table table-bordered">
            <tr>
             <td>
                <label>Grupo Ocupacional</label>
                  <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                     <select class="form-control inpunt-lg" name="grupoOcuActualiza" id="grupoOcuActualiza">
                      </select>
                  </div>
                </div>
              </td>
               <td>
                <label>Estructura 1</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                        <select class="form-control inpunt-lg" name="estructura11" id="estructura11">
                        </select>
                    </div>
                  </div>
              </td>

            </tr>
          </table>
          <table class="table table-bordered">
              <tr>
                 <td>
                <label>Estructura 2</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                        <select class="form-control inpunt-lg" name="estructura2Actualiza" id="estructura2Actualiza">
                      </select>
                    </div>
                  </div>
                </td>
                <td>
                  <label>Fisicamente Estructura 2</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                        <select class="form-control inpunt-lg" name="estructuraFisiActualiza" id="estructuraFisiActualiza">
                      </select>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          <table class="table table-bordered">
            <tr>
              <td>
                <label>Email</label>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                      <input class="form-control inpunt-lg" type="input" name="emailModificado" id="emailModificado" />
                  </div>
                </div>
              </td>
              <td>
                <label>Nacionalidad</label>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                      <input class="form-control inpunt-lg" type="input" name="nacionalidadActualiza" id="nacionalidadActualiza">
                  </div>
                </div>
              </td>
              
              <td>
                <label>Celular</label>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                      <input class="form-control inpunt-lg" type="input" name="celularModificado" id="celularModificado">
                  </div>
                </div>
              </td>
            </tr>
          </table>
          
          <table class="table table-bordered">
            <tr>
              <td style="width: 15%">
                <label>Hijos</label>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                      

                      <select class="form-control" type="text" name="hijosActualiza" id="hijosActualiza">

                          <option value="">--Selccione Si/No--</option>
                          <option value="SI">SI</option>
                          <option value="NO">NO</option>
                          
                        
                        </select>
                  </div>
                </div>
              </td>
              <td>
                <label>Etnia</label>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                      <select class="form-control" type="text" name="etniaActualiza" id="etniaActualiza">

                          <option value="">--Selccione Etnia--</option>
                          <option value="AFROECUATORIANO/AFRO">AFROECUATORIANO/AFRO</option>
                          <option value="BLANCO/A">BLANCO/A</option>
                          <option value="INDIGENA">INDIGENA</option>
                          <option value="MESTIZO/A">MESTIZO/A</option>
                          <option value="MONTUBIO/A">MONTUBIO/A</option>
                          <option value="MULATO/A">MULATO/A</option>
                          <option value="NEGRO/A">NEGRO/A</option>
                          <option value="Otro/a">Otro/a</option>
                          
                        
                        </select>
                  </div>
                </div>
              </td>
              <td>
                <label>Zonal</label>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                      
                      <select class="form-control inpunt-lg" name="zonalActualiza" id="zonalActualiza">
                      </select>
                  </div>
                </div>
              </td>
              <td  style="width: 20%">
                <label>Usuario</label>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-notes-medical"></i></span>
                      <input class="form-control inpunt-lg" type="input" name="usuarioModificado" id="usuarioModificado" />
                  </div>
                </div>
              </td>
            </tr>
          </table>

           
           <table class="table table-bordered">
            <tr>
              <td>
                <label>Persona a Cargo</label>
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fas fa-user"></i></span>
                      <input class="form-control inpunt-lg" type="input" name="personaAcargoView" id="personaAcargoView" readonly="true" />

                  </div>
                </div>
              </td>
              <td style="width: 10%" >
                <label>Cambiar</label>
                  <div class="form-group">
                    <div class="input-group">
                      <button type="button" class="btn btn-info btn-circle" id="bntCambiarPersona" name="bntCambiarPersona"><i class="fas fa-sync-alt"></i>  
                    </div>
                  </div>
              </td>
            </tr>

           
           </table>

           <div id="panelCambiarPersona" name="panelCambiarPersona">
             <button type="button" class="close" id="cerrarSelectorPersonaCargo" name="cerrarSelectorPersonaCargo">&times;</button>
            <table class="table table-bordered">
              <tr>
                <td>
                  <label>Cambiar</label>
                    <div class="form-group">
                      <div class="input-group">
                        <select class="form-control inpunt-lg" id="PersonaACargo" name="PersonaACargo">
                          
                        </select>
                      </div>
                    </div>
                </td>
              </tr>
            </table>
           
          </div>



        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cancelar</button>

        <button type="submit" id="apruebaUsuarioClick" name="apruebaUsuarioClick" class="btn btn-success">APROBAR</button>

        <button type="submit" id="edicionUsuario" name="edicionUsuario" class="btn btn-primary">Guardar</button>
      </div>

    </div>

  </div>

</div>

<!--====  End of Modal de edición de Roles Usuarios  ====-->

<!--====================================================
=            Modal de Edición de Contraseña            =
=====================================================-->

<div id="editandoContrasena" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">

  <div class="modal-dialog">

    <div class="modal-content">

      <div class="modal-header" style="background: #bc913c; color: white">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Contraseña</h4>
      </div>

      <div class="modal-body">
        <div class="box-body">

          <input class="form-control inpunt-lg" type="hidden" name="idUsuariosPassword" id="idUsuariosPassword"/>


          <label>Ingresar Nueva Contraseña</label>


          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fas fa-key"></i></span>
                <input class="form-control inpunt-lg" type="input" name="passwordModificado" id="passwordModificado" placeholder="Por favor proporcionar una nueva contraseña" />
            </div>
          </div>



        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cancelar</button>
        <button type="submit" id="edicionPassword" name="edicionPassword" class="btn btn-primary">Guardar</button>
      </div>

    </div>

  </div>

</div>


<div id="inactivarUsuario" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">

  <div class="modal-dialog">

    <div class="modal-content">

      <div class="modal-header" style="background: #bc3c3c; color: white">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Inactivar Usuario</h4>
      </div>

      <div class="modal-body">
        <div class="box-body">

          <input class="form-control inpunt-lg" type="hidden" name="idUsuariosPassword1" id="idUsuariosPassword1"/>


          <label>Estado de Usuario</label>


          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fas fa-key"></i></span>
                <input class="form-control inpunt-lg" type="input" name="estadoActual" id="estadoActual" readonly />
            </div>
          </div>

          <label>Fecha que Inactivarion</label>


          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i class="fas fa-key"></i></span>
                <input class="form-control inpunt-lg" type="input" name="fechaInactivado" id="fechaInactivado" readonly />
            </div>
          </div>


          

          <div class="form-group">
              <label class="">Activar o desactivar Usuario</label>
            </div>

            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fas fa-battery-three-quarters"></i></span>
                 <select class="form-control inpunt-lg" type="date" name="estadoUsuAct" id="estadoUsuAct">
                  <option>--Seleccione Opcion--</option>
                  <option value="A">Activado</option>
                  <option value="D">Desactivado</option>
                 </select>
              </div>
            </div>

        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cancelar</button>
        <button type="submit" id="edicionUsuActi" name="edicionUsuActi" class="btn btn-primary">Guardar</button>
      </div>





    </div>

  </div>

</div>

<!--====  End of Modal de Edición de Contraseña  ====-->
