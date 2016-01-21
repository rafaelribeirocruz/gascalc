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
               
    if(!price.valid)
        result.innerText = "Erro no preço!";
    else if(!spend.valid) {    
        var errMsg = "* Calculo usando a proporcão padrao de 70%";
        if( price.etanol < (price.gas * 0.7) ){
            result.innerText = "ETANOL!" + errMsg;
        } else {
            result.innerText = "GASOLINA!" + errMsg;
        } 
    } else {
        if(price.valid && spend.valid){
            var gasTotal = Gas.calculateTotal(100, spend.gas, price.gas);
            var etanolTotal = Gas.calculateTotal(100, spend.etanol, price.etanol);
    
            if(gasTotal === etanolTotal) 
                result.innerText = "TANTO FAZ";
            else if(gasTotal < etanolTotal)
                result.innerText = "GASOLINA";
            else
                result.innerText = "ETANOL";      
        } 
    }
}
            
Gas.saveState = function () {
  // TODO Save current state in local storage
}
            
Gas.loadState = function () {
  // TODO Load current state from local storage
}
            
var calculate = document.getElementById('calculate');
            
calculate.addEventListener('click', function (){
    Gas.calculate();   
});