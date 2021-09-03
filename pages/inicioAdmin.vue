<template>
  <v-card>
    <v-responsive :aspect-ratio="16 /9">
      <h1
        style="text-align: center; margin-bottom: 10px"
      >Bienvenido al Sistema Gratuito de Vacunación Uce</h1>
      <img class="imagen" src="/IngresoAdmin.svg" />
      <v-card-text>
       
        <br />
        <br /><v-text-area id="texto">
          Como Universidad Central del Ecuador nos hemos sumado a esta lucha hombro a hombro para poder hacerle
          frente al virus, a través de la inoculación de la comunidad educativa, siendo los estudiantes
          los usuarios que accederan a las brigadas de vacunación, la cual se llevará acabo en las instalaciones
          de la Universidad Central del Ecuador. Este sistema fue creado con el fin de ser un soporte a la
          al Ministerio de Salud del Ecuador y al pais, en el sistema de vacunación que actualmente se esta
          llevando acabo en todo el pais.
        </v-text-area>
        <br />

        <br />
        <br />

        <h3 style="text-align: center; margin-bottom: 10px">Gracias por formar parte de este equipo</h3>
        <h1 style="text-align: center; margin-bottom: 10px">Juntos Saldremos de esto</h1>

        <br />

        <img class="ministerio" src="/ministerioSalud.png" />
        <img style="right " class="uce" src="/uce.jpeg" />
      </v-card-text>
    </v-responsive>
  </v-card>
</template>
<script>
export default {
  layout: "admin",
};
</script>
<style >
.imagen {
  margin-left: 40%;
  width: 60%;
}
.ministerio {
  margin-left: 25%;
  width: 15%;
}
.uce {
  margin-left: 15%;
  width: 20%;
}
.texto {
  text-align: justify;
}
</style>