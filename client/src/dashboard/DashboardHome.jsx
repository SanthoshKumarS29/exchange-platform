import React from 'react'
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
    const navigate = useNavigate();

    let user = null;

    try {
        user = JSON.parse(localStorage.getItem('userData') || 'null');
    } catch {
        user = null;
    }

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userSessionExpiry');
        localStorage.removeItem('userData');

        navigate('/login', { replace: true });
    };

  return (
    <main className="min-h-screen bg-slate-50">
            <header className="flex items-center justify-between border-b bg-white px-6 py-4">
                <h1 className="text-xl font-bold text-slate-900">
                    Exchange Platform
                </h1>

                <button
                    onClick={handleLogout}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                >
                    Log out
                </button>
            </header>

            <section className="mx-auto max-w-6xl px-6 py-10">
                <h2 className="text-2xl font-bold text-slate-900">
                    Welcome{user?.name ? `, ${user.name}` : ''}
                </h2>

                <p className="mt-2 text-slate-600">
                    Your login is successful. Your exchange workspace
                    will be built here.
                </p>

                <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
                    <h3 className="text-lg font-semibold text-slate-900">
                        Markets
                    </h3>

                    <p className="mt-2 text-sm text-slate-600">
                        The market list is our next feature. It will show
                        trading pairs, prices, 24-hour changes, and volume.
                    </p>
                </div>
            </section>
        </main>
  )
}

export default DashboardHome