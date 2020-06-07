
  var app = angular.module('myApp', []);
  app.controller('MyController',['$scope', mycontroller]);

  var formul, sign, dist; //formul-apskaiciuojamas atstumas pagal formule, sign- issaugomas maziausias atstumas
  //dist- saugo atstumo reiksme kol sukasi ciklas
  var fakeDist = 10000; // saugomas tiesiog didelis atstumas, kad surasti mazesne reiksme uz ji
  var arr = []; // sukuriamas naujas masyvas, kuriame saugosime informacija su atstumu nuo tasko
  var arr1 = [];
  var b, d;
  var len;
  var x, y ,k;
  var teig = 0; // teigiama Klase
  var neig = 0; // neigiama klase
  var teig1 = 0;
  var neig1 = 0;
  var nezinoma = 0;
  var klase;
  var klase1;
  var excelJsonObj = [];
  // funkcija skirta pasirinkti excel faila ir ji nuskaityti i lentele
    function mycontroller($scope){
      $scope.uploadExcel = function(){

        var myFile = document.getElementById('file');
        var input = myFile;
        var reader = new FileReader();
        reader.onload = function(){
           var fileData = reader.result;
           var workbook = XLSX.read(fileData, {type: 'binary'});
           workbook.SheetNames.forEach(function(sheetName){
           var rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
           excelJsonObj = rowObject;
         });
          len = excelJsonObj.length; // uzfiksuojamas masyvo ilgis
         for(var i=0; i < excelJsonObj.length; i++){
           var data = excelJsonObj[i];
           $('#myTable tbody:last-child').append("<tr><td>"+data.ID+"</td><td>"+data.X1+"</td><td>"+data.X2+"</td><td>"+data.Klase+"</td></tr>");
         }
       };
       reader.readAsBinaryString(input.files[0]);
     };
    }
  //Funkcija surandanti atstuma iki artimiausiu tasku ir nustatanti klase pagal ivestus duomenis
  function Sort(){
    arr = [];
    x = document.getElementById("X1").value; // Gaunama ivesta X reikme
    y = document.getElementById("Y1").value; // Gaunama ivesta Y reikme
    k = document.getElementById("K").value; // Gaunama ivesta K reikme
  for(var i=0; i < len; i++){
    d = excelJsonObj[i]; // priskiriam masyvo eilutes objekta
    formul = Math.sqrt((Math.pow((x - d.X1), 2) +  Math.pow((y - d.X2), 2))); //formule

    arr[i] = ({ID: d.ID, X1: d.X1, X2: d.X2, Klase: d.Klase, distance: formul});
  }
  arr.sort(function(a, b){
  return a.distance - b.distance;
});
  for(var i=0; i < len; i++){
    b = arr[i];
    $('#myTableSort tbody:last-child').append("<tr><td>" + b.ID+"</td><td>" + b.X1 + "</td><td>" + b.X2+"</td><td>" + b.Klase+"</td><td>" + b.distance+"</td></tr>");
  }
  for(var i=0; i<k; i++){
    des = arr[i];
      if(des.Klase == "+"){
        teig = teig + 1;
      }
      else {
        neig = neig + 1;
      }

  }
  if(teig > neig){
    $('#newElement tbody:last-child').append("<tr><td>" + x +  "</td><td>" + y + "</td><td>" + "+" +"</td></tr>");
    klase = "+";
  }
  else if(neig > teig) {
    $('#newElement tbody:last-child').append("<tr><td>" + x +  "</td><td>" + y + "</td><td>" + "-" +"</td></tr>");
    klase = "-";
  }
  else {
  $('#newElement tbody:last-child').append("<tr><td>" + x +  "</td><td>" + y + "</td><td>" + "Nezinoma" +"</td></tr>");
  klase = "nezinoma";
}
}
  function Clean(){
  document.getElementById("X1").value = "";
  document.getElementById("Y1").value = "";
  document.getElementById("K").value = "";
  fakeDist = 10000;
  teig = 0;
  neig = 0;
  teig1 = 0;
  neig1 = 0;
  nezinoma = 0;
  $("#tbody").children().remove();
  $("#newtbody").children().remove();
  document.getElementById("sign").value = "";
}

function Add(tableID, filename = 'file'){
  var ilgis = len + 2;
  excelJsonObj[len] = ({ID: ilgis, X1: x,X2: y, Klase: klase});
  len = excelJsonObj.length;
  $("#Clean").children().remove();
  for(var i=0; i<len; i++){
    b = excelJsonObj[i];
    $('#myTable tbody:last-child').append("<tr><td>" + b.ID+"</td><td>" + b.X1 + "</td><td>" + b.X2+"</td><td>" + b.Klase + "</td></tr>");
  }
}

function Two(){
  arr = [];
  x = document.getElementById("X1").value; // Gaunama ivesta X reikme
  y = document.getElementById("Y1").value; // Gaunama ivesta Y reikme
  k = document.getElementById("K").value; // Gaunama ivesta K reikme
for(var i=0; i < len; i++){
  d = excelJsonObj[i]; // priskiriam masyvo eilutes objekta
  //Formuliu panaudojimas atstumo apskaiciavimui
  formul = Math.sqrt((Math.pow((x - d.X1), 2) +  Math.pow((y - d.X2), 2))); //formule
  formul1 = Math.abs(x-d.X1) + Math.abs(y-d.X2);

  arr[i] = ({ID: d.ID, X1: d.X1, X2: d.X2, Klase: d.Klase, distance: formul, dinstance1: formul1});
}
arr.sort(function(a, b){
return a.distance - b.distance;
});

for(var i=0; i < len; i++){
  b = arr[i];
  $('#myTableSort tbody:last-child').append("<tr><td>" + b.ID+"</td><td>" + b.X1 + "</td><td>" + b.X2+"</td><td>" + b.Klase+"</td><td>" + b.distance+ "</td><td>" + b.dinstance1+"</td></tr>");
}
for(var i=0; i<k; i++){
  des = arr[i];
    if(des.Klase == "+"){
      teig = teig + 1;
    }
    else {
      neig = neig + 1;
    }
}
s = k - 1;
l = arr[k];
d = arr[s];

if (d.dinstance == l.dinstance){
  if(l.Klase == "+"){
    teig = teig + 1;
  }
  else {
    neig = neig + 1;
  }
}
if(teig > neig){
  //$('#newElement tbody:last-child').append("<tr><td>" + x +  "</td><td>" + y + "</td><td>" + "+" +"</td></tr>");
  klase = "+";
}
else if(neig > teig) {
  //$('#newElement tbody:last-child').append("<tr><td>" + x +  "</td><td>" + y + "</td><td>" + "-" +"</td></tr>");
  klase = "-";
}
else {
//$('#newElement tbody:last-child').append("<tr><td>" + x +  "</td><td>" + y + "</td><td>" + "Nezinoma" +"</td></tr>");
klase = "nezinoma";
}

for(var i=0; i<k; i++){
  des = arr[i];
      if(des.Klase == "+"){
      teig1 = teig1 + 1;
    }else {
      neig1 = neig1 + 1;
  }
}
s = k - 1;
l = arr[k];
d = arr[s];

if (d.dinstance1 == l.dinstance1){
  if(l.Klase == "+"){
    teig1 = teig1 + 1;
  }
  else {
    neig1 = neig1 + 1;
  }
}

if(teig1 > neig1){
  //$('#newElement tbody:last-child').append("<tr><td>" + x +  "</td><td>" + y + "</td><td>" + "+" +"</td></tr>");
  klase1 = "+";
}
else if(neig1 > teig1) {
  //$('#newElement tbody:last-child').append("<tr><td>" + x +  "</td><td>" + y + "</td><td>" + "-" +"</td></tr>");
  klase1 = "-";
}
else {
//$('#newElement tbody:last-child').append("<tr><td>" + x +  "</td><td>" + y + "</td><td>" + "Nezinoma" +"</td></tr>");
klase1 = "nezinoma";
}
if(klase == klase1){
  if (klase == "+")
    {
      $('#newElement tbody:last-child').append("<tr><td>" + x +  "</td><td>" + y + "</td><td>" + "+" +"</td></tr>");
    }
    else{
      $('#newElement tbody:last-child').append("<tr><td>" + x +  "</td><td>" + y + "</td><td>" + "-" +"</td></tr>");
    }
}
else{
  $('#newElement tbody:last-child').append("<tr><td>" + x +  "</td><td>" + y + "</td><td>" + "Nezinoma" +"</td></tr>");
}
}
