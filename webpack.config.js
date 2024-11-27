const path = require('path');

module.exports = {
  entry: './src/app.tsx',               // Ponto de entrada do seu aplicativo
  output: {
    filename: 'bundle.js',                // Arquivo de saída
    path: path.resolve(__dirname, 'dist'), // Diretório de saída
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],   // Extensões de arquivo a serem resolvidas
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,                   // Transforma arquivos .ts ou .tsx
        use: 'ts-loader',                  // Usando o ts-loader para compilar o TypeScript
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
