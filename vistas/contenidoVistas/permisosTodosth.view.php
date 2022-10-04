

<div class="wrapper row3">
    
	<div class="contenedor__tablas contenedor__tablas__polifacetico__usuarios" style="width:90%;">
    
	  <table id="tablaTodos" name="tablaTodos">
		<thead>

			   	<tr>

			     	<th>Solicito Permiso</th> 
            <th>Estructura Fisica</th>
            <th>Tipo Permiso</th>
            <th>Dia Genera</th>
            <th>Día Inicio</th>
            <th>Día Fin</th>
            <th>Total-Dia</th>
			     	<th>Estado</th>
            <th>Aprobado Por</th>
					<th>Revisar</th>
				</tr>

        </thead>

		<tfoot>

			   	<tr>
					<th>Persona</th>
          <th>Estructura Fisica</th>
			    <th>Tipo Permiso</th>
          <th>Dia Genera</th>
          <th>Día Inicio</th>
          <th>Día Fin</th>
          <th>Total-Dia</th>
		      <th>Estado</th>
          <th>Aprobado Por</th>
		      <th>-</th>

			   	</tr>

      </tfoot>

		</table>  


	 </div>

</div>


<div id="edicionDePermiso" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">

  <div class="modal-dialog modal-lg">

    <div class="modal-content">

      <div class="modal-header" style="background: #3c8dbc; color: white">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Detalles del Permiso</h4>
      </div>

      <!-- AQUI EMPIEZA LA TABLA -->


      <div class="modal-body">
        <div class="box-body">

          <input class="form-control inpunt-lg" type="hidden" name="id_generaPermiso" id="id_generaPermiso">

          <table class="table table-borderless">
            <tr>
              <td>
                    <label class="">Nombre Solicitante</label>
                  </td>
                    <td colspan="2"> <input class="form-control inpunt-lg" type="text" name="nombreSolicita" id="nombreSolicita" readonly></td>
            </tr>
            <tr>
              <td><table class="table table-striped table-dark">
                <tbody>
                  <tr>
                   
                    <td><label class="">Tipo de Permiso</label>
                    <input class="form-control inpunt-lg" type="text" name="tipoPermiso" id="tipoPermiso" readonly></td>
                    
                  </tr>

                  <tr>
                   
                    <td><label class="">Día Genera</label>
                      <input class="form-control inpunt-lg" type="text" name="diaGene" id="diaGene" readonly></td>
                  </tr>

                  <tr>
                   
                    <td><label class="">Día Inicio</label>
                      <input class="form-control inpunt-lg" type="text" name="diaIni" id="diaIni" readonly></td>
                  </tr>
                  <tr>

                    <td><label class="">Día Fin</label>
                      <input class="form-control inpunt-lg" type="text" name="diaFin" id="diaFin" readonly></td>

                    
                  </tr>

                  <tr>
                   
                    
                   <td><label class="">Total</label>
                    <input class="form-control inpunt-lg" type="text" name="totDias" id="totDias" readonly></td>
                  </tr>

                </tbody>
              </table></td>
              <td style="width: 50%">
                <div class="form-group">
              <label class="">Documento</label>
            </div>
            
               <input class="form-control inpunt-lg" type="hidden" name="DocPermiso" id="DocPermiso" readonly>
               <input  type="hidden" name="luliana" id="luliana">
               <center><img class="anadiendo__documento" id="imagg" name="imagg"></center>
               <center><embed id="lulitaEtiquetada" type="application/pdf" width="500" height="300"  name="lulitaEtiquetada"></embed></center>
              </td>
            </tr>
          </table>

             
      
            
                          

        </div>

         <table>
        <tr>
          <td style="width: 30%"><center><label class="">Observación</center></label></td>
          <td><textarea class="form-control inpunt-lg" readonly name="motivoThTODOS" id="motivoThTODOS"></textarea></td>
        </tr>
        <tr>
          <td>
            <center><label class="">Persona a Cargo</center></label>
          </td>
          <td>
             <input class="form-control inpunt-lg" type="text" name="personaApp" id="personaApp" readonly>
          </td>
        </tr> 
        <tr>
          <td><center><label class="">Estado Permiso</center></label></td>
          <td> <input class="form-control inpunt-lg" type="text" name="estadoProye" id="estadoProye" readonly></td>
        </tr>
      </table>

      </div>


      <!-- FIN TABLA -->
     
      <div class="modal-footer">
       
        
       

      </div>

    </div>

  </div>

</div>