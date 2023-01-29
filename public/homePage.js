'use strict'

const logoutButton = new LogoutButton();

// logout 
logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });
}

// get info about user
ApiConnector.current((response) => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }
});


// get currencies stock
const ratesBoard = new RatesBoard();

function getCurrencies () {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}

getCurrencies();

let updateCurrencies = setInterval(() => getCurrencies(), 60000);



const moneyManager = new MoneyManager();

// add money 
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'успешно пополнено');
        }
        else {
            moneyManager.setMessage(response.error, 'ошибка пополнения');
        }
    });
}

// currency conversion
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'успешная конвертация');
        }
        else {
            moneyManager.setMessage(response.error, 'ошибка конвертации');
        }
    })
}

// send currency
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'успешный перевод');
        }
        else {
            moneyManager.setMessage(response.error, 'ошибка перевода');
        }
    })
}


const favoritesWidget = new FavoritesWidget();

// favorite list
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
    }
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
})

// add user to favorite list 
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
        else {
            moneyManager.setMessage(response.error, 'ошибка добавления пользователя в список');
        }
    })
}

// remove user from favorite list 
favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
        else {
            moneyManager.setMessage(response.error, 'ошибка удаления пользователя из списка');
        }
    })
} 
