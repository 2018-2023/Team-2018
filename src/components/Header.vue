<template>
  <div id="app">
    <div id="nav">
      <h1 class="title">アプリの名前</h1>
      <a href="#" class="menu">menu</a>
      <router-link to="/" class="link" id="Home">Home</router-link> 
      <router-link to="/about" class="link" id="About">About</router-link> 
      
      <router-link to="/Login" class="link" id="Login">Login</router-link> 
      <router-link to="/detail" class="link" id="detail">詳細</router-link> 
      <router-link to="/my-page" class="link" id="mypage">マイページ</router-link>
    </div>
  </div>
</template>








<style scoped>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
} */
.menu{
  height: 100%;
  width: 100px;
  padding: 30px;
  display: none;

}

#nav {
  height: 100px;
  background-image: url(https://blog.pokke.in/wp-content/uploads/2017/11/shutterstock_212193184-min-1024x614.jpg);
  background-color: rgba(255, 255, 255, 0.3);
  background-blend-mode: lighten;
  background-size: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  
}
.link{
  display: flex;
  padding:0px 20px;
  align-items: center;
  font-family: cursive;
  border-right: 1px solid black ;
  background-color: rgba(255, 255,255, 0.6);
}

.link:hover{
  background-color: rgba(255, 255,255, 0.9);
  transition: 0.5s;
}

#Home {
  border-left: 1px solid black ;
}


.title {
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding-left: 30px;
}



#nav a {
  font-weight: bold;
  color:black;
  text-decoration: none;

}

#nav a.router-link-exact-active {
  
  font-weight: bold;
}

@media(max-width:768px) {
  .link {
    display: none;
  }
  .menu{
    display: block;
    font-family: cursive;
    font-size: 20px;
    padding: 35px;
    margin-right: 20px;
    background-color: rgba(255, 255,255, 0.6);
  }

  .menu:hover{
    background-color: rgba(255, 255,255, 0.9);
    transition: 0.5s;
  }
  .title{
    justify-content: center;
  }

}
</style>