// Definindo a matriz e o vetor
let ordemMatriz = 8; // Ordem da matriz para este exemplo
let matrizA = [
    [17, 5, 0, 0, 0, 0, 0, 2],
    [1, 4, 2, 0, 0, 0, 1, 0],
    [0, 6, 9, 2, 0, 1, 0, 0],
    [0, 0, 1, 4, 3, 0, 0, 0],
    [0, 0, 0, 8, 9, 1, 0, 0],
    [0, 0, 4, 0, 3, 10, 3, 0],
    [0, 12, 0, 0, 0, 3, 23, 8],
    [6, 0, 0, 0, 0, 0, 10, 31]
];
let vetorB = [1000, 0, 0, 0, 0, 0, 0, 0];

function metodoGaussSeidel(matriz, vetor) {
    // Definindo os valores internos para tolerância 
    const tolerancia = 1e-6;
    // E número máximo de iterações
    const maxIteracoes = 1000;

    const n = matriz.length; // Tamanho da matriz
    let x = Array(n).fill(0); // Aproximação inicial com vetor nulo
    let xAntigo = Array(n).fill(0); // Cópia do vetor x para comparar as atualizações.
    let iteracao = 0;
    let erro; // Erro relativo
    let historicoResultados = []; // Armazena o histórico das iterações

    do { // Para quando o E.R. for menor que a tolerândia ou até que o num max de iterações sera alcançado
        for (let i = 0; i < n; i++) {
            let soma1 = 0;
            for (let j = 0; j < i; j++) {
                soma1 += matriz[i][j] * x[j];
            }
            let soma2 = 0;
            for (let j = i + 1; j < n; j++) {
                soma2 += matriz[i][j] * xAntigo[j];
            }
            x[i] = (vetor[i] - soma1 - soma2) / matriz[i][i];
        }
        // Calcula o erro relativo
        erro = 0;
        for (let i = 0; i < n; i++) {
            erro = Math.max(erro, Math.abs(x[i] - xAntigo[i]));
        }
        xAntigo = [...x]; // Faz uma cópia do vetor x para comparar na próxima iteração
        iteracao++;
        historicoResultados.push([...x]); // Armazena o resultado da iteração atual
    } while (erro > tolerancia && iteracao < maxIteracoes);

    return { solucao: x, iteracoes: iteracao, historico: historicoResultados };
}

function exibirResultados() {
    let resultado = metodoGaussSeidel(matrizA, vetorB);
    let resultadoHtml = '<h2>Resultado Final:</h2><p>';
    for (let i = 0; i < resultado.solucao.length; i++) {
        resultadoHtml += 'x' + (i + 1) + ' = ' + resultado.solucao[i].toFixed(6) + ' ';
    }
    resultadoHtml += '</p>';
    resultadoHtml += '<p>Iterações: ' + resultado.iteracoes + '</p>';
    
    // Exibe o histórico das iterações
    resultadoHtml += '<h2>Histórico das Iterações:</h2>';
    resultado.historico.forEach((iteracao, index) => {
        resultadoHtml += `<p><strong>Iteração ${index + 1}:</strong> ` +
            iteracao.map(xi => xi.toFixed(6)).join(', ') + '</p>';
    });

    document.getElementById('resultado').innerHTML = resultadoHtml;
}

// Chama a função para exibir o resultado
exibirResultados();
