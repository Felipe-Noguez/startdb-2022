class Forca {

  constructor(palavraSecreta) {
    this.palavraSecreta = palavraSecreta
    this.letrasChutadas = []
    this.vidas = 6
    this.estadoJogo = 'aguardando chute'
    this.palavra = new Array(palavraSecreta.length).fill('_')
  }

  chutar(letra) {     
    if (!/^[A-Za-z]$/.test(letra)) { //forçando a entrada de somente uma letra com Regex
      return console.log(`Caractere ${letra} inválido, precisa ser somente uma letra (A-Z, a-z)`)
    } else if (this.vidas > 0) {//caso o jogador ainda tenha vidas, será verificada se a letra "chutada" existe na palavra e a mesma será adicionada na lista de letras chutadas
      if (this.letrasChutadas.includes(letra)) {
        return console.log(`A letra ${letra} já foi chutada!`)
      } else {
        this.letrasChutadas.push(letra)
      }
      if (this.palavraSecreta.includes(letra)) {//após a verificação anterior, agora é realizada a inserção da letra "chutada" no vetor palavra[]
        for (let i = 0; i < this.palavraSecreta.length; i++) {
          if (this.palavraSecreta[i] === letra) {
            this.palavra[i] = letra
            console.log(this.palavra)             
            if (!this.palavra.find(element => element === '_')) {//aqui é percorrido o vetor palavra[], onde, se não encontrado o "_" (underline), significa que a palavra foi completada e adicionado ao estadoJogo "ganhou"
              this.estadoJogo = 'ganhou'
              return console.log('ganhou')
            }
          }
        }
      } else {//caso o jogador tenha entrado com uma letra que não consta no vetor palavraSecreta[], então perderá uma vida
        --this.vidas
        if (this.vidas === 0) {//aqui é adicionado ao estadoJogo "perdeu" quando a quantidade de vidas chegar a zero
          this.estadoJogo = 'perdeu'
          return console.log('perdeu')
        } 
        return console.log(`Errou, você ainda possui ${this.vidas} vidas!`)//aqui é retornado uma String literal informando a quantidade de vidas do jogador
      }
    }
  }
  


  // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"
  buscarEstado() {
    return this.estadoJogo
  }

  buscarDadosDoJogo(letrasChutadas) {
    return {
      letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
      vidas: this.vidas, // Quantidade de vidas restantes
      palavra: this.palavra // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
    }
  }
}

module.exports = Forca;
