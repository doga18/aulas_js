import { useState, useEffect } from "react";

// 4 - Custom hook

export const useFetch = (url) => {
    const [data, setData] = useState(null);

    // 5 - refatorando o post
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [callFetch, setCallFetch] = useState(null); //no-used-vars

    // 6 - Loading
    const [loading, setLoading] = useState(false);

    // 7 - tratando errors
    const [errors, setErrors] = useState(null);

    // Desafio, deletando!
    // 8 - Setando o ID no alvo para deletar.
    const [itemId, setItemId] = useState(null);

    // Função de configuração
    const httpConfig = (data, method) => {
        if(method === 'POST'){
            console.log(`Recebendo os dados: \n ${data.name + ' Preço: ' + data.price}`)
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            // Setando o método no hook state.
            setMethod(method);
        } else if(method === 'DELETE'){
            console.log(`Recebendo os dados, para deletar: \n ${data.id}`)
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                // Como o método delete não tem body, posso deletar a linha abaixo, no caso só vou comentar.
                //body: JSON.stringify(data)
            })
            // Setando o método no hook state.            
            setItemId(data.id)
            setMethod(method)
        }
    }    

    useEffect(() => {

        const fetchData = async () => {

            try{
                // 6 - Ativando o loading
                setLoading(true);

                const res = await fetch(url);
                const json = await res.json();

                setData(json);

                setLoading(false);

            }catch(e){
                console.log(`Erro ao coletar os dados ${e.message}`);

                setErrors('Falha ao carregar os dados, tente novamente mais tarde!')
            }            
        };        
        fetchData();
    }, [url])

    // 5 - refatorando o post

    useEffect(() => {
        const httpRequest = async () => {
            if (!config) return;
            
            let fetchOptions = [url, config];
            let res, json;

            try {
                if (method === 'POST') {
                    res = await fetch(...fetchOptions);
                } else if (method === 'DELETE') {
                    const deleteUrl = `${url}/${itemId}`;
                    res = await fetch(deleteUrl, config);
                    console.log(res);
                }
                json = await res.json();
                setCallFetch(json);
            } catch (e) {
                setErrors('Falha ao realizar a requisição, tente novamente mais tarde!');
            }
        };
        httpRequest();
    }, [config, method, url, itemId])

    return { data, httpConfig, loading, errors};
}