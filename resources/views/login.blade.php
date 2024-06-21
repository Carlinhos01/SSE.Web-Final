<!DOCTYPE html> 
<html lang="en"> 
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Document</title> 
    <link rel="stylesheet" href="/css/login.css"> 
</head> 
<body> 
    <div class="main-login"> 
        <div class="cont-all"> 
            <div class="left-login"> 
                <img src="/img/Logo.png" class="logo"> 
                <h1>Faça Login<br>E entre para o nosso time</h1> 
                <img src="/img/Mobile login-bro.png" class="icon-login"> 
            </div> 
            <div class="right-login"> 
                <div class="card-login"> 
                    <h1>LOGIN</h1> 
                    <div class="textfield"> 
                        <label for="usuario">Usuário:</label> 
                        <input type="text" name="usuario" placeholder="Usuário" id="Ruser"> 
                    </div> 
                    <div class="textfield"> 
                        <label for="senha">Senha:</label> 
                        <input type="password" name="senha" placeholder="Senha" id="Rsenha"> 
                    </div> 
                    <button class="btn-login" id="btn-login">Login</button> 
                </div> 
            </div> 
        </div> 
    </div> 

     
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script> 
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-analytics.js"></script> 
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script> 
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script> 
    <script src="/js/firebase.js"></script> 
</body> 
</html> 