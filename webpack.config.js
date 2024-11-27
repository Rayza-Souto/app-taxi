const path = require('path');

module.exports = {
  entry: './src/app.tsx',               // Ponto de entrada do seu aplicativo
  output: {
    filename: 'app.js',               // Arquivo de saída
    path: path.resolve(__dirname, 'dist'), // Diretório de saída
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],   // Extensões de arquivo a serem resolvidas
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,                   // Transforma arquivos .ts ou .tsx
        use: 'babel-loader',                  
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    headers: {
      'Content-Type': 'application/javascript', // Defina o tipo MIME correto
    },
    static: './dist',                     // Pasta para servir os arquivos estáticos
    open: true,                           // Abre o navegador automaticamente
    port: 8080,                           // Define a porta do servidor
  },
  mode: 'development',                    // Modo de desenvolvimento
};
