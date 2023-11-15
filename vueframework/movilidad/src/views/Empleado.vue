<template>
  <h1>Empleado</h1>
  <div class="card">
    <div class="card-content">


      <form @submit.prevent="nuevo()">
        <p>Nombre : <input type="text" v-model="payload.name" required /></p>
        <p>Apellido : <input type="text" v-model="payload.lastname" required /></p>
        <p>Ci : <input type="text" v-model="payload.ci" required /></p>
        <p>Celular : <input type="text" v-model="payload.celular" required /></p>
        <p>Area : <input type="text" v-model="payload.area" required /></p>

        <button type="submit" class="waves-effect waves-light btn-small">Agregar</button>
      </form>

    </div>
  </div>

  <div class="card">
    <div class="card-content">
      <form @submit.prevent="getList()">
        <h5>Buscar empleado</h5>
        <p>Nombre empleado: <input type="search" v-model="search" @search="getList()" /></p>
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
        <th>Nombre</th>
        <th>Apellido</th>
        <th>CI</th>
        <th>Celular</th>
        <th>Area</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in items">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.lastname }}</td>
        <td>{{ item.ci }}</td>
        <td>{{ item.celular }}</td>
        <td>{{ item.area }}</td>
        <td>{{item.active ? "activo":"inactivo"}}</td>
        <td> <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons"
              @click="eliminar(item.id)">delete</i></a>
              <a class="btn-floating btn-large waves-effect waves-light green"><i class="material-icons"
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
        area: null,
        active: true  
      }
    }
  },
  methods: {
    filter(name, value) {
      this.toFilter = value === '' ? '' : '&' + name + '=' + value;
      this.getList();
    },
    update(id) {
      this.$router.push('/empleado/' + id);
    },
    eliminar(id) {
      if (confirm("Esta seguro de eliminar al empleado?")) {
        this.axios({
          method: 'delete',
          url: this.api + '/empleados/' + id
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
        url: this.api + '/empleados',
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
        url: this.api + '/empleados?q=' + this.search + this.toFilter
      }).
        then((response) => {
          this.items = response.data;
        }).
        catch((error) => {
          console.log(error);
        })
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
