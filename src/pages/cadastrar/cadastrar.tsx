import React, { useState, useEffect } from 'react';
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
  IonRadioGroup,
  IonRadio,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import style from './cadastrar.module.css';

const Cadastrar: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    senha: '',
    repetirSenha: '',
    email: '',
    cep: '',
    tipo: 'cliente',
    bairro: '',
    cidade: '',
    endereco: '',
    estado: '',
  });
  const [autoFilled, setAutoFilled] = useState(false);
  const [cepValido, setCepValido] = useState(false);
  const [data, setData] = useState<any | null>(null);
  const [section, setSection] = useState(1);
  let cepAtual: string;

  useEffect(() => {
    eventoCep();
  }, [formData.cep, autoFilled]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    if (autoFilled) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      tipo: e.detail.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nome, cep, senha } = formData;

    if (section === 1 && nome === '') {
      alert('Preencha todos os campos');
      return;
    }

    if (section === 2 && senha === '') {
      alert('Preencha todos os campos');
      return;
    }

    try {
      if (section === 1) {
        setSection(2);
      } else if (section === 2) {
        setSection(3);
      } else if (section === 3) {
        const result = await fetch(`http://localhost:3000/cep/${cep}/`);
        const data = await result.json();

        console.log('Dados do CEP:', data);

        setData(data);
        setAutoFilled(true);
        console.log('Dados enviados:', formData);
        // navigate('/home');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro no envio do formulário');
    }
  };

  const eventoCep = async () => {
    cepAtual = formData.tipo === 'cliente' ? 'cepCliente' : 'cepEmpresa';

    if (cepAtual) {
      const cepElement: any = document.getElementById(cepAtual);

      if (cepElement) {
        cepElement.addEventListener('ionInput', async (event: any) => {
          const cep = event.detail.value.trim();
          event.target.value = cep.replace(/-/g, '');

          if (cep.length !== 8) {
            resetarCampos();
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

            if (cepAtual === 'cepCliente' || cepAtual === 'cepEmpresa') {
              preencherCampos(result);
            } else if (result.erro) {
              mostrarMensagem('CEP não encontrado');
            }
          } catch (error) {
            resetarCampos();
            mostrarMensagem('Erro ao buscar CEP');
          }
        });
      }
    }
  };

  const resetarCampos = () => {
    setFormData((prevData) => ({
      ...prevData,
      cep: '',
      bairro: '',
      cidade: '',
      endereco: '',
      estado: '',
    }));
    setCepValido(false);
    setAutoFilled(false);
  };

  const preencherCampos = (result: any) => {
    if (cepValido) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      bairro: result.bairro,
      cidade: result.localidade,
      endereco: result.logradouro,
      estado: result.uf,
    }));

    setCepValido(true);
    setAutoFilled(true);
  };

  const criarInput = (labelText: string, inputValue: any, nomeInput: string) => {
    return (
      <IonInput label={labelText} key={nomeInput} name={nomeInput} value={inputValue} readonly={true} />
    );
  };

  const mostrarMensagem = (mensagem: string) => {
    alert(mensagem);
  };

  const isFormValid = () => {
    if (section === 1) {
      return formData.nome !== '' && formData.email !== '';
    } else if (section === 2) {
      return formData.senha !== '' && formData.repetirSenha !== '';
    } else if (section === 3) {
      return cepValido;
    }
    return false;
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agendamento Expresso</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className={style.container}>
          <IonTitle>Cadastrar {formData.tipo === 'cliente' ? 'Cliente' : 'Empresa'}</IonTitle>
          <IonRadioGroup value={formData.tipo} onIonChange={handleRadioChange} className={style.field}>
            <IonRadio name='opcao' value='cliente' id='cliente' labelPlacement='start' alignment='center' className='ion-margin-start'>
              Sou Cliente
            </IonRadio>
            <IonRadio name='opcao' value='empresa' id='empresa' labelPlacement='start' alignment='center' className='ion-margin-start'>
              Sou Empresa
            </IonRadio>
          </IonRadioGroup>
          <form onSubmit={handleSubmit} className={style.containerFormulario}>
            {section === 1 && (
              <>
                <IonInput
                  label="nome"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Digite o sua nome"
                  type="text"
                  name='nome'
                  value={formData.nome}
                  onIonChange={handleInputChange}
                  required
                  clearInput={true}
                />
                <IonInput
                  label="Email"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Digite o sua email"
                  type="email"
                  name='email'
                  value={formData.email}
                  onIonChange={handleInputChange}
                  required
                  clearInput={true}
                />
              </>
            )}
            {section === 2 && (
              <>
                <IonInput
                  label="Senha"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Digite a sua senha"
                  type="password"
                  name='senha'
                  value={formData.senha}
                  onIonChange={handleInputChange}
                  required
                  clearInput={true}
                />
                <IonInput
                  label="Repetir a senha"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Digite a sua senha novamente"
                  type="password"
                  name='repetirSenha'
                  value={formData.repetirSenha}
                  onIonChange={handleInputChange}
                  required
                  clearInput={true}
                />
              </>
            )}
            {section === 3 && (
              <>
                <IonInput
                  label="CEP"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Digite o seu cep"
                  type="number"
                  name='cep'
                  value={formData.cep}
                  onIonChange={handleInputChange}
                  required
                  clearInput={true}
                />
                {autoFilled && data && (
                  <>
                    {criarInput('Bairro', formData.bairro, 'bairro')}
                    {criarInput('Cidade', formData.cidade, 'cidade')}
                    {criarInput('Endereco', formData.endereco, 'endereco')}
                    {criarInput('Estado', formData.estado, 'estado')}
                  </>
                )}
              </>
            )}
            <IonButton expand="block" type="submit" disabled={!isFormValid()}>
              Enviar
            </IonButton>
            {section > 1 && (
              <IonButton expand="block" onClick={() => setSection(section - 1)}>
                Voltar
              </IonButton>
            )}
          </form>
        </div>
      </IonContent>
    </>
  );
};

export default Cadastrar;
