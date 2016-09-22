var Gas = Gas || {};

Gas.validatePrices = function () {
    var gasPrice = parseFloat(document.getElementById('gasPrice').value);
    var etanolPrice = parseFloat(document.getElementById('etanolPrice').value);
    
    return {
        gas: gasPrice,
        etanol: etanolPrice,
        valid: (!(isNaN(gasPrice)||isNaN(etanolPrice)))
    };
}
            
Gas.validateConsumption = function () {
    var gas = parseFloat(document.getElementById('gasSpend').value);
    var etanol = parseFloat(document.getElementById('etanolSpend').value);
              
    return {
        gas: gas,
        etanol: etanol,
        valid: (!(isNaN(gas)||isNaN(etanol)))
    };
}
            
Gas.calculateTotal = function (distance, spend, cost){
    return (distance / spend) * cost;
}
            
Gas.calculate = function () {
    var result = document.getElementById('result');
    var price = Gas.validatePrices();
    var spend = Gas.validateConsumption();
    var message = "";
               
    if(!price.valid)
        message = "Erro no preço!";
    else if(!spend.valid) {    
        var errMsg = "* Calculo usando a proporcão padrao de 70%";
        if( price.etanol < (price.gas * 0.7) ){
            message = "ETANOL!" + errMsg;
        } else {
            message = "GASOLINA!" + errMsg;
        } 
    } else {
        if(price.valid && spend.valid){
            var gasTotal = Gas.calculateTotal(100, spend.gas, price.gas);
            var etanolTotal = Gas.calculateTotal(100, spend.etanol, price.etanol);
    
            if(gasTotal === etanolTotal) 
                message = "TANTO FAZ";
            else if(gasTotal < etanolTotal)
                message = "GASOLINA";
            else
                message = "ETANOL";      
        } 
    }
    
    result.style.visibility = 'visible';
    result.querySelector('span').innerText = message;
}
            
Gas.saveState = function (data) {
    Gas.currentCar = data.carName;
    window.localStorage.setItem(Gas.currentCar, JSON.stringify(data));
    Gas.updateList(Gas.currentCar);
    Gas.loadCarList();
}
            
Gas.loadState = function () {
    var loaded = JSON.parse(window.localStorage.getItem(Gas.currentCar));

    if(loaded !== undefined){
        var myCar = document.getElementById('myCar');        
        myCar.value = loaded.carName;

        try {
            myCar.change();    
        } catch (error) {
            //do nothing for now
        }
        
        var myTank = document.getElementById('myTank');
        myTank.click();
        myTank.value = loaded.tankCapacity;

        document.getElementById('etanolPrice').value = loaded.etanolPrice;
        document.getElementById('gasPrice').value = loaded.gasPrice;
        document.getElementById('etanolSpend').value = loaded.etanolSpend;
        document.getElementById('gasSpend').value = loaded.gasSpend;
    }    
}

Gas.carListName = function () {
    return "gascalc-carlist";
}

Gas.updateList = function (carName){
    if(carName !== undefined && carName.length > 0){
        var carList = JSON.parse(window.localStorage.getItem(Gas.carListName()));

        if (carList === undefined || carList === null){
            carList = [];
        }

        carList.push(carName);

        if (carName !== Gas.carListName()){
            window.localStorage.setItem(Gas.carListName(), JSON.stringify(carList));
        }
    }
}

Gas.loadCarList = function (){
    var carList = JSON.parse(window.localStorage.getItem(Gas.carListName()));
    var items = '';

    if(carList !== null && carList.length > 0){
        carList.forEach(function(element) {
            items += '<a class=\'mdl-navigation__link\' onclick=\'Gas.loadCar("' + element + '")\' >' + element + '</a>';
        }, this);

        document.getElementById('listOfCars').innerHTML = items;
    }
}

Gas.loadCar = function (carName){
    Gas.currentCar = carName;
    Gas.loadState();
}

Gas.serializeFields = function () {
    return {
        carName : document.getElementById('myCar').value,
        tankCapacity : document.getElementById('myTank').value,
        etanolPrice : document.getElementById('etanolPrice').value,
        gasPrice : document.getElementById('gasPrice').value,
        etanolSpend : document.getElementById('etanolSpend').value,
        gasSpend : document.getElementById('gasSpend').value 
    };
}
            
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