function Validation(values) {
    // alert("")
     let error = {}
     const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
     const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
 
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