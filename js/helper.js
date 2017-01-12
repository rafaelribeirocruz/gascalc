var GasHelper = GasHelper || {};

GasHelper.changeField = function (selector, value){
    document.querySelector(selector).parentNode.MaterialTextfield.change(value);
};

GasHelper.hidePanel = function (){
    var drawer = document.querySelector('.mdl-layout__drawer');
    var obfuscator = document.querySelector('.mdl-layout__obfuscator');

    if(drawer.classList)
        drawer.classList.remove('is-visible');

    if(obfuscator.classList)
        obfuscator.classList.remove('is-visible');        
};

GasHelper.showAlert = function (value) {
    document.querySelector('#toast-alert').MaterialSnackbar.showSnackbar({ message: value });
};