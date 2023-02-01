'use stict'

const User = new UserForm();

User.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            location.reload();
        }
        else {
            User.setLoginErrorMessage(response.error);
        }
    });
}

User.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        if (response.success) {
            location.reload();
        }
        else {
            User.setRegisterErrorMessage(response.error);
        }
    });
}