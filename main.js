let produtosData;
let carrinho = [];
let addCart = document.querySelector('.row');

inicializarLoja = () => {
  let narguiles = document.querySelector('.narguiles');

  fetch('./produtos.json')
    .then(response => response.json())
    .then(data => {
      produtosData = data;

      data.map((val) => {
        narguiles.insertAdjacentHTML('beforeend', `
          <div class="produto-single">
            <div class="produto-image">
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








      $('.narguiles, .narguiles-grandes').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      });
      $('.carrossel-informacoes-start').slick({
        autoplay: true
      })

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



