<template>
  <div>
    <slot v-if="$app.lang.zh" name="zh"></slot>
    <slot v-if="$app.lang.en" name="en"></slot>
  </div>
</template>
