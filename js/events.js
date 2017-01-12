var calculate = document.getElementById('calculate');
            
calculate.addEventListener('click', function (){
    Gas.calculate();   
});

var save = document.getElementById('saveData');

save.addEventListener('click', function () {
    Gas.saveState(Gas.serializeFields());
});

var load = document.getElementById('loadData');

load.addEventListener('click', function(){
    Gas.loadState();
});

window.onload = function () {
    Gas.loadCarList();
}

document.getElementById('deleteData').addEventListener('click', function (){
    Gas.deleteLoadedCar();
});