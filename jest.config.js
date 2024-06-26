module.exports = {
  bail: true, //ele vai parar o teste quando encontrar um erro
  coverageProvider: 'v8',

  testMatch: [
    "<rootDir>/src/**/*.spec.js" //ele acessa direto na src e acha qualquer pasta com qualquer arquivo que este o spec.js
  ],

}