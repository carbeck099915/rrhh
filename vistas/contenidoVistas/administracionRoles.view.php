<!--=======================================
=            sección principal            =
========================================-->

<div class="wrapper row3">
    
	<div class="contenedor__tablas" contenedor__tablas__polifacetico__usuarios style="width:90%;">
      
    <button class="btn btn-primary boton__agregar__rol" data-toggle="modal" data-target="#agregarRol">Agregar Roles</button>

		<table id="tablaRoles" name="tablaRoles">

			 <thead>

			   	<tr>

			     	<th>Nombre del Rol</th>
			     	<th>Tipo</th>
            <th>Estado</th>
			     	<th>Editar</th>

			   	</tr>

			  </thead>

			<tfoot>


			   	<tr>

			     	<th>Nombre del Rol</th>
			     	<th>Tipo</th>
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


<div id="agregarRol" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">

  <div class="modal-dialog">

    <div class="modal-content">

      <div class="modal-header" style="background: #3c8dbc; color: white">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Agregar Rol</h4>
      </div>

      <div class="modal-body">
        <div class="box-body">


            <div class="form-group">
              <label class="">Nombre del Rol</label>
            </div>

            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fas fa-address-book"></i></span>
                  <input class="form-control inpunt-lg" type="text" name="nombreAgregarRol" id="nombreAgregarRol" placeholder="Nombre del Rol">
              </div>
            </div>


            <div class="form-group">
              <label class="">Tipo</label>
            </div>


            <div class="form-group">
              <div class="input-group">
                  <span class="input-group-addon"><i class="fas fa-address-book"></i></span>
                  <select class="form-control inpunt-lg" type="text" name="tipodeRol" id="tipodeRol">

                    <option value="">Selccione el Tipo de Rol</option>
                    <option value="Administrador">Administrador</option>
                    <option value="General">General</option>
                    <option value="Invitados">Invitados</option>
                  
                  </select>
              </div>
            </div>



        </div>
      </div>


       <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">No</button>
        <button type="submit" id="agregarRolInsercion" name="agregarRolInsercion" class="btn btn-primary">Si</button>
      </div>

    </div>

  </div>

</div>



<!--===========================================================
=            Modal de Edición de Roles                       =
============================================================-->

<div id="edicionDeRol" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel">

  <div class="modal-dialog">

    <div class="modal-content">

      <div class="modal-header" style="background: #3c8dbc; color: white">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Editar Rol</h4>
      </div>

      <div class="modal-body">
        <div class="box-body">

        	<input class="form-control inpunt-lg" type="hidden" name="id_rol" id="id_rol">

            <div class="form-group">
              <label class="">Nombre Rol</label>
            </div>

            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fas fa-address-book"></i></span>
                  <input class="form-control inpunt-lg" type="text" name="nombreRol" id="nombreRol" placeholder="Nombre del Rol">
              </div>
            </div>

            <div class="form-group">
              <label class="">Activar o desactivar Rol</label>
            </div>

            <div class="form-group">
              <div class="input-group">
               	<span class="input-group-addon"><i class="fas fa-battery-three-quarters"></i></span>
                 <select class="form-control inpunt-lg" type="date" name="estadoRol" id="estadoRol">
              	 	<option value="A">Activado</option>
              	 	<option value="D">Desactivado</option>
              	 </select>
              </div>
            </div>


        </div>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">No</button>
        <button type="submit" id="edicionDeRolAdmin" name="edicionDeRolAdmin" class="btn btn-primary">Si</button>
      </div>

    </div>

  </div>

</div>

<!--====  End of Modal de Edición de Roles   ====-->
