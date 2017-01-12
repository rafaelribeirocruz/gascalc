var calculate = document.getElementById('calculate');
            
calculate.addEventListener('click', function (){
    Gas.calculate();   
});

var save = document.getElementById('saveData');

save.addEventListener('click', function () {
    Gas.saveState(Gas.serializeFields());
});

window.onload = function () {
    Gas.loadCarList();
}

document.getElementById('deleteData').addEventListener('click', function (){
    Gas.deleteLoadedCar();
});