import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";
import { useRegisterMutation } from "../../services/authApi";
import {UseAppDisptacth} from "../../store";

export default function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = UseAppDisptacth();
    const [register, { isLoading }] = useRegisterMutation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password.length < 4) {
            setError("Пароль має містити мінімум 4 символи.");
            return;
        }

        if (password !== confirm) {
            setError("Паролі не співпадають.");
            return;
        }

        try {
            const res = await register({
                username,
                password,
                password2: confirm,
            }).unwrap();

            alert(res.message);

            dispatch(setCredentials({ user: username, token: null }));
            navigate("/");
        } catch (err: any) {
            if (err?.data) {
                setError(JSON.stringify(err.data));
            } else {
                setError("Сталася помилка під час реєстрації.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                    Реєстрація
                </h2>

                {error && (
                    <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">
                            Логін
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">
                            Пароль
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 dark:text-gray-300">
                            Повторіть пароль
                        </label>
                        <input
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
                    >
                        {isLoading ? "Реєстрація..." : "Зареєструватись"}
                    </button>

                    <div className="mt-4 text-sm text-center">
                        Вже є аккаунт?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-blue-500 cursor-pointer hover:underline"
                        >
              Вхід
            </span>
                    </div>
                </form>
            </div>
        </div>
    );
}