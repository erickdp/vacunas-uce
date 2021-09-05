<template>
<v-responsive :aspect-ratio="16 / 9">
  <div id="app">
    <v-row align="center" justify="center" style="margin-top:5px">
      <v-col cols="12" sm="15" md="8">
        <v-autocomplete
          :items="listaFacultades"
          label="Facultad"
          outlined
          v-model="facul"
          rounded
        ></v-autocomplete>
      </v-col>
      <v-btn @click="obtenerGrafica" color="primary" style="margin-top:-25px">Buscar Gráfica</v-btn>
    </v-row>
    <v-row>
      <GChart
        type="ColumnChart"
        id="grafica"
        :data="chartData"
        :options="chartOptions"
      />
    </v-row>
  </div>
</v-responsive>
</template>


<script>
import { GChart } from "vue-google-charts";
import axios from "axios";
export default {
  layout: "admin",
  name: "App",
  components: {
    GChart,
  },
  data() {
    return {
      listaFacultades: [],
      prueba: [],
      items: [],
      arreglo: [],
      nombre: "",
      facul: "",
      facultad: "",
      pp: "",
      prueba1: [],
      arr0: 0,
      arr1: 0,
      arr2: 0,
      arr4: 0,
      arr3: 0,

      chartData: [],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
      },
    };
  },
  mounted() {
    this.obtenerFac();
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
  computed: {},
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
        // console.log(resp)
        const object=resp.data;
        for(const property in object){
          console.log(`${property}: ${object[property]}`);
          if(property==`total_inoculados_segunda_fase_${facu}`){
          
            this.arr0=object[property]
          }else if( property==`total_inoculados_primera_fase_${facu}`){
         
            this.arr1=object[property]
          }else if( property==`estudiantes_a_inocular_de_${facu}`){
            
            this.arr2=object[property]
          }else if( property==`estudiantes_no_voluntarios_de_${facu}`){
           
            this.arr3=object[property]
          }else if( property==`total_estudiantes_${facu}`){
          
            this.arr4=object[property]
          }
        }

        this.chartData = [
          ["Nombre", "Valores"],
          ["Total estudiantes a inocular", this.arr2],
          ["Estudiantes que no aceptaron la vacuna", this.arr3],
          ["Total estudiantes", this.arr4],
          ["Inoculados primera fase", this.arr1],

          ["Inoculados segunda Fase", this.arr0],
        ];
        // console.log(arreglo)
        // Object.values(arreglo)
        // const datos = resp.data;
        // datos.forEach((elementos) => {
        //     console.log(elementos)
        // //   this.items.push(`${elementos}`);
        // });
        // this.chartData.push(arreglo[i]);
        // this.prueba1 = Object.entries(items);
        //  console.log(prueba1)
      } catch (err) {
        if (err.response.status == 404) {
          this.$notifier.showMessage({
            content: "La facultad no cuenta con un plan",
            color: "warning",
          });
        } else if (err.response.status == 403) {
          this.$cookies.remove("ROLE_ADMIN");
          this.$notifier.showMessage({
            content: `Su sesión ha expirado`,
            color: "error",
          });
          this.$router.push("/login");
        }
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
        if (err.response.status == 403) {
          this.$cookies.remove("ROLE_ADMIN");
          this.$notifier.showMessage({
            content: `Su sesión ha expirado`,
            color: "error",
          });
          this.$router.push("/login");
        }
      }
    },
  },
};
</script>
<style>
#grafica {
  width: 1300px;
  height: 500px;
}
</style>