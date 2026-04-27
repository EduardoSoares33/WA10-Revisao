"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function DetalhesCliente() {
  const router = useRouter();
  const { id } = useParams();

  const [cliente, setCliente] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [modalEnvioAberto, setModalEnvioAberto] = useState(false);
  const [modalEditarCliente, setModalEditarCliente] = useState(false);

  const [editFormData, setEditFormData] = useState<any>(null);

  const buscarDados = async () => {
    try {
      const response = await fetch(`http://localhost:8080/usuarios/${id}`);
      if (response.ok) {
        const dados = await response.json();
        setCliente(dados);
        setEditFormData(dados); 
      } else {
        router.push("/portal-admin");
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { if (id) buscarDados(); }, [id]);

  const handleSalvarEdicao = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        alert("✅ Dados atualizados com sucesso!");
        setModalEditarCliente(false);
        buscarDados(); 
      }
    } catch (error) {
      alert("Erro ao atualizar dados.");
    }
  };

  const handleEnviarDocumento = (e: React.FormEvent) => {
    e.preventDefault();
    alert("📁 Documento enviado para a fila de processamento!");
    setModalEnvioAberto(false);
  };

  const formatarCPF = (cpf: string) => cpf ? cpf.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : "";

  const inputStyle = { fontFamily: 'Inter', padding: '12px 15px', backgroundColor: '#236B94', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '0.95rem', width: '100%', boxSizing: 'border-box' as const };
  const labelStyle = { fontFamily: 'Inter', color: '#0C3851', fontWeight: 'bold' as const, fontSize: '0.9rem', display: 'block', marginBottom: '8px' };

  if (carregando) return <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Inter' }}>Carregando...</div>;
  if (!cliente) return null;

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <nav style={{ backgroundColor: '#0C3851', padding: '10px 15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <Link href="/portal-admin"><img src="/Icones/Logo.svg" alt="WA10" style={{ height: '35px' }} /></Link>
          <button onClick={() => router.push("/")} style={{ cursor: 'pointer', backgroundColor: 'transparent', border: '1px solid white', color: 'white', padding: '6px 15px', borderRadius: '5px', fontWeight: 'bold' }}>Sair</button>
        </div>
      </nav>

      <main style={{ minHeight: '80vh', padding: '40px 20px', backgroundColor: '#F4F7F6' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Link href="/portal-admin" style={{ textDecoration: 'none', color: '#0C3851', fontFamily: 'Inter', fontSize: '0.9rem', fontWeight: 'bold' }}>
            <i className="fa-solid fa-arrow-left"></i> Voltar
          </Link>

          <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginTop: '20px', marginBottom: '30px', borderLeft: '5px solid #0C3851' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h2 style={{ fontFamily: 'Inter', color: '#0C3851', margin: 0 }}>{cliente.nome}</h2>
              <p style={{ fontFamily: 'Inter', color: '#666', margin: 0 }}><strong>CPF:</strong> {formatarCPF(cliente.cpf)} | <strong>E-mail:</strong> {cliente.email}</p>
              <p style={{ fontFamily: 'Inter', color: '#666', margin: 0 }}><strong>Endereço:</strong> {cliente.logradouro}, {cliente.numero} {cliente.complemento ? `- ${cliente.complemento}` : ''} - {cliente.cidade}/{cliente.estado}</p>
            </div>
            <button onClick={() => setModalEditarCliente(true)} style={{ backgroundColor: '#236B94', color: '#fff', padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontWeight: 'bold', alignSelf: 'flex-start', fontSize: '0.9rem' }}>
              <i className="fa-solid fa-pen"></i> Editar Dados
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'Inter', color: '#0C3851' }}>Documentos</h3>
            <button onClick={() => setModalEnvioAberto(true)} style={{ backgroundColor: '#0C3851', color: '#FFF', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontWeight: 'bold' }}>
              <i className="fa-solid fa-cloud-arrow-up"></i> Enviar IRPF / Guia
            </button>
          </div>
        </div>

        {modalEditarCliente && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(10,10,15,0.85)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '20px', width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', padding: '40px' }}>
              <button onClick={() => setModalEditarCliente(false)} style={{ position: 'absolute', top: '25px', right: '25px', background: 'none', border: 'none', color: '#0C3851', fontSize: '24px', cursor: 'pointer' }}><i className="fa-solid fa-xmark"></i></button>
              <h3 style={{ fontFamily: 'Inter', fontWeight: 'bold', fontSize: '2rem', color: '#0C3851', margin: 0 }}>Editar <span style={{ color: '#236B94' }}>Cadastro</span></h3>
              
              <form onSubmit={handleSalvarEdicao} style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginTop: '25px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h4 style={{ fontFamily: 'Inter', color: '#0C3851', margin: 0, borderLeft: '4px solid #236B94', paddingLeft: '10px' }}>Dados Pessoais</h4>
                    <div>
                        <label style={labelStyle}>Nome Completo:</label>
                        <input style={inputStyle} value={editFormData.nome} onChange={(e) => setEditFormData({...editFormData, nome: e.target.value})} />
                    </div>
                    {/* GRID DE DADOS PESSOAIS COM CPF INCLUSO */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                        <div>
                          <label style={labelStyle}>CPF:</label>
                          <input style={inputStyle} value={editFormData.cpf} onChange={(e) => setEditFormData({...editFormData, cpf: e.target.value})} />
                        </div>
                        <div>
                          <label style={labelStyle}>E-mail:</label>
                          <input style={inputStyle} value={editFormData.email} onChange={(e) => setEditFormData({...editFormData, email: e.target.value})} />
                        </div>
                        <div>
                          <label style={labelStyle}>Telefone:</label>
                          <input style={inputStyle} value={editFormData.telefone} onChange={(e) => setEditFormData({...editFormData, telefone: e.target.value})} />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h4 style={{ fontFamily: 'Inter', color: '#0C3851', margin: 0, borderLeft: '4px solid #236B94', paddingLeft: '10px' }}>Endereço Completo</h4>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '20px' }}>
                        <div><label style={labelStyle}>CEP:</label><input style={inputStyle} value={editFormData.cep} onChange={(e) => setEditFormData({...editFormData, cep: e.target.value})} /></div>
                        <div><label style={labelStyle}>Logradouro (Rua):</label><input style={inputStyle} value={editFormData.logradouro} onChange={(e) => setEditFormData({...editFormData, logradouro: e.target.value})} /></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                        <div><label style={labelStyle}>Número:</label><input style={inputStyle} value={editFormData.numero} onChange={(e) => setEditFormData({...editFormData, numero: e.target.value})} /></div>
                        <div><label style={labelStyle}>Complemento:</label><input style={inputStyle} value={editFormData.complemento || ''} onChange={(e) => setEditFormData({...editFormData, complemento: e.target.value})} placeholder="Apto, Bloco..." /></div>
                        <div><label style={labelStyle}>Bairro:</label><input style={inputStyle} value={editFormData.bairro} onChange={(e) => setEditFormData({...editFormData, bairro: e.target.value})} /></div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                        <div><label style={labelStyle}>Cidade:</label><input style={inputStyle} value={editFormData.cidade} onChange={(e) => setEditFormData({...editFormData, cidade: e.target.value})} /></div>
                        <div><label style={labelStyle}>Estado (UF):</label><input style={inputStyle} value={editFormData.estado} onChange={(e) => setEditFormData({...editFormData, estado: e.target.value})} /></div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setModalEditarCliente(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '2px solid #0C3851', color: '#0C3851', fontWeight: 'bold', cursor: 'pointer' }}>Cancelar</button>
                  <button type="submit" style={{ flex: 2, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#0C3851', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Salvar Alterações</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {modalEnvioAberto && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', maxWidth: '500px', width: '100%' }}>
              <h3 style={{ fontFamily: 'Inter', color: '#0C3851', margin: 0 }}>Enviar Documento</h3>
              <form onSubmit={handleEnviarDocumento} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                <select style={inputStyle} required>
                  <option value="">Selecione o Tipo...</option>
                  <option value="IRPF">Declaração IRPF</option>
                  <option value="GUIA">Guia de Pagamento</option>
                </select>
                <input type="file" required style={{...inputStyle, backgroundColor: '#f4f4f4', color: '#333'}} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={() => setModalEnvioAberto(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>Cancelar</button>
                  <button type="submit" style={{ flex: 2, backgroundColor: '#0C3851', color: '#fff', padding: '10px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Confirmar Envio</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}