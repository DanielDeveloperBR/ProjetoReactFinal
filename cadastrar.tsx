import React, { useState } from 'react';
import {
  IonContent,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonAlert
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import style from './cadastrar.module.css';

const Cadastrar = () => {

  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState('cliente');
  const [formData, setFormData] = useState({
    nome: '',
    senha: '',
    repetirSenha: '',
    email: '',
    cep: '',
    bairro: '',
    cidade: '',
    endereco: '',
    estado: '',
    nomeEmpresa: '',
    cnpj: '',
  });
  const [cepValido, setCepValido] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // const handleInputChange = (e: any) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //   if (e.target.name === 'cep') {
  //     if (e.target.value.length <= 8) {
  //       buscarCEP(e.target.value);
  //     } else {
  //       resetarCamposCep();
  //     }
  //   }
  // }
  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    if (name === 'cep') {
      if (value.length > 8) {
        return
      } else if (value.length === 8) {
        buscarCEP(value);
      } else {
        setCepValido(false); // CEP inválido se for menor que 8 caracteres
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const buscarCEP = async (cep: any) => {
    setIsSearching(true);
    if (cep.length !== 8) {
      resetarCamposCep();
      setIsSearching(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/cep/${cep}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro na solicitação. Status: ' + response.status);
      }

      const result = await response.json();

      if (result.erro) {
        setAlertMessage('CEP não encontrado');
        setShowAlert(true);
        resetarCamposCep();
        setIsSearching(false);
        return;
      }

      setFormData(prevData => ({
        ...prevData,
        bairro: result.bairro,
        cidade: result.localidade,
        endereco: result.logradouro,
        estado: result.uf
      }));
      setCepValido(true);
    } catch (error) {
      setAlertMessage('Erro ao buscar CEP');
      setShowAlert(true);
      resetarCamposCep();
    } finally {
      setIsSearching(false);
    }
  };

  const resetarCamposCep = () => {
    setCepValido(false);
    setFormData(prevData => ({
      ...prevData,
      bairro: '',
      cidade: '',
      endereco: '',
      estado: ''
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Dados do Formulário:', formData);
    // Exemplo: navigate('/pagina-destino');
  };
  type FormDataKey = keyof typeof formData;
  const criarInput = (labelText: string, nomeInput: FormDataKey, readOnly = false) => {
         return ( <IonInput
          name={nomeInput}
          value={formData[nomeInput]}
          onIonChange={handleInputChange}
          readonly={readOnly}
          required
          label={labelText}
          label-placement="floating"
          fill="solid"
          placeholder={labelText}
          />

    )
  }

  return (
    <IonContent>
      <div className={style.container}>
        {isSearching && (
          <div className={style.spinnerOverlay}>
            <div className={style.spinner}></div>
          </div>
        )}
        <IonRadioGroup value={tipoUsuario} onIonChange={e => {
          setTipoUsuario(e.detail.value);
          resetarCamposCep();
        }}>
          <IonItem>
            <IonLabel>Cliente</IonLabel>
            <IonRadio value="cliente" />
          </IonItem>
          <IonItem>
            <IonLabel>Empresa</IonLabel>
            <IonRadio value="empresa" />
          </IonItem>
        </IonRadioGroup>
        <form onSubmit={handleSubmit} className={style.containerFormulario}>
          {criarInput('Nome', 'nome')}
          {criarInput('Email', 'email')}
          {tipoUsuario === 'empresa' && criarInput('Nome da Empresa', 'nomeEmpresa')}
          {criarInput('Senha', 'senha')}
          {criarInput('Repetir Senha', 'repetirSenha')}
          {tipoUsuario === 'empresa' && criarInput('CNPJ', 'cnpj')}
          {criarInput('CEP', 'cep')}

          {cepValido && (
            <>
              {criarInput('Bairro', 'bairro', true)}
              {criarInput('Cidade', 'cidade', true)}
              {criarInput('Endereco', 'endereco', true)}
              {criarInput('Estado', 'estado', true)}
            </>
          )}
          <IonButton type="submit" disabled={isSearching}>Enviar</IonButton>
        </form>
        {isSearching && <div className={style.loading}>Carregando...</div>}
      </div>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Alerta'}
        message={alertMessage}
        buttons={['OK']}
      />
    </IonContent>
  );
};

export default Cadastrar;