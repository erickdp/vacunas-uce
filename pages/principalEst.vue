<template>
  <v-app>
    <v-container class="fill-height" fluid id="container">
      <v-row aling="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12" id="titulo">
            <h2 class="text-center display-2 text--secondary-3 mb-5">
              Consulta tu centro de Vacunación
            </h2>
          </v-card>
        </v-col>
      </v-row>
      <v-row aling="center" justify="center">
        <v-col cols="12" sm="8" md="9">
          <v-card class="elevation-12">
            <v-window class="contenedor">
              <v-row class="d-flex">
                <v-card-text class="d-flex flex-column justify-space-around">
                  <v-form>
                    <v-row
                      aling="center"
                      justify="center"
                      style="margin-top: 10px"
                    >
                      <v-col cols="2">
                        <v-subheader
                          style="
                            font-weight: 600;
                            color: black;
                            display: contents;
                          "
                          >Estudiante:</v-subheader
                        >
                      </v-col>
                      <v-col cols="5" style="margin-top: -25px">
                        <v-text-field
                          name="apellido"
                          v-model="apellidos"
                          type="text"
                          color="secondary"
                          disabled
                        />
                      </v-col>
                      <v-col
                        cols="4"
                        style="margin-top: -25px; margin-left: -17px"
                      >
                        <v-text-field
                          name="nombres"
                          v-model="nombres"
                          type="text"
                          color="secondary"
                          disabled
                        />
                      </v-col>
                    </v-row>
                    <v-row aling="center" justify="center">
                      <v-col cols="2">
                        <v-subheader
                          style="
                            font-weight: 600;
                            color: black;
                            display: contents;
                          "
                        >
                          Vacuna:</v-subheader
                        >
                      </v-col>
                      <v-col cols="9" style="margin-top: -25px">
                        <v-text-field
                          name="vacuna"
                          v-model="nombreVacuna"
                          type="text"
                          color="secondary"
                          disabled
                        />
                      </v-col>
                    </v-row>
                    <v-row
                      aling="center"
                      justify="center"
                      style="margin-top: 10px"
                    >
                      <!-- <v-col cols="2">
                        <v-subheader
                          style="
                            font-weight: 600;
                            color: black;
                            display: contents;
                          "
                          >Fecha primera Dosis:</v-subheader
                        >
                      </v-col> -->
                      <!-- <v-col cols="9" style="margin-top: -25px">
                        <v-text-field
                          name="fecha"
                          v-model="fechaPrimeraDosis"
                          type="text"
                          color="secondary"
                          disabled
                        />
                      </v-col> -->
                    </v-row>
                    <v-row
                      aling="center"
                      justify="center"
                      style="margin-top: 10px"
                    >
                      <v-col cols="2">
                        <v-subheader
                          style="
                            font-weight: 600;
                            color: black;
                            display: contents;
                          "
                          >Primera Dosis:</v-subheader
                        >
                      </v-col>
                      <v-col cols="9" style="margin-top: -25px">
                        <v-text-field
                          name="primera dosis"
                          v-model="primeraDosis"
                          type="text"
                          color="secondary"
                          disabled
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row
                      aling="center"
                      justify="center"
                      style="margin-top: 10px"
                    >
                      <!-- <v-col cols="2">
                        <v-subheader
                          style="
                            font-weight: 600;
                            color: black;
                            display: contents;
                          "
                          >Fecha segunda Dosis:</v-subheader
                        >
                      </v-col> -->
                      <!-- <v-col cols="9" style="margin-top: -25px">
                        <v-text-field
                          v-model="fechaSegundaDosis"
                          type="text"
                          color="secondary"
                          disabled
                        />
                      </v-col> -->
                    </v-row>
                    <v-row
                      aling="center"
                      justify="center"
                      style="margin-top: 10px"
                    >
                      <v-col cols="2">
                        <v-subheader
                          style="
                            font-weight: 600;
                            color: black;
                            display: contents;
                          "
                          >Segunda Dosis:</v-subheader
                        >
                      </v-col>
                      <v-col cols="9" style="margin-top: -25px">
                        <v-text-field
                          name="segundaDosis"
                          v-model="segundaDosis"
                          type="text"
                          color="secondary"
                          disabled
                        />
                      </v-col>
                    </v-row>
                    <v-row
                      aling="center"
                      justify="center"
                      style="margin-top: 10px"
                    >
                      <v-col cols="2">
                        <v-subheader
                          style="
                            font-weight: 600;
                            color: black;
                            display: contents;
                          "
                          >Centro de Vacunación:</v-subheader
                        >
                      </v-col>
                      <v-col cols="9" style="margin-top: -25px">
                        <v-text-field
                          name="centroVacunacion"
                          v-model="centroVacunacion"
                          type="text"
                          color="secondary"
                          disabled
                        />
                      </v-col>
                    </v-row>
                    <v-row aling="center" justify="center">
                      <v-col cols="7" style="padding-right: 0px">
                        <p>
                          Acepta ser parte del proceso de vacunación de manera
                          <strong>VOLUNTARIA?</strong>
                        </p>
                      </v-col>
                      <v-col
                        cols="3"
                        style="padding-lef: 0px; margin-top: -20px"
                      >
                        <v-checkbox
                          v-model="inoculacionVoluntaria1"
                          color="primary"
                          label="Si/No"
                          @click="editarCarnet"
                        >
                        </v-checkbox
                      ></v-col>
                    </v-row>

                    <v-row
                      aling="center"
                      justify="center"
                      style="margin-top: -30px"
                    >
                      <v-col cols="9">
                        <p
                          style="
                            margin-top: 0px;
                            font-weight: 600;
                            color: #174082;
                            font-size: 10px;
                          "
                        >
                          Recuerda las medidas de biosegurdad. Usa mascarilla y
                          mantén la distancia de dos metros con otras personas.
                        </p>
                        <p
                          style="
                            margin-top: -15px;
                            font-weight: 600;
                            color: #174082;
                            font-size: 10px;
                          "
                        >
                          Infórmate por medios oficiales y sigue las
                          recomendaciones dadas por el Ministerio de Salúd
                          Pública
                        </p>
                        <p
                          style="
                            margin-top: -15px;
                            font-weight: 600;
                            color: #174082;
                            font-size: 10px;
                          "
                        >
                          RECUERDA EL HORARIO DE ATENCIÓN EN EL CENTRO DE
                          VACUNACIÓN ES DE 8:00am A 16:00pm
                        </p>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-row>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog" max-width="290px" id="dialogo">
        <template v-slot:activator="{ on, attrs }">
          <div class="text-center mt-3">
            <v-btn
              rounded
              color="secondary"
              v-bind="attrs"
              v-on="on"
              elevation="13"
              dark
              >Descargar Certificado</v-btn
            >
          </div>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">¿Cómo desea obtener su certificado?</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-radio-group column>
                <v-row>
                  <v-icon>mdi-file-pdf</v-icon>

                  <v-radio label="PDF" value="pdf" @click="carnetPDF"
                    >hola</v-radio
                  ></v-row
                >
                <v-row></v-row>
                <v-row>
                  <v-icon>mdi-email</v-icon>
                  <v-radio
                    label="Correo"
                    value="correo"
                    @click="carnetCorreo"
                  ></v-radio
                ></v-row>
              </v-radio-group>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <!-- <v-spacer></v-spacer> -->
            <v-row aling="center" justify="center" style="margin-top: -50px">
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>
<script>
var f = new Date();
document.write(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
</script>

<script>


  
import axios from "axios";
export default {
  layout: "estudiante",
  data() {
    return {
      vacunadorPrimeraDosis: "",
      loteDosisUno: "",
      estudiante: "",
      vacunadorSegundaDosis: "",
      loteDosisDos: "",
      _id: "",
      cedula: "",
      fechaNacimiento: "",
      apellidos: "",
      centroVacunacion: "",
      nombres: "",
      nombreVacuna: "",
      fechaPrimeraDosis: "",
      primeraDosis: false,
      fechaSegundaDosis: false,
      segundaDosis: "",
      items: [],
      inoculacionVoluntaria1: false,
      dialog: false,
      editedIndex: -1,
      
      opciones: [
        { icon: "mdi-pancil", text: "PDF" },
        { text: "correo electrónico", icon: "mdi-email" },
      ],
      computed: {
        formTitle() {
          return "Certificado";
        },
        
      },
      watch: {
        dialog(val) {
          val || this.close();
        },
        
      },
      editedItem: {},
    };

  },

  mounted() {
    this.obtenerDatos();
    this.obtenerNom();
  },

  methods: {
   
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async obtenerNom() {
      let nombreUsuario = this.$cookies.get("ROLE_USER").usuario;
      try {
        const resp = await axios.get(`api/estudiante/${nombreUsuario}`, {
          headers: {
            authorization:
              "SGVUCE " + this.$cookies.get("ROLE_USER").token_acceso,
          },
        });
        (this.nombres = resp.data.nombres),
          (this.apellidos = resp.data.apellidos);
      } catch (err) {
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
    async obtenerDatos() {
      let user = this.$cookies.get("ROLE_USER").usuario;
      try {
        const resp = await axios.get(`api/carnet/${user}`, {
          headers: {
            authorization:
              "SGVUCE " + this.$cookies.get("ROLE_USER").token_acceso,
          },
        });
        (this._id = resp.data._id),
          (this.centroVacunacion = resp.data.centroVacunacion),
          (this.estudiante = resp.data.estudiante),
          (this.nombreVacuna = resp.data.nombreVacuna),
          (this.fechaPrimeraDosis = resp.data.fechaPrimeraDosis),
          (this.fechaSegundaDosis = resp.data.fechaSegundasDosis),
          (this.vacunadorPrimeraDosis = resp.data.vacunadorPrimeraDosis),
          (this.vacunadorSegundaDosis = resp.data.vacunadorSegundaDosis),
          (this.loteDosisUno = resp.data.loteDosisUno),
          (this.loteDosisDos = resp.data.loteDosisDos),
          (this.cedula = resp.data.cedula),
          (this.fechaNacimiento = resp.data.fechaNacimiento),
          (this.inoculacionVoluntaria1 = resp.data.inoculacionVoluntaria);
        if (resp.data.primeraDosis == true) {
          this.primeraDosis = "Vacunado";
        } else {
          this.primeraDosis = "Pendiente";
        }
        if (resp.data.segundaDosis == true) {
          this.segundaDosis = "Vacunado";
        } else {
          this.segundaDosis = "Pendiente";
        }

        console.log(resp);
      } catch (err) {
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
    async link(){
      let user = this.$cookies.get("ROLE_USER").usuario;

     
      
    },
    async carnetPDF() {
      let user = this.$cookies.get("ROLE_USER").usuario;
      try {
        const resp = await axios.get(`api/carnet/descargarCarnert/${user}`, {
          headers: {
            authorization:
              "SGVUCE " + this.$cookies.get("ROLE_USER").token_acceso,
          },
        });
        window.location.href=`api/carnet/descargarCarnert/${user}`

      

        
        this.close();
        
        
        
      } catch (err) {
        console.log("error" + err);
        if (err.response.status == 400) {
          this.$notifier.showMessage({
            content: "No ha completado su proceso de vacunación",
            color: "warning",
          });
          this.close();
        }
      }
    },
    async carnetCorreo() {
      let user = this.$cookies.get("ROLE_USER").usuario;
      try {
        const resp = await axios.get(`api/carnet/enviarCarnet/${user}`, {
          headers: {
            authorization:
              "SGVUCE " + this.$cookies.get("ROLE_USER").token_acceso,
          },
        });
        this.close();
         this.$notifier.showMessage({
            content: "Se ha enviado el certificado a su correo electrónico",
            color: "success",
          });
      } catch (err) {
        console.log("error" + err);
        if (err.response.status == 400) {
          this.$notifier.showMessage({
            content: "No ha completado su proceso de vacunación",
            color: "warning",
          });
          this.close();
        }
      }
    },
    async editarCarnet() {
      try {
        const resp = await this.$axios.put(
          "api/carnet",
          {
            centroVacunacion: this.centroVacunacion,
            _id: this._id,
            estudiante: this.estudiante,
            nombreVacuna: this.nombreVacuna,
            fechaPrimeraDosis: this.fechaPrimeraDosis,
            fechaSegundaDosis: this.fechaSegundaDosis,
            vacunadorPrimeraDosis: this.vacunadorPrimeraDosis,
            vacunadorSegundaDosis: this.segundaDosis,
            primeraDosis: this.primeraDosis,
            loteDosisUno: this.loteDosisUno,
            loteDosisDos: this.loteDosisDos,
            segundaDosis: this.segundaDosis,
            inoculacionVoluntaria: this.inoculacionVoluntaria1,
          },
          {
            headers: {
              authorization:
                "SGVUCE " + this.$cookies.get("ROLE_USER").token_acceso,
            },
          }
        );
      } catch (error) {}
    },
  },
};
</script>
  <style>
#titulo {
  background-color: #036eb4;
  color: white;
}

.container.fill-height {
  display: block;
}
#dialogo {
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>