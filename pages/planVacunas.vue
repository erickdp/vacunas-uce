<template>
  <v-card>
    <v-responsive :aspect-ratio="16 / 9">
      <h1 style="text-align: center; margin-bottom: 10px">
        Plan de Vacunación
      </h1>
      <img class="imagen" src="/plan.svg" />
      <div class="container">
        <v-col cols="12">
          
        </v-col>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="15" md="8">
            <v-card-text class="elevation-12" id="card-in">
              <v-form ref="form" v-model="valid" lazy-validation>
                <p>Por favor ingrese el plan para la faculdad deseada:</p>
                <v-row>
                  <v-col cols="5">
                    <v-text-field
                      label="Fecha de Inicio"
                      outlined
                      rounded
                      v-model="fechaInicio"
                      :rules="[() => !!fechaInicio || 'Campo obligatorio']"
                      type="date"
                      color="primary"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      label="Fecha de finalización"
                      outlined
                      rounded
                      type="date"
                      v-model="fechaFin"
                      color="primary"
                    >
                    </v-text-field>
                   
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="5">
                    <v-select
                      ref="facultad"
                      label="Facultad"
                      outlined
                      rounded
                      :items="listaFacultades"
                      v-model="facultad"
                      :rules="[() => !!facultad || 'Campo obligatorio']"
                      type="text"
                      color="primary"
                    >
                    </v-select>
                  </v-col>

                  <v-col cols="5">
                    <v-text-field
                      label="Centro de Vacunación"
                      outlined
                      rounded
                      v-model="centroVacunacion"
                      :rules="[() => !!centroVacunacion || 'Campo obligatorio']"
                      color="primary"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row> </v-row>
              </v-form>
              <p>
                <strong>Nota:</strong> El plan por facultad tiene una duración
                máxima de 5 días
              </p>
            </v-card-text>

            <v-btn
              id="btn-ingreso"
              color="secondary"
              @click="agregarPlanFac"
              :disabled="!valid"
            >
              Agregar
            </v-btn>
          </v-col>
        </v-row>
        
      </div>

      <v-layout align-start>
        <v-flex>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Plan Vacunas</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                  class="text-xs-center"
                  v-model="search"
                  append-icon-cb="search"
                  label="Buscar"
                  single-line
                  hide-details
                >
                </v-text-field>
                <v-spacer></v-spacer>
                
              </v-toolbar>
            </template>
            <!-- <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
               <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template> -->
            <template v-slot:no-data>
              <v-btn color="primary"> No hay registros </v-btn>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-responsive>
  </v-card>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  layout: "admin",

  data() {
    return {
      dias: "",
      sfacultad: false,
      scarrera: false,
      fechaInicio: "",
      fechaFin: "",
      facultad: "",
      carrera: "",
      prueba: [],
      centroVacunacion: "",
      fase: "",
      personasVacunadas: "",
      

      headers: [
        { text: "Fecha de Inicio", value: "fechaInicio" },
        { text: "Fecha de Finalización", value: "fechaFin" },
        { text: "Facultad", value: "facultad" },

        { text: "Personas Vacunadas", value: "personasVacunadas" },
        { text: "Fase", value: "fase" },
      ],
      desserts: [],
      listaFacultades: [],
      facultadSeleccionada: "",
      listaCarreras: [],
      search: "",
    };
  },
  mounted() {
    this.obtenerPlanes();
    this.obtenerFac();
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },

    facultad1: function () {
      this.prueba.forEach((elementos) => {
        if (elementos.nombre === this.facultad1) {
          this.listaCarreras = elementos.carreras;
        }
      });
    },
  },
  computed: {
    cambiar() {
      return moment(this.fechaInicio).add(2, "days");
    },
    formato() {
      return moment(this.cambiar).format(" D/MM/YYYY");
    },
  },
  methods: {
    
    async obtenerFac() {
      this.listaFacultades.slice();
      try {
        const res = await axios.get("api/facultad", {
          headers: {
            authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
          },
        });

        const lis = res.data;

        lis.forEach((fac) => {
          this.listaFacultades.push(`${fac.nombre}`);
        });

        this.prueba = res.data;
      } catch (err) {
        console.log(err);
      }
    },

    async obtenerPlanes() {
      try {
        const res = await axios.get("api/plan", {
          headers: {
            authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
          },
        });

        this.desserts = res.data;
      } catch (err) {
        if (err.response.status == 403) {
          this.$notifier.showMessage({
            content: "No se ha ingresado planes",
            color: "error",
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

    async agregarPlanFac() {
      if (
        !this.fechaInicio ||
        !this.formato ||
        !this.facultad ||
        !this.centroVacunacion
      ) {
        this.$notifier.showMessage({
          content: "Rellene todos los datos",
          color: "warning",
        });
      } else {
        try {
          const data = {};
          console.log(data);
          await this.$axios.post(
            "api/plan",
            {
              fechaInicio: this.fechaInicio,
              fechaFin: this.fechaFin,
              facultad: this.facultad,

              personasVacunadas: this.personasVacunadas,
              centroVacunacion: this.centroVacunacion,
              fase: this.fase,
            },
            {
              headers: {
                authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
              },
            }
          );
          this.obtenerPlanes();
          this.fechaInicio= " ",
          this.fechaFin=" ",
          this.facultad=" ",
          this.centroVacunacion=" ",
          this.$notifier.showMessage({
            content: `El plan se ha registrado con éxito`,
            color: "success",
          });
        } catch (err) {
          console.log(err);
          if (err.response.status == 404) {
            this.$notifier.showMessage({
              content: `No hay estudiantes registrados en la facultad ${this.facultad}`,
              color: "warning",
            });
          } else if (err.response.status == 403) {
            this.$notifier.showMessage({
              content: `Verifique que la fecha de finalización sea correcta`,
              color: "warning",
            });
          } else if (err.response.status == 400) {
            this.$notifier.showMessage({
              content: `La facultad ${this.facultad} ya tiene un plan registrado`,
              color: "warning",
            });
          } else if (err.response.status == 500) {
            this.$notifier.showMessage({
              content: `La fecha seleccionada no está disponible`,
              color: "warning",
            });
          }
        }
      }
    },
  },
};
</script>
