require('dotenv').config();

const CloudAPI = require('./services/CloudAPI');

const MY_TOKEN = process.env.WHATSAPP_TOKEN;
const MY_PHONE_ID = process.env.MY_PHONE_ID;

const api = new CloudAPI(MY_TOKEN, MY_PHONE_ID)

async function main() {
    try {
        const resposta = await api.enviarTexto('5511970743843', 'Olá mundo!');
        console.log('✅ Mensagem enviada com sucesso!');
        console.log('Retorno da API:', resposta);
    } catch (erro) {
        console.error('❌ Erro ao enviar mensagem:', erro.message);
    }
}

main();