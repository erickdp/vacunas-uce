<template>
  <v-card>
    <v-responsive :aspect-ratio="16 /9">
      <h1
        style="text-align: center; margin-bottom: 10px"
      >Bienvenido al Sistema Gratuito de Vacunación Uce</h1>
      <img class="imagen" src="/ingresoControlador.svg" />
      <v-card-text>
       
        <br />
        <p class="texto">
          Como Universidad Central del Ecuador nos hemos sumado a esta lucha hombro a hombro para poder hacerle
          frente al covid-19, a través de la Inoculación de la comunidad educativa, siendo los estudiantes
          los usuarios que accederan a las brigadas de Vacunación, la cual se llevará acabo en las instalaciones
          de la Universidad Central del Ecuador.Este sistema fue creado con el fin de poder ser un soporte a la
          Universidad Central del Ecuador y al Ministerio de Salud del Ecuador, en el sistema de vacunación que
          actualmente se esta llevando acabo en todo el pais.
        </p>
        <p>
          Usted como Controlador del Sistema, registrará la información de cada estudiante,
          la dosis adquirida, el tipo de vacuna y el número de Lote con el cual va a ser inoculado.
        </p>

        <p>
          Para poder hacer el registro, el estudiante deberá estar de acuerdo a ser vacunado, con el tipo de
          vacuna existente, otorgada por el Ministerio de Salud. De esta manera se pordrá generar automaticamente
          el carnet de vacunación.
        </p>

        <br />
        <br />

        <h3 style="text-align: center; margin-bottom: 10px">Gracias por formar parte de este equipo</h3>
        <h2 style="text-align: center; margin-bottom: 10px">Juntos Saldremos de esto</h2>
        <br />

        <img class="ministerio" src="/ministerioSalud.png" />
        <img style="right " class="uce" src="/uce.jpeg" />
      </v-card-text>
    </v-responsive>
  </v-card>
</template>
<script>
export default {
  layout: "controlador",
};
</script>
<style >
.imagen {
  margin-left: 35%;
  width: 30%;
}
.ministerio {
  margin-left: 25%;
  width: 15%;
}
.uce {
  margin-left: 15%;
  width: 22%;
}
.texto {
  text-align: justify;
}
</style>