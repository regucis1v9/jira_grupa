<?php

class Database {

    protected $host;
    protected $user;
    protected $pass;
    protected $dbname;
    protected $conn;

    function __construct(){
        $this->host = "localhost";
        $this->user = "root";
        $this->pass = "";
        $this->dbname = "pupsiks";
        $this->conn = new mysqli($this->host, $this->user, $this->pass, $this->dbname);
    }
    public function select($query) {
        $db = $this->conn;
        $kko = $db->query($query);
        $result=$kko->fetch_all(MYSQLI_ASSOC);
        return $result;
    }


}



?>