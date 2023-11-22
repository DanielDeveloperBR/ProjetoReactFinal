import '../../global.css'
import style from '../../components/Login.module.css'
const Cadastrar = () => {
    return (
        <div className={style.containerGeral}>
            <section className={style.agendamento}>
                <h1>Criar uma conta</h1>
                <fieldset>
                    <input type="radio" name="opcao" id="cliente" defaultChecked />
                    <label htmlFor="cliente">Sou Cliente</label>
                    <input type="radio" name="opcao" id="empresa" />
                    <label htmlFor="empresa">Sou Empresa</label>
                </fieldset>
            </section>
            <div className={style.containerForm} id="formularios">
                {/* Cadastrar usuario cliente  */}
                <form method="post" className={style.formCadastro} id="formCliente">
                    <h1>Cadastrar Cliente</h1>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" placeholder="Seu nome completo" required />
                    <label htmlFor="senha">Senha</label>
                    <input type="password" name="senha" placeholder="Senha no máximo 10 caracteres" />
                    <label htmlFor="repetirSenha">Repetir a senha</label>
                    <input type="password" name="repetirSenha" placeholder="Digite a sua senha novamente" />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="seuemail@exemplo.com" />
                    <label htmlFor="cep">CEP</label>
                    <input type="number" name="cepCliente" maxLength={8} placeholder="Digite apenas números" id="cepCliente" />
                    <div className={style.containerNovosElementosCliente} ></div>
                    <button type="submit">Enviar</button>
                </form>
                {/* Cadastrar usuario Empresa  */}
                <form method="post" className={style.formCadastro} id="formEmpresa">
                    <h1>Cadastrar Empresa</h1>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" placeholder="Seu nome completo" />
                    <label htmlFor="empresa">Nome da Empresa</label>
                    <input type="text" name="empresa" placeholder="O nome da sua empresa" />
                    <label htmlFor="senha">Senha</label>
                    <input type="password" name="senha" placeholder="Senha no máximo 10 caracteres" />
                    <label htmlFor="repetirSenha">Repetir a senha</label>
                    <input type="password" name="repetirSenha" placeholder="Digite a sua novamente" />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="seuemail@exemplo.com" />
                    <label htmlFor="cnpj">CNPJ</label>
                    <input type="number" name="cnpj" placeholder="seuemail@exemplo.com" />
                    <label htmlFor="cep">CEP</label>
                    <input type="number" name="cepEmpresa" maxLength={8} placeholder="Digite apenas números" id="cepEmpresa" />
                    <div className={style.containerNovosElementosEmpresa} ></div>
                    <button type="submit" >Enviar</button>
                </form>
            </div>
        </div>
    )
}
export default Cadastrar