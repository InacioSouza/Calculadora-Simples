window.onload = function exibeExpressao(){
    numDigito();
    delBtn();
    operacaoDigito();
    reset();
    trataVirgula();
    realizaOperacao();
}



function numDigito(){
    const divNumDigitos = document.getElementById("numeros");

    const numBtns = divNumDigitos.children;

    const exibicao = document.getElementById("expressao");

    //Botões numéricos configurados
    for(let i = 1; i < numBtns.length -2; i ++){
        numBtns[i].addEventListener("click", function(){
            exibicao.innerHTML += numBtns[i].innerHTML;
        });
    }
}


function delBtn(){
    const del = document.getElementById("del-digito");
    const exibicao = document.getElementById("expressao");
    
    del.addEventListener("click", function() {
        let newText = exibicao.innerHTML.slice(0, -1);
        exibicao.innerHTML = newText;
    });
}

function operacaoDigito(){
    const operacao = document.getElementsByClassName("ops");
    const exibicao = document.getElementById("expressao");

    for(let i = 0; i < operacao.length; i++){
        operacao[i].addEventListener("click", function(){

            //Verifica se último digito é um operador ou vŕgula
            let ultimoDigito = exibicao.innerHTML[exibicao.innerHTML.length -1];
            if( ultimoDigito == "+" || ultimoDigito == "-" || ultimoDigito == "*" || ultimoDigito == "/" || ultimoDigito == ","){
                return;
            }

            //Adicionará operador a visualização caso o último digito já não seja um operador 
            if(exibicao.innerHTML != ""){
                exibicao.innerHTML += this.innerHTML;
            }  
        });
    }
}


function reset(){
    const reset = document.getElementById("reset");
    const exibicao = document.getElementById("expressao");
    const resultado = document.getElementById("resultado");

    reset.addEventListener("click", function(){
        exibicao.innerHTML = "";
        resultado.innerHTML = "";
    })
}


function trataVirgula(){
    const virgulaBtn = document.getElementById("virgula");
    const exibicao = document.getElementById("expressao");

    virgulaBtn.addEventListener("click", function(){
        let expressao = exibicao.innerHTML;
        const ultimoDigito = expressao[expressao.length -1];

        if(expressao == ""){
            return;
        }else if(ultimoDigito == "," || ultimoDigito == "+" || ultimoDigito == "-" || ultimoDigito == "*" || ultimoDigito == "/"){
            return;
        }
    
        //Não deixa que um número tenha mais de uma vírgula
        let ultimoOp = "";
    
        for(let i = expressao.length -1; i >= 0; i--){
            console.log("entrei no primeiro for")
            if(isNaN(parseInt(expressao[i]))){
    
                if(expressao[i] != ","){
                    ultimoOp = i;
                    break;
                }
            }
        }
    
        for(let i = ultimoOp +1; i < expressao.length; i++){
            if(expressao[i] == ","){
                return;
            }
        }
       
        exibicao.innerHTML += virgulaBtn.innerHTML; 
    });
}


function realizaOperacao(){
    const exibicao = document.getElementById("expressao");
    const igual = document.getElementById("igual");
    const resultado = document.getElementById("resultado");

    igual.addEventListener("click", function(){
        let expressao = exibicao.innerHTML;

        
        
        if(expressao != "" ){

            if(expressao.indexOf("+") == -1 && expressao.indexOf("-") == -1 && expressao.indexOf("*") == -1 && expressao.indexOf("/") == -1){
                console.log("Não tem nada para calcular!");
                exibicao.innerHTML = "";
                return;
            }

            //Passa resultado para a saída da calculadora
            
            console.log(preparaArrayExp(expressao));

            let result = somaArrayExp(preparaArrayExp(expressao));
           
            resultado.innerHTML = result;
        }
    });
}

function preparaArrayExp(expressao){

    //substitui as ',' por '.'
    while(expressao.indexOf(",") != -1){
        expressao = expressao.replace(",", ".");
    }

    //Prepara Array da expressão para que os cálculos possam ser realizados
    
    let numPreparados = [];

    let arrayExp = expressao.split("");
  
    let num = ""; 

    arrayExp.forEach(function (digito) {

        if (!isNaN(digito) || digito === '.') { 
            num += digito; 
        } else { 
            if (num !== '') {
                numPreparados.push(parseFloat(num));
                num = ''; 
            }
            numPreparados.push(digito); 
        }
    });

    if (num !== '') {
        numPreparados.push(parseFloat(num)); 
    }
    return numPreparados;
}


function somaArrayExp(arrayExp){
    let result;

    while(arrayExp.length != 1){
        let posicao;

        while(arrayExp.indexOf("*") != -1){
            posicao = arrayExp.indexOf("*");

            result = arrayExp[posicao -1] * arrayExp[posicao +1];
            arrayExp = refazArrayExp(arrayExp, posicao, result);
        }

        while(arrayExp.indexOf("/") != -1){
            posicao = arrayExp.indexOf("/");

            if(arrayExp[posicao +1] == 0){
                return "Divisão por zero";
            }

            result = arrayExp[posicao -1] / arrayExp[posicao +1];
            arrayExp = refazArrayExp(arrayExp, posicao, result); 
        }
        
        while(arrayExp.indexOf("-") != -1){
            posicao = arrayExp.indexOf("-");

            result = arrayExp[posicao -1] - arrayExp[posicao +1];
            arrayExp = refazArrayExp(arrayExp, posicao, result);
        }

        while(arrayExp.indexOf("+") != -1){
            console.log("entrei no loop +")
            posicao = arrayExp.indexOf("+");

            result = arrayExp[posicao -1] + arrayExp[posicao +1];
            arrayExp = refazArrayExp(arrayExp, posicao, result);
        }

    }

    return arrayExp[0]
}


function refazArrayExp(arrayExp, indiceOp, valor){
     let newArray =[];

    let indiceInicio = indiceOp -1;
    let indiceFim = indiceOp +1;

    for(let i = 0; i < arrayExp.length; i++){

        if(i == indiceInicio){
            newArray.push(valor);
        }

        if(i == indiceInicio || i == indiceOp || i == indiceFim){
            continue;
        }

        newArray.push(arrayExp[i]);  
    }

    return newArray;
    
}
