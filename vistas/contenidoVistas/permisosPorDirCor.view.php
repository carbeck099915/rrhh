<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $IdCompletoUsuario=$nombreObjeto->recuperandoid();
  $IdAREA=$nombreObjeto->recuperandoCodigo();


?>

<div class="wrapper row3">
    
	<div class="contenedor__tablas contenedor__tablas__polifacetico__usuarios" style="width:90%;">
    <input type="hidden" name="idPersonaRecupera" id="idPersonaRecupera" value="<?php   echo $IdCompletoUsuario; ?>">

    <input type="hidden" name="idcodArea" id="idcodArea" value="<?php   echo $IdAREA; ?>">
	  <table id="tablaPerGeneral" name="tablaPerGeneral">
		<thead>

			   	<tr>
 
			     	<th>Solicito Permiso</th>
            <th>Tipo Permiso</th>
            <th>Fecha de Elaboración</th>
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
              <th>Fecha de Elaboración</th> 
              <th>Día Inicio</th>
             <th>Día Fin</th>
		      		<th>Estado</th>
		        	<th>-</th> 

			   	</tr>

      </tfoot>

		</table>  


	 </div>

</div>


<div id="edicionDePermisoCorDir" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">

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
              <td colspan="3"> <input class="form-control inpunt-lg" type="text" name="nombreSolicita" id="nombreSolicita" readonly></td>
              
            </tr>
            <tr>
             
              <td><label class="">Tipo de Permiso</label></td>
              <td colspan="3"> <input class="form-control inpunt-lg" type="text" name="tipoPermiso" id="tipoPermiso" readonly></td>
              
            </tr>
            <tr>
              
              <td><label class="">Fecha de Elaboración</label></td>
              <td><label class="">Día Inicio</label></td>
              <td><label class="">Día Fin</label></td>
              <td><label class="">Total de Dias</label></td>
            </tr>

            <tr>

              <td><input class="form-control inpunt-lg" type="text" name="fechElabo" id="fechElabo" readonly></td>             
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
                          
                            <input class="form-control inpunt-lg" type="hidden" name="lkj" id="lkj" readonly>
                                <center><img class="anadiendo__documento" id="imagg" name="imagg"></center>
                                <embed id="lulitaEtiquetada" type="application/pdf" width="570" height="400"  name="lulitaEtiquetada" style="width: 100%"></embed>
                                
                          

        </div>
      </div>


      <!-- FIN TABLA -->

      <div class="modal-footer">
      	<table class="table table-striped table-dark">
          <tbody>
            <tr>
              
              <td>
              <label class="">Estado Permiso</label>
            </td>
              <td colspan="2"><input class="form-control inpunt-lg" type="text" name="estadoProye" id="estadoProye" readonly></td>
              
            </tr>
        </tbody>
        </table>
        
        

      </div>

    </div>

  </div>

</div>