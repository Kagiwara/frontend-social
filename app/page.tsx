'use client';

import React, { useState, useEffect } from 'react';
import InputField from './components/InputField';
import SelectField from './components/SelectField';
import CheckboxField from './components/CheckboxField';
import SubmitButton from './components/SubmitButton';
import phoneMask from './lib/phoneMask';

interface City {
  city: string;
  population: string;
}

export default function Home() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<string | null>(null);
  const [greetingName, setGreetingName] = useState('Человек');

  // Загрузка городов при монтировании
  useEffect(() => {
    fetch('/api/cities')
      .then(res => res.json())
      .then(data => {
        const options = data.map((city: City) => ({
          value: city.city,
          label: city.city,
        }));
        setCities(options);
      })
      .catch(err => console.error('Ошибка загрузки городов:', err));
  }, []);

  // Восстановление имени из localStorage
  useEffect(() => {
    const savedName = localStorage.getItem('greetingName');
    if (savedName) {
      setGreetingName(savedName);
      setName(savedName);
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Обязательное поле';
    } else if (name.length < 2 || !/^[А-Яа-яЁё]+$/.test(name)) {
      newErrors.name = 'Должно содержать не менее 2 символов и только кириллица.';
    }

    if (!city) {
      newErrors.city = 'Обязательное поле';
    }

    if (!password) {
      newErrors.password = 'Обязательное поле';
    } else if (password.length < 6 || !/^[a-zA-Z]+$/.test(password)) {
      newErrors.password = 'Должно содержать не менее 6 символов и только латинские буквы.';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (agreed && !email) {
      newErrors.email = 'Обязательное поле при согласии';
    } else if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Неверный формат email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          city,
          password,
          phone,
          email,
          agreed,
        }),
      });

      if (response.ok) {
        const now = new Date().toLocaleString('ru-RU', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
        setLastSubmitted(now);

        // Сохраняем имя в localStorage
        localStorage.setItem('greetingName', name);
        setGreetingName(name);

        // Очищаем форму
        setName('');
        setCity('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
        setEmail('');
        setAgreed(false);
        setErrors({});
      }
    } catch (err) {
      console.error('Ошибка отправки формы:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maskedValue = phoneMask(e.target.value);
    setPhone(maskedValue);
  };

  return (
    <div className="container">
      <h1>Здравствуйте, {greetingName}</h1>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Имя"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          required={true}
          placeholder="Введите Имя"
          helpText="Должно содержать не менее 2 символов и только кириллица."
        />

        <SelectField
          label="Ваш город"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          options={cities}
          error={errors.city}
          required={true}
        />

        <InputField
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          required={true}
          helpText="Должно содержать не менее 6 символов и только латинские буквы."
        />

        <InputField
          label="Пароль еще раз"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          required={true}
          helpText="Проверка на совпадение с паролем."
        />

        <InputField
          label="Номер телефона"
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          error={errors.phone}
          required={false}
          placeholder="+7 (***) ***-**-**"
          helpText="Маска с международным форматом +7 (999) 999-99-99."
        />

        <InputField
          label="Электронная почта"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required={agreed}
          helpText="Проверка на валидность email."
        />

        <CheckboxField
          label="принимать актуальную информацию на емейл"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          required={false}
        />

        <div className="submit-container">
          <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
            Изменить
          </SubmitButton>
          {lastSubmitted && (
            <span className="timestamp">
              последние изменения {lastSubmitted}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}