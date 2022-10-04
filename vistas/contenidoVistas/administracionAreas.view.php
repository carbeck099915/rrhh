<!--=======================================
=            sección principal            =
========================================-->

<div class="wrapper row3">
    
	<div class="contenedor__tablas" contenedor__tablas__polifacetico__usuarios style="width:90%;">
      
    <button class="btn btn-primary boton__agregar__rol" data-toggle="modal" data-target="#agregarAreaMod">Agregar Area</button>

		<table id="tablaAreas" name="tablaAreas">

			 <thead>

			   	<tr>

			     	<th>Nombre del Rol</th>
			     	<th>Estado</th>
			     	<th>Editar</th>

			   	</tr>

			  </thead>

			<tfoot>


			   	<tr>

			     	<th>Nombre del Rol</th>
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


<div id="agregarAreaMod" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">

  <div class="modal-dialog">

    <div class="modal-content">

      <div class="modal-header" style="background: #3c8dbc; color: white">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Agregar Area</h4>
      </div>

      <div class="modal-body">
        <div class="box-body">


            <div class="form-group">
              <label class="">Nombre del Area</label>
            </div>

            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fas fa-address-book"></i></span>
                  <input class="form-control inpunt-lg" type="text" name="nombreAgregarArea" id="nombreAgregarArea" placeholder="Nombre del tablaAreas">
              </div>
            </div>




        </div>
      </div>


       <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">No</button>
        <button type="submit" id="agregarArea" name="agregarArea" class="btn btn-primary">Si</button>
      </div>

    </div>

  </div>

</div>



<!--===========================================================
=            Modal de Edición de Roles                       =
============================================================-->

<div id="edicionDeArea" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">

  <div class="modal-dialog">

    <div class="modal-content">

      <div class="modal-header" style="background: #3c8dbc; color: white">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Area</h4>
      </div>

      <div class="modal-body">
        <div class="box-body">

        	<input class="form-control inpunt-lg" type="hidden" name="id_area" id="id_area">

            <div class="form-group">
              <label class="">Descripcion Area</label>
            </div>

            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fas fa-address-book"></i></span>
                  <input class="form-control inpunt-lg" type="text" name="nombreArea" id="nombreArea" placeholder="Nombre del Rol">
              </div>
            </div>

            <div class="form-group">
              <label class="">Activar o desactivar</label>
            </div>

            <div class="form-group">
              <div class="input-group">
               	<span class="input-group-addon"><i class="fas fa-battery-three-quarters"></i></span>
                 <select class="form-control inpunt-lg" type="date" name="estadoArea" id="estadoArea">
              	 	<option value="A">Activado</option>
              	 	<option value="D">Desactivado</option>
              	 </select>
              </div>
            </div>


        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">No</button>
        <button type="submit" id="edicionDeAreaE" name="edicionDeAreaE" class="btn btn-primary">Si</button>
      </div>

    </div>

  </div>

</div>

<!--====  End of Modal de Edición de Roles   ====-->
