import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignUpValidation'
import axios from 'axios'
import bcrypt from 'bcryptjs'
const sha256 = require('crypto-js/sha256')

function SignUp() {
    // Используем хук useState для создания состояния с инициализацией значений email и password
    const [values, setValues] = useState({
        name: "",
        phone: "",
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
        if(errors.name === "" && errors.phone === "" && errors.email === "" && errors.password === "") {
            const hashedPassword = sha256(values.password).toString()
            axios.post('http://localhost:8081/signup', {...values, password: hashedPassword})
            .then(res => {
                navigate('/home')
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
    
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <form action='' onSubmit={handleSubmit}>
                <h1>Sign-Up</h1>
                <div className='mb-3'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' placeholder='Enter Name' name='name'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.name && <span className='text-danger'> {errors.name}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='phone'>Phone</label>
                    <input type='tel' placeholder='Enter Phone' name='phone'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.phone && <span className='text-danger'> {errors.phone}</span>}
                </div>
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
                <button className='btn btn-success w-100'>Sign Up</button>
                <p></p>
                <Link to='/login' className='btn btn-default border w-100 bg-light text-decoration-none'>Back</Link>
            </form>
        </div>
    </div>
  )
}

export default SignUp