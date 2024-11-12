import { api, requestConfig } from "../utils/config";

// Register user.
const register = async (data) => {
  const config = requestConfig("POST", data);  
  try {
    const res = await fetch(`${api}/user/register`, config);
    // Verifica se a resposta tem um status de sucesso
    if (!res.ok) {
      // Tenta obter a mensagem de erro caso o status não seja ok
      const errorText = await res.text();
      throw new Error(errorText || "Erro no registro");
    }

    // Verifica se a resposta possui um conteúdo JSON
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const dataJson = await res.json();
      console.log("Resposta da API:", dataJson);

      // Armazena o usuário no localStorage se o registro for bem-sucedido
      if (dataJson) {
        localStorage.setItem("user", JSON.stringify(dataJson));
      }
      return dataJson;
    } else {
      throw new Error("Resposta não é JSON.");
    }

  } catch (error) {
    const contentType = error.headers.get("content-type");
    if(contentType && contentType.includes("application/json")) {
      const dataJson = await error.json();
      console.error("Erro na requisição:", dataJson);
    }
    console.error("Erro na requisição:", error);
    throw error;
  }
};

const authService = {
  register,
};

export default authService;
