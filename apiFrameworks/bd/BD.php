<?php
$pdo = null;
$host = "localhost";
$user = "josiel";
$password = "3542";
$bd = "tutoriais";

function conectar(){
    try{
        $GLOBALS['pdo'] = new PDO("mysql:host=".$GLOBALS['host'].";dbname=".$GLOBALS['bd']."", $GLOBALS['user'], $GLOBALS['password']);
        $GLOBALS['pdo']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e){
        print "Erro!: Não foi possível conectar ao banco de dados ".$GLOBALS['bd']."<br/>";
        print "\nErro!: ".$e."<br/>";
        die();
    }
}



function desconectar() {
    $GLOBALS['pdo'] = null;
}

function metodoGet($query){
    try{
        conectar();
        $sentenca = $GLOBALS['pdo']->prepare($query);
        $sentenca->setFetchMode(PDO::FETCH_ASSOC);
        $sentenca->execute();
        desconectar();
        return $sentenca;
    } catch(Exception $e){
        die("Erro: ".$e);
    }
}

function metodoPost($query, $queryAutoIncrement){
    try{
        conectar();
        $sentenca = $GLOBALS['pdo']->prepare($query);
        $sentenca->execute();
        $idAutoIncrement = metodoGet($queryAutoIncrement)->fetch(PDO::FETCH_ASSOC);
        $resultado = array_merge($idAutoIncrement, $_POST);
        $sentenca->closeCursor();
        desconectar();
        return $resultado;
    } catch(Exception $e){
        die("Erro: ".$e);
    }
}

function metodoPut($query){
    try{
        conectar();
        $sentenca = $GLOBALS['pdo']->prepare($query);
        $sentenca->execute();
        $resultado = array_merge($_GET, $_POST);
        $sentenca->closeCursor();
        desconectar();
        return $resultado;
    } catch(Exception $e){
        die("Erro: ".$e);
    }
}

function metodoDelete($query){
    try{
        conectar();
        $sentenca = $GLOBALS['pdo']->prepare($query);
        $sentenca->execute();
        $sentenca->closeCursor();
        desconectar();
        return $_GET['id'];
    } catch(Exception $e){
        die("Erro: ".$e);
    }
}
