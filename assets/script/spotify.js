/* API SPOTIFY */
/* TRANSFORMANDO CLIENTID E CLIENTSECRET PARA TOKEN DE ACEESO A API */

const clientId = 'edf4e66a7aea4fcc939e2dbe34d1a05f';
const clientSecret = '4e1c0971411345a39823e5586e03c140';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
let accessToken = 'SEU_TOKEN_DE_ACESSO';


const data = new URLSearchParams();
data.append('grant_type', 'client_credentials');
data.append('client_id', clientId);
data.append('client_secret', clientSecret);

fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: data
})
    .then(response => response.json())
    .then(data => {
        console.log('Token de acesso da API SPOTIFY:', data.access_token);
        accessToken = data.access_token;
    })
    .catch(error => {
        console.error('Ocorreu um erro ao requisitar o token de acesso API spotify, erro:', error);
    });
