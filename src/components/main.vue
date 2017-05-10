<template>
    <v-app id="app">
        <v-card>
            <v-card-row class="primary darken-1">
                <v-card-title>
                    <span class="white--text">Chromebook Identifier</span>
                    <v-spacer></v-spacer>
                </v-card-title>
            </v-card-row>
            <v-card-text class="content">
                <v-card-row>
                    <div class="loading" v-if="device == null && error == null && !missing">
                        <v-progress-circular indeterminate class="primary--text" />
                    </div>
                    <div v-if="device != null">
                        <div><strong>Inventory Number:</strong> <span>{{device.inventory_number}}</span></div>
                        <div><strong>Serial Number:</strong> <span>{{device.serial_number}}</span></div>
                        <div><strong>Bag Tag:</strong> <span>{{device.bag_tag ? device.bag_tag : "None"}}</span></div>
                        <div><strong>Status:</strong> <span>{{device.status}}</span></div>
                        <div><strong>User:</strong> <span>{{device.user}}</span></div>
                    </div>
                    <div v-if="missing">
                        There is no information about this device.
                    </div>
                    <div v-if="error != null">
                        There was an error getting information about this chomebook.
                        <div class="error-text"><strong>Error:</strong> {{error}}</div>
                    </div>
                        </v-card-row>
                </v-card-text>
                <v-card-row actions v-if="device != null">
                    <v-btn flat class="secondary--text" @click.native="openInventory(device.inventory_number)">View Inventory</v-btn>
                </v-card-row>
            </v-card>
        </v-app>
</template>
<script>
import getEnterpriseID from "../js/id.js";
import getDevice from "../js/api.js";
import openInventoryTab from "../js/search.js";

export default {
    data: function() {
        return {
            id: null,
            device: null,
            missing: false,
            error: null
        };
    },
    methods: {
        openInventory: function(inventory_number) {
            openInventoryTab(inventory_number);
        }
    },
    created: function() {
        getEnterpriseID((id) => {
            if (id == null) {
                this.missing = true;
                return;
            }

            var promise = getDevice(id);

            promise.then((response) => {
                this.device = response.data;
            }).catch((error) => {
                if (error.response) {
                    console.error(error.response);
                    if (error.response.status === 404) {
                        this.missing = true;
                    } else {
                        this.error = error.response.statusText;
                    }
                } else if (error.request) {
                    this.error = error.request;
                } else {
                    this.error = error.message;
                }
            });
        });
    }
};
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
