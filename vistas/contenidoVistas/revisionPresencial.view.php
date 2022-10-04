<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $idUsuario=$nombreObjeto->controladorDeSeleccionIdUsuarios();
?>

<div class="wrapper row3">

  <main class="clear contenedor__de__paginas"> 

    <br>
    <br>

    <button class="btn btn-primary" name="agregarAsistencias" id="agregarAsistencias"  data-toggle='modal' data-target='#agregarAsistencia' style="padding:1em;"><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;AGREGAR ASISTENCIA</button>

    <br>
    
    <div class="contenedor__tablas__secuencia">

      <input type="hidden" name="idPersonaRecuperaPresencial" id="idPersonaRecuperaPresencial" value="<?php   echo $idUsuario; ?>">


       <table id="tablaReporteriaPresencialRevision" name="tablaReporteriaPresencialRevision" class="cell-border tabla__registro__gimnacios">

        <thead>
   
          <tr>
                
               <th class="estilos__teletrabajo__columnas">Nombre</th>
               <th class="estilos__teletrabajo__columnas">Fecha</th>
               <th class="estilos__teletrabajo__columnas">Hora</th>
               <th class="estilos__teletrabajo__columnas">Dispositivo</th>
               <th class="estilos__teletrabajo__columnas">Estado</th>
               <th class="estilos__teletrabajo__columnas">Desactivar Dispositivo</th>

          </tr>

        </thead>

        <tfoot>
          
          <tr>
                
               <th class="estilos__teletrabajo__columnas">Nombre</th>
               <th class="estilos__teletrabajo__columnas">Fecha</th>
               <th class="estilos__teletrabajo__columnas">Hora</th>
               <th class="estilos__teletrabajo__columnas">Dispositivo</th>
               <th class="estilos__teletrabajo__columnas">Estado</th>
               <th class="estilos__teletrabajo__columnas">Desactivar Dispositivo</th>

          </tr>

        </tfoot>

      </table>  

     </div>

  </main>

</div>

<!--=============================
=            Modales            =
==============================-->

<div id="agregarAsistencia" class="modal" role="dialog" tabindex="-1" aria-labelledby="myModalLabel" style="width: 50%; left: 30%; top:150px;">

      <div class="modal-dialog modal-lg">

        <div class="modal-content">

          <div class="modal-header">
            
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h6><strong><center>AGREGAR ASISTENCIA</center></strong></h6>
            
          </div>
          
          <div class="modal-body">
          
            <div class="box-body nuevo__presenciales">

              <div class="contenedor__asistencia__agregada">

                <label class="titulo__presenciales">Escoger funcionario</label>

                <select id="funcionarioEscogido" name="funcionarioEscogido" class="ancho__dinamico"></select>

                <br>

                <label class="titulo__presenciales">Escoger fecha</label>

                <input type="text" id="fechaEscogidaPresencial" name="fechaEscogidaPresencial" class="ancho__dinamico" readonly=""/>

                <br>

                <label class="titulo__presenciales">Digitar Hora</label>

                <input type="time" id="horaPresencial" name="horaPresencial" class="ancho__dinamico"/>

                <br>

                <label class="titulo__presenciales">Escoger tipo de timbrada</label>

                <select id="etiquetaSeleccionables">
                  
                  <option value="INGRESO">INGRESO</option>
                  <option value="SALIDA ALMUERZO">SALIDA ALMUERZO</option>
                  <option value="REGRESO ALMUERZO">REGRESO ALMUERZO</option>
                  <option value="SALIDA">SALIDA</option>

                </select>

                <br>


                <button id="registrarAsistenciaPrecencial" name="registrarAsistenciaPrecencial"><i class="fa fa-floppy-o" aria-hidden="true"></i>&nbsp;&nbsp;GUARDAR</button>

              </div>
                
            </div>
          
          </div>

        </div>
      
      </div>

</div>

<!--====  End of Modales  ====-->



