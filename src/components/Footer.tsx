import '../global.css'
const Footer = ()=>{
    return(
        <footer>
        <h1>Fale conosco</h1>
        <div className="containerSocial">
            <div className="contatos">

                <p>(21) 96778-2777</p>
                <i className="fa-brands fa-whatsapp social"></i>

            </div>
            <div className="contatos">
                <p>(21) 96778-2777</p>
                <i className="fa-solid fa-phone social"></i>
            </div>
            <div className="contatos">
                <p>danieldetrabalho1@gmail.com</p>
                <i className="fa-regular fa-envelope social"></i>
            </div>
        </div>

        <div>
            <img src="img/agenda-footer.png" alt=""/>
        </div>
        <p>&copy; Todos os direitos reservados</p>
    </footer>
    )
}
export default Footer