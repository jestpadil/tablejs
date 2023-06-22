<html>
<head>
    <meta name="author" content="Jen Estrada-Padil"/>
    <meta name="description" content="Drag and drop content of CSE"/>
    <meta name="viewport" content="width=device-width, user-scalable=no"/>
    <link rel="stylesheet" href="./css/bootstrap5.min.css" type="text/css" media="screen" />
    <!--  <link rel="stylesheet" href="./redips/style.css" type="text/css" media="screen" /> -->
    <script type="text/javascript" src="./redips/header.js"></script>
    <script type="text/javascript" src="./redips/redips-drag-min.js"></script>
    <script type="text/javascript" src="./js/script.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/themes/base/jquery-ui.css"/>
		
    <title>CSE-Seat Arrangement</title>
</head>
<body>
<?php
// Read the JSON file
$json = file_get_contents('applicants.json');
// Decode the JSON file
$json_data = json_decode($json,true);
$row_color = array("success","danger","warning","info","primary");
$row_color2 = array("danger","warning","primary","success","info");
?>
<br>
<div class="container-fluid">
    <div class="row" id="redips-drag">
        <div class="col-sm-6">
            <table class="table">
                <tbody>
                    <tr class="lgrey">
                <?php
                    $i = 0;
                    foreach($json_data as $jj){
                    $jid = $jj['sid']."_".$jj['rid']."_".$jj['fid']."_".$jj['snum'];
                    $rccolor2 = $row_color2[$i];

                    if ($i == 0){
                        echo "<tr>";
                    }
                
                    $i++;
                    echo '<td class="table-'.$rccolor2.'"><div id="'.$jid.'" class="redips-drag p-1 bg-primary text-white">'.$jj['lastname'].'</td>';
            
                    if($i == 5){
                        $i = 0;
                        echo "</tr>";
                    }
                    }
                ?>
                </tbody>
            </table>
        </div>
        <div class="col-sm-6">
            <table class="table">
				<colgroup><col width="100"/><col width="100"/><col width="100"/><col width="100"/><col width="100"/></colgroup>
                <tbody>
                    <tr class="">
                <?php
                    $i = 0;
                    foreach($json_data as $jj){
                    $jid = $jj['sid']."_".$jj['rid']."_".$jj['fid']."_".$jj['snum']."_2";
                    $rccolor = $row_color[$i];
                    
                    if ($i == 0){
                        echo "<tr>";
                    }
                
                    $i++;
                    echo '<td class="table-'.$rccolor.'"><div id="'.$jid.'" class="redips-drag t2 p-1 bg-warning text-dark">'.$jj['lastname'].'</td>';
            
                    if($i == 5){
                        $i = 0;
                        echo "</tr>";
                    }
                    }
                ?>
                </tbody>
            </table>
        </div>
        <div class="col-sm-6">
			<table class="table table-primary">
				<tr class="lgrey">
					<td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
				</tr>
			</table>
        </div>
        <div class="col-sm-6">
			<table class="table table-warning">
				<tr class="lgrey">
					<td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
				</tr>
			</table>
        </div> 
    </div> <!-- div row --> 
</div> <!-- div container -->
<div id="dialog" title="jQuery dialog">Please choose action!</div>
<div id="message" class="redips-mark" title="You can not drop here"></div>
</body>
</html>