<template>
  <v-responsive>
    <v-app>
      <div>
        <v-app-bar flat app color="#CCD5E2">
          <v-app-bar-nav-icon
            dark
            v-if="!$vuetify.breakpoint.xs"
            @click.stop="mini = !mini"
          />
          <v-app-bar-nav-icon dark v-else @click.stop="drawer = !drawer" />
          <v-toolbar-title>
            <img
              class="mt-2"
              src="/vacuna-logo.png"
              width="60"
              style="margin-left: -15px"
            />
          </v-toolbar-title>

          <v-spacer />
          <v-text-field
            v-if="!$vuetify.breakpoint.xs"
            dense
            label="Búsqueda de modulos"
            :messages="false"
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
                <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon style="color: #036eb4"> mdi-account </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item >
                  <v-list-item-avatar>
                    <img
                      src="https://www.labicok.com/wp-content/uploads/2020/06/default-user-image.png"
                    />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Usuario logueado</v-list-item-title>
                    <v-list-item-subtitle>Conectado</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-title>
                    Cerrar sesión
                    <v-icon small> mdi-logout </v-icon>
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
          color="#CCD5E2"
          permanent
          dark
          app
        >
          <v-divider />
          <v-list>
            <v-list-item
              v-for="item in items"
              style="color: #036eb4"
              :key="item.key"
              :to="item.route"
              nuxt
              exact
            >
              <v-list-item-icon>
                <v-icon style="color: #036eb4">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title style="color: #036eb4">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon style="color: #036eb4">mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title style="color: #036eb4"
                  >Salir</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-navigation-drawer v-else v-model="drawer" color="secondary" dark app>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img
                src="https://www.labicok.com/wp-content/uploads/2020/06/default-user-image.png"
              />
            </v-list-item-avatar>
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
        <Snackbar />
        <v-container>
          <nuxt />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script>
import Snackbar from "~/components/layouts/Snackbar";
export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      mini: false,
      drawer: false,
      items: [
        // {
        //   title: "Inicio",
        //   icon: "mdi-home-export-outline",
        //   route: "/carnet/",
        //   key: 1,
        // },
        {
          title: "Consultar",
          icon: "mdi-account-group-outline",
          route: "/principalEst",
          key: 1,
        },
        // { title: 'Facultades', icon: 'mdi-home-edit', route: '/userUniversidad/pasoUno', key: 3 },

        // { title: 'Alcance', icon: 'mdi-account', route: '/userUniversidad/alcance', key: 3 },
        // { title: 'Liderazgo', icon: 'mdi-pen', route: '/userUniversidad/liderazgo', key: 4 },
        // { title: 'Paso 2 - Actividades Prioritarias', icon: 'mdi-account-supervisor-outline', route: '/userUniversidad/pasoDos', key: 4 },
        // { title: 'Paso 3 - Recursos Escenciales', icon: 'mdi-ab-testing', route: '/userUniversidad/pasoTres', key: 5 },
        // { title: 'Paso 4 - Evaluacion de Riesgos', icon: 'mdi-notebook-edit-outline', route: '/userUniversidad/riesgos', key: 6 },
        // { title: 'Paso 5 - Protección ante Desastres', icon: 'mdi-alert', route: '/userUniversidad/mitigacion', key: 7 },
      ],
    };
  },
  methods: {
    async logout() {
      this.$cookies.remove('ROLE_USER')
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.nuxt-link-active {
}
.v-btn--icon.v-size--default .v-icon,
.v-btn--fab.v-size--default .v-icon {
  color: #036eb4;
}
</style>
