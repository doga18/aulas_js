//import logo from './logo.svg';
import './App.css';

// importando hooks
import { useState } from "react";

// 4 - custom hook
import { useFetch } from './hooks/useFetch';

// Definindo endereçamento da api

const url_api = "http://localhost:3001/products"

function App() {
  const [products, setProducts] = useState([]);

  // Definindo hooks para dar nome e price

  //4 - custom hook, buscando os dados

  const {data: items, httpConfig, loading, errors} = useFetch(url_api);

  console.log(items);

  const [nameProduct, setNameProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState('');

  // 1 - Resgatando dados da API.
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(url_api);
  //       const json_data = await res.json();
  //       setProducts(json_data);
  //     }catch(e){
  //       console.log(e);
  //     }
  //   }
  //   // Executando a função.
  //   fetchData();    
  // }, []);



  console.log(products)

  // Lidando com o submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Nome do produto ${nameProduct}`);
    console.log(`Preço definido do ${nameProduct} é de ${priceProduct} Reais.`)

    // Contruindo o novo objeto para enviar para a Api.

    const new_product = {
      name: nameProduct,
      price: priceProduct
    }

    console.log(`Contruindo o novo produto, esse é o novo produto: \n ${new_product.name} \n ${new_product.price} \n Enviando para a API`);
    // Envia o novo objeto para a API.

    // // Essa Linha será comentada, pois será utilizado o hook custom específico.
    // try{
    //   // Aqui no fetch, temos que definir o método de envio e o objeto na requisição.
    //   const res = await fetch(url_api, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(new_product)
    //   })

    //   // 3 Carregamento Dinâmico.
    //   //console.log(`Seguindo para ver se o código é executado após o try de sucesso!`)      
    //   // O mesmo objeto enviado via 
    //   const addProduct = await res.json();
    //   // Ao jogar o resultado do res, esperando ele executar temos isso:
    //   //console.log(`Resultado da requisição ${addProduct.id}`)
    //   // Como temos o objeto gerado como resposta da requisição após o await, conseguindo adicionar na lista, preservando os valores anteriores.
    //   setProducts((prevProducts) => [...prevProducts, addProduct])

    // }catch(e){
    //   console.log(`Erro ao enviar a requisição! ${e}`)
    //   // Return aqui, para parar o código em caso de erro!
    //   return
    // }

    // 5 - Refatorando o produto, post.
    
    const addProduct = await httpConfig(new_product, "POST");
    console.log(`Resultado da requisição do post, ${addProduct}`);
    setProducts((prevProducts) => [...prevProducts, addProduct])

    setNameProduct("");
    setPriceProduct("");
    
  }

  // const handleDeleteProduct = async (e) => {
  //   e.preventDefault();    
  //   console.log(e.target.value);

  //   const id_delete = e.target.value;
  //   const id_para_montado = url_api+'/'+id_delete;
  //   console.log(id_para_montado);

  //   // Tentando deletar um produto!
  //   try{
  //     const res = await fetch(url_api+'/'+id_delete, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json"          
  //       },        
  //     })
  //     console.log(res);
  //   }catch(e){
  //     console.log(e);
  //   }    
  // }

  // 8 - desafio delete

  const handleRemove = (id) => {
    httpConfig({ id }, 'DELETE');
  };

  return (
    <div className="App">
      <div className="list">
        <h1>Lista de produtos</h1>
        {/* 6 -  Criando a mensagem de loading na tela. */}
        {!errors && loading && <p>Carregando dados...</p>}
        {errors && 
        <div className="errors_msg">
          <h2>
            <p>{errors}</p>
          </h2>
        </div>
        }        
        <ul>
          {items && items.map((product) => (
            <li key={product.id}>              
              {/* Aqui foi desenvolvido pelo oque compreendi! */}
              {/* <span>Nome: {product.name} Preço R$: {product.price}</span>
              <span>
                <form>
                  <label htmlFor="product_delete">
                    <input type="hidden" name='product_delete' value={product.id}/>
                  </label>                  
                  <button type='submit' onClick={handleDeleteProduct} value={product.id}>
                    Deletar
                  </button>
                </form>
              </span> */}
              {/* Aqui foi desenvolvido pelo professor */}
              {product.name} - R$ {product.price} 
              <button onClick={() => handleRemove(product.id)}>Excluir</button>
            </li>
          ))}          
        </ul>
        <div className="add-product">
          <form onSubmit={handleSubmit}>
            <label htmlFor="new_product">
              <input type="text" name="new_product" id="new_product" onChange={(e) => setNameProduct(e.target.value)} value={nameProduct}/>
            </label>
            <label htmlFor="new_price">
              <input 
              type="text" 
              name="new_price" 
              id="new_price" 
              onChange={(e) => setPriceProduct(e.target.value)}
              min="1"
              max="20000"
              step="2"
              required
              value={priceProduct}
               />
            </label>
            {/* 7 - Adicionando regras para evitar duplicidade, retirar o botão enquanto a requisição está sendo realizada. */}
            {loading && <button disabled type="submit">Adicionar</button>}
            {!loading && <button type="submit">Adicionar</button>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
