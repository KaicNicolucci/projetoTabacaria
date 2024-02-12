let produtosData;
let carrinho = [];
let addCart = document.querySelector('.row');
let acumulaValor = [];

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

      $('.narguiles').slick({
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
    acumulaValor.push(Number(produto.valor))
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
          </div>        
        </div>
        <hr>
      </div>
    `;
  });
  valorTotalCarrinho();
};

somaDosValores = 0;
let resultado;

valorTotalCarrinho = () =>{
  acumulaValor.forEach((valores)=>{
    somaDosValores += valores;
  })
  resultado = somaDosValores;
  somaDosValores = 0;
  let valorTotal = document.querySelector('.valor-total');
  valorTotal.textContent = `Valor Total: R$${resultado}`
}



  carrinho.map((keys)=>{
    console.log(`${keys}: ${carrinho[keys]}`);
  })
