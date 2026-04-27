"use client";

import { useState } from "react";
import Link from "next/link";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSolicitar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/usuarios/esqueci-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: email
      });

      if (response.ok) {
        setMensagem("🚀 Link de recuperação gerado! Confira o console do seu IntelliJ.");
      } else {
        setMensagem("❌ E-mail não encontrado na base WA10.");
      }
    } catch (error) {
      setMensagem("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <main style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4F7F6', fontFamily: 'Inter' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <img src="/Icones/Logo.svg" alt="WA10" style={{ height: '40px', marginBottom: '20px' }} />
        <h2 style={{ color: '#0C3851', marginBottom: '10px' }}>Recuperar Senha</h2>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '25px' }}>Digite seu e-mail para receber um link de redefinição.</p>
        
        <form onSubmit={handleSolicitar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" placeholder="seu@email.com" required 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', outlineColor: '#236B94' }}
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" style={{ padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#0C3851', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
            Enviar Solicitação
          </button>
        </form>

        {mensagem && <p style={{ marginTop: '20px', fontSize: '0.85rem', color: mensagem.includes('🚀') ? 'green' : 'red' }}>{mensagem}</p>}
        
        <Link href="/" style={{ display: 'block', marginTop: '20px', color: '#236B94', textDecoration: 'none', fontSize: '0.9rem' }}>Voltar para o Login</Link>
      </div>
    </main>
  );
}