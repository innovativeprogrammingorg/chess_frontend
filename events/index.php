<!DOCTYPE html>

<html lang='en-US'>
    <head>
        <title>Events</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" type="image/x-icon" href="https://www.innovativeprogramming.org/stevenschessclub.com/resources/favicon.ico" />
        <link type="text/css" rel="stylesheet" href='https://www.innovativeprogramming.org/stevenschessclub.com/resources/chess.css' />
        <link type="text/css" rel="stylesheet" href='https://www.innovativeprogramming.org/stevenschessclub.com/resources/display.css' />
        <?php echo "<style>".file_get_contents("../resources/eventsCSS.txt")."</style>"; ?>
    </head>
    <body>
        <main class='home'>
        <script type="application/ld+json"> { 
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
            "address":"1 Castle Point Terrace, Hoboken, NJ 07030"
        }
         </script>
            <div class='top'>
            <div class='logo'>
                <img id='lTop' alt='' src='https://www.innovativeprogramming.org/stevenschessclub.com/resources/logotop.png'>
                <img id='lBot' alt='' src='https://www.innovativeprogramming.org/stevenschessclub.com/resources/logobottom.png'>
            </div>
            <nav class='chess'>
                <table> 
                    <tr class='nav'>
                        <td class='nav'><a class='nav' href='//www.stevenschessclub.com/'>Home<span class='nav'></span></a></td>
                        <td class='nav'><a class='nav' href='//www.stevenschessclub.com/about'>About<span class='nav'></span></a></td>
                        <td class='nav'><a class='nav' href='//www.stevenschessclub.com/events'>Events<span class='nav'></span></a></td>
                        <td class='nav'><a class='nav' href='https://orgsync.com/50809/chapter'>Join Us<span class='nav'></span></a></td>
                        <td class='nav'><a class='nav' href='//www.stevenschessclub.com/login'>Member's Portal<span class='nav'></span></a></td>
                    </tr>
                </table>
            </nav>
        </div>
        <?php echo file_get_contents("../resources/eventsHTML.txt");?>
        <div class='bottom'>
                <span class='copyright'>innovativeprogramming.org © 2016 | <a class='TC' href='https://www.innovativeprogramming.org/legal'>Terms & Conditions</a></span>
            </div>
        </main>
    </body>
</html>
