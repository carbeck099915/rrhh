<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $IdCompletoUsuario=$nombreObjeto->recuperandoid();
  $nombreUsuario=$nombreObjeto->controladorDeSeleccionUsuarios();
  $ApellidoUsuario=$nombreObjeto->recuperandoApellido();
  $cecdula=$nombreObjeto->recuperandoCedula();
  $puesto=$nombreObjeto->recuperandoAreaPuesto();
?>

      <div class="modal-dialog modal-lg">

        <div class="modal-content">

          <div><center><br><strong><h2> BIENVENIDO </h2></strong><?php echo $nombreUsuario.' '.$ApellidoUsuario; ?></center></div>

        <input type="hidden" name="idPersonaRecupera" id="idPersonaRecupera" value="<?php   echo $IdCompletoUsuario; ?>">
          <br><center><img src="images/3.jpg" style="width: 90%"></center>
            <div style="position: relative;"><br><center>Teniendo en cuenta estos aspectos por favor proceda a cambiar su clave 
           
              <br><br><button  class="btn btn-primary" data-toggle="modal" id="btnTerminoCondicion" data-target="#cambioClave1">Terminos y Condiciones</button>
              <button id="cambio2" class="btn btn-success" data-toggle="modal" data-target="#cambioClave2">CAMBIAR CONTRASEÑA</button></center></div><br><br>
        </div>
      </div>
  
<form enctype="multipart/form-data" action="archivoPdf/FirmaAcuerdo.php" method="post">
  <div class="wrapper row3">
      
    <div class="contenedor__tablas__polifacetico__usuarios" style="width:90%;">

      <div class="modal fade" id="cambioClave1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div class="modal-dialog modal-dialog-centered">

          <div class="modal-content">
          
            
                <div class="modal-header" style="background: #56ccc4; color: white">
                    DECLARACIÓN DEL USUARIO
                 </div>

                  <div class="modal-body">
                    <div class="box-body">
                      <center>
                      <div class="form-group">
                        <div class="input-group" align="justify">
                          <input type="hidden" name="NomPer" id="NomPer" value="<?php   echo $nombreUsuario.' '.$ApellidoUsuario; ?>">
                          <input type="hidden" name="cecdula" id="cecdula" value="<?php   echo $cecdula; ?>">
                          <input type="hidden" name="puesto" id="puesto" value="<?php   echo $puesto; ?>">
      
                         •  Me responsabilizo actual y permanentemente por el buen uso de la clave de acceso registrada para acceder “Sistema de Gestión de Talento Humano Automatizado”.<br><br>

                        • En virtud de la presente declaración, renuncio a instaurar por este motivo cualquier tipo de acción civil, penal o administrativa en contra el Ministerio del Deporte y de sus representantes legales y demás servidores por el contenido erróneo de la información.<br><br>

                        • Me comprometo a entregar el Acuerdo de Responsabilidad, Uso de Medios Electrónicos y Espacio de Almacenamiento físicamente firmado en la Dirección de Administración del Talento Humano-Planta Central y/o en la Unidad Administrativa Financiera-Coordinaciones Zonales.<br><br>
                        <br><br>

                    <table style="border: 0">
                      <tr style="border: 0"> 
                        <td style="border: 0">
                          <input type="checkbox" id="checkAcepto" value="" >
                        </td>
                        <td style="border: 0">
                          He leído y acepto la declaración del usuario
                        </td>
                      </tr>
                    </table>

                         <input type="submit" name="imprimeAcuerdo" id="imprimeAcuerdo" class="certificado__para__ver__totalmente btn btn-primary" value="Imprimir Acuerdo">
                         <button type="button" class="btn btn-default pull-left" data-dismiss="modal" id="cerrarModal">Cerrar</button>
                        </div>
                      </div>

                    </div>
                  </div>


            </div>
            <!-- ============================================= 
             =            Section Pdf Armado              =
             ============================================= -->
             
             
             
             <!-- /*=====  End of Section Pdf Armado  ======*/ -->
              


          </div>
    
        </div>
    </div>

  </div>
</form>

<div class="modal fade" id="cambioClave2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div class="modal-dialog modal-dialog-centered">

    <div class="modal-content">

      <div class="modal-body">

        <div class="box-body">

          <center>

            <div class="form-group">

              <div class="input-group" align="justify">
                                        
                <h4 class="modal-title">Ingrese Nueva Contraseña</h4>
                <input class="form-control check-seguridad" type="password" name="nombrecontrasenaInicial" id="nombrecontrasenaInicial" placeholder="Ingrese Nueva Contraseña" >

              </div>

            </div>

          </center>

        </div>

      </div>

      <div class="modal-footer">

        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cancelar</button>
        <button type="submit" id="contrasenaInicial" name="contrasenaInicial" class="btn btn-primary">Actualizar</button>

      </div>

    </div>

  </div>

</div>  