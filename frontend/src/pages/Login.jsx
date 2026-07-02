import { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import axios from 'axios';

export function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Para mostrar el 401 en la pantalla
  const [userResponse, setUserResponse] = useState(null); // Reemplaza tu setResponse anterior

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Limpiamos errores anteriores antes de intentar
    
    try {
      const res = await axios.post("http://localhost:5000/user/login", {
        email: formData.email,
        password: formData.password
      });
      
      // ¡Login Exitoso! 
      setUserResponse(res.data);
      console.log('Login correcto:', res.data);
      
      // Aquí guardarías el token (ej: localStorage.setItem('token', res.data.token))
      // o redirigirías al usuario a la home.

    } catch (err) {
      // Aquí atrapamos el 401 o cualquier otro error del servidor
      if (err.response && err.response.status === 401) {
        setError('El correo electrónico o la contraseña son incorrectos.');
      } else {
        setError('Hubo un problema con el servidor. Intentá más tarde.');
      }
      console.error('Error en login:', err);
    } finally {
      // Esto se ejecuta SIEMPRE al final, asegurando que el botón deje de cargar
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      
      {/* Alerta de error visible para el usuario */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <Input
          label="Contraseña"
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button type="submit" isLoading={loading}>
          Ingresar
        </Button>
      </form>
    </div>
  );
}