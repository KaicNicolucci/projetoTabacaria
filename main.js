$(document).ready(function(){

    $('.para-clicar').click(function(e){
        $('.carrinho').slideDown();
    })
    $('.fechar').click(function(e){
        $('.carrinho').slideUp();
    })

    $('#carrossel-imagens').slick({
        autoplay:  true,
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
      });

});