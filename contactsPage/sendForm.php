<?php
//проверяем, существуют ли переменные в массиве POST
if(!isset($_POST['fname']) and !isset($_POST['message'])){
} else {
 //показываем форму
 $fio = $_POST['fname'];
 $email = $_POST['message'];
 $fio = htmlspecialchars($fname);
 $email = htmlspecialchars($message);
 $fio = urldecode($fname);
 $email = urldecode($message);
 $fio = trim($fname);
 $email = trim($message);
 if (mail("susha-12@mail.ru", "Заявка с сайта", "ФИО:".$fio.". E-mail: ".$email ,"From: susha-12@mail.ru \r\n")){
 echo "Сообщение успешно отправлено";
 } else {
 echo "При отправке сообщения возникли ошибки";
 }
}
?>