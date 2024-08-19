const main = {
    tela: document.getElementById('tela'),

    numero: [
        document.getElementById('num0'),
        document.getElementById('num1'),
        document.getElementById('num2'),
        document.getElementById('num3'),
        document.getElementById('num4'),
        document.getElementById('num5'),
        document.getElementById('num6'),
        document.getElementById('num7'),
        document.getElementById('num8'),
        document.getElementById('num9'),
    ],

    operadores: {
        clear: document.getElementById('clear'),
        apagarCaractere: document.getElementById('apagarCaractere'),
        porcentagem: document.getElementById('porcentagem'),
        soma: document.getElementById('soma'),
        subtracao: document.getElementById('subtracao'),
        multiplicacao: document.getElementById('multiplicacao'),
        divisao: document.getElementById('divisao'),
        virgula: document.getElementById('virgula'),
        igual: document.getElementById('igual'),
    }
}

const guardarBotoesClicados = []

//Adicionando listeners em todos os botões de números
for (let pos in main.numero) {
    main.numero[pos].addEventListener('click',() => funcaoGeral(pos))
}

//Adicionando listeners nos botões de operação
main.operadores.soma.addEventListener('click',() => funcaoGeral('+'))
main.operadores.subtracao.addEventListener('click',() => funcaoGeral('-'))
main.operadores.divisao.addEventListener('click',() => funcaoGeral('/'))
main.operadores.multiplicacao.addEventListener('click',() => funcaoGeral('x'))
main.operadores.porcentagem.addEventListener('click',() => funcaoGeral('%'))
main.operadores.virgula.addEventListener('click',() => funcaoGeral(','))
main.operadores.igual.addEventListener('click',() => funcaoGeral('='))
main.operadores.clear.addEventListener('click',() => funcaoGeral('clear'))
main.operadores.apagarCaractere.addEventListener('click',() => funcaoGeral('apagarCaractere'))

function identificarExpressão(botoesClicados) {
    let expressãoEmString = ''
    
    for (let pos in botoesClicados) {
        if (botoesClicados[pos] == 'x') {
            botoesClicados[pos] = '*'
        } else if (botoesClicados[pos] == ',') {
            botoesClicados[pos] = '.'
        } else if (botoesClicados[pos] == '%') {
            botoesClicados[pos] = '/100*'
        } else if (verificarTipo(botoesClicados[pos]) == 'numero') {
            botoesClicados[pos] = String(botoesClicados[pos])
        }
         

        expressãoEmString += botoesClicados[pos]
    }

    return (expressãoEmString)

}




function verificarTipo(valor) { 
//identifica se o parâmetro se refere a um número ou a um operador

    if (isNaN(Number(valor))) { 
        return 'operador'
    } else {
        return 'numero'
    }

}

function exibirNaTela(botoesClicados) {
    //Função para exibir os números e operadores na tela
    main.tela.innerHTML = null
    for (let pos in botoesClicados) {
        main.tela.innerHTML += botoesClicados[pos]
    }

}


function funcaoGeral(valor) {
    // Considerar como primeiro botão clicado o número 0 caso haja o clique de um operador sem o clique de um número anteriormente
    if (guardarBotoesClicados.length == 0 && verificarTipo(valor) == 'operador') {
        guardarBotoesClicados.push(0)
        guardarBotoesClicados.push(valor)
    } else {
        //Diferenciando o tipo primitivo do 'valor' a depender se 'valor' se refere a um número(number) ou a um operador(string)
        if (verificarTipo(valor) == 'numero') {
            guardarBotoesClicados.push(Number(valor))    
        } else {
            guardarBotoesClicados.push(valor)
        }
    }
    
    //Apagar tudo
    if (guardarBotoesClicados[guardarBotoesClicados.length-1] == 'clear') {
        guardarBotoesClicados.splice(0)
        main.tela.innerHTML = 0
        return
    }

    //Apagar último caractere
    if (guardarBotoesClicados[guardarBotoesClicados.length-1] == 'apagarCaractere') {
        //Remove o último(apagarCaractere) e o penúltimo valor do array
        guardarBotoesClicados.splice(guardarBotoesClicados.length-2)

        //Evitar bug de o 0 aparecer como algarismo inicial após o uso do 'apagarCaractere'
        if (guardarBotoesClicados.length == 1 && guardarBotoesClicados[0] == 0) {
            guardarBotoesClicados.splice(0)
            main.tela.innerHTML = 0
            return
        }
    } 


    //Condicional para impedir que um operador apareça mais de uma vez seguida na tela (++,---,// e etc.)
    if (verificarTipo(guardarBotoesClicados[guardarBotoesClicados.length-1]) == 'operador' && verificarTipo(guardarBotoesClicados[guardarBotoesClicados.length-2]) == 'operador') {
        guardarBotoesClicados.splice(guardarBotoesClicados.length-1,1) //impede que a expressão seja guardada com dois operadores seguidos
        window.alert('formato inválido')       
    } else {
        exibirNaTela(guardarBotoesClicados) 
    }

    if (guardarBotoesClicados[guardarBotoesClicados.length-1] == '=') {
        guardarBotoesClicados.splice(guardarBotoesClicados.length-1)
        
        let expressão = identificarExpressão(guardarBotoesClicados)

        main.tela.innerHTML = parseFloat(eval(expressão).toFixed(10))

        guardarBotoesClicados.splice(0)
    } 

    

}





