let produtosData;
let carrinho = [];
let addCart = document.querySelector('.row');

inicializarLoja = () => {
  let narguiles = document.querySelector('.produto');

  fetch('./produtos.json')
    .then(response => response.json())
    .then(data => {
      produtosData = data;

      data.map((val) => {
        narguiles.insertAdjacentHTML('beforeend', `
          <div class="produto-single">
            <div class="produto-image" style="display: flex;
            flex-direction: column;">
              <img src="${val.imagem}">
            </div>
            <div class="informacoes-produtos">
              <p class="nome-produto">${val.nome}</p>
              <p class="variavel">${val.variavel}</p>
              <p class="valor-produto">R$${val.valor}</p>
              <button onclick="adicionarAoCarrinho(${val.id})" class="add-cart">Adicionar ao Carrinho</button>
            </div>
          </div>
        `);
      });


      /* Carrosseis Jquery */ 

      $('.carrossel-informacoes-start').slick({
        autoplay: true
      })
      $('.produto').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 1440,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 625,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
              breakpoint: 321,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
          }
        ]
      });
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));
};

inicializarLoja();

adicionarAoCarrinho = (id) => {
  let produto = produtosData.find((val) => val.id === id);

  if (produto) {
    let itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push({
        id: produto.id,
        nome: produto.nome,
        variavel: produto.variavel,
        valor: produto.valor,
        imagem: produto.imagem,
        quantidade: 1
      });
    }
    atualizarCarrinho();
  }
};

atualizarCarrinho = () => {

  addCart.innerHTML = '';
  carrinho.forEach((item) => {
    addCart.innerHTML += `
      <div class="item-carrinho">
        <div class="container-carrinho">
          <img src="${item.imagem}" alt="">
          <div class="informacoes-produto">
            <span class="item-nome">${item.nome}</span>
            <span class="item-variavel">${item.variavel}</span>
            <p>R$<span class="valor">${item.valor} </span><span class="qtd-produto">${item.quantidade}x</span></p>
            <button onclick="removerDoCarrinho(${item.id})">Remover</button>
          </div>        
        </div>
        <hr>
      </div>
    `;
  });
  valorTotalCarrinho();
};

removerDoCarrinho = (id) => {
  const index = carrinho.findIndex(item => item.id === id);

  if (index !== -1) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
  }
};


let somaDosValores = 0;
let resultado = 0;

valorTotalCarrinho = () => {
  somaDosValores = 0;
  carrinho.map((key) => {
    somaDosValores += key.quantidade * key.valor;
  })
  let valorTotal = document.querySelector('.valor-total');
  valorTotal.textContent = `Valor Total: R$${somaDosValores}`
}



