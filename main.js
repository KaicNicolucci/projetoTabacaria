$(document).ready(function(){
  $.get( "./produtos.json", function(data) {
    console.log(data)
    });

  // Barra de Navegação
    $('.para-clicar').click(function(e){
        $('.carrinho').slideDown();
    })
    $('.fechar').click(function(e){
        $('.carrinho').slideUp();
    })

  // Narguile Produtos
    $('#carrossel-imagens').innerHTML =`
    <div class="imagem"></div>


    ` 
    

    $('#carrossel-imagens').slick()


});