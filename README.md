# Desafio LiveOnSolutions Node JS - Missão Final

Lógica desenvolvida para a leitura e organização do arquivo "chaotic_data.json" de acordo com alguns parâmetros conforme explicado abaixo.

---

# **Parâmetros/Endpoints**

### Endpoint 1: (Rota: /api/v2/order-by-status)

    - Função para organizar todas as orders por status;

### Endpoint 2: (Rota: /api/v2/order-total/:status)

    - Função para extrair o valor total do status solicitado na requisição através do "params". Exemplo de rota: /api/v2/order-total/Refused;

### Endpoint 3: (Rota: /api/v2/order-major-values)

    - Com tudo organizado por status e com o valor total já somado, neste endpoint o retorno organizado do MAIOR valor para o MENOR.

### Endpoint 4: (Rota: /api/v2/group-by-country)

    - Neste endpoint as informações já organizadas por status são também, agrupadas por país;
