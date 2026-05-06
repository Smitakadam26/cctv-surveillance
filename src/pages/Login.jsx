import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, User, Lock, ArrowRight, Zap } from 'lucide-react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate a short network delay for better UX
    setTimeout(() => {
      const success = login(username, password);
      
      if (success) {
        navigate('/');
      } else {
        setError('Invalid username or password. (Hint: admin / password)');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center items-center space-x-3 mb-6">
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 shadow-xl">
            <Zap className="h-10 w-10 text-blue-500" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-100 tracking-tight">
          System Access
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Enter your credentials to access the secure dashboard.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900/80 backdrop-blur-xl py-8 px-4 shadow-2xl border border-slate-800 sm:rounded-2xl sm:px-10">
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300">
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-3 border border-slate-700 rounded-xl bg-slate-950/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-3 border border-slate-700 rounded-xl bg-slate-950/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-900/30 border border-red-500/50 p-4 flex items-start">
                <div className="flex-shrink-0">
                  <ShieldAlert className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-400">{error}</h3>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500 transition duration-200 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    Secure Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-xs text-slate-500">
            Secure connection established. Unauthorized access is strictly prohibited.
          </div>
        </div>
      </div>
    </div>
  );
};
