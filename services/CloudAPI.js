/**
 * Classe responsavel por todas as interações com a API do WhatsApp.
 */
class ClaudAPI 
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
        this.BASE_URL = `https://graph.whatsapp.com/v19.0/${this.PHONE_NUMBER_ID}/messages`;
    }
}
module.exports = CloudAPI;
