function runSecante() {
    let output = document.getElementById('secanteOutput'); // Referência ao elemento HTML
    output.textContent = ''; // Limpa a saída anterior
    let valores = [];
    let resultado;
    let contador = 0;

    function seno(valor){
        return Math.sin(valor);
    }

    function exp(valor){
        return Math.exp(valor);
    }

    function funcao(t){
        return 9 * exp(-t) * seno(2 * Math.PI * t) - 3.5;
    }

    function calculaSecante(t0, t1){ // For vai até 30 para evitar loop infinito
        valores[0] = t0;
        valores[1] = t1;
        

        output.textContent += "f(t0) = " + funcao(t0) + "\nf(t1) = " + funcao(t1) + "\n" + "\n"; // Saída dos valores t0 e t1

        for(let i = 2; i < 30; i++){ // For vai até 30 para evitar loop infinito
            resultado = t1 - (funcao(t1) * (t1 - t0)) / (funcao(t1) - funcao(t0)); // Aplicação da fórmula
            valores[i] = resultado; // // Armazena o resultado da fórmula 
            output.textContent += "t" + i + " = " + resultado + "\n"; // Adiciona o valor da variável t para a iteração atual i
            output.textContent += "f(t" + i + ") = " + funcao(resultado) + "\n"; // Adiciona o valor da função f(t) calculado usando o "resultado" obtido na iteração atual

            let erroRelativo = Math.abs((resultado - t1) / resultado); // Erro relativo
            output.textContent += "Erro relativo: " + erroRelativo + "\n"; // Saída do erro relativo
            output.textContent += "Numero de iterações = " + contador++ + "\n\n";

            if(erroRelativo < 1e-6){ // Condição de parada
                output.textContent += "Valor de t encontrado: t" + i + " = " + resultado + "\n";
                break;
            }

            t0 = t1;
            t1 = resultado;
        }
    }

    calculaSecante(0, 0.2); // Chamada da função com aproximações iniciais
}
