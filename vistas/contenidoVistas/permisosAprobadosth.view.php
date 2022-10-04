<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $IdCompletoUsuario=$nombreObjeto->recuperandoid();
  $conteo=$nombreObjeto->recuperandoCountTh();
?>

<div class="wrapper row3">
    
	<div class="contenedor__tablas contenedor__tablas__polifacetico__usuarios" style="width:90%;">
    <input type="hidden" name="idPersonaRecupera" id="idPersonaRecupera" value="<?php   echo $IdCompletoUsuario; ?>">
	  <table id="tablaAprobadoTh" name="tablaAprobadoTh">
		<thead>
			   	<tr>
			     	<th>SolicioO Permiso</th>
            <th>Tipo Permiso</th>
            <th>Día Inicio</th>
            <th>Día Fin</th>
			     	<th>Estado</th>
		  			<th>Revisar</th>
				  </tr>
    </thead>

		<tfoot>

			   	<tr>
    					<th>Persona</th>
			        <th>Tipo Permiso</th>
              <th>Día Inicio</th>
              <th>Día Fin</th>
		      		<th>Estado</th>
		        	<th>-</th>
			   	</tr>

      </tfoot>

		</table>  


	 </div>

</div>


<div id="edicionDePermiso" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">

  <div class="modal-dialog">

    <div class="modal-content">

      <div class="modal-header" style="background: #3c8dbc; color: white">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Detalles del Permiso</h4>
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
              <td colspan="2"> <input class="form-control inpunt-lg" type="text" name="nombreSolicita" id="nombreSolicita" readonly></td>
              
            </tr>
            <tr>
             
              <td><label class="">Tipo de Permiso</label></td>
              <td colspan="2"> <input class="form-control inpunt-lg" type="text" name="tipoPermiso" id="tipoPermiso" readonly></td>
              
            </tr>
            <tr>
             
              <td><label class="">Día Inicio</label></td>
              <td><label class="">Día Fin</label></td>
              <td><label class="">Total</label></td>
            </tr>

            <tr>
             
              <td><input class="form-control inpunt-lg" type="text" name="diaIni" id="diaIni" readonly></td>
              <td><input class="form-control inpunt-lg" type="text" name="diaFin" id="diaFin" readonly></td>
              <td><input class="form-control inpunt-lg" type="text" name="totDias" id="totDias" readonly></td>
            </tr>

          </tbody>
        </table>
      
            <div class="form-group">
              <label class="">Documento</label>
            </div>
            
               <input class="form-control inpunt-lg" type="hidden" name="DocPermiso" id="DocPermiso" readonly>
                  <center><img class="anadiendo__documento"></center>
                          

        </div>
      </div>


      <!-- FIN TABLA -->

      <div class="modal-footer">
       <table>
         <tr>
           <td style="width: 35%">
              <label class="">Persona Quien Aprobó</label>
           </td>
           <td>
              <input class="form-control inpunt-lg" type="text" name="perAprueb" id="perAprueb" readonly>
           </td>
         </tr>
         <tr>
           <td>
             <label class="">Estado Permiso</label>
           </td>
           <td>
             <input class="form-control inpunt-lg" type="text" name="estadoProye" id="estadoProye" readonly>
           </td>
         </tr>
       </table>

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
       
       <button type="button" class="fa fa-refresh btn btn-secondary" name="cambiarPermiso" id="cambiarPermiso"> Cambiar Estado Permiso</button>

       <button type="button" class="fa fa-thumbs-down btn btn-danger" name="negarPermisoApro" id="negarPermisoApro"> NEGAR</button>


        <button type="button" class="fa fa-hand-stop-o btn btn-warning" name="anularPermisoApro" id="anularPermisoApro"> ANULAR</button>

        <button type="button" class="fa fa-save btn btn-link" data-dismiss="modal" name="guardarCaso" id="guardarCaso"> GUARDAR</button>

        <button type="button" class="fa fa-save btn btn-link" data-dismiss="modal" name="guardarCasoNega" id="guardarCasoNega"> GUARDAR</button>

        <button type="button" class="fa fa-ban btn btn-link" data-dismiss="modal" name="cancelacion" id="cancelacion"> Cancelar</button>

      </div>

    </div>

  </div>

</div>