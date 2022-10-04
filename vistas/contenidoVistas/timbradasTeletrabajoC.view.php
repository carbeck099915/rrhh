<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $IdCompletoUsuario=$nombreObjeto->recuperandoid();
  $idRolRecuperadicimos=$nombreObjeto->controladorDeSeleccionIdRolesAutonomos();
  $AreaDir=$nombreObjeto->recuperandoCodigo();
?>
<!--=======================================
=            sección principal            =
========================================--> 

<div class="wrapper row3">
    
  <div class="contenedor__tablas contenedor__tablas__polifacetico__usuarios" style="width:90%;">

    <input type="hidden" name="idPersonaRecupera" id="idPersonaRecupera" value="<?php   echo $IdCompletoUsuario; ?>">

    <input type="hidden" name="idRolRecuperadicimos" id="idRolRecuperadicimos" value="<?php   echo $idRolRecuperadicimos; ?>">

    <table id="timbradas__teles" name="timbradas__teles">

        <thead>
   
          <tr>
                
               <th class="estilos__teletrabajo__columnas">FUNCIONARIO</th>
               <th class="estilos__teletrabajo__columnas">CARGO</th> 
               <th class="estilos__teletrabajo__columnas">SUPERIOR INMEDIATO</th>
               <th class="estilos__teletrabajo__columnas">ÁREA</th>
               <th class="estilos__teletrabajo__columnas">FECHA TIMBRADA</th>
               <th class="estilos__teletrabajo__columnas">HORA TIMBRADA</th>
               <th class="estilos__teletrabajo__columnas">TIPO TIMBRADA</th>
               <th class="estilos__teletrabajo__columnas">IP</th>
               <th class="estilos__teletrabajo__columnas">LONGITUD</th>
               <th class="estilos__teletrabajo__columnas">LATITUD</th>

          </tr>

        </thead>


    </table>  


   </div>

</div>

<!--====  End of sección principal  ====-->

