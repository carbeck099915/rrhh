<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $IdCompletoUsuario=$nombreObjeto->recuperandoid();
  $idRolRecuperadicimos=$nombreObjeto->controladorDeSeleccionIdRolesAutonomos();
?>

<div class="wrapper row3">

  <main class="clear contenedor__de__paginas"> 
    
    <div class="contenedor__tablas__secuencia">

      <input type="hidden" name="idPersonaRecupera" id="idPersonaRecupera" value="<?php   echo $IdCompletoUsuario; ?>">
     
      <input type="hidden" name="idRolRecuperadicimos" id="idRolRecuperadicimos" value="<?php   echo $idRolRecuperadicimos; ?>">

       <table id="tablaTeletrabajoDirector" name="tablaTeletrabajoDirector" class="cell-border tabla__registro__gimnacios">

        <thead>
   
          <tr>
                
               <th class="estilos__teletrabajo__columnas">No.</th>
               <th class="estilos__teletrabajo__columnas">FECHA</th>
               <th class="estilos__teletrabajo__columnas">NOMBRES Y APELLIDOS DEL FUNCIONARIO</th>
               <th class="estilos__teletrabajo__columnas">CARGO</th> 
               <th class="estilos__teletrabajo__columnas">ACTIVIDADES</th>
               <th class="estilos__teletrabajo__columnas">PLAZO</th>
               <th class="estilos__teletrabajo__columnas">AVANCE / ENTREGABLE</th>
               <th class="estilos__teletrabajo__columnas">OBSERVACIONES</th>
               <th class="estilos__teletrabajo__columnas estado__referible"></th>

          </tr>

        </thead>

      </table>  

     </div>

  </main>

</div>



<!--===========================
=            Modal            =
============================-->

<div id="editarActividadesTeletrabajo" class="modal animated bounceIn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

  <div class="modal-dialog">

    <div class="modal-content">

      <div class="modal-header" style="background: #3c8dbc; color: white">

        <button type="button" class="close" data-dismiss="modal">&times;</button>

        <h4 class="modal-title actividades__titulos">EDITAR ACTIVIDADES</h4>

      </div>

      <div class="modal-body">

          <input type="hidden" id="idTeletrabajo" name="idTeletrabajo">

          <input type="hidden" id="mayorNumero" name="mayorNumero">

          <input  type="hidden" id="errorTeletrabajo" name="errorTeletrabajo"/>
          <input  type="hidden" id="errorTeletrabajo2" name="errorTeletrabajo2"/>
          <input  type="hidden" id="errorTeletrabajo3" name="errorTeletrabajo3"/>
          <input  type="hidden" id="errorTeletrabajo6" name="errorTeletrabajo6"/>

          <div style="margin-bottom: 1em; color: red; font-weight: bold;">OBSERACIONES</div>
          <textarea class="tareaObservatorias" name="tareaObservatorias" style="width: 100%; margin-top: 5px; margin-bottom: 1em; padding: 1em;"></textarea>

          <button id="agregarTeletrabajo" name="agregarTeletrabajo" class="btn btn-primary">AGREGAR ACTIVIDAD</button>

          <table id="tablaTeletrabajoDirector" name="tablaTeletrabajoDirector" class="cell-border">

            <thead class="aumentatio__head">
       
              <tr>
                    
                   <th class="estilos__teletrabajo__columnas__modal">No.</th>
                   <th class="estilos__teletrabajo__columnas__modal">ACTIVIDADES</th>
                   <th class="estilos__teletrabajo__columnas__modal">PLAZO</th>
                   <th class="estilos__teletrabajo__columnas__modal">AVANCE / ENTREGABLE</th>
                   <th class="estilos__teletrabajo__columnas__modal">OBSERVACIONES</th>
                   <th class="estilos__teletrabajo__columnas__modal">ELIMINAR</th>

              </tr>

            </thead>

            <tbody class="elementos__anadidos">

            </tbody>

            <tbody class="elementos__anadidos__dos">

            </tbody>

          </table>  

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left cerradoDinamico" data-dismiss="modal">Cerrar</button>
        <button type="submit" id="guardarEditarTeletrabajos" name="guardarEditarTeletrabajos" class="btn btn-primary">Guardar</button>
      </div>

    </div>

  </div>

</div>


<!--====  End of Modal  ====-->
