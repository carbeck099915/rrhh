<?php

error_reporting(0);

require_once "../conexion/conexion.php";

extract($_POST);

$cedula=$_POST["cedula"];
///////////--------------------CONSUMO DEL WS
$codigoPaquete="3683"; //codigo del paquete de consumo (MSP por ejemplo)
$soapUrl = "https://interoperabilidad.dinardap.gob.ec/interoperador-v2?wsdl"; //url de consumo
$soapUser = "MdEPORteItRo21";  //  usuario
$soapPassword = "8&UpP%Cbm+jM5&"; // contraseña

//xml de consulta
$xml_post_string = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:int="http://interoperabilidad.dinardap.gob.ec/interoperador/">

   <soapenv:Header/>

     <soapenv:Body>

        <int:consultar>       

           <parametros>           

              <parametro>             

                 <nombre>codigoPaquete</nombre>             

                 <valor>'.$codigoPaquete.'</valor>

              </parametro>

              <parametro>             

                 <nombre>identificacion</nombre>             

                 <valor>'.$cedula.'</valor>

              </parametro>          

           </parametros>

        </int:consultar>

     </soapenv:Body>

  </soapenv:Envelope>';   
  //cabeceras de la peticion

$headers = array(
  "Content-type: text/xml;charset=\"utf-8\"",
  "Accept: text/xml",
  "Cache-Control: no-cache",
  "Pragma: no-cache",
    "SOAPAction: http://interoperabilidad.dinardap.gob.ec/interoperador/consultar", 
  "Content-length: ".strlen($xml_post_string),
);

// PHP cURL  for https connection with auth
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_URL, $soapUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, $soapUser.":".$soapPassword); 
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
//curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $xml_post_string); // the SOAP request
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch); 

//cuando el WS no da respuesta

if($response === false) {
  
    $mensaje=2;
    $value['mensaje']=$mensaje;
    exit();

}else{

  curl_close($ch);
  //respuesta: borrado de etiquetas para posterior construccion del objeto
  $response = str_replace('<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',"",$response);
  $response = str_replace('<soap:Body>',"",$response);
  $response = str_replace('<ns2:consultarResponse xmlns:ns2="http://interoperabilidad.dinardap.gob.ec/interoperador/">',"",$response);
  $response = str_replace('</ns2:consultarResponse>',"",$response);
  $response = str_replace('</soap:Body>',"",$response);
  $response = str_replace('</soap:Envelope>',"",$response);
      
  $parser = simplexml_load_string($response); //construccion del objeto   


    
  foreach($parser->entidades->entidad->filas->fila->columnas->columna as $msp){ 

    if ($msp->campo=="nombre") {

      $nombre= $array= explode(":",$msp->valor);
      $jason['nombre']=$nombre[0];

    }else if($msp->campo=="fechaNacimiento"){

      $fechaNacimiento= $array = explode(":",$msp->valor);

      $fechaNaci=explode("\/",$fechaNacimiento[0]);

      $array2=explode("/",$fechaNacimiento[0]);

      $jason['fechaNacimiento']=$array2[2]."-".$array2[1]."-".$array2[0];

    }else if($msp->campo=="lugarNacimiento"){

      $lugarNacimiento= $array= explode(":",$msp->valor);

      $jason['lugarNacimiento']=$lugarNacimiento[0];

    }else if($msp->campo=="sexo"){

      $sexo= $array= explode(":",$msp->valor);

      $jason['sexo']=$sexo[0];

    }

  }   
} 


echo json_encode($jason);

