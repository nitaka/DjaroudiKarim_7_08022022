<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div class="container">
        <a class="navbar-brand" href="#">
          <router-link to="/home" ><img src="./assets/icon-left-font-monochrome-white.png" alt="Logo groupomania et lien acceuil" class="logoNav" ></router-link>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="user">
              <a class="nav-link">
                <router-link :to="{ name: 'user', params: { userId: user.id } }">
                  <img v-bind:src="user.imgProfil"  alt="Image du profil" class="userImg" @click="refresh"/>
                </router-link>
              </a>
            </li>
            <li class="nav-item" v-if="user">
              <a class="nav-link">
                <router-link to="/setting">
                  <img src="./assets/icon-setting.png" alt="setting" class="setting"/>
                </router-link>
              </a>
            </li>
            <li class="nav-item" v-if="user">
              <a class="nav-link">
                <router-link to="/">
                  <img @click="deconnexion" src="./assets/icon-logout.png" alt="logout" class="logout" id="logout"/>
                </router-link>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
<router-view :key="$route.fullPath"/>
</template>

<script>
import axios from "axios";
import router from '@/router/index.js';
import store from '@/store/index.js';
const CryptoJS = require("crypto-js");


export default {
  data() {
    return {
      user: null,
      token: document.cookie
        ? document.cookie.split("; ").find((row) => row.startsWith("user-token=")).split("=")[1]
      : null,
      userId: document.cookie
        ? CryptoJS.AES.decrypt(document.cookie.split("; ").find((row) => row.startsWith("userId=")).split("=")[1],
          store.state.CryptoKey).toString(CryptoJS.enc.Utf8)
      : null,
    };
  },
  methods: {
    sendMessage() {
      document.querySelector('.cont').classList.toggle('s--signup'); 
    },

    deconnexion() {
      document.cookie = "userId=";
      document.cookie = "user-token=";
      router.go();
    },

    getCurrentUser() {
      
      axios.post("http://localhost:3000/api/user",{ userId: this.userId },
      { 
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((res) => (this.user = res.data[0]))
      .catch(function (error) {
        if (error.res && error.res.status === 400) {
          document.cookie = "userId=";
          document.cookie = "user-token=";
          router.push("/");
        }
      });
    },
  },
  mounted() {
    this.getCurrentUser();
  },
}
</script>

<style scoped lang="scss">
.logoNav {
    height: 1.5em;
}

.logout,.setting {
  height: 30px;
  color: #ffffff;
}

.userImg{
  height: 50px;
  width: 50px;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 40px;
  border-radius: 100%;
  object-fit: cover;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  background: #b6b6b6;
}

input, button {
  border: none;
  outline: none;
  background: none;
  font-family: 'Open Sans', Helvetica, Arial, sans-serif;
}

$contW: 900px;
$imgW: 260px;
$formW: $contW - $imgW;
$switchAT: 1.2s;

$inputW: 260px;
$btnH: 60px;

$diffRatio: ($contW - $imgW) / $contW;

@mixin signUpActive {
  .cont.s--signup & {
    @content;
  }
}

.tip {
  font-size: 20px;
  margin: 40px auto 50px;
  text-align: center;
}

.cont {
  overflow: hidden;
  position: relative;
  width: $contW;
  height: 550px;
  margin: 0 auto 100px;
  background: #fff;
}

.form {
  position: relative;
  width: $formW;
  height: 100%;
  transition: transform $switchAT ease-in-out;
  padding: 50px 30px 0;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: $formW;
  top: 0;
  width: $contW;
  height: 100%;
  padding-left: $imgW;
  background: #fff;
  transition: transform $switchAT ease-in-out;

  @include signUpActive {
    transform: translate3d($formW * -1,0,0);
  }
}

button {
  display: block;
  margin: 0 auto;
  width: $inputW;
  height: $btnH;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: $imgW;
  height: 100%;
  padding-top: 360px;

  &:before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: $contW;
    height: 100%;
    background-image: url('./assets/avatar.png');
    background-size: cover;
    transition: transform $switchAT ease-in-out;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
  }

  @include signUpActive {
    &:before {
      transform: translate3d($formW,0,0);
    }
  }

  &__text {
    z-index: 2;
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    padding: 0 20px;
    text-align: center;
    color: #fff;
    transition: transform $switchAT ease-in-out;

    h2 {
      margin-bottom: 10px;
      font-weight: bold;
      background: #333333;
    }

    p {
      font-size: 14px;
      line-height: 1.5;
      background: #333333;
    }

    &.m--up {

      @include signUpActive {
        transform: translateX($imgW*2);
      }
    }

    &.m--in {
      transform: translateX($imgW * -2);

      @include signUpActive {
        transform: translateX(0);
      }
    }
  }

  &__btn {
    overflow: hidden;
    z-index: 2;
    position: relative;
    width: 150px;
    height: $btnH;
    margin: 0 auto;
    background: #2E2E2E;
    border-radius: 50px;
    color: #ffffff;
    text-transform: uppercase;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
    
    &:after {
      content: '';
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 2px solid #fff;
      border-radius: 30px;
    }

    span {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      transition: transform $switchAT;
      
      &.m--in {
        transform: translateY($btnH*-2);
        
        @include signUpActive {
          transform: translateY(0);
        }
      }
      
      &.m--up {
        @include signUpActive {
          transform: translateY($btnH*2);
        }
      }
    }
  }
}

h2 {
  width: 100%;
  font-size: 26px;
  text-align: center;
}

label {
  display: block;
  width: $inputW;
  margin: 25px auto 0;
  text-align: center;

  span {
    font-size: 12px;
    color: #000000;
    text-transform: uppercase;
  }
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0,0,0,0.4);
  text-align: center;
}

.forgot-pass {
  margin-top: 15px;
  text-align: center;
  font-size: 12px;
  color: #cfcfcf;
}

.submit {
  margin-top: 40px;
  margin-bottom: 20px;
  background: #052ba7;
  text-transform: uppercase;
}

.fb-btn {
  border: 2px solid #d3dae9;
  color: darken(#d3dae9, 20%);

  span {
    font-weight: bold;
    color: darken(#768cb6, 20%);
  }
}

.sign-in {
  transition-timing-function: ease-out;

  @include signUpActive {
    transition-timing-function: ease-in-out;
    transition-duration: $switchAT;
    transform: translate3d($formW,0,0);
  }
}

.sign-up {
  transform: translate3d($contW * -1,0,0);

  @include signUpActive {
    transform: translate3d(0,0,0);
  }
}

.icon-link {
  position: absolute;
  left: 5px;
  bottom: 5px;
  width: 32px;

  img {
    width: 100%;
    vertical-align: top;
  }

  &--twitter {
    left: auto;
    right: 5px;
  }
}
</style>
