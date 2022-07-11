const logradouro = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const cep = document.getElementById('cep');

const btnEnviar = document.getElementById('enviar');
const btnNovaConsulta = document.getElementById('novaConsulta');
const cepDigitado = document.getElementById('cepDigitado');

//Dá fetch na API, recebe o arquivo em .json e preenche os campos(além de desabilitar alguns)
btnEnviar.onclick = function () {
	minhaDiv.style.color = 'black';
	let consultaCep = cepDigitado.value;
	fetch('https://api.postmon.com.br/v1/cep/' + consultaCep)
	.then( async (response) => {
		let data = await response.json();
		logradouro.textContent = `${data.logradouro}`;
		bairro.textContent = `Bairro ${data.bairro}`;
		cidade.textContent = `Cidade ${data.cidade}`;
		estado.textContent = `Estado ${data.estado}`;
		cep.textContent = `CEP ${data.cep}`;
		cepDigitado.disabled = true;
		btnNovaConsulta.hidden = false;
	})
	.catch((err) => {
	let msgErro = document.createElement('p');
	let msgTxt = document.createTextNode('Erro! Alguns CEP\'s não são reconhecidos pelo sistema. Você pode tentar novamente com um CEP diferente.');
	msgErro.appendChild(msgTxt);
	minhaDiv.appendChild(msgErro);
	minhaDiv.style.color = 'red';

	cepDigitado.disabled = true;
	btnNovaConsulta.hidden = false;

	console.log(err);
	})
}

//Habilita novamente os campos para consulta
btnNovaConsulta.onclick = function () {
	let minhaDiv = document.querySelectorAll('#minhaDiv p');
	for(i = 0; i < minhaDiv.length; i++) {
	minhaDiv[i].textContent = "";
	}

	cepDigitado.disabled = false;
	cepDigitado.value = "";
	btnNovaConsulta.hidden = true;
}
