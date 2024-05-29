// Импортируем необходимые библиотеки и компоненты из React и react-router-dom
import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Импортируем функцию валидации из файла './LoginValidation'
import Validation from './LoginValidation'

// Импорт бибиотеки для взаимодейтствия с api
import axios from 'axios'

// Импорт библиотеки для шифрования пароля
const sha256 = require('crypto-js/sha256');



// Создаем функциональный компонент "Login"
function Login() {
    // Используем хук useState для создания состояния с инициализацией значений email и password
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    // Используем хук useState для создания состояния ошибок
    const [errors, setErrors] = useState({})

    // Функция обработки изменения ввода
    const handleInput = (event) => {
        // Обновляем значения состояния, используя предыдущее состояние
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    useEffect(() => {
        if(errors.email === "" && errors.password === "") {
            const hashedPassword = sha256(values.password).toString()
            axios.post('http://localhost:8081/login', {...values, password: hashedPassword})
            .then(res => {
                if (res.data !== "Failed") {
                    localStorage.setItem('isLoggedIn', true)
                    localStorage.setItem('userName', res.data[0].name)
                    localStorage.setItem('userId', res.data[0].id)
                    navigate("/home")
                } else {
                    console.log("Пользователь не найден")
                }
            })
            .catch(err => console.log(err))
        }
    }, [errors])

    // Функция обработки события отправки формы
    const handleSubmit = (event) => {
        event.preventDefault();
        // Устанавливаем ошибки, вызывая функцию валидации и передавая ей текущие значения
        setErrors(Validation(values));
    }
    

    // Возвращаем JSX разметку компонента
    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h1>Login</h1>
                <form /*action=''*/ onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter Email' name='email'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='Enter Password' name='password'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>
                    <button type="submit" className='btn btn-success w-100'> Login</button>
                    <p></p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    )
}

// Экспортируем компонент "Login"
export default Login
