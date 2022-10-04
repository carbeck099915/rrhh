<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $IdCompletoUsuario=$nombreObjeto->recuperandoid();

?>
<!--=======================================
=            sección principal            =
========================================-->

<div class="wrapper row3">
    
  <div class="contenedor__tablas contenedor__tablas__polifacetico__usuarios" style="width:90%;">
    <input type="hidden" name="idPersonaRecupera" id="idPersonaRecupera" value="<?php   echo $IdCompletoUsuario; ?>">
    <table id="tablaPermisosMAT" name="tablaPermisosMAT">
    <thead>

          <tr>

            <th>Solicita Permiso</th>
            <th>Tipo Permiso</th>
            <th>Estado</th>
            <th>Revisar</th>
        </tr>

        </thead>

    <tfoot>

          <tr>

          <th>Persona</th>
          <th>Tipo Permiso</th>
          <th>Estado</th>
           <th>-</th>

          </tr>

      </tfoot>

    </table>  


   </div>

</div>

<!--====  End of sección principal  ====-->

<!--==========================================
=            Modal de agregar Rol            =
===========================================-->

<!--===========================================================
=            Modal de Edición de Roles                       =
============================================================-->

<div id="edicionDePermisoMAT" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">

  <div class="modal-dialog modal-lg">

    <div class="modal-content">

      <div class="modal-header" style="background: #3c8dbc; color: white">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Solicitud de Permisos</h4>
      </div>

      <!-- AQUI EMPIEZA LA TABLA -->
      <div class="modal-body">
        <div class="box-body">

          <input class="form-control inpunt-lg" type="hidden" name="id_generaPermiso" id="id_generaPermiso">

          <table class="table table-striped table-dark">
             <tbody>
            <tr>
                <td>
                  <label class="">Nombre Solicitante</label>
                </td>
                  <td> <input class="form-control inpunt-lg" type="text" name="nombreSolicita" id="nombreSolicita" readonly></td>
            </tr>
             
                <tr>
                 
                  <td><label class="">Tipo de Permiso</label></td>
                  <td> <input class="form-control inpunt-lg" type="text" name="tipoPermiso" id="tipoPermiso" readonly></td>
                  
                </tr>

                <tr>
                 
                  <td><label class="">Fecha de Elaboración</label></td>
                  <td><input class="form-control inpunt-lg" type="text" name="fechElabo" id="fechElabo" readonly></td>

                </tr>

                <tr>
                 
                  <td><label class="">Dia Inicio</label></td>
                  <td><input class="form-control inpunt-lg" type="text" name="diaIni" id="diaIni" readonly></td>

                </tr>
                <tr>
                  <td><label class="">Dia Fin</label></td>
                  <td><input class="form-control inpunt-lg" type="text" name="diaFin" id="diaFin" readonly></td>
                  
                </tr>

                <tr>
                 <td><label class="">Total</label></td>              
                  <td><input class="form-control inpunt-lg" type="text" name="totDias" id="totDias" readonly></td>
                </tr>

            </tbody>
          </table>
          <label class="">Documento</label>
           <input class="form-control inpunt-lg" type="hidden" name="DocPermiso" id="DocPermiso" readonly>
               <input  type="hidden" name="luliana" id="luliana">
               <center><img class="anadiendo__documento" id="imagg" name="imagg"></center>
               <center><embed id="lulitaEtiquetada" type="application/pdf" width="570" height="400"  name="lulitaEtiquetada"></embed></center>
            
      



           
                          

        </div>
      <div class="Observacion">
             <table class="table table-striped table-dark">
          <tbody>
            <tr>
              
              <td>
              <label class="">Motivo</label>
            </td>
              <td><textarea class="form-control inpunt-lg" name="OnservacionNegacion" id="OnservacionNegacion"></textarea></td>
              
            </tr>
          </tbody>
        </table>

        </div>
      </div>


      <!-- FIN TABLA -->

      <div class="modal-footer">
       
        <button type="button" class="fa fa-thumbs-down btn btn-danger" name="negarPermisoMAX" id="negarPermisoMAX">NEGAR</button>


        <button type="button" class="fa fa-hand-stop-o btn btn-warning" name="anularPermisoMAX" id="anularPermisoMAX">ANULAR</button>

        

         <button type="button" class="fa fa-thumbs-up btn btn-success" data-dismiss="modal" name="aprobarPermisoMAX" id="aprobarPermisoMAX">APROBAR</button>


         <button type="button" class="fa fa-save btn btn-link" data-dismiss="modal" name="guardarNegacionMAX" id="guardarNegacionMAX">GUARDAR</button>

         <button type="button" class="fa fa-save btn btn-link" data-dismiss="modal" name="guardarAnulacionMAX" id="guardarAnulacionMAX">GUARDAR</button>

         <button type="button" class="fa fa-save btn btn-link" data-dismiss="modal" name="CancelarNegacionMAX" id="CancelarNegacionMAX">Cancelar</button>
        <!-- <button type="submit" id="edici" name="edici" class="far fa-thumbs-up">Si</button> -->
      </div>

     
     

    </div>



  </div>
   
</div>

<!--====  End of Modal de Edición de Roles   ====-->
z