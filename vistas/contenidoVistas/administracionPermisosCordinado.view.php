<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $IdCompletoUsuario=$nombreObjeto->recuperandoid();
  $AreaDir=$nombreObjeto->recuperandoCodigo();
?>
<!--=======================================
=            sección principal            =
========================================--> 

<div class="wrapper row3">
    
  <div class="contenedor__tablas contenedor__tablas__polifacetico__usuarios" style="width:90%;">
    <input type="hidden" name="idPersonaRecupera" id="idPersonaRecupera" value="<?php   echo $IdCompletoUsuario; ?>">

    <input type="hidden" name="areaDirect" id="areaDirect" value="<?php   echo $AreaDir; ?>">
    <table id="tablaPermisosCordir" name="tablaPermisosCordir">
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

<div id="edicionDePermisoCorDire" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">

  <div class="modal-dialog">

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
              <td colspan="3"> <input class="form-control inpunt-lg" type="text" name="nombreSolicita" id="nombreSolicita" readonly></td>
              
            </tr>
            <tr>
             
              <td><label class="">Tipo de Permiso</label></td>
              <td colspan="3"> <input class="form-control inpunt-lg" type="text" name="tipoPermiso" id="tipoPermiso" readonly></td>
              
            </tr>
            <tr>
             
              <td><label class="">Dia Inicio</label></td>
              <td><label class="">Dia Fin</label></td>
              
            </tr>

            <tr> 
                         
              <td><input class="form-control inpunt-lg" type="text" name="diaIni" id="diaIni" readonly></td>
              <td><input class="form-control inpunt-lg" type="text" name="diaFin" id="diaFin" readonly></td>
              
            </tr>
            <tr>
               <td><label class="">Total</label></td>
               <td><label class="">Fecha de Elaboración</label></td>
            </tr>

            <tr>
              <td><input class="form-control inpunt-lg" type="text" name="totDias" id="totDias" readonly></td>
               <td><input class="form-control inpunt-lg" type="text" name="fechElabo" id="fechElabo" readonly></td> 
              
            </tr>

          </tbody>
        </table>
      
            <div class="form-group">
              <label class="">Documento</label>
            </div>
            
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
       
        <button type="button" class="fa fa-thumbs-down btn btn-danger" name="negarPermisoCor" id="negarPermisoCor">NEGAR</button>

        <button type="button" class="fa fa-hand-stop-o btn btn-warning" name="anularPermisoCor" id="anularPermisoCor">ANULAR</button>

        <button type="button" class="fa fa-thumbs-up btn btn-success" data-dismiss="modal" name="aprobarPermisoCOR" id="aprobarPermisoCOR">APROBAR</button>


         <button type="button" class="fa fa-save btn btn-link" data-dismiss="modal" name="guardarNegacionCOR" id="guardarNegacionCOR">GUARDAR</button>

         <button type="button" class="fa fa-save btn btn-link" data-dismiss="modal" name="guardarAnulacionCOR" id="guardarAnulacionCOR">GUARDAR</button>

         <button type="button" class="fa fa-save btn btn-link" data-dismiss="modal" name="CancelarNegacioncor" id="CancelarNegacioncor">Cancelar</button> 
        <!-- <button type="submit" id="edici" name="edici" class="far fa-thumbs-up">Si</button> -->
      </div>

     
     

    </div>



  </div>
   
</div>

<!--====  End of Modal de Edición de Roles   ====-->
