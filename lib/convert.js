const investimento = (cotas, valor) => {
  return cotas * valor
}
const rendimento = (dividendo, cotas) => {
  return dividendo * cotas
}
const toMoney = valor => {
  return parseFloat(valor).toFixed(2)

}


module.exports = {
  investimento,
  rendimento,
  toMoney
}