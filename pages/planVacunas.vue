<template>
  <v-card>
    <v-responsive :aspect-ratio="16 / 9">
      <h1 style="text-align: center; margin-bottom: 10px">
        Plan de Vacunación
      </h1>
      <img class="imagen" src="/plan.svg" />
      <div class="container">
        <v-col cols="12"> </v-col>
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
                      @click="fecha"
                      color="primary"
                      id="fechaReserva"
                      name="txtfechainicio"
                    >
                    </v-text-field>
                    <!-- <input type="date" @click="fecha" id="fechaReserva" name="txtfechainicio"><br> -->
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      label="Fecha de finalización"
                      outlined
                      rounded
                      type="date"
                      v-model="fechaFin"
                      @click="fecha"
                      color="primary"
                      id="fechaReserva1"
                      name="txtfechainicio1"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="5">
                    <v-autocomplete
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
                    </v-autocomplete>
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
                máxima de 2 días
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
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title> Editar fechas</v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              label="Fecha de Inicio"
                              v-model="editedItem.fechaInicio"
                              type="date"
                              @click="fechaEdit"
                              color="primary"
                              id="fechaReserva2"
                              name="txtfechainicio"
                            >
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              label="Fecha de Finalización"
                              v-model="editedItem.fechaFin"
                              type="date"
                              @click="fechaEdit"
                              color="primary"
                              id="fechaReserva3"
                              name="txtfechainicio"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              label="Lugar de Vacunación"
                              v-model="editedItem.centroVacunacion"
                            >
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancelar
                      </v-btn>

                      <v-btn color="blue darken-1" text @click="editarPlan">
                        Editar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
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
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
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
      dialog: false,
      notificados: "",
      facultad: "",
      carrera: "",
      prueba: [],
      puntos: ["Coliseo UCE", "Facultad de Medicina"],
      fase: "",
      personasVacunadas: "",
      centroVacunacion: "",

      headers: [
        { text: "Fecha de Inicio", value: "fechaInicio" },
        { text: "Fecha de Finalización", value: "fechaFin" },
        { text: "Facultad", value: "facultad" },
        { text: "Centro Vacunación", value: "centroVacunacion" },
        { text: "Personas Vacunadas", value: "personasVacunadas" },
        { text: "Fase", value: "fase" },
        // { text: "Estudiantes notificados", value: "notificados" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      desserts: [],
      listaFacultades: [],
      facultadSeleccionada: "",
      listaCarreras: [],
      search: "",
      editedItem: {},
      _id: "",
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
    async fecha() {
      var fecha = new Date();
      var anio = fecha.getFullYear();
      var dia = fecha.getDate();
      var _mes = fecha.getMonth(); //viene con valores de 0 al 11
      _mes = _mes + 1; //ahora lo tienes de 1 al 12
      if (_mes < 10) {
        //ahora le agregas un 0 para el formato date
        var mes = "0" + _mes;
      } else {
        var mes = _mes.toString;
      }
      document.getElementById("fechaReserva").min =
        anio + "-" + mes + "-" + dia;
      document.getElementById("fechaReserva1").min =
        anio + "-" + mes + "-" + dia;
    },

      async fechaEdit() {
      var fecha = new Date();
      var anio = fecha.getFullYear();
      var dia = fecha.getDate();
      var _mes = fecha.getMonth(); //viene con valores de 0 al 11
      _mes = _mes + 1; //ahora lo tienes de 1 al 12
      if (_mes < 10) {
        //ahora le agregas un 0 para el formato date
        var mes = "0" + _mes;
      } else {
        var mes = _mes.toString;
      }
      document.getElementById("fechaReserva2").min =
        anio + "-" + mes + "-" + dia;
      document.getElementById("fechaReserva3").min =
        anio + "-" + mes + "-" + dia;
    },
    
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

  

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

    async obtenerPlanes() {
      try {
        const res = await axios.get("api/plan", {
          headers: {
            authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
          },
        });

        this.desserts = res.data;
        console.log(res);
      } catch (err) {
        if (err.response.status == 404) {
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
        !this.fechaFin ||
        !this.facultad ||
        !this.centroVacunacion
      ) {
        this.$notifier.showMessage({
          content: "Rellene todos los datos",
          color: "warning",
        });
      } else {
        try {
          const res = await this.$axios.post(
            "api/plan",
            {
              notificados: this.notificados,
              // nuevoplan: {
              fechaInicio: this.fechaInicio,
              fechaFin: this.fechaFin,
              facultad: this.facultad,

              personasVacunadas: this.personasVacunadas,
              centroVacunacion: this.centroVacunacion,
              fase: "PRIMERA",
            },
            // },
            {
              headers: {
                authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
              },
            }
          );
          this.obtenerPlanes();
          (this.fechaInicio = " "),
            (this.fechaFin = " "),
            (this.facultad = " "),
            (this.centroVacunacion = " "),
            this.$notifier.showMessage({
              color: "success",
              content: `El plan se ha registrado con éxito, se ha enviado un mensaje con la información al correo de los estudiantes`,
            });
          this._id = res.data._id;
        } catch (err) {
          if (err.response.status == 404) {
            this.$notifier.showMessage({
              content: `No hay estudiantes registrados en la facultad ${this.facultad}`,
              color: "warning",
            });
          } else if (
            err.response.data.mensaje ==
            "La fecha inicial no puede ser inferior a la fecha final"
          ) {
            this.$notifier.showMessage({
              color: "warning",
              content: `La fecha inicial no puede ser inferior a la fecha de finalización`,
            });
          } else if (
            err.response.data.mensaje ==
            `Ya existe un plan de vacunacion para: ${this.facultad}`
          ) {
            this.$notifier.showMessage({
              content: `La facultad ${this.facultad} ya tiene un plan registrado`,
              color: "warning",
            });
          } else if (
            err.response.data.mensaje ==
            "La distancia entre fechas no debe ser mayor a 2"
          ) {
            this.$notifier.showMessage({
              content: `El plan tiene una duración máxima de 2 días`,
              color: "warning",
            });
          } else if (
            err.response.data.mensaje ==
            "No puede existir más de 2 Facultades dentro de la misma fecha"
          ) {
            this.$notifier.showMessage({
              content: `Solo se permite ingresar dos planes para una misma fecha`,
              color: "warning",
            });
          }
        }
      }
    },
    async editarPlan() {
      try {
        await this.$axios.put(
          `api/plan/${this.editedItem._id}`,
          {
            fechaInicio: this.editedItem.fechaInicio,
            fechaFin: this.editedItem.fechaFin,
            facultad: this.editedItem.facultad,
            personasVacunadas: this.editedItem.personasVacunadas,
            centroVacunacion: this.editedItem.centroVacunacion,
            fase: this.editedItem.fase,
          },
          {
            headers: {
              authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
            },
          }
        );
        this.obtenerPlanes();
        this.close();
        (this.fechaInicio = " "),
          (this.fechaFin = " "),
          (this.facultad = " "),
          (this.centroVacunacion = " "),
          this.$notifier.showMessage({
            content: `El plan se ha editado con éxito`,
            color: "success",
          });
      } catch (err) {
        if (
          err.response.data.mensaje ==
          "El plan de la segunda dosis no puede ser anterior al de la primera"
        ) {
          this.$notifier.showMessage({
            content:
              "La fecha no debe ser menor a la asignada en la primer fase",
            color: "warning",
          });
        }
      }
    },
  },
};
</script>
