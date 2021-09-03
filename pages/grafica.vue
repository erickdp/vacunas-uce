<template>
  <v-card class="mt-4 mx-auto" max-width="1000">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="15" md="8">
        <v-select
          :items="listaFacultades"
          label="Facultad"
          outlined
          v-model="facul"
          rounded
        ></v-select>
      </v-col>
      <v-btn @click="obtenerGrafica">Buscar Gráfica</v-btn>
    </v-row>
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="cyan"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="items[0]"
        :value="value"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="text-h6 font-weight-light mb-2">Personas Vacunadas</div>

      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small> mdi-clock </v-icon>
    </v-card-text>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  layout: "admin",

  data() {
    return {
      listaFacultades: [],
      prueba: [],
      items: [],
      value: [200, 675, 410, 390, 310, 460, 250, 240],
      nombre: "",
      facul: "",
      facultad: "",
      pp: "",
      prueba1: [],
    };
  },
  mounted() {
    this.obtenerFac();
    // this.obtenerGrafica();
  },
  watch: {
    facul: function () {
      this.prueba.forEach((elementos) => {
        if (elementos.nombre === this.facul) {
          this.$cookies.set("facu", elementos.nombre);
        }
      });
    },
  },
  methods: {
    async obtenerGrafica() {
      this.items.slice();
      let facu = this.$cookies.get("facu");
      try {
        const resp = await axios.get(`api/plan/${facu}`, {
          headers: {
            authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
          },
        });

        console.log(resp);

        // const datos = resp.data;
        // datos.forEach((elementos) => {
        //     console.log(elementos)
        // //   this.items.push(`${elementos}`);
        // });
         this.items.push(resp.data)
         this.prueba1 = Object.entries(items);
        //  console.log(prueba1)

      } catch (err) {
        // if (err.response.status == 404) {
        //   this.$notifier.showMessage({
        //     content: "La facultad no cuenta con un plan",
        //     color: "warning",
        //   });
        // }
      }
    },

    async obtenerFac() {
      this.items.slice();
      try {
        const res = await axios.get("api/facultad", {
          headers: {
            authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
          },
        });
        // console.log(res);

        const lis = res.data;

        lis.forEach((facu) => {
          this.listaFacultades.push(`${facu.nombre}`);
          //   this.$cookies.set("facu", facu.nombre);
        });

        this.prueba = res.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>