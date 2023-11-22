import { IonApp, IonRouterLink } from '@ionic/react'
import style from './Login.module.css'
import '../global.css'

function Formulario() {
    return (
        <IonApp className={style.bodyForm}>
            <main>
                <div className={style.agendamento}>
                    <h1>Faça login</h1>
                    <fieldset>
                        <input type="radio" name="opcao" id="cliente" defaultChecked />
                        <label htmlFor="cliente">Sou Cliente</label>
                        <input type="radio" name="opcao" id="empresa" />
                        <label htmlFor="empresa">Sou Empresa</label>
                    </fieldset>
                </div>
                <div className={style.containerLogin}>
                    <div className={style.imgLogin}></div>
                    <form method="post" className={style.formLogin}>
                        <label htmlFor="login">Email</label>
                        <input type="text" name="login" id="login" autoComplete="on" placeholder="Seu login" />
                        <label htmlFor="senha">Senha</label>
                        <input type="password" name="senha" id="senha" autoComplete="on" placeholder="Sua senha" />
                        <button type="submit">Enviar</button>
                        <div className={style.novoUsuario}>
                            <p>Novo no reserva na Loja?</p>
                            <IonRouterLink routerLink='/cadastrar'><a>Clique aqui</a></IonRouterLink>
                        </div>
                    </form>
                </div>
            </main>
        </IonApp>
    )
}

export default Formulario