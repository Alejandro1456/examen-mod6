<template>
  <h1>Vehiculo</h1>
  <div class="card">
    <div class="card-content">


      <form @submit.prevent="nuevo()">
        <p>Nombre : <input type="text" v-model="payload.name" required /></p>
        <p>Número de placa : <input type="text" v-model="payload.placa" required /></p>
        <p>Color del vehiculo : <input type="text" v-model="payload.color" required /></p>
        <!-- <p v-if="categories.length > 0"> -->
        <p>
          <select v-model="payload.empleadoId">
            <option :value="empleado.id" v-for="empleado in empleados">{{ empleado.name }}</option>
          </select>
        </p>
        <button type="submit" class="waves-effect waves-light btn-small">Agregar</button>
      </form>

    </div>
  </div>

  <div class="card">
    <div class="card-content">
      <form @submit.prevent="getList()">
        <h5>Buscar vehiculo</h5>
        <p>Nombre vehiculo: <input type="search" v-model="search" @search="getList()" /></p>
        <button type="submit" class="waves-effect waves-light btn-small">buscar</button>
      </form>
    </div>
  </div>

  <div class="card">
    <div class="card-content">
      <h5>filtros</h5>
      <div class="input-field ">
        <select @change="filter('active', $event.target.value)">
          <option value="" selected>todos</option>
          <option value="true">activo</option>
          <option value="false">inactivo</option>
        </select>
        <br>
        <label>Materialize Select</label>
      </div>

    </div>
  </div>
  <br>
  <div class="card">
    <div class="card-content">

    </div>
  </div>


  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>Número de placa </th>
        <th>Color del vehiculo</th>
        <th>Empleado</th>

        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in items">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.placa }}</td>
        <td>{{ item.color }}</td>
        <td>{{ item.empleadoId }}</td>

        <td> <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons"
              @click="eliminar(item.id)">delete</i></a>
        </td>
        <td> <a class="btn-floating btn-large waves-effect waves-light green"><i class="material-icons"
              @click="update(item.id)">edit</i></a>
        </td>
      </tr>

    </tbody>
  </table>
</template>

<script>


export default {
  name: 'EmpleadoView',
  data() {
    const api = process.env.VUE_APP_API;
    return {
      api,
      items: [],
      search: '',
      toFilter: '',
      payload: {
        name: null,
        placa: null,
        color: null,
        empleadoId: null,

      }
    }
  },
  methods: {
    filter(name, value) {
      this.toFilter = value === '' ? '' : '&' + name + '=' + value;
      this.getList();
    },
    update(id) {
      this.$router.push('/vehiculo/' + id);
    },
    eliminar(id) {
      if (confirm("Esta seguro de eliminar el vehiculo?")) {
        this.axios({
          method: 'delete',
          url: this.api + '/vehiculos/' + id
        }).
          then((response) => {
            this.getList();
          }).
          catch((error) => {
            console.log(error);
          });
      }
    },
    nuevo() {
      this.axios({
        method: 'post',
        url: this.api + '/vehiculos',
        data: this.payload
      }).
        then((response) => {
          this.getList();
          console.log(response);
        }).
        catch((error) => {
          console.log(error);
        });
    },
    getList(name, value) {
      this.axios({
        method: 'get',
        url: this.api + '/vehiculos?_expand=empleado&q=' + this.search + this.toFilter
      }).
        then((response) => {
          this.items = response.data;
        }).
        catch((error) => {
          console.log(error);
        })
    },
    getEmpleadoList() {

      this.axios({
        method: 'get',
        url: this.api + '/empleados'
      }).
        then((response) => {
          this.empleados = response.data;
          const intervalo = setTimeout(() => {
            this.intSelect();
            clearTimeout(intervalo);
          }, 3000);

        }).
        catch((error) => {
          console.log(error);
        })
    },
      intSelect(){
            this.getList();
            this.getCategoryList();
            var elems = document.querySelectorAll('select');
            // var instances = M.FormSelect.init(elems);
        }

  },
  components: {

  },
  mounted() {
    this.getList();
    var elems = document.querySelectorAll('select');
    // var instances = M.FormSelect.init(elems);
  }
}
</script>
