<template>
    <button class="btn rounded-2" @click="$emit('clickButton')">
        <slot></slot>
    </button>
</template>
