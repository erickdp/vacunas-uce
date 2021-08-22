<template>
  <v-app>
    <div>
      <v-app-bar
        flat
        app
        color="primary"
      >
        <v-app-bar-nav-icon dark v-if="!$vuetify.breakpoint.xs" @click.stop="mini = !mini" />
        <v-app-bar-nav-icon dark v-else @click.stop="drawer = !drawer" />
        <v-toolbar-title>
          <!-- <img class="mt-2" src="https://www.isotools.org/wp-content/uploads/2016/12/logoisotools_cert.png" width="100"> -->
        </v-toolbar-title>

        <v-spacer />
          <v-text-field
            v-if="!$vuetify.breakpoint.xs"
            dense
            label="Busqueda de modulos"
            append-icon="mdi-magnify"
            solo
            rounded
            hide-details="auto"
            outlined
          ></v-text-field>
        <v-spacer />

      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                mdi-account
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item nuxt to="/account">
              <v-list-item-avatar>
                <img src="https://www.labicok.com/wp-content/uploads/2020/06/default-user-image.png">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{user}} {{apellido}}</v-list-item-title>
                <v-list-item-subtitle>Conectado</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>
                Cerrar sesión
                <v-icon small>
                  mdi-logout
                </v-icon>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      </v-app-bar>
      <v-navigation-drawer
        v-if="!$vuetify.breakpoint.xs"
        v-model="drawer"
        :mini-variant.sync="mini"
        color="secondary"
        permanent
        dark
        app
      >
        <v-divider />
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.key"
            :to="item.route"
            nuxt
            exact
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Salir</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-navigation-drawer
        v-else
        v-model="drawer"
        color="secondary"
        dark
        app
      >
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://www.labicok.com/wp-content/uploads/2020/06/default-user-image.png" />
          </v-list-item-avatar>

          <v-list-item-title>Administrador 1</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item.key"
            :to="item.route"
            nuxt
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Salir</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-main>
      <!-- <Snackbar /> -->
      <v-container >
        <nuxt />
        
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import Snackbar from '~/components/layouts/Snackbar'
export default {
  components: {
    // Snackbar
  },
  data () {
    return {
      mini: false,
      drawer: false,
      user:  "usuario ",
      apellido: "master",
      items: [
        { title: 'Inicio', icon: 'mdi-home-export-outline', route: '/inicio', key: 10 },
        { title: 'Ingreso de Usuarios', icon: 'mdi-account-group-outline', route: '/user/creacionUsuario', key: 2 },
      ],
    }
  },
  methods: {
    async logout () {
      this.$cookies.remove('datos')
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>
.nuxt-link-active {
  color: red;
}
</style>
