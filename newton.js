function runNewton() {
    let output = document.getElementById('newtonOutput'); // Busca o elemento de saída na página HTML onde os resultados serão exibidos
    output.textContent = ''; // Limpa a saída anterior (evitar sobreposição de resultados)
    let valores = [];
    let resultado;
    let contador = 0;

    function seno(valor){
        return Math.sin(valor);
    }

    function cos(valor){
        return Math.cos(valor);
    }

    function exp(valor){
        return Math.exp(valor);
    }

    function funcao(t){
        return 9 * exp(-t) * seno(2 * Math.PI * t) - 3.5;
    }

    function derivadaFuncao(t){
        return -9 * exp(-t) * seno(2 * Math.PI * t) + 18 * Math.PI * exp(-t) * cos(2 * Math.PI * t);
    }

    function calculaNewton(t0){
        let x = t0;

        for(let i = 0; i < 30; i++){ // For vai até 30 para evitar loop infinito
            valores[i] = x; // Armazena o valor atual de t
            output.textContent += "t" + i + " = " + x + "\n";
            
            let funcaoValor = funcao(x); // Calcula função
            let derivadaValor = derivadaFuncao(x); // Calcula derivada

            output.textContent += "f(t" + i + ") = " + funcaoValor + "\n"; // Saída do valor da função
            output.textContent += "f'(t" + i + ") = " + derivadaValor + "\n"; // Saída do valor da derivada

            resultado = x - (funcaoValor / derivadaValor); // Aplicação da fórmula

            let erroRelativo = Math.abs((resultado - x) / resultado); // Erro relativo
            output.textContent += "Erro relativo: " + erroRelativo + "\n"; // Saída do erro relativo
            output.textContent += "Numero de iterações = " + contador++ + "\n\n";
            
            if(erroRelativo < 1e-6){ // Condição de parada
                output.textContent += "Valor de t encontrado: t" + (i+1) + " = " + resultado + "\n";
                break;
            }

            x = resultado;
        }
    }

    calculaNewton(0); // Chamada da função com a aproximação inicial
}
