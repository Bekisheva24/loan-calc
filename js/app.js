// Подписываемся на событие
document.querySelector('#loan-form').addEventListener('submit', function (e) {
	document.querySelector('#results').style.display = 'none';
	document.querySelector('#loading').style.display = 'block';

	setTimeout(calculateResults, 2000);

	e.preventDefault();
});


// Подсчет результатов
function calculateResults() {
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	// Вывод формулы
	const principle = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	//Расчет ежемесячной выплаты

	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principle * x * calculatedInterest) / (x - 1);

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);

		//Покажем результат и спрячем loader
		document.querySelector('#results').style.display = "block";
		document.querySelector('#loading').style.display = "none";
	} else {
		showError("Пожалуйста, проверьте введенные данные!");
		console.log(showError);
	}
}

//Показать ошибку при неверном ввщде
function showError(error) {
	document.querySelector('#results').style.display = 'none';
	document.querySelector('#loading').style.display = 'none';


	// Создаем 'div' для сщщбщения об ошибке
	const errorDiv = document.createElement('div');

	//Получаем элементы
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	//Добавляем класс в блок сообщений об ошибках
	errorDiv.className = 'alert alert-danger';

	//Создаем nextnode и добавляем его в 'div';
	errorDiv.appendChild(document.createTextNode(error));

	//Вставляем сообщение об ошибке над заголовком
	card.insertBefore(errorDiv, heading);

	//Очистить сообщение об ошибке через 3 секунды
	setTimeout(clearError, 4000);
}

//Очистить сообщение об ошибке
function clearError() {
	document.querySelector('.alert').remove();
}