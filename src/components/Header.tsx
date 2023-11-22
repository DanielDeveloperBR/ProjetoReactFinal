import '../global.css'
const Header = ()=>{
    return (
        <header>
        <a href="index.html"><img src="img/logo.png" alt="logo"/></a>
        <span id="hamb"><i className="fa-solid fa-bars"></i></span>
        <nav>
            <ul>
                <li><a href="login.html">Login</a></li>
                <li><a href="cadastrar.html">Cadastrar-se</a></li>
                <li><a href="sobre.html">Sobre</a></li>
                <li><a href="faq.html" target="_blank">FAQ</a></li>
            </ul>
        </nav>
    </header>
    )
}
export default Header