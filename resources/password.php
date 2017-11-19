<?php
require_once "sql.php";


class Password{
	public static function gen($length){
    	return exec("../lib/gen ".$length);
	}

	public static function hash($pass,$salt){
		if(!$pass || !$salt){
			throw new InvalidArgumentException("Password And Salt cannot be NULL");
			return NULL;
		}
		return exec("../lib/pbkdf2/main ".$pass." ".$salt." 3000");
	}

	public static  function getNewSalt(){
		return self::gen(1024);
	}
}

class PasswordVerify{
	private $password;
	private $hash;
	private $salt;

	public function __construct($pass,$aHash,$aSalt){
		$this->password = $pass;
		$this->hash = $aHash;
		$this->salt = $aSalt;
	}

	public function __destruct(){
		unset($this->password,$this->hash,$this->salt);
	}

	public function verifyNew(){
		try{
			return Password::hash($this->password,$this->salt) == $this->hash;
		}catch(InvalidArgumentException $e){
			return false;
		}
	}

	public static function quickVerify($p,$h,$s){
		try{
			return Password::hash($p,$s) == $h;
		}catch(InvalidArgumentException $e){
			return false;
		}	
	}
	
	public static function verify($u,$p){
		$conn = SQLConn::getConn();
		$stmt = $conn->prepare("SELECT * FROM users WHERE Username = ?");
        $stmt->bind_param('s',$u);
        $data = SQLConn::getResult($stmt);
        
        $stmt->close();
        $conn->close();
        try{
			$identification = new PasswordVerify($p,$data['Password'],$data['Salt']);

		    if(!$identification->verifyNew()){
		       return NULL;
		    }
		}catch(InvalidArgumentException $e){
			return NULL;
		}
	    return $data;
	}
}

?>