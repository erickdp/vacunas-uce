<template>
  <div>
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
                      v-model="editedItem.primeraDosis"
                      label="Primera Dosis"
                      :disabled="editedItem.segundaDosis"
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
                    v-if="editedItem.primeraDosis"
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

              <v-btn color="blue darken-1" text @click="editarCarnet"> Editar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> No hay registros </v-btn>
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
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  layout: "controlador",

  data() {
    return {
      editedItem: {
        
      },
      defaultItem: {
        
      },
      dialog: false,
      singleSelect: false,
      primeraDosis: true,
      segundaDosis: true,
      vacunadorPrimeraDosis: "",
      loteDosisUno: "",
      fechaSegundaDosis:"",
      fechaPrimeraDosis:"",
      centroVacunacion:"",
      estudiante:"",
      vacunadorSegundaDosis: "",
      loteDosisDos: "",
      nombreVacuna: "",
      inoculaciónVoluntaria:"",
      _id:"",
      cedula:"",
      fechaNacimiento:"",

      search: "",
      selected: [],
      headers: [
        {
          text: "Nombres",
          align: "start",

          value: "estudiante",
        },
        { text: "Apellidos", value: "apellidos" },

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
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  mounted() {
    this.obtenerListas();
    // this.obtenerNom();
    
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

    async obtenerListas() {
      try {
        const res = await axios.get("api/carnet", {
          headers: {
            authorization: "SGVUCE " + this.$cookies.get("ROLE_HC"),
          },
        });
        console.log(res)
        this.desserts = res.data;

      } catch (error) {}
    },
    async editarCarnet() {
      try {
        const res = await this.$axios.put(
          "api/carnet",
          {
            _id:this.editedItem._id,
           centroVacunacion:this.editedItem.centroVacunacion,
           estudiante:this.editedItem.estudiante,
           cedula:this.editedItem.cedula,
           fechaNacimiento:this.editedItem.fechaNacimiento,
            primeraDosis: this.editedItem.primeraDosis,
            // fechaPrimeraDosis: this.editedItem.fechaPrimeraDosis,
            // fechaSegundaDosis:this.editedItem.fechaSegundaDosis,
            vacunadorPrimeraDosis: this.editedItem.vacunadorPrimeraDosis,
            nombreVacuna: this.editedItem.nombreVacuna,
            loteDosisUno:this.editedItem.loteDosisUno,
            loteDosisDos:this.editedItem.loteDosisDos,
            segundaDosis:this.editedItem.segundaDosis,
            vacunadorSegundaDosis:this.editedItem.segundaDosis,
            inoculaciónVoluntaria:this.editedItem.inoculaciónVoluntaria,
          },
          {
            headers: {
              authorization: "SGVUCE " + this.$cookies.get("ROLE_HC"),
            },
          }
        );
         this.$notifier.showMessage({
            content: "Digitación exitósa ",
            color: "success",
          });
          this.obtenerListas()
        this.close()
      } catch (error) {
       
      }
    },
  },
};
</script>
