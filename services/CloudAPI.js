const fetch = require('node-fetch');

/**
 * Classe responsável por todas as interações com a API do WhatsApp.
 */
class CloudAPI 
{
    /**
     * @param {string} apiToken - Token de acesso da sua API do WhatsApp.
     * @param {string} phoneNumberId - ID do número de telefone.
     */
    constructor(apiToken, phoneNumberId) 
    {
        if (!apiToken || !phoneNumberId) 
        {
            throw new Error("API Token e Phone Number ID são obrigatórios.");
        }
        this.API_TOKEN = apiToken;
        this.PHONE_NUMBER_ID = phoneNumberId;
        this.BASE_URL = `https://graph.facebook.com/v24.0/${this.PHONE_NUMBER_ID}/messages`;
    }

    /**
     * Envia uma mensagem de texto para um número via API oficial da Meta.
     * @param {string} numero - Número de destino.
     * @param {string} mensagem - Texto da mensagem.
     */
    async enviarTexto(numero, mensagem, previewUrl = true) 
    {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.API_TOKEN}`
            }
        };

        config.body = JSON.stringify({
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: numero,
            type: "text",
            text: {
                preview_url: previewUrl,
                body: mensagem
            }
        });

        try 
        {
            const response = await fetch(this.BASE_URL, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText} | Detalhes: ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            return data;
        }
        catch (error) 
        {
            console.error(`[CloudAPI][enviarTexto] Falha ao enviar mensagem: ${error.message}`);
            throw error;
        }
    }
}

module.exports = CloudAPI;
