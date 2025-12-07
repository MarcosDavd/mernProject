import { useState } from 'react';
import { loginUser } from '../services/authService';
function formlogin(){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    async function handleSubmit(e){
        //e tien toda la informacion del evento, por ejempo 
        // datos del form con e.target
        e.preventDefault();
        try {
            setError('');
            const data = await loginUser(email,password);
            
            if (data.token){
                localStorage.setItem('token',data.token);   
            }
            alert("login exstoso")
            
        }catch(error){
            // el error que viene del service se lo paso al state de erores
            setError(error.message);
        }
    }
    return (<>
        <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        </form>
    </>)
}
export default formlogin;