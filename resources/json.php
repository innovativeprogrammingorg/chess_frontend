<?php

class JSON{
	public static function getInfo(){
		return "<script type="application/ld+json"> { 
            "@context" : "http://schema.org/",
            "@type" : "Organization", 
            "url":"https://www.innovativeprogramming.org/",
            "email":"services@innovativeprogramming.org",
            "sponsor":{
                "@type":"EducationalOrganization",
                "name":"Steven's Institute of Technology",
                "address":"1 Castle Point Terrace, Hoboken, NJ 07030"
            }
            "member":{
                "@type":"Person",
                "name":"Nathaniel Blakely",
                "jobTitle":"Social Chair",
                "url":"https://www.innovativeprogramming.org"
            }
            "location":"Steven's Institute Of Technology",
            "address":"1 Castle Point Terrace, Hoboken, NJ 07030",
            "founder":{
                "@type":"Person",
                "name":"Mark Mirtchouk",
                "jobTitle":"President"
            }
        }
         </script>";
	}
}



?>