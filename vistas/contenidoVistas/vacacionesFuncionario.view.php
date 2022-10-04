<?php 
  $nombreObjeto= new  recuperandoDatosDeLogeo();
  $nombreCompletoUsuario=$nombreObjeto->controladorDeSeleccionUsuarios();
  $apellidoCompletoUsuario=$nombreObjeto->recuperandoApellido();
  $emailCompletoUsuario=$nombreObjeto->recuperandoEmail();
  $telefonoCompletoUsuario=$nombreObjeto->recuperandoTelefono();
  $IdCompletoUsuario=$nombreObjeto->recuperandoid();
  $AreaUsuario=$nombreObjeto->recuperandoAreaDep();
?>


<div class="modal-content" style="width: 70%; position: relative;left: 15%">

     <div class="modal-header" style="background: #3cbca2; color: white">
        <h4 class="modal-title">VACACIONES</h4>
     </div>

      <div class="modal-body">
        <div class="box-body"> 
           
        </div>
      </div>
</div>




