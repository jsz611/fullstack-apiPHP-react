<?php

include 'bd/BD.php';

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['id'])) {
        $query = "select * from frameworks where id=" . $_GET['id'];
        $resultado = metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    } else {
        $query = "select * from frameworks";
        $resultado = metodoGet($query);
        echo json_encode($resultado->fetchAll());
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_POST['METHOD'] == 'POST') {
    unset($_POST['METHOD']);
    $nome = $_POST['nome'];
    $lancamento = $_POST['lancamento'];
    $desenvolvedor = $_POST['desenvolvedor'];
    $query = "insert into frameworks(nome, lancamento, desenvolvedor) values ('$nome', '$lancamento', '$desenvolvedor')";
    $queryAutoIncrement = "select MAX(id) as id from frameworks";
    $resultado = metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_POST['METHOD'] == 'PUT') {
    unset($_POST['METHOD']);
    $id = $_GET['id'];
    $nome = $_POST['nome'];
    $lancamento = $_POST['lancamento'];
    $desenvolvedor = $_POST['desenvolvedor'];
    $query = "UPDATE frameworks SET nome='$nome', lancamento='$lancamento', desenvolvedor='$desenvolvedor' WHERE id='$id'";
    $resultado = metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_POST['METHOD'] == 'DELETE') {
    unset($_POST['METHOD']);
    $id = $_GET['id'];
    $query = "DELETE FROM frameworks WHERE id='$id'";
    $resultado = metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");
