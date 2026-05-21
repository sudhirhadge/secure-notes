import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        // In real app, call a /register endpoint.
        // Here we simulate and redirect to login with provided username.
        setTimeout(() => {
            setIsSubmitting(false);
            navigate('/login', {
                replace: true,
                state: { presetUsername: username },
            });
        }, 600);
    };

    return (
        <section className="mx-auto max-w-sm space-y-4 rounded border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold">Register</h2>
            <p className="text-xs text-slate-500">
                This is a demo registration screen; DummyJSON does not support real signup.
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
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                </button>
            </form>

            <p className="text-xs text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 underline">
                    Login
                </Link>
            </p>
        </section>
    );
};

export default RegisterPage;