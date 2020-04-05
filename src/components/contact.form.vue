<template>
    <div>
        <div>Nombre: {{ currentContact.nombre}}&nbsp;{{ currentContact.apellido1}}
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
        })
    }
}
</script>
