<template>
    <v-app id="app">
    <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Chromebook Identifier</h3>
            </div>
        </v-card-title>

        <v-card-text class="content">
            <div v-if="device == null && error == null && !missing" class="loading">
                <v-progress-circular
                    indeterminate
                    class="primary--text"
                    />
            </div>
                <div v-if="device != null">
                    <div><strong>Inventory Number:</strong> <span>{{ device.inventory_number }}</span></div>
                    <div><strong>Serial Number:</strong> <span>{{ device.serial_number }}</span></div>
                    <div><strong>Bag Tag:</strong> <span>{{ device.bag_tag ? device.bag_tag : "None" }}</span></div>
                    <div><strong>Status:</strong> <span>{{ device.status }}</span></div>
                    <div><strong>User:</strong> <span>{{ device.user }}</span></div>
                </div>
                <div v-if="missing">
                    There is no information about this device.
                </div>
                <div v-if="error != null">
                    There was an error getting information about this Chromebook.
                    <div class="error-text">
                        <strong>Error:</strong> {{ error }}
                    </div>
                </div>
        </v-card-text>

        <v-card-actions style="float: right" v-if="device">
            <v-btn flat color="primary" @click.native="openInventory(device.inventory_number)">View Inventory</v-btn>
        </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
import api from "../js/api.js"
window.api = api

export default {
    data: function() {
        return {
            device: null,
            missing: false,
            error: null,
        }
    },
    created() {
        this.getDevice()
    },
    methods: {
        async getDevice() {
            try {
                const serial = await api.getSerial()
                this.device = await api.getDevice(serial)
            } catch (error) {
                console.error("Unable to get device:", error)
                if (error.message.includes("enterprise.deviceAttributes")) {
                    this.missing = true
                    return
                }
                if (error.response) {
                    if (error.response.status === 404) {
                        this.missing = true
                    } else {
                        this.error = error.response.statusText
                    }
                } else if (error.request) {
                    this.error = error.request
                } else {
                    this.error = error.message
                }
            }
        },

        openInventory: function(inventory_number) {
            api.openInventoryTab(inventory_number)
        },
    },
}
</script>
<style lang="stylus">
#app
    width: 480px
    .content
        font-size: 2em

        .loading
            width: 100%
            display: flex
            justify-content: center

        .error-text
            font-size: 0.75em
</style>
