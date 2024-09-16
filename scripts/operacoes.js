exibeExpressao();


function exibeExpressao(){
    numDigito();
    delBtn();
    operacaoDigito();
    trataVirgula();
    melhoraExibicao();
}

function numDigito(){
    const divNumDigitos = document.getElementById("numeros");

    const numBtns = divNumDigitos.children;

    const exibicao = document.getElementById("expressao");

    //Botões numéricos configurados
    for(let i = 1; i < numBtns.length -1; i ++){
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

//Ainda preciso garantir que uma vírgula não seja adicionada antes de um operador

function trataVirgula(){
    const exibicao = document.getElementById("expressao");
    const virgulaBtn = document.getElementById("virgula");

    virgulaBtn.addEventListener("click", function(){
        let ultimoDigito = exibicao.innerHTML[exibicao.innerHTML.length -1];

        if(exibicao.innerHTML == ""){
            return;
        } else if(ultimoDigito == ","){
            return;
        }

        //Depois de uma vírgula não tem nenhum caracter

        //tenho que descobrir qual é o último operador caso exista
        const operadores = ["+", "-", "*", "/"];

        let expressao = exibicao.innerHTML;
        let ultimoOp;

        for(let i = expressao.length -1; i >= 0; i--){
         
            //Vou tentar converter para número
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

        exibicao.innerHTML += ","; 
    });
}

function melhoraExibicao(){

}