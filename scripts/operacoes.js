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

        let numPreparados = [];
        
        if(expressao != "" ){

            if(expressao.indexOf("+") == -1 && expressao.indexOf("-") == -1 && expressao.indexOf("*") == -1 && expressao.indexOf("/") == -1){
                console.log("Não tem nada para calcular!");
                exibicao.innerHTML = "";
                return;

            }

            while(expressao.indexOf(",") != -1){
                expressao = expressao.replace(",", ".");
            }

            console.log("Expressão depois de substituir a , por . : ", expressao);

            let arrayExp = expressao.split("");
            console.log(arrayExp);

           
            let num = ""; // Armazena temporariamente os números
        
            // Processa a string para separar números e operadores

            arrayExp.forEach(function (digito) {

                if (!isNaN(digito) || digito === '.') { // Se é número ou ponto decimal
                    num += digito; // Concatena no número atual
                } else { // Se é operador
                    if (num !== '') {
                        numPreparados.push(parseFloat(num)); // Adiciona o número completo
                        num = ''; // Reinicia o número
                    }
                    numPreparados.push(digito); // Adiciona o operador
                }
            });
        
            if (num !== '') {
                numPreparados.push(parseFloat(num)); // Adiciona o último número, se houver
            }

            
            console.log(numPreparados);
            
            let result = somaArrayExp(numPreparados);
           
            resultado.innerHTML = result;
        }

        
    });
}

function somaArrayExp(arrayExp){
    let result;


    while(arrayExp.length != 1){
        let posicao;

        while(arrayExp.indexOf("*") != -1){
            posicao = arrayExp.indexOf("*");

            result = arrayExp[posicao -1] * arrayExp[posicao +1];
            arrayExp = refazArrayExp(arrayExp, posicao, result);
            console.log(arrayExp);
        }


        while(arrayExp.indexOf("/") != -1){
            posicao = arrayExp.indexOf("/");

            result = arrayExp[posicao -1] / arrayExp[posicao +1];
            arrayExp = refazArrayExp(arrayExp, posicao, result);
            console.log(arrayExp);
        }

        while(arrayExp.indexOf("+") != -1){
            console.log("entrei no loop +")
            posicao = arrayExp.indexOf("+");

            result = arrayExp[posicao -1] + arrayExp[posicao +1];
            arrayExp = refazArrayExp(arrayExp, posicao, result);
            console.log(arrayExp);
        }

        while(arrayExp.indexOf("-") != -1){
            posicao = arrayExp.indexOf("-");

            result = arrayExp[posicao -1] - arrayExp[posicao +1];
            arrayExp = refazArrayExp(arrayExp, posicao, result);
            console.log(arrayExp);
        }

    }

    return Math.round(arrayExp[0]);
}

function refazArrayExp(arrayExp, indiceOp, valor){
    console.log("Entrei no método de cálculo!");

    let newArray =[];

    let indiceInicio = indiceOp -1;
    let indiceFim = indiceOp +1;

    for(let i = 0; i < arrayExp.length; i++){
        console.log("Entrei no for do método de cálculo!");
        console.log("Array utilizado: ", newArray)
        console.log("Valor de i = ", i);

        if(i == indiceInicio){
            console.log("i == indiceInicio : ", i);
            newArray.push(valor);
        }

        if(i == indiceInicio || i == indiceOp || i == indiceFim){
            console.log("Entrei no if: ", i);
            continue;
        }

        console.log("Adicionei elemento ao array");
        newArray.push(arrayExp[i]);  
        console.log("Valor do elemento: ", arrayExp[i],"\n\n\n\n\n\n\n\n\n")
    }

    return newArray;
    
}
//arrayExp[i] == "+" || arrayExp[i] == "-" || arrayExp[i] == "*" || arrayExp[i] == "/"
