import React, { useState, useEffect } from "react";
import InputField from "./components/InputField";

function Login({ onClose, onSignUp }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email invalide";
    if (!formData.password) newErrors.password = "Mot de passe requis";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    try {
      // Simule une requête serveur
      await new Promise((res) => setTimeout(res, 1000));
      // Ici, tu pourrais afficher un message de succès ou rediriger
      setIsLoading(false);
      onClose && onClose();
    } catch (err) {
      setIsLoading(false);
      setErrors({ submit: "Erreur lors de la connexion." });
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/60 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-slate-900/90 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-blue-400 hover:text-pink-400 text-xl"
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>
        <h2 className="text-3xl font-dena text-blue-300 mb-6 text-center">
          Connexion
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Entrez votre email"
            autoComplete="email"
          />
          <InputField
            label="Mot de passe"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Mot de passe"
            autoComplete="current-password"
          />
          {errors.submit && (
            <div
              className="text-pink-400 text-center text-sm mt-2"
              role="alert"
            >
              {errors.submit}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-900 text-white font-dena text-lg shadow hover:from-blue-500 hover:to-blue-800 transition-all disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <div className="mt-4 text-center flex flex-col gap-2">
          <button
            type="button"
            className="text-blue-300 hover:text-pink-400 underline font-dena"
            onClick={onSignUp}
          >
            Créer un compte
          </button>
          <button
            type="button"
            className="text-blue-300 hover:text-pink-400 underline font-dena"
            // Ajoute ici ta logique pour le mot de passe oublié si besoin
          >
            Mot de passe oublié ?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;