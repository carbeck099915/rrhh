<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $idUsuario=$nombreObjeto->controladorDeSeleccionIdUsuarios();
?>

<div class="wrapper row3">

  <main class="clear contenedor__de__paginas"> 
    
    <div class="contenedor__tablas__secuencia">

      <input type="hidden" name="idPersonaRecuperaPresencial" id="idPersonaRecuperaPresencial" value="<?php   echo $idUsuario; ?>">

       <table id="tablaReporteriaPresencial" name="tablaReporteriaPresencial" class="cell-border tabla__registro__gimnacios">

        <thead>
   
          <tr>
                
               <th class="estilos__teletrabajo__columnas">Nombre</th>
               <th class="estilos__teletrabajo__columnas">Fecha</th>
               <th class="estilos__teletrabajo__columnas">Hora</th>

          </tr>

        </thead>

      </table>  

     </div>

  </main>

</div>



