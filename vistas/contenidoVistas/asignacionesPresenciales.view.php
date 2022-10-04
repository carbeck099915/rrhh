<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $idUsuario=$nombreObjeto->controladorDeSeleccionIdUsuarios();
?>

<div class="wrapper row3">

  <main class="clear contenedor__de__paginas"> 
    
    <div class="contenedor__tablas__secuencia">

      <input type="hidden" name="idPersonaRecuperaPresencial" id="idPersonaRecuperaPresencial" value="<?php   echo $idUsuario; ?>">

       <table id="reporteriaHabilitarUsuarios" name="reporteriaHabilitarUsuarios" class="cell-border tabla__registro__gimnacios">

        <thead>

          <tr>
                
               <th class="estilos__teletrabajo__columnas" rowspan="2">NOMBRE</th>
               <th class="estilos__teletrabajo__columnas" colspan="2"><center>ACCESO A ESCRITORIO</center></th> 
               <th class="estilos__teletrabajo__columnas" colspan="2"><center>ALMUERZO</center></th>
               <th class="estilos__teletrabajo__columnas" rowspan="2">MODALIDAD</th>

          </tr>

          <tr>

            <th class="estilos__teletrabajo__columnas">ESTADO</th>
            <th class="estilos__teletrabajo__columnas">HABILITAR</th>
            <th class="estilos__teletrabajo__columnas">HORA INICIO</th>
            <th class="estilos__teletrabajo__columnas">HORA FIN</th>

          </tr>

        </thead>

      </table>  

     </div>

  </main>

</div>



