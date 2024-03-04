import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoimg from '../../assets/logo-img.png';

export const postApi = async (url, data) => {
  const response = await fetch(`/api${url}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}


export default function LoginPage() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_LOGIN_BACKEND_URL;

    const handleSubmit = async (e) => {
      e.preventDefault();

      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      if(email && password){
        
        const formData = {
          email: email,
          password: password
        }

        try {
          postApi(`/${BACKEND_URL}/login-user`, formData).then((data) => {
            console.log(data);
            sessionStorage.setItem('token', data.data);
            sessionStorage.setItem('fullname', data.user.lname + ' ' +data.user.fname);
            navigate('/')
            setError(false);
          });
  
          
          } catch (error) {
          console.error('Error login :', error);
          setError(true);
        }
      }        
    }

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-10 w-auto"
              src={logoimg}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Accedi
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow rounded-sm sm:px-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      ref={emailRef}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 opacity-75 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      ref={passwordRef}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 opacity-75 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
  
                <div className="flex items-center justify-between text-red-500">
                  {error && 'Email e/o password errati!'}
                </div>
  
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-sky-600 opacity-75 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 opacity-75"
                  >
                    Accedi
                  </button>
                </div>
              </form>
  
            </div>

          </div>
        </div>
      </>
    )
  }
  