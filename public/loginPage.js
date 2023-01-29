'use stict'

const User = new UserForm();

User.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            location.reload();
        }
        else {
            User.loginErrorMessageBox(response.error);
        }
    });
}

User.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        if (response.success) {
            location.reload();
        }
        else {
            User.registerErrorMessageBox(response.error);
        }
    });
}