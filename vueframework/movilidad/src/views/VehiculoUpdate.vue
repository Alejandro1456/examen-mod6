<template>
  <h1>Editar empleado</h1>
  <div class="card">
    <div class="card-content">
      <form @submit.prevent="update()">
        <p>Nombre : <input type="text" v-model="payload.name" required /></p>
        <p> Número de placa :  <input type="text" v-model="payload.lastname" required /></p>
        <p>Color del vehiculo : <input type="text" v-model="payload.ci" required /></p>
      
        <p>
          <label>
            <input type="checkbox" class="filled-in" v-model="payload.active" />
            <span>Activo</span>
          </label>
        </p>

        <button type="submit" class="waves-effect waves-light btn-small">Agregar</button>
      </form>
    </div>
  </div>
</template>

<script>


export default {
  name: 'EmpleadoView',
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      items: [],
      payload: {
        name: null,
        placa: null,
        color: null,
        empleadoId: null,
        active: null
      }
    }
  },
  methods: {
    getOne() {
      this.axios({
        method: 'get',
        url: this.api + '/empleados/' + this.$route.params.id
      }).
        then((response) => {
          this.payload = response.data;
        }).
        catch((error) => {
          console.log(error);
        });
    },
    update() {
      if (confirm("Esta seguro de editar la información.")) {
        this.axios({
          method: 'patch',
          url: this.api + '/empleados/' + this.$route.params.id,
          data: this.payload
        }).
          then((response) => {
            console.log(response);
          }).
          catch((error) => {
            console.log(error);
          });
      }
    }

  },
  components: {

  },
  mounted() {
    this.getOne();
  }
}
</script>


