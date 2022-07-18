const express = require('express')
const app = express()
const path = require('path')
const investimento = require('./lib/convert')
const rendimento = require('./lib/convert')
const porta = 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

/*
app.get('/', (req, res) => {
  res.send('home')
})*/

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/calculo', (req, res) => {
  const { nome, cotas, valor, dividendo } = req.query

  if (cotas && valor && dividendo) {

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
      error: 'Valores Inválidos por favor tente novamente'
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