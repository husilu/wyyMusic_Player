<template>
    <transition name="router-fade" mode="out-in">
      <router-view />
    </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Home extends Vue {}
</script>
