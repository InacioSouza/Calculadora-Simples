window.onload = function exibeExpressao(){
    numDigito();
    delBtn();
    operacaoDigito();
    reset();
    trataVirgula();
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

    reset.addEventListener("click", function(){
        exibicao.innerHTML = "";
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
