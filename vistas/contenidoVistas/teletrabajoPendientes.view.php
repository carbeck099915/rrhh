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

       <table id="tablaTeletrabajoDirectorPendientes" name="tablaTeletrabajoDirectorPendientes" class="cell-border tabla__registro__gimnacios">

        <thead>
   
          <tr>
                
               <th class="estilos__teletrabajo__columnas">No.</th>
               <th class="estilos__teletrabajo__columnas">FECHA</th>
               <th class="estilos__teletrabajo__columnas">NOMBRES Y APELLIDOS DEL FUNCIONARIO</th>
               <th class="estilos__teletrabajo__columnas">DIRECTOR</th> 
               <th class="estilos__teletrabajo__columnas">DIRECIÓN</th> 
               <th class="estilos__teletrabajo__columnas">CARGO</th> 
               <th class="estilos__teletrabajo__columnas">ACTIVIDADES</th>
               <th class="estilos__teletrabajo__columnas">PLAZO</th>
               <th class="estilos__teletrabajo__columnas">AVANCE / ENTREGABLE</th>
               <th class="estilos__teletrabajo__columnas">ESTADO</th>

          </tr>

        </thead>

        <tfoot>
          
               <th class="estilos__teletrabajo__columnas">No.</th>
               <th class="estilos__teletrabajo__columnas">FECHA</th>
               <th class="estilos__teletrabajo__columnas">NOMBRES Y APELLIDOS DEL FUNCIONARIO</th>
               <th class="estilos__teletrabajo__columnas">DIRECTOR</th> 
               <th class="estilos__teletrabajo__columnas">DIRECIÓN</th> 
               <th class="estilos__teletrabajo__columnas">CARGO</th> 
               <th class="estilos__teletrabajo__columnas">ACTIVIDADES</th>
               <th class="estilos__teletrabajo__columnas">PLAZO</th>
               <th class="estilos__teletrabajo__columnas">AVANCE / ENTREGABLE</th>
               <th class="estilos__teletrabajo__columnas">ESTADO</th>

        </tfoot>

      </table>  

     </div>

  </main>

</div>



