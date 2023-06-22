
<!DOCTYPE html>

<html>

<head>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js"></script>

    <script src="http://cdn.jsdelivr.net/g/jquery@1,jquery.ui@1.10%28jquery.ui.core.min.js+jquery.ui.widget.min.js+jquery.ui.mouse.min.js+jquery.ui.sortable.min.js%29,angularjs@1.2,angular.ui-sortable"></script>

</head>

<body>
<script type="text/javascript">
// read local JSON file in javascript

// var appie = fetch("./applicants.json")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

// console.log(appie);
    var myApp = angular.module("myApp", ['ui.sortable']);        
    myApp.controller("mainController", function($scope) {
    //  $scope.items = ["fjdklsjfk","Jdjfkld","Djfd"];
    $sitems = [];
    $.getJSON('./applicants.json', function(jd) {
        $.each(jd,function(id,key){
            $sitems[0].push(key.lastname);
        });
    });
    console.log(typeof $sitems);
    console.log($sitems);
     $scope.items = JSON.stringify($sitems);
     console.log(typeof $scope.items);
     $scope.sortableOptions = {
        update: function(e, ui) { 
            console.log(e);
        },
        axis: 'x'
      };
    });
</script>

<div >

    <div ng-app="myApp" ng-controller="mainController" data-ng-init="init()">
        <table >
            <tr>
               <th>Website List</th>
            </tr>
            <tbody ui-sortable ng-model="items">
            <tr ng-repeat="item in items">
                <td>{{ item }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
</body>
<?php
 // Read the JSON file
 $json = file_get_contents('applicants.json');
 
 // Decode the JSON file
 $json_data = json_decode($json,true);

echo "<table border='1'><thead>1-1</thead><tbody>";
$i = 0;
 foreach($json_data as $jj){
    if ($i == 0){
        echo "<tr>";
    }

    $i++;
  //  echo "<td class='1-1'>".$jj['lastname']."</td>";

    if($i == 5){
        $i = 0;
        echo "</tr>";
    }
 }
echo "</tbody></table>";
?>
</html>