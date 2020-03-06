<?php

include "libmail.php";



	$m = new Mail();
	//$m->smtp_on('',)
	$m->From( "email@gmail.com" ); // от кого письмо
	$m->To("email@gmail.com");   // кому письмо
	//$m->To("im04@il.i");

	if(isset($_POST['contact'])) {
		$m->Subject('Контакт');
        $body = '<p><b>Имя:</b> '.$_POST['name'].'</p>'
            .'<p><b>Телефон:</b> '.$_POST['phone'].'</p>'
            .'<p><b>Город:</b> '.$_POST['city'].'</p>';
            //.'<p><b>Сообщение:</b> '.$_POST['message'].'</p>';
        echo "thanks";
	}


    if(isset($_POST['question'])) {
        $m->Subject('Вопрос');
        $body = '<p><b>Имя:</b> '.$_POST['name'].'</p>'
            //.'<p><b>Телефон:</b> '.$_POST['phone'].'</p>'
            .'<p><b>Email:</b> '.$_POST['email'].'</p>'
            .'<p><b>Сообщение:</b> '.$_POST['message'].'</p>';
        echo "thanks";
    }

if(isset($_POST['order'])) {
    $m->Subject('Заявка');
    $body = '<p><b>Имя:</b> '.$_POST['name'].'</p>'
        //.'<p><b>Телефон:</b> '.$_POST['phone'].'</p>'
        .'<p><b>Email:</b> '.$_POST['email'].'</p>'
        .'<p><b>Сообщение:</b> '.$_POST['message'].'</p>';
    echo "thanks";
}

    if(isset($_POST['content'])) {
        $m->Subject('Вопрос');
        $body = '<p><b>Имя:</b> '.$_POST['name'].'</p>'
            .'<p><b>Телефон:</b> '.$_POST['phone'].'</p>'
            .'<p><b>Email:</b> '.$_POST['email'].'</p>'
            .'<p><b>Сообщение:</b> '.$_POST['message'].'</p>';
        echo "thanks";
    }



	$m->Body($body, 'html');
	$m->Send();
?>
