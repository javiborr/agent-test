<template>
    <div>
        <div class="card">
            <div class="card-header">
                Llamada saliente {{currentContact.campana.nombre}}
            </div>
            <div class="card-body">
                <h5 class="card-title"><i class="material-icons">account_circle</i>&nbsp;{{ currentContact.nombre}}&nbsp;{{ currentContact.apellido1}}&nbsp;{{ currentContact.apellido2}}</h5>
                <p class="card-text">NIF: {{ currentContact.nif}}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="btn-toolbar" role="toolbar">
                        <div class="btn-group mr-2" role="group" v-for="telef in listPhones" :key="telef">
                            <button type="button" class="btn btn-outline-secondary" 
                                title="Reprograma llamada usando este numero">
                                <i class="material-icons">phone</i>&nbsp;{{ telef }}&nbsp;
                            </button>
                        </div>
                    </div>
                    <!-- <span v-for="telef in listPhones" :key="telef"></span> -->
                </li>
                <li class="list-group-item"><i class="material-icons">apartment</i>&nbsp;{{ currentContact.domicilio}}&nbsp;{{ currentContact.cpostal}}&nbsp;{{ currentContact.localidad}}</li>
                <li class="list-group-item"></li>
            </ul>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { EventBus } from "@/main";

const mapcontactmod = createNamespacedHelpers('contactmod')

export default {
    computed: {
        ...mapcontactmod.mapGetters({
            currentContact: 'getCurrent'
        }),
        listPhones() {
            const c = this.currentContact;
            const ls = [];
            if ( c.telefono1 ) ls.push(c.telefono1);
            if ( c.telefono2 ) ls.push(c.telefono2);
            if ( c.telefono3 ) ls.push(c.telefono3);
            if ( c.telefono4 ) ls.push(c.telefono4);
            return ls;
        }
    }
}
</script>

<style scoped>
.material-icons {
    font-size: 20px;
}
</style>
