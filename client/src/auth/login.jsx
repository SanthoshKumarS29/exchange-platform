import React, { useState } from 'react'

const login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({...prev, [name]: value}))
        if(error) setError('')
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');

        const email = formData.email.trim();

        if(!email || !formData.password){
            setError('Please enter your email and password');
            return;
        }
    }

  return (
    <div>login</div>
  )
}

export default login