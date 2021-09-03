<template>
  <div>
    <v-responsive :aspect-ratio="16 / 9">
      <img class="imagen" src="/digitar.svg" />

      <div class="container">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="15" md="8">
            <p>
              Por favor elija la facultad y la fase en la que desea digitar los
              datos del proceso de inoculación actual:
            </p>
            <v-select
              ref="facultad"
              label="Facultad"
              outlined
              rounded
              v-model="nombre"
              :items="listaFacultades"
              :rules="[() => !!nombre || 'Campo obligatorio']"
              type="text"
              color="primary"
            ></v-select>
            <v-select
              ref="fase"
              label="Fase"
              outlined
              rounded
              v-model="fase1"
              :items="listaFases"
              :rules="[() => !!fase1 || 'Campo obligatorio']"
              type="text"
              color="primary"
            ></v-select>
            <v-btn @click="obtenerCarnetL" color="secondary" id="btn-ingreso"
              >Listar estudiantes</v-btn
            >
          </v-col>
        </v-row>
      </div>

      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Lista de Estudiantes</v-toolbar-title>
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
          </v-toolbar>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title> Editar registros </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-checkbox
                        v-if="(fase = 'PRIMERA')"
                        v-model="editedItem.primeraDosis"
                        label="Primera Dosis"
                        :disabled="editedItem.segundaDosis"
                        @click="obtenerC"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-if="editedItem.primeraDosis"
                        v-model="editedItem.nombreVacuna"
                        label="Vacuna"
                        :disabled="editedItem.segundaDosis"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-if="editedItem.primeraDosis"
                        v-model="editedItem.loteDosisUno"
                        label="Lote"
                        :disabled="editedItem.segundaDosis"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-if="editedItem.primeraDosis"
                        v-model="editedItem.vacunadorPrimeraDosis"
                        :disabled="editedItem.segundaDosis"
                        label="Vacunador"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-checkbox
                        v-if="fase1 == 'SEGUNDA'"
                        v-model="editedItem.segundaDosis"
                        label="Segunda Dosis"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-if="editedItem.segundaDosis"
                        v-model="editedItem.loteDosisDos"
                        label="Lote"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-if="editedItem.segundaDosis"
                        v-model="editedItem.vacunadorSegundaDosis"
                        label="Vacunador"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>

                <v-btn color="blue darken-1" text @click="editarCarnet">
                  Editar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:no-data>
          <v-btn text> No se ha elegido la facultad y la fase </v-btn>
        </template>
        <template v-slot:[`item.primeraDosis`]="{ item }">
          <v-checkbox v-model="primeraDosis" v-if="item.primeraDosis" disabled>
          </v-checkbox>
          <v-simple-checkbox v-else></v-simple-checkbox>
        </template>
        <template v-slot:[`item.segundaDosis`]="{ item }">
          <v-checkbox v-model="segundaDosis" v-if="item.segundaDosis" disabled>
          </v-checkbox>
          <v-simple-checkbox v-else></v-simple-checkbox>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
        </template>
      </v-data-table>
    </v-responsive>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  layout: "controlador",

  data() {
    return {
      dialog: false,
      singleSelect: false,
      primeraDosis: true,
      segundaDosis: true,
      vacunadorPrimeraDosis: "",
      loteDosisUno: "",
      fechaSegundaDosis: "",
      fechaPrimeraDosis: "",
      usuario: "",
      vacunadorSegundaDosis: "",
      loteDosisDos: "",
      nombreVacuna: "",
      inoculacionVoluntaria: false,
      _id: "",
      cedula: "",
      fechaNacimiento: "",
      search: "",
      selected: [],
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
      fase1: "",
      nombre: "",

      personasVacunadas: "",
      idPlan: "",
      editedItem: {},

      defaultItem: {},
      headers: [
        {
          text: "Estudiante",
          align: "start",

          value: "nombre",
        },
        { text: "Apellidos", value: "apellido" },

        { text: "Cédula", value: "cedula" },

        { text: "Primera Dosis", sortable: false, value: "primeraDosis" },
        { text: "Vacunador", value: "vacunadorPrimeraDosis" },
        { text: "Vacuna", sortable: false, value: "nombreVacuna" },
        { text: "N° de Lote", value: "loteDosisUno" },
        { text: "Segunda Dosis", sortable: false, value: "segundaDosis" },
        { text: "Vacunador", value: "vacunadorSegundaDosis" },
        { text: "N° de Lote", value: "loteDosisDos" },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      desserts: [],
      listaFacultades: [],
      facultadSeleccionada: "",

      prueba: [],
      listaFases: [],
      search: "",
      listaId: [],
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
    nombre: function () {
      this.prueba.forEach((elementos) => {
        if (elementos.facultad === this.nombre) {
          this.idPlan = elementos._id;
        }
      });
    },
  },

  methods: {
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

    async obtenerPlanes() {
      try {
        const resp = await axios.get("api/plan/planesDiarios/", {
          headers: {
            authorization: "SGVUCE " + this.$cookies.get("ROLE_HC"),
          },
        });

        const fa = resp.data.planes_actuales;

        fa.forEach((fas) => {
          this.listaFases.push(`${fas.fase}`);
        });
        // console.log(fa)
      } catch (err) {}
    },
    async obtenerFac() {
      try {
        const resp = await axios.get("api/plan/planesDiarios/", {
          headers: {
            authorization: "SGVUCE " + this.$cookies.get("ROLE_HC"),
          },
        });
        // console.log(resp);
        const fa = resp.data.planes_actuales;

        fa.forEach((fas) => {
          this.listaFacultades.push(`${fas.facultad}`);
        });
        this.prueba = resp.data.planes_actuales;
        // console.log("hola" + prueba);
      } catch (err) {}
    },

    // async obtenerIdPlanes() {
    //   try {
    //     const respu = await axios.get("api/plan/planesDiarios/", {
    //       headers: {
    //         authorization: "SGVUCE " + this.$cookies.get("ROLE_HC"),
    //       },
    //     });

    //     const i = respu.data.planes_actuales;

    //     i.forEach((id) => {
    //       this.listaId.push(`${id._id}`);
    //     });

    //   } catch (err) {}
    // },

    async obtenerCarnetL() {
      if (!this.nombre || !this.fase1) {
        this.$notifier.showMessage({
          content: "Debe elejir la facultad y la fase",
          color: "warning",
        });
      } else {
        try {
          const res = await axios.get(`api/plan/${this.nombre}/${this.fase1}`, {
            headers: {
              authorization: "SGVUCE " + this.$cookies.get("ROLE_HC"),
            },
          });

          this.desserts = res.data.data;
        } catch (error) {}
      }
    },
    async obtenerC() {
      try {
        const res = await axios.get(`api/carnet/${this.editedItem.usuario}`, {
          headers: {
            authorization: "SGVUCE " + this.$cookies.get("ROLE_HC"),
          },
        });

        const id = res.data._id;
        this.$cookies.set("id", id);
      } catch (error) {}
    },

    async editarCarnet() {
      if (
        !this.editedItem.primeraDosis ||
        !this.editedItem.nombreVacuna ||
        !this.editedItem.loteDosisUno ||
        !this.editedItem.vacunadorPrimeraDosis
      ) {
        this.$notifier.showMessage({
          content: "Digite todas los datos",
          color: "warning",
        });
      } else {
        try {
         
          const res = await this.$axios.put(
            `api/carnet/${this.idPlan}`,
            {
              vacunadorSegundaDosis: this.editedItem.segundaDosis,
              estudiante: this.editedItem.usuario,
              nombreVacuna: this.editedItem.nombreVacuna,
              inoculacionVoluntaria: this.editedItem.inoculacionVoluntaria,
              segundaDosis: this.editedItem.segundaDosis,
              centroVacunacion: this.editedItem.centroVacunacion,
              loteDosisUno: this.editedItem.loteDosisUno,
              vacunadorPrimeraDosis: this.editedItem.vacunadorPrimeraDosis,
              loteDosisDos: this.editedItem.loteDosisDos,
              _id: this.$cookies.get("id"),
              fechaNacimiento: this.editedItem.fechaNacimiento,
              primeraDosis: this.editedItem.primeraDosis,
            },
            {
              headers: {
                authorization: "SGVUCE " + this.$cookies.get("ROLE_HC"),
              },
            }
          );
          this.$notifier.showMessage({
            content: "Digitación exitosa ",
            color: "success",
          });

          this.obtenerCarnetL();
          this.close();
        } catch (error) {}
      }
    },
  },
};
</script>
<style>
#btn-ingreso {
  margin-top: 2%;
  margin-left: 40%;
}
</style>
