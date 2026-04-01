<template>

<div  class=" d-flex flex-column">
    <div class="page page-center login-page-wrapper">
      <div class="container container-normal py-4 ">
        <div class="row align-items-center g-4">
          <div class="col-lg">
            <div class="container-tight my-5">
              <div class="text-center mb-4">
                <!---a href="." class="navbar-brand navbar-brand-autodark" v-if="false"><img src="./static/logo.svg" height="36" alt=""></a-->
              </div>
              <div class="card card-md my-5">
                <div class="card-body my-5">
                    <form class="card" @submit.prevent="submit">
                        <div class="card-header">
                            <h4 class="card-title">Connexion</h4>
                        </div>
                        <div class="card-body">
                            <div class="row g-5">
                            <div class="col-xl-12">
                                <div class="row">
                                <div class="col-md-6 col-xl-12">
                                    <div class="mb-3">
                                        <label class="form-label required">Email ou numero téléphone</label>
                                        <input type="text" class="form-control"  placeholder="Required..." v-model="payload.username">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label required">mot de passe</label>
                                        <input type="password" class="form-control"  placeholder="Required..." v-model="payload.pwd">
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="card-footer ">
                          <div class="d-flex text-end">
                              <button class="btn btn-primary ms-auto">Connexion</button>
                          </div>
                          <div><a href="#" class="text-info">Politiques de confidentialité</a></div>
                          <div><a href="#" class="text-info">Accord de confidentialité</a></div>
                        </div>
                    </form>
                  <div ref="googleButton" class="mt-3"></div>

                  <div v-if="user">
                    <p>Connecté en tant que : <strong>{{ user.name }}</strong></p>
                    <img :src="user.picture" alt="Avatar" width="50">
                    <button @click="logout">Se déconnecter</button>
                  </div>
                </div>
              </div>
              <div class="text-center text-secondary mt-3">
              </div>
            </div>
          </div>
          <div class="col-lg d-none d-lg-block">
            <img src="/static/illustrations/process_3.webp" height="300" class="d-block mx-auto" alt="">
          </div>
        </div>
      </div>
    </div>
   </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useUserConnectStore } from "@/stores/user";

definePageMeta({
  layout: false,
    
    
    middleware: [
      'guest'
    ],
  });

const config = useRuntimeConfig()

const userStore = useUserConnectStore()

const clientId = config.public.goole_client_id;
console.log(clientId)
const user = ref(null);
const googleButton = ref(null);
const token = ref(null); // Stocke le token JWT
const payload = ref({})


const handleCredentialResponse = (response) => {
  token.value = response.credential; // Stocke le token JWT
  const userInfo = parseJwt(response.credential);
  user.value = userInfo;
  console.log("Utilisateur connecté :", userInfo);

  sendTokenToBackend(response.credential); // Envoyer au backend
};

// Déconnexion
const logout = () => {
  window.google.accounts.id.disableAutoSelect(); // Empêcher la reconnexion automatique
  user.value = null;
  token.value = null;
  console.log("Utilisateur déconnecté");
};

// Initialiser Google Sign-In
onMounted(() => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse
    });

    window.google.accounts.id.renderButton(googleButton.value, {
      theme: "outline",
      size: "large"
    });

    window.google.accounts.id.prompt(); // Afficher automatiquement le pop-up
  }
});
  const submit = async () => {
    try {
      userStore.loginNormal(payload.value)
    } catch (error) {
      console.log(error)
    }
  }

// Envoyer le token au backend
const sendTokenToBackend = async (token) => {
  try {
    //console.log(token)
    let url = config.public.google_url
    let auth_redirect = config.public.auth_redirect + "?token=" + token
    const router = useRouter()
    userStore.login(token)
    //const {data} = await axios.post("/api/login", { token })

    /*const response = await fetch("http://145.223.33.161/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    });*/
    //console.log("OKKK")
    console.log("Réponse du serveur :", data);
    //navigateTo(auth_redirect, { external: true })

    //const data = await response.json();
  } catch (error) {
    console.error("Erreur lors de l'envoi du token :", error);
  }
};

// Fonction pour décoder le JWT
const parseJwt = (token) => {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(''));

  return JSON.parse(jsonPayload);
};
</script>
<style>

.login-page-wrapper {
flex: 1;
padding-top: 6rem;
min-height: 100vh;
margin: 0;
/* --- AJOUT DU BACKGROUND --- */
background-image: url('/public/img/backgroud_2.webp');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
background-attachment: fixed; /* L'image reste fixe lors du scroll */

/* Optionnel : superposition d'une légère couche blanche si le contenu est dur à lire */
background-blend-mode: overlay; 
background-color: rgba(0, 0, 0, 0.2);
}
</style>
