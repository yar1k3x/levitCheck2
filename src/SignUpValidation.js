function Validation(values) {
    //alert("")
    let error = {}
    const number_pattern = /^\+\d{11,14}$/
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // Валидация имени
    if (values.name === "") {
        error.name = "Имя не может быть пустым"
    }
    else {
        error.name = ""
    }

    // Валидация номера телефона
    if (values.phone === "") {
        error.phone = "Номер не может быть пустым!"
    }
    else if (!number_pattern.test(values.phone)) {
        error.phone = "Номер не подходит"
    }
    else {
        error.phone = ""
    }

    // Валидация адреса электронной почты
    if (values.email === "") {
        error.email = "Адрес эл. почты не может быть пустым"
    }
    else if (!email_pattern.test(values.email)) {
        error.email = "Адрес эл. почты не подходит"
    }
    else {
        error.email = ""
    }

    // Валидация пароля
    if (values.password === "") {
        error.password = "Пароль не может быть пустым"
    }
    else if (!password_pattern.test(values.password)) {
        error.password = "Пароль не подходит"
    }
    else {
        error.password = ""
    }

    return error;

}

export default Validation