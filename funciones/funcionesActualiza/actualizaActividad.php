<?php

	extract($_POST);

	session_start();   
	session_unset();  
	session_destroy();

