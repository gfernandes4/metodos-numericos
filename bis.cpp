#include <stdio.h>
#include <math.h>

// Defina a função para a qual queremos encontrar a raiz
double func(double x) {
    // Exemplo de função: x^3 - x - 2
    return pow(x, 3) - x - 2;
}

// Função para o método da bissecção
double bisseccao(double a, double b, double tol, int max_iter) {
    if (func(a) * func(b) >= 0) {
        printf("O método da bissecção falhou: f(a) e f(b) devem ter sinais opostos.\n");
        return -1; // Indica falha
    }

    double c;
    int iter_count = 0;

    while ((b - a) / 2 > tol && iter_count < max_iter) {
        c = (a + b) / 2; // Ponto médio

        if (func(c) == 0) {
            return c; // Encontrou a raiz exata
        } else if (func(a) * func(c) < 0) {
            b = c; // A raiz está no intervalo [a, c]
        } else {
            a = c; // A raiz está no intervalo [c, b]
        }

        iter_count++;
    }

    return (a + b) / 2; // Retorna a melhor aproximação da raiz encontrada
}

int main() {
    double a, b, tol;
    int max_iter;

    // Solicita ao usuário os valores de entrada
    printf("Digite o valor de a (limite inferior do intervalo): ");
    scanf("%lf", &a);

    printf("Digite o valor de b (limite superior do intervalo): ");
    scanf("%lf", &b);

    printf("Digite a tolerância (ex: 1e-5): ");
    scanf("%lf", &tol);

    printf("Digite o número máximo de iterações: ");
    scanf("%d", &max_iter);

    // Chamando a função de bissecção
    double raiz = bisseccao(a, b, tol, max_iter);

    if (raiz != -1) {
        printf("A raiz aproximada é: %.5lf\n", raiz);
    }

    return 0;
}
