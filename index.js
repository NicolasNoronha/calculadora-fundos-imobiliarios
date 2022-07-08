const express = require('express') //importa express
const app = express() // chamar express
const path = require('path') //módulo fornece utilitários para trabalhar com caminhos de arquivos e diretórios.
const investimento = require('./lib/convert')
const rendimento = require('./lib/convert')
const porta = 3000

/*
Antes do Express poder renderizar arquivos de modelo, as seguintes configurações do aplicativo devem ser configuradas:

views, é o diretório onde os arquivos de modelo estão localizados. Por exemplo: app.set('views',
'./views')
view engine, o mecanismo de modelo a ser usado. Por Exemplo: app.set('view engine', 'pug') nesse caso estou usando o ejs
*/

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public'))) // lugar para guardar os arquivos como CSS ('public' é o nome da pasta node)


app.get('/', (req, res) => {
  res.send('Bem vindo ao sistema de fundos')

})

app.get('/home', (req, res) => {
  res.render('home')
})

app.get('/calculo', (req, res) => {
  const { nome, cotas, valor, dividendo } = req.query

  if (cotas, valor, dividendo) {

    const soma_invertimento = investimento.investimento(cotas, valor)
    const soma_rendimento = rendimento.rendimento(cotas, dividendo)

    res.render('calculo', {

      error: false,
      cotas: investimento.toMoney(cotas),
      valor: investimento.toMoney(valor),

      soma_invertimento: investimento.toMoney(soma_invertimento),
      nome: nome,

      dividendo: rendimento.toMoney(dividendo),
      contas: rendimento.toMoney(cotas),
      soma_rendimento: rendimento.toMoney(soma_rendimento)

    })
  } else {
    res.render('calculo', {
      error: 'Valores Inválidos por favo tente novamente'
    })

  }
})

app.listen(porta, err => {
  if (err) {
    console.log('Problema ao iniciar o sistema')
  } else {
    console.log('Sistema iniciado ! ')
  }
})