<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $nombreCompletoUsuario=$nombreObjeto->controladorDeSeleccionUsuarios();
  $apellidoCompletoUsuario=$nombreObjeto->recuperandoApellido();
  $emailCompletoUsuario=$nombreObjeto->recuperandoEmail();
  $telefonoCompletoUsuario=$nombreObjeto->recuperandoTelefono();
  $IdCompletoUsuario=$nombreObjeto->recuperandoid();
  $AreaUsuario=$nombreObjeto->recuperandoAreaDep();
?>


<div class="modal-content" style="width: 70%; position: relative;left: 15%">

     <div class="modal-header" style="background: #3c8dbc; color: white">
        <h4 class="modal-title">SOLICITAR PERMISO</h4>
     </div>

      <div class="modal-body">
        <div class="box-body"> 
            <table>
              <tr>
                   <td colspan="4"><h5 align="center"><label>Datos del Área</label></h5></td>
              </tr>
              <tr>
                <td>
                      <label>Área o Departamento</label>
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="fa fa-briefcase" aria-hidden="true"></i></span>
                            <input type="hidden" name="idPersonaRecupera" id="idPersonaRecupera" value="<?php   echo $IdCompletoUsuario; ?>">
                            
                            <!-- <textarea style="width: 100%"> <?php echo $AreaUsuario?></textarea> -->
                            <input class="form-control inpunt-lg" style="width: 100%" name="areaPertenece" id="areaPertenece" readonly value="<?php echo $AreaUsuario?>" />

                        </div>
                      </div>
                </td>
               
              </tr> 
            </table>

            <table>
              <tr>
                   <td colspan="4"><h5 align="center"><label>Datos Personales</label></h5></td>
              </tr>
              <tr>
                <td>
                    <table style="border: hidden;">
                    <tr>
                      <td>
                        <label>Apellido</label>
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="fas fa-user"></i></span>
                            <input class="form-control inpunt-lg" name="apellidoUsuario" id="apellidoUsuario" readonly value="<?php   echo $apellidoCompletoUsuario; ?>"/>
                        </div>
                      </div>
                      </td>
                      <td>
                        <label>Nombre</label>

                      <div class="form-group">
                        <div class="input-group"> 
                          <span class="input-group-addon"><i class="fas fa-user"></i></span>
                            <input class="form-control inpunt-lg" name="id_personaPermiso" id="id_personaPermiso" readonly value="<?php   echo $nombreCompletoUsuario; ?>" />
                        </div>
                      </div>
                      </td>
                    </tr>
                  </table>
                </td>
               
                <td width="50%">
                                 <label>Permiso</label>
                                    <input type="hidden" name="idRecupera" id="idRecupera">
                                      <div class="form-group">
                                        <div class="input-group">
                                          <span class="input-group-addon"><i class="fas fa-file-text"></i></span>
                                          <select class="form-control inpunt-lg" name="permisoSelect" id="permisoSelect"></select>
                                        </div>
                                      </div>
                </td>
              
              </tr>
              <tr>
                 <td>
                  

                      
                </td>
 
                 <td width="50%" rowspan="2" >
                                <div class="panel panel-info paraGeneral">
                                  <div class="panel-heading">Información</div>
                                    <div class="panel-body"> 
                                    
                                      <textarea rows="3" name="infopermiso" id="infopermiso" class="form-control inpunt-lg" readonly></textarea>

                                    </div>
                                </div>

                                <div class="panel panel-success paraIngreso">
                                  <div class="panel-heading">Ingrese Información</div>
                                    <div class="panel-body"> 
                                    
                                      <textarea name="infopermisoEspecial" id="infopermisoEspecial" class="form-control inpunt-lg"></textarea>

                                    </div>
                                </div>
                 </td>  
              </tr>
              <tr>
                <td>
                      <label>Email</label>
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-group-addon"><i class="fas fa-envelope"></i></span>
                            <input class="form-control inpunt-lg" name="emailUsuario" id="emailUsuario" readonly value="<?php   echo $emailCompletoUsuario; ?>"/>
                        </div>
                      </div>
                </td>
              </tr>
            </table>
            
            <table style="border: 0">
              <tr>
                <td colspan="2"><h5 align="center"><label>Seleccione Permiso</label></h5></td>
              </tr>
              <tr>
               
                <td style="width: 50%">
                  
                    <input type="file" name="documentoDias" id="documentoDias">   
                 
                
                 

                 <div class="mostrarOpciones">           
                    <table style="border: hidden;">
                      <tr style="border: hidden;">   
                        <td colspan="4"><label>Tiempo</label></td>
                      </tr>
                     
                      <tr>
                        <form>
                         
                            <td style="width: 25%; border: hidden;"><h6><i class="fas fa-calendar"></i>&nbsp POR DÍAS</h6></td>
                            <td style="width: 25%; border: hidden;">
                              <input type="radio" name="tiempoPermiso" value="POR DIAS" id="tiempoPermisoMes">
                            </td>
                            <td style="width: 25%; border: hidden;"><h6><i class="fas fa-clock-o"></i>&nbsp POR HORAS</h6></td>
                            <td style="width: 25%; border: hidden;">
                              <input type="radio" name="tiempoPermiso" value="POR HORAS" id="tiempoPermisoHora">
                            </td>  

                          
                          
                        </form>
                      </tr>
                    </table>
                    </div>
                    <table style="border: 0">
                      <tr>
                        <td>
                          <div class="panel_de_dias">
                                                <table style="border: hidden;">
                                                  <tr>
                                                    <td><h6><i class="fas fa-calendar"></i>&nbsp Seleccione Días</h6></td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <table style="border: hidden;" id="tablaDia" name="tablaDia">
                                                          <tr>
                                                            <td>Día Inicio</td>
                                                            <td><input type="text" id="datepicker" style="width: 70%;" class="form-control" name="datepicker" >
                                                               
                                                          </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Día Fin</td>
                                                            
                                                            <td><input type="text" id="datepicker1" style="width: 70%;"class="form-control" name="datepicker1"></td>
                                                          </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td></td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      Total Días<input type="text" name="totalDias" id="totalDias" class="form-control" readonly="true">
                                                      
                          
                                                    </td>
                                                  </tr>
                                                </table>
                          </div>
                          </td> 
                          <td>
                          <div class="panel_de_horas">
                                                 <table style="border: hidden;">
                                                    <tr>
                                                      <td><h6><i class="fas fa-clock-o"></i>&nbsp Ingrese Horas</h6></td>
                                                    </tr>
                                                    <tr>
                                                      <td>
                                                          <table style="border: hidden;">
                                                            <tr>
                                                               <td>Seleccione el Día</td>
                                                              <td>
                                                                  <input type="text" id="datepicker2" style="width: 70%;"class="form-control" name="datepicker2" >
                                                              </td>
                                                            </tr>

                                                            <tr>
                                                             <td>Hora Inicio</td>
                                                              <td>
                                                                  <input type="time" name="horaIni" style="width: 50%" id="horaIni" class="form-control">
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td>Hora Fin</td>
                                                              <td><input type="time" name="horaFin" style="width: 50%" id="horaFin" class="form-control"></td>
                                                            </tr>
                                                          </table>
                                                          
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                       <td>
                                                        Total Horas<input type="text" name="totalHoras" id="totalHoras" class="form-control" readonly="true">
                                                       <td>
                                                    </tr>
                                                 </table>
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                </td>
                
                <td id="imagenPrevia" class="pequeña imaggenUsu">
                </td>
                <td id="verPdfq" width="600" height="310">
                </td> 
 
              </tr>
              <tr>
                <td colspan="2"><center>
                  <button type="button" class="btn btn-info" id="enviarPermiso" name="enviarPermiso">Enviar</button></center>
                </td>  
              </tr>
            </table>
        </div>
      </div>
</div>




<!-- 
<span class="embed-youtube" style="text-align:center; display: block;"><iframe class="youtube-player" type="text/html" width="551" height="310" src="" allowfullscreen="true" style="border:0;"></iframe></span>
 -->

