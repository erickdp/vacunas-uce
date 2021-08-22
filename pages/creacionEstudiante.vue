<template>
  <v-card>
    <v-responsive :aspect-ratio="16 / 9">
      <h1 style="text-align: center; margin-bottom: 10px">Ingreso Estudiantes</h1>
      <img class="imagen" src="/doctora.svg" />
      <div class="container">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="15" md="8">
            <v-card-text class="elevation-12" id="card-in">
              <v-form ref="form" v-model="form">
                <p>Por favor ingrese los datos del nuevo estudiante:</p>
                <v-text-field
                  ref="nombres"
                  label="Nombres"
                  outlined
                  rounded
                  v-model="nombres"
                  :rules="[() => !!nombres || 'Campo obligatorio']"
                  type="text"
                  color="primary"
                >
                </v-text-field>
                <v-text-field
                  ref="apellidos"
                  label="Apellidos"
                  outlined
                  rounded
                  v-model="apellidos"
                  :rules="[() => !!apellidos || 'Campo obligatorio']"
                  type="text"
                  color="primary"
                >
                </v-text-field>
                <v-text-field
                  ref="cedula"
                  label="Cédula"
                  outlined
                  rounded
                  v-model="cedula"
                  :rules="rules"
                  type="number"
                  color="primary"
                                 
                >
                </v-text-field>

                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      outlined
                      rounded
                      v-model="fechaNacimiento"
                      label="Fecha de Nacimiento"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="fechaNacimiento"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>

                <v-text-field
                  ref="correo"
                  label="Correo electrónico"
                  outlined
                  rounded
                  v-model="correo"
                  suffix="@uce.edu.ec"
                  type="text"
                  :rules="[() => !!correo || 'Campo obligatorio']"
                  color="primary"
                >
                </v-text-field>
                <v-text-field
                  ref="telefono"
                  label="Teléfono"
                  outlined
                  rounded
                  v-model="telefono"
                  type="number"
                  :rules="rules"
                  color="primary"
                >
                </v-text-field>
                <v-select
                  :items="items"
                  label="Género"
                  outlined
                  rounded
                  v-model="genero"
                  :rules="[() => !!genero || 'Campo obligatorio']"
                ></v-select>
                <v-text-field
                  ref="semestre"
                  label="Semestre"
                  outlined
                  rounded
                  v-model="semestre"
                  
                  :rules="[() => !!semestre || 'Campo obligatorio']"
                  type="number"
                  color="primary"
                >
                </v-text-field>
                <v-autocomplete
                  v-model="facultad"
                  :items="items"
                  outlined
                  rounded
                  label="Facultades"
                  :rules="[() => !!facultad || 'Campo obligatorio']"
                  type="text"
                  color="primary"
                ></v-autocomplete>
                <!-- <v-text-field
                  ref="facultad"
                  label="Facultad"
                  outlined
                  rounded
                  v-model="facultad"
                  :rules="[() => !!facultad || 'Campo obligatorio']"
                  type="text"
                  color="primary"
                >
                </v-text-field> -->
              </v-form>
            </v-card-text>

            <v-btn id="btn-ingreso" color="secondary" @click="agregarEquipo" :disabled="!form">
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
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="nombres"
                              label="Nombres"
                              :rules="[() => !!nombres || 'Campo obligatorio']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="apellidos"
                              label="Apellidos"
                              :rules="[
                                () => !!apellidos || 'Campo obligatorio',
                              ]"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              :rules="rules"
                              type="number"
                              color="primary"
                              v-model="cedula"
                              label="Cédula"
                             
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    
                      v-model="fechaNacimiento"
                      label="Fecha de Nacimiento"
                       :rules="[
                                () => !!fechaNacimiento || 'Campo obligatorio',
                              ]"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="fechaNacimiento"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
                        
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="correo"
                              label="Correo electrónico"
                              :rules="[() => !!correo || 'Campo obligatorio']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                            type="number"
                              v-model="telefono"
                              label="Teléfono"
                              :rules="rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              :items="items"
                              label="Género"
                              v-model="genero"
                              :rules="[() => !!genero || 'Campo obligatorio']"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="semestre"
                              type="number"
                              label="Semestre"
                              :rules="[() => !!semestre || 'Campo obligatorio']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-autocomplete
                            :items="items"
                              v-model="facultad"
                              label="Facultad"
                              :rules="[() => !!facultad || 'Campo obligatorio']"
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancelar
                      </v-btn>

                      <v-btn color="blue darken-1" text> Editar </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h7"
                      >¿Estás seguro que deseas borrar el
                      registro?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancelar</v-btn
                      >
                      <v-btn color="blue darken-1" text>Aceptar</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
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
export default {
  layout: "admin",
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,

      semestre: 0,
      facultad: "",
      cedula: "",
      nombres: "",
      apellidos: "",
      fechaNacimiento: "", //localDate
      correo: "",
      telefono: "",
      genero: "",
      esControlado: false,

      dialog: false,
      dialogDelete: false,
      // id: "",
      // departamentoProducto: "",
      // impactoExterno: "",
      // impactoInterno: "",
      items: ["Masculino", "Femenino"],
      facultades: [],
      semestres: ["1ro", "2do", "3ro", "4to", "5to", "6to", "7mo", "8vo", "9no", "10mo"],
      rules: [
        (value) => !!value || "Campo Requerido.",
        (value) => (value && value.length <= 10) || "Máximo 10 valores",
      ],
      headers: [
        {
          text: "Nombres",
          value: "nombres",
        },
        {
          text: "Apellidos",
          value: "apellidos",
        },
        {
          text: "Cédula",
          value: "cedula",
          sortable: true,
        },
        {
          text: "Correo",
          value: "correo",
        },
        {
          text: "Teléfono",
          value: "telefono",
        },
        {
          text: "Fecha de Nacimiento",
          value: "fechaNacimiento",
        },
        {
          text: "Género",
          value: "genero",
        },
        {
          text: "Semestre",
          value: "semestre",
        },
        {
          text: "Facultad",
          value: "facultad",
        },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      search: "",
      desserts: [],
      editedIndex: -1,
      // editedItem: {
      //   departamentoProducto: "",
      //   impactoExterno: "",
      //   impactoInterno: "",
      // },
      // defaultItem: {
      //   departamentoProducto: "",
      //   impactoExterno: "",
      //   impactoInterno: "",
      // },
    };
  },
  mounted() {
    this.obtener();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Registro" : "Editar Registro";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    // guardarMod() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.editedItem);
    //   } else {
    //     this.desserts.push({
    //       departamentoProducto: this.editedItem.departamentoProducto,
    //       impactoInterno: this.editedItem.impactoInterno,
    //       impactoExterno: this.editedItem.impactoExterno,
    //     });
    //   }
    //   this.close();
    // },
    // async actualizarDat() {
    //   try {
    //     const datos = {
    //       user: this.$cookies.get("dataClient").usuario.nombreUsuario,
    //       departamentoProducto: this.editedItem.departamentoProducto,
    //       impactoInterno: this.editedItem.impactoInterno,
    //       impactoExterno: this.editedItem.impactoExterno,
    //     };

    //     await this.$axios.put(
    //       `api/sgcnegocio/formularioImpactoComparativo/actualizarImpacto/${this.editedItem.id}`,
    //       datos
    //     );
    //     this.guardarMod();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    async obtener() {
      
      try {
        const resp = await this.$axios.get(
          'api/usuario/' ,{
            headers:{
              Authorization: 'SGVUCE' + $$cookies.get('datos')
            }
          }
            
        );
        this.desserts = resp.data;
        console.log(resp);
      } catch (err) {
        console.log(err);
      }
    },

    // async eliminarDat() {
    //   try {
    //     const datos = {
    //       user: this.$cookies.get("dataClient").usuario.nombreUsuario,
    //       departamentoProducto: this.editedItem.departamentoProducto,
    //       impactoInterno: this.editedItem.impactoInterno,
    //       impactoExterno: this.editedItem.impactoExterno,
    //     };
    //     const resp = await this.$axios.delete(
    //       `api/sgcnegocio/formularioImpactoComparativo/eliminarImpacto/${this.editedItem.id}`,
    //       datos
    //     );
    //     this.deleteItemConfirm();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    agregarEquipo() {
      this.desserts.push({
        nombres: this.nombres,
        apellidos: this.apellidos,
        cedula: this.cedula,
        correo: this.correo,
        fechaNacimiento: this.fechaNacimiento,
        semestre: this.semestre,
        telefono: this.telefono,
        genero: this.genero,
        facultad: this.facultad,
      });
      // this.obtener();
    },
    //     async enviar() {
    //       try {
    //         const data = {
    //           // user: this.$cookies.get("dataClient").usuario.nombreUsuario,
    //           // departamentoProducto: this.departamentoProducto,
    //           // impactoInterno: this.impactoInterno,
    //           // impactoExterno: this.impactoExterno,
    //         };
    //         await this.$axios.post(
    //           "api/sgcnegocio/formularioImpactoComparativo/agregarImpacto",
    //           data
    //         );
    //         // this.agregarEquipo();
    //         // (this.departamentoProducto = " "),
    //         //   (this.impactoExterno = " "),
    //         //   (this.impactoInterno = " ");
    //       } catch (err) {
    //         console.log(err);
    //       }
    //       this.close();
    // }
  },
};
</script>
<style >
.imagen {
  margin-left: 35%;
  width: 30%;
}
#btn-ingreso {
  margin-top: 2%;
  margin-left: 40%;
}
</style>