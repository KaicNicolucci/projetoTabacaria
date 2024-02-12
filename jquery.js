$(document).ready(function(){

    // Barra de Navegação
      $('.para-clicar').click(function(e){
          $('.carrinho').slideDown();
      })
      $('.fechar').click(function(e){
          $('.carrinho').slideUp();
      })
  })