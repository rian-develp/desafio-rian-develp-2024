import { erros } from './constants/erros.js'

class RecintosZoo {
    mensagemErro;
    recintos = [
        { numero: 1, bioma: "savana", tamanhoTotal: 10, tamanhoAtual: 7, animaisExistentes: [`macaco`] },
        { numero: 2, bioma: "floresta", tamanhoTotal: 5, tamanhoAtual: 5, animaisExistentes: [] },
        { numero: 3, bioma: ["savana", "rio"], tamanhoTotal: 7, tamanhoAtual: 5, animaisExistentes: [`gazela`] },
        { numero: 4, bioma: "rio", tamanhoTotal: 8, tamanhoAtual: 8, animaisExistentes: [] },
        { numero: 5, bioma: "savana", tamanhoTotal: 9, tamanhoAtual: 6, animaisExistentes: [`leão`] }
    ];

    recintosViaveis = [
        `Recinto ${this.recintos[0].numero.toString()} (espaço livre: ${this.recintos[0].tamanhoAtual} total: ${this.recintos[0].tamanhoTotal})`,
        `Recinto ${this.recintos[1].numero.toString()} (espaço livre: ${this.recintos[1].tamanhoAtual} total: ${this.recintos[1].tamanhoTotal})`,
        `Recinto ${this.recintos[2].numero.toString()} (espaço livre: ${this.recintos[2].tamanhoAtual} total: ${this.recintos[2].tamanhoTotal})`,
        `Recinto ${this.recintos[3].numero.toString()} (espaço livre: ${this.recintos[3].tamanhoAtual} total: ${this.recintos[3].tamanhoTotal})`,
        `Recinto ${this.recintos[4].numero.toString()} (espaço livre: ${this.recintos[4].tamanhoAtual} total: ${this.recintos[4].tamanhoTotal})`,
    ]

    animais = {
        "leão": { nome: "leão", tamanho: 3, bioma: 'savana', carnivoro: true },
        "macaco": { nome: "macaco", tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
        "crocodilo": { nome: "crocodilo", tamanho: 3, bioma: 'rio', carnivoro: true },
        "gazela": { nome: "gazela", tamanho: 2, bioma: 'savana', carnivoro: false },
        "hipopótamo": { nome: "hipopótamo", tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
    };

    analisaRecintos(animal, quantidade) {

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            this.mensagemErro = erros.quantidadeInvalida;
            return;
        }

        if (!this.animais[animal.toLowerCase()]) {
            this.mensagemErro = erros.animalInvalido;
            return;
        }

        this.verificaRecintoCorretoeViavel(animal, quantidade);
    }

    // Verifica se o recinto é ideal ou não para o animal
    verificaRecintoCorretoeViavel(animalRecebido, quantidadeAnimal) {
        const animal = animalRecebido.toLowerCase();
        const quantidade = quantidadeAnimal;
        const espacoOcupacao = (this.animais[animal].tamanho * quantidade);
        let validadorBooleano = false;
        this.recintos.forEach(recintos => {

            if (espacoOcupacao > recintos.tamanhoAtual) {
                this.mensagemErro = erros.naoHaRecintoViavel;
                return;
            }
            // Só entra aqui Macaco e Hipopótamo
            if (Array.isArray(this.animais[animal].bioma)) {
                this.animais[animal].bioma.forEach(biomaAnimal => {
                    if (recintos.bioma == biomaAnimal) {

                        if (recintos.animaisExistentes.length > 0) {
                            recintos.animaisExistentes.forEach(animaisExistentes => {
                                if (this.animais[animaisExistentes].nome == this.animais[animal].nome) {
                                    const novoEspacoAtual = (recintos.tamanhoAtual - espacoOcupacao);
                                    this.recintosViaveis[recintos.numero - 1] = `Recinto ${recintos.numero} (espaço livre: ${novoEspacoAtual} total: ${recintos.tamanhoTotal})`
                                    console.log(this.recintosViaveis[recintos.numero - 1]);
                                    validadorBooleano = true;
                                }
                            })
                        } else if (recintos.animaisExistentes.length == 0 && validadorBooleano == false) {
                            const novoEspacoAtual = (recintos.tamanhoAtual - espacoOcupacao);
                            this.recintosViaveis[recintos.numero - 1] = `Recinto ${recintos.numero} (espaço livre: ${novoEspacoAtual} total: ${recintos.tamanhoTotal})`
                            console.log(this.recintosViaveis[recintos.numero - 1]);
                            return;
                        }
                    }
                });
            } else {
                if (Array.isArray(recintos.bioma)) {
                    recintos.bioma.forEach(biomas => {
                        if (this.animais[animal].bioma == biomas && recintos.animaisExistentes.length > 0) {
                            recintos.animaisExistentes.forEach(animaisExistentes => {
                                if (this.animais[animal].nome == this.animais[animaisExistentes].nome) {
                                    const novoEspacoAtual = (recintos.tamanhoAtual - espacoOcupacao);
                                    this.recintosViaveis[recintos.numero - 1] = `Recinto ${recintos.numero} (espaço livre: ${novoEspacoAtual} total: ${recintos.tamanhoTotal})`
                                    console.log(this.recintosViaveis[recintos.numero - 1]);
                                    validadorBooleano = true;
                                }
                            });
                        } else if (this.animais[animal].bioma == biomas && recintos.animaisExistentes.length == 0 && validadorBooleano == false) {
                            const novoEspacoAtual = (recintos.tamanhoAtual - espacoOcupacao);
                            this.recintosViaveis[recintos.numero - 1] = `Recinto ${recintos.numero} (espaço livre: ${novoEspacoAtual} total: ${recintos.tamanhoTotal})`
                            console.log(this.recintosViaveis[recintos.numero - 1]);
                            return;
                        }
                    });
                }

                if (this.animais[animal].bioma == recintos.bioma) {
                    if (recintos.animaisExistentes.length > 0) {
                        recintos.animaisExistentes.forEach(animaisExistentes => {
                            if (this.animais[animal].nome == this.animais[animaisExistentes].nome) {
                                const novoEspacoAtual = (recintos.tamanhoAtual - espacoOcupacao);
                                this.recintosViaveis[recintos.numero - 1] = `Recinto ${recintos.numero} (espaço livre: ${novoEspacoAtual} total: ${recintos.tamanhoTotal})`
                                console.log(this.recintosViaveis[recintos.numero - 1]);
                                validadorBooleano = true;
                                return;
                            }
                        });
                    } else if (recintos.animaisExistentes.length == 0 && validadorBooleano == false) {
                        const novoEspacoAtual = (recintos.tamanhoAtual - espacoOcupacao);
                        this.recintosViaveis[recintos.numero - 1] = `Recinto ${recintos.numero} (espaço livre: ${novoEspacoAtual} total: ${recintos.tamanhoTotal})`
                        console.log(this.recintosViaveis[recintos.numero - 1]);
                        return;
                    }
                }
            }
        })
    }
}
export { RecintosZoo as RecintosZoo };