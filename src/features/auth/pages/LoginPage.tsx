import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';

interface LocationState {
    from?: Location;
}

const LoginPage: React.FC = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as LocationState | undefined;

    const [username, setUsername] = useState('kminchelle');
    const [password, setPassword] = useState('0lelplR');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate(state?.from?.pathname ?? '/products', { replace: true });
        }
    }, [isAuthenticated, navigate, state]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            await login(username, password);
        } catch (err) {
            setError((err as Error).message || 'Login failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="mx-auto max-w-sm space-y-4 rounded border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">Login</h2>
            <p className="text-xs text-slate-500">
                Use DummyJSON test user: <code>kminchelle / 0lelplR</code>
            </p>

            <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-700">
                        Username
                    </label>
                    <input
                        type="text"
                        className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-xs font-medium text-slate-700">
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                {error && (
                    <div className="rounded border border-red-200 bg-red-50 p-2 text-xs text-red-700">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
            </form>

            <p className="text-xs text-slate-500">
                No account?{' '}
                <Link to="/register" className="text-blue-600 underline">
                    Register
                </Link>
            </p>
        </section>
    );
};

export default LoginPage;