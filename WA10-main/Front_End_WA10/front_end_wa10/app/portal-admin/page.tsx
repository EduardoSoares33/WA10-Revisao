"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PortalAdmin() {
  const router = useRouter();

  const [clientes, setClientes] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    senhaHash: "wa10@2026", // alterar posteriormente para uma geração aleatória de senha
    tipoUsuario: "CLIENTE",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: ""
  });

  const formatarCPF = (cpf: string) => {
    const limpo = cpf.replace(/\D/g, ""); 
    return limpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const carregarClientes = async () => {
    try {
      const response = await fetch("http://localhost:8080/usuarios");
      if (response.ok) {
        const dados = await response.json();
        setClientes(dados);
      }
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoUsuario),
      });

      if (response.ok) {
        alert("🚀 Cliente cadastrado com sucesso!");
        setModalAberto(false);
        carregarClientes();  
        setNovoUsuario({ nome: "", cpf: "", email: "", telefone: "", senhaHash: "wa10@2026", tipoUsuario: "CLIENTE", cep: "", logradouro: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "" });
      } else {
        alert("Erro ao salvar. Verifique se o CPF/Email já existem.");
      }
    } catch (error) {
      alert("❌ Falha na conexão com o servidor Java.");
    }
  };

  const handleSair = () => router.push("/");

  const inputStyle = {
    fontFamily: 'Inter',
    padding: '12px 15px',
    backgroundColor: '#236B94',
    borderRadius: '8px',
    border: 'none',
    color: '#fff',
    fontSize: '0.95rem',
    width: '100%',
    boxSizing: 'border-box' as const
  };

  const labelStyle = {
    fontFamily: 'Inter',
    color: '#0C3851',
    fontWeight: 'bold' as const,
    fontSize: '0.9rem',
    display: 'block',
    marginBottom: '8px'
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <nav style={{ backgroundColor: '#0C3851', padding: '10px 15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <Link href="/portal-admin">
            <img src="/Icones/Logo.svg" alt="Logo WA10" style={{ height: '35px', width: 'auto' }} />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: 'white', fontFamily: 'Inter', fontSize: '0.9rem' }}>Painel do <strong>Administrador</strong></span>
            <button onClick={handleSair} style={{ cursor: 'pointer', backgroundColor: 'transparent', border: '1px solid white', color: 'white', padding: '6px 15px', borderRadius: '5px', fontWeight: 'bold' }}>Sair</button>
          </div>
        </div>
      </nav>

      <main style={{ minHeight: '80vh', padding: '40px 20px', backgroundColor: '#F4F7F6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', maxWidth: '1200px', margin: '0 auto 30px' }}>
          <div>
            <h2 style={{ fontFamily: 'Inter', color: '#0C3851', fontSize: '2rem' }}>Gestão de Clientes</h2>
            <p style={{ fontFamily: 'Inter', color: '#666' }}>Gerencie os acessos e documentos da sua carteira.</p>
          </div>
          <button className="botao-acao" onClick={() => setModalAberto(true)} >
            <i className="fa-solid fa-user-plus" style={{ marginRight: '8px' }}></i> Novo Cliente
          </button>
        </div>

        {modalAberto && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(10, 10, 15, 0.85)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', width: '100%', maxWidth: '850px', maxHeight: '90vh', color: '#333', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ padding: '30px 40px 20px', borderBottom: '1px solid #eee' }}>
                <button onClick={() => setModalAberto(false)} style={{ position: 'absolute', top: '25px', right: '25px', background: 'none', border: 'none', color: '#0C3851', fontSize: '24px', cursor: 'pointer' }}><i className="fa-solid fa-xmark"></i></button>
                <h3 style={{ fontFamily: 'Inter', fontWeight: 'bold', fontSize: '2rem', color: '#0C3851' }}>Adicionar <span style={{ color: '#236B94' }}>Novo Cliente</span></h3>
              </div>

              <div style={{ padding: '30px 40px', overflowY: 'auto', flex: 1 }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h4 style={{ fontFamily: 'Inter', color: '#0C3851', margin: 0, fontSize: '1.2rem', borderLeft: '4px solid #236B94', paddingLeft: '10px' }}>Dados Pessoais</h4>
                    <div>
                      <label style={labelStyle}>Nome Completo:</label>
                      <input type="text" required style={inputStyle} value={novoUsuario.nome} onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                      <div><label style={labelStyle}>CPF:</label><input type="text" required style={inputStyle} value={novoUsuario.cpf} onChange={(e) => setNovoUsuario({...novoUsuario, cpf: e.target.value})} /></div>
                      <div><label style={labelStyle}>E-mail:</label><input type="email" required style={inputStyle} value={novoUsuario.email} onChange={(e) => setNovoUsuario({...novoUsuario, email: e.target.value})} /></div>
                      <div><label style={labelStyle}>Telefone:</label><input type="tel" style={inputStyle} value={novoUsuario.telefone} onChange={(e) => setNovoUsuario({...novoUsuario, telefone: e.target.value})} /></div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h4 style={{ fontFamily: 'Inter', color: '#0C3851', margin: 0, fontSize: '1.2rem', borderLeft: '4px solid #236B94', paddingLeft: '10px' }}>Endereço</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                      <div><label style={labelStyle}>CEP:</label><input type="text" style={inputStyle} value={novoUsuario.cep} onChange={(e) => setNovoUsuario({...novoUsuario, cep: e.target.value})} /></div>
                      <div><label style={labelStyle}>Logradouro:</label><input type="text" style={inputStyle} value={novoUsuario.logradouro} onChange={(e) => setNovoUsuario({...novoUsuario, logradouro: e.target.value})} /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                      <div><label style={labelStyle}>Número:</label><input type="text" style={inputStyle} value={novoUsuario.numero} onChange={(e) => setNovoUsuario({...novoUsuario, numero: e.target.value})} /></div>
                      <div><label style={labelStyle}>Bairro:</label><input type="text" style={inputStyle} value={novoUsuario.bairro} onChange={(e) => setNovoUsuario({...novoUsuario, bairro: e.target.value})} /></div>
                      <div><label style={labelStyle}>Cidade:</label><input type="text" style={inputStyle} value={novoUsuario.cidade} onChange={(e) => setNovoUsuario({...novoUsuario, cidade: e.target.value})} /></div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '20px', marginTop: '20px', paddingBottom: '20px' }}>
                    <button type="button" onClick={() => setModalAberto(false)} style={{ flex: 1, padding: '15px', borderRadius: '10px', border: '2px solid #0C3851', color: '#0C3851', fontWeight: 'bold' }}>Cancelar</button>
                    <button type="submit" style={{ flex: 2, padding: '15px', borderRadius: '10px', border: 'none', backgroundColor: '#0C3851', color: '#fff', fontWeight: 'bold' }}>Salvar Cadastro</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* LISTAGEM (MANTENDO O GRID ORIGINAL + CPF COM PONTUAÇÃO) */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="cabecalho-grid hidden-mobile" style={{ padding: '0 25px 10px 25px', fontFamily: 'Inter', fontWeight: 'bold', color: '#0C3851', fontSize: '0.9rem', opacity: 0.8, display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr' }}>
            <div>Nome do Cliente</div>
            <div>CPF / Documento</div>
            <div style={{ textAlign: 'center' }}>Status</div>
            <div style={{ textAlign: 'right' }}>Ação</div>
          </div>

          {clientes.map((cliente: any) => (
            <div key={cliente.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '20px 25px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #F0F0F0', display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ backgroundColor: '#E8F8F5', color: '#4DD3C1', width: '45px', height: '45px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><i className="fa-solid fa-user"></i></div>
                <div style={{ fontFamily: 'Inter' }}>
                  <div style={{ fontWeight: 'bold', color: '#0C3851' }}>{cliente.nome}</div>
                  <div style={{ fontSize: '0.8rem', color: '#888' }}>ID: #00{cliente.id}WA10</div>
                </div>
              </div>
              {/* CPF JÁ COM A PONTUAÇÃO AUTOMÁTICA */}
              <div style={{ fontFamily: 'Inter', color: '#444' }}>{formatarCPF(cliente.cpf)}</div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ backgroundColor: '#E8F8F5', color: '#117A65', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>Ativo</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Link href={`/portal-admin/cliente/${cliente.id}`} style={{ backgroundColor: '#0C3851', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem' }}>Ver Detalhes</Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}