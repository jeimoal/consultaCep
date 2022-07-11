const logradouro = document.getElementById('logradouro');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const cep = document.getElementById('cep');

const btnEnviar = document.getElementById('enviar');
const btnNovaConsulta = document.getElementById('novaConsulta');
const cepDigitado = document.getElementById('cepDigitado');

btnEnviar.onclick = function () {
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
	console.log(err);
	minhaDiv.innerHTML = 'Erro! Alguns CEP\'s não são reconhecidos pelo sistema.<br>Você pode tentar novamente com um CEP diferente.'
	minhaDiv.style.color = 'red';
	})
}

btnNovaConsulta.onclick = function () {
	let minhaDiv = document.querySelectorAll('#minhaDiv p');
	for(i = 0; i < minhaDiv.length; i++) {
	minhaDiv[i].textContent = "";
	}

	cepDigitado.disabled = false;
	cepDigitado.value = "";
	btnNovaConsulta.hidden = true;
}