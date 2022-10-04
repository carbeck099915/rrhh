


<div class="wrapper row3">
<main class="clear contenedor__de__paginas"> 
    <div class="contenedor__tablas" contenedor__tablas__polifacetico__usuarios style="width:90%;">
  
<br>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.18/css/bootstrap-select.min.css">
<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<link href="https://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  
<!-- Button trigger modal -->
<center>
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Agregar</button>
</center>

<!-- Modal -->

        <table id="tablaRoles2" name="tablaRoles2">

        <thead>

            <tr>

              <th colspan="3">ALMUERZO SECRETARÍA</th>
              <th colspan="2">HORARIOS SECRETARÍA</th>
              <th rowspan="2">Fisicamente</th>
              <th rowspan="2">Eliminar Horario</th>

            </tr>

            <tr>

              <th>Hora de almuerzo</th>
              <th>Hora de inicio</th>
              <th >Hora final</th>
              <th >Hora ingreso</th> 
              <th >hora de salida</th>

            </tr>

          </thead>

      </table>  

    </div>
    </main>
</div>


<!--=============================
=            Modales            =
==============================-->


<div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  
  <div class="modal-dialog" role="document">

    <div class="modal-content" style="width:130%!important;">
 
      <div class="modal-header" >

        <div style="text-align: center; width: 100%; font-weight: bold;">

          HORARIO DE ENTRADA Y SALIDA POR FÍSICAMENTE ESTRUCTURA

        </div>

        <button type="button" class="close" data-dismiss="modal" aria-label="Close">

          <span aria-hidden="true">&times;</span>

        </button>
        
      </div>

      <div class="modal-body">

        <div class="contenedor__horasAlmuerzo">

          <div class="elementos__columna">

            <label>Hora de ingreso</label>

            <input type="time" id="inputMDEx1" class="form-control obligagorios" >

            <label>Hora de salida</label>

            <input type="time" id="inputMDEx2" class="form-control obligagorios">


          </div>

        
              <div class="elementos__columna" method="post" >

                <label>Horas de almuerzo</label>

                <input type="time" id="nnumeroHoras" class="form-control obligagorios" name="numero1">   


                <label>Hora de almuerzo inicio</label>

                <input type="time" id="nnumeroHorasinicio" class="form-control obligagorios" name="numero2"> 
                <br>   
                <!-- <buttom class="btn btn-primary" id="registarSumatore">Registrar</buttom> -->

                <label>Hora de almuerzo final</label>

                <input type="text" id="totalhora" class="form-control obligagorios" readonly='readonly' />
              
              </div>
        
        </div>


        <div class="elementos__columna__2">

          <div class="display__select">

            <select name="from" id="undo_redo" class="form-control display__selects__agregados" size="13" multiple="multiple"></select>

            <select name="to" id="undo_redo_to" class="form-control display__selects__agregados obligagorios" size="13" multiple="multiple"></select>

          </div>

          <div class="flex__botone__wrap">

            <button type="button" id="undo_redo_undo" class="btn btn-primary btn-block botones__unanimes">DESHACER</button>
            <button type="button" id="undo_redo_rightAll" class="btn btn-default btn-block botones__unanimes"><i class="glyphicon glyphicon-forward"></i><br><span class="letra__pequenia">Pasar todos</span></button>
            <button type="button" id="undo_redo_rightSelected" class="btn btn-default btn-block botones__unanimes"><i class="glyphicon glyphicon-chevron-right"></i><br><span class="letra__pequenia">Pasar</span></button>
            <button type="button" id="undo_redo_leftSelected" class="btn btn-default btn-block botones__unanimes"><i class="glyphicon glyphicon-chevron-left"></i><br><span class="letra__pequenia">Regresar</span></button>
            <button type="button" id="undo_redo_leftAll" class="btn btn-default btn-block botones__unanimes"><i class="glyphicon glyphicon-backward"></i><br><span class="letra__pequenia">Regresar Todos</span></button>
            <button type="button" id="undo_redo_redo" class="btn btn-warning btn-block botones__unanimes">REACER</button>

          </div>

        </div>

      </div>

      <div class="modal-footer">

          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button type="button" class="btn btn-primary" id="idRegistrarHoras">Registrar</button>

      </div>


    </div>

  </div>

</div>


<!--====  End of Modales  ====-->


<script src="https://www.jqueryscript.net/demo/Two-side-Multi-Select-Plugin-with-jQuery-multiselect-js/js/multiselect.js"></script>

<script type="text/javascript">
  $(document).ready(function() {
   
    $('#undo_redo').multiselect();
  });
</script>


