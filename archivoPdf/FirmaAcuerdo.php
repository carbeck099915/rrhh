<?php  

	ob_start(); 
	extract($_POST);
	// $anio = date('Y');
	// $mes=date('M');
	// $dia=date('d');;
?>


<?php
// Cargamos la librería dompdf que hemos instalado en la carpeta dompdf
require_once 'dompdf/autoload.inc.php';

use Dompdf\Dompdf;

$pdf = new Dompdf();
$pdf->set_option('defaultFont', 'Courier');
// Instanciamos un objeto de la clase DOMPDF.
$pdf = new DOMPDF();
 
// Definimos el tamaño y orientación del papel que queremos.
$pdf->set_paper("letter", "A4");
//$pdf->set_paper(array(0,0,104,250));
 
// Cargamos el contenido HTML.
$pdf->load_html(("
<style type='text/css'>
	
.certificado__medico__expedico{
	border: 1px solid black;
	display: flex; 
	flex-direction: column;
	width: 100%;
	padding: 10px;
}

#fechaCertificadoEmitido{
	width: 140px;
	position: relative;
	left: 85%;
}

.contenedor__de__palabras{
	margin-top: 5px;
	margin-bottom: 15px;
	line-height: 35pt;        /* para la separacion entre lineas */  
	position: relative;
	left: 4%;
	top: 125px;
	width: 90%;
	font-size: xx-small;
}

.contenedor__de__palabras1{
	float: right;
    font-size: x-small;
}

.contenedor__de__palabras3{

    font-size: x-small;
}

.contenedor__de__palabras2{

    font-size: xx-small;
}

.elemento__dos{
	margin-top: 15px;
}

.atentamente__ubicado{
	margin-top: 35px;
	margin-bottom: 25px;
}

.moviendo__certificado{
	position: relative;
	left: 65%;
	top: 45px;
	margin-bottom: 15px;
	font-size: 20px;
}

#fechaCertificadoEmitido{
	border-top: none;
	border-right: none;
	border-left: none;
	border-bottom: none;
}

.moviendose__mas{
	position: relative;
	top: 210px;
	left: 2.5%;
	font-size: 20px;
	margin-top: 15px;
}

.imagen__movible{
	position: relative;
	left: 35%;
}

.imagen__presumida{
	width: 250px;
	height:70px; 
}

img.mediana{
  width: 300px; height: 300px;
}

img.pequena{
  width: 180px; height: 180px;
}

</style>
<table border=0 cellspacing=0 cellpadding=2 bordercolor='666633' style='width: 100%'>

  <tr>
    <td>
      <div>
      <img src='images/LogoMDNew-03.jpg'>
      </div>
    </td>
    <td style='width: 65%;'>
    <div>
      <div class='contenedor__de__palabras1'>“Sistema de Gestión de Talento Humano Automatizado - Módulo de Permisos”</div><br>
      <div class='contenedor__de__palabras1'>Acuerdo de Responsabilidad, Uso de Medios Electrónicos y Espacio de Almacenamiento </div><br>
      <div class='contenedor__de__palabras1'>Fecha: <strong>".date('d')." / ".date('m')." / ".date('Y')."</strong></div>
     </div>
    </td>
  </tr>
  <tr>
    <td colspan='2'>

    	<p class='contenedor__de__palabras2' style='text-align: justify;'>
    		El ministerio del Deporte emite  las condiciones generales relacionadas a la responsabilidad y uso de medios electrónicos<br><br>
    	
    		
			Con este antecedente, <strong>".$NomPer."</strong>, funcionario de esta Cartera de Estado con número de cédula: <strong>".$cecdula."</strong>  acuerda las siguientes condiciones a las que se someterá, con relación a la utilización de la “Clave” y “Usuario”, para el consentimiento del uso de medios electrónicos, y acceso a los servicios que la Ministerio del Deporte ponga a su disposición a través del uso de un espacio de almacenamiento.
			<br><br><label class='contenedor__de__palabras3'><strong>Responsabilidad del funcionario</strong></label><br>
			El funcionario asume la responsabilidad total del uso, tanto de la clave de usuario, así como de la veracidad de la información y documentación ingresada al momento de usar del Sistema de Gestión de Talento Humano en cada uno de sus módulos, y la utilización de los servicios que la Ministerio del Deporte ponga a su disposición a través de la Intranet.
			<br><br>
			Todas las solicitudes de permisos realizadas a través del Sistema de Gestión de Talento Humano se garantizarán mediante la clave de usuario y de ella se derivarán todas las responsabilidades laborales de cada funcionario que hoy se desprenden de la firma autógrafa, según señala la “Ley de Comercio Electrónico, Firmas Electrónicas y Mensajes de Datos”, y en base al principio de libertad tecnológica estipulado en el mismo cuerpo legal, las partes acuerdan que la clave provisional proporcionada por la Dirección de Administración del Talento Humano de la Ministerio del Deporte al funcionario y este último genere su propia clave, surtirá los mismos efectos que una firma electrónica, por lo que, tanto su funcionamiento como su aplicación se entenderán como una completa equivalencia funcional, técnica y jurídica.
			<br><br><label class='contenedor__de__palabras3'><strong>Restricción de los funcionarios:</strong></label><br>
						
			Queda estrictamente prohibido al funcionario realizar cualquier uso del Sistema de Gestión de Talento Humano. que se encuentre fuera de la LOSEP, código de trabajo, su reglamento y demás normativa emitida por el órgano del ramo.<br><br>

			El funcionario será el único responsable de las decisiones que se adopten durante el trámite de solicitud de permisos y demás módulos; por lo tanto, el cumplimiento o incumplimiento compete exclusivamente a su autoría.


			<br><br><label class='contenedor__de__palabras3'><strong>Restricción de responsabilidad de Dirección de Administración del Talento Humano de la Ministerio del Deporte</strong></label><br>


			La Dirección de Administración del Talento Humano de la Ministerio del Deporte no será responsable por las pérdidas o daños sufridos por el funcionario por causa de terceros o fallas tecnológicas bajo responsabilidad del mismo o de terceros. La Dirección de Administración del Talento Humano de la Ministerio del Deporte no tiene responsabilidad por la exactitud, veracidad, contenido o por cualquier error en la información proporcionada por el funcionario, sea que se trate de errores humanos o tecnológicos.

			<br><br><label class='contenedor__de__palabras3'><strong>Restricción de responsabilidad de la Dirección de Tecnologías de la Información y Comunicación</strong></label><br>

			En la aplicación se visualizará información a disposición del funcionario y/o permitirá la realización de permisos en base a la normativa legal vigente para cada módulo en particular. La Dirección de Tecnologías de la Información y Comunicación podrá adicionar, modificar o eliminar las funcionalidades en cualquier momento, lo cual acepta el usuario mediante el uso de la aplicación. En todo caso, al momento de realizar dichas modificaciones que la Dirección de Tecnologías considere informar se notificarán al usuario a través del correo electrónico institucional. <br><br>


			Las solicitudes efectuadas por el usuario mediante la aplicación serán aprobadas por su jefe inmediato de conformidad al acuerdo 0163 del 2019 “Reglamento Interno de Delegación de Firmas de la Ministerio del Deporte” y al Estatuto Orgánico de Gestión Organizacional por Procesos vigente desde el 1 de febrero de 2019. 

			El usuario acepta y autoriza que los registros de los permisos previamente autorizados por su inmediato superior que realice en la aplicación constituyen plena prueba de los mismos. <br><br>


			La Dirección de Tecnologías de la Información  y Comunicación no se responsabiliza por terceros ajenos a usted usen el Sistema de Gestión de Talento Humano con su usuario y clave; La Dirección de Tecnologías de la Información no se responsabiliza por utilizar la aplicación y los contenidos con fines lícitos y/o ilícitos, contrarios a lo establecido en este acuerdo de responsabilidad, o al uso mismo de la aplicación, que sean lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar o deteriorar el aplicativo y los contenidos o impedir la normal utilización o disfrute de esta y de los contenidos por parte de los funcionarios.<br>


			<br><br><label class='contenedor__de__palabras3'><strong>Aceptación</strong></label><br>

			Autorizo a la Ministerio del Deporte a través de las unidades correspondientes a realizar cuanto análisis y verificación se consideren necesarias; autorizo el descuento de mis vacaciones conforme lo determina la LEY ORGÁNICA DE SERVICIO PÚBLICO, LOSEP, artículos 26 y 34, en concordancia con su Reglamento Art. 32; y el artículo 69 del CÓDIGO DE TRABAJO; así como las obligaciones derivadas de los mismos en el uso del Sistema de Gestión de Talento Humano.<br><br>

			Los términos y condiciones están sujetos a las disposiciones contenidas en la Ley de Comercio Electrónico, Firmas Electrónicas y Mensajes de Datos.<br>

			El funcionario, acepta la validez de este acuerdo, así como la información que anexe en cualquiera de los módulos del Sistema de Gestión de Talento Humano. La suscripción del presente acuerdo implicará la aceptación de todas y cada una de las disposiciones establecidas antes mencionadas, que se entienden incorporadas a este texto. Los términos y condiciones están sujetos a las disposiciones contenidas en la Ley de Comercio Electrónico, Firmas Electrónicas y Mensajes de Datos y las normas laborales vigentes en el Ecuador. <br>

			El funcionario suscribe este acuerdo por su propia iniciativa y se somete voluntariamente a lo aquí estipulado. El funcionario acepta la validez de este acuerdo, de la clave provisional de usuario que se le proporciona, la clave que el funcionario establezca, así como de otra información que envíe a la Dirección de Administración del Talento Humano haciendo uso de los sistemas o medios electrónicos que la Ministerio del Deporte ponga a su disposición.<br><br>

			Me responsabilizo actual y permanentemente por el buen uso de la clave registrada para acceder al Sistema de Gestión de Talento Humano.<br>

			 En tal virtud del presente renuncio a instaurar por este motivo cualquier tipo de acción civil o administrativa en contra de la Ministerio del Deporte, de sus representantes legales y demás servidores por el contenido erróneo de la información, emitida o receptada a través del Sistema de Gestión de Talento Humano.
			<br><br><br><br><br><br><br><br>

			Firma del funcionario
			<br><strong>".$puesto."</strong>
			</p>
			
	</td>
  </tr>

</table>







  "));
 




// Renderizamos el documento PDF.
$pdf->render();
 
// obtener el valor generado
$pdfGeneerado= $pdf->output();



// Enviamos el fichero PDF al navegador.
$pdf->stream('CertificadoTerminosYCondicionesddd.pdf');


?>