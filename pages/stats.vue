<template>
  <div>
    <div class="abilities">
      <div class="ability">
        <ability-block :value="3" :name="'Edge'"></ability-block>
      </div>
      <div class="ability">
        <ability-block :value="2" :name="'Heart'"></ability-block>
      </div>
      <div class="ability">
        <ability-block :value="2" :name="'Iron'"></ability-block>
      </div>
      <div class="ability">
        <ability-block :value="1" :name="'Shadow'"></ability-block>
      </div>
      <div class="ability">
        <ability-block :value="1" :name="'Wits'"></ability-block>
      </div>
    </div>
    <div class="bonds">
      <h3 class="section-title">Bonds</h3>
      <progress-track></progress-track>
    </div>
    <div class="statuses">
      <div class="status">
        <status-input
          :name="'Health'"
          :current-value="$store.state.stats.health"
          @valueChange="onHealthChanged"
        ></status-input>
      </div>
      <div class="status">
        <status-input
          :name="'Spirit'"
          :current-value="$store.state.stats.spirit"
          @valueChange="onSpiritChanged"
        ></status-input>
      </div>
      <div class="status">
        <status-input
          :name="'Supply'"
          :current-value="$store.state.stats.supply"
          @valueChange="onSupplyChanged"
        ></status-input>
      </div>
    </div>
    <div class="momentum">
      <momentum-input
        :current-value="$store.state.stats.momentum"
        :max="$store.state.stats.momentum_max"
        :reset="$store.state.stats.momentum_reset"
        @reset="onMomentumReset"
        @valueChange="onMomentumChanged"
      ></momentum-input>
    </div>
  </div>
</template>

<script>
import AbilityBlock from '~/components/AbilityBlock.vue'
import MomentumInput from '~/components/MomentumInput.vue'
import ProgressTrack from '~/components/ProgressTrack.vue'
import StatusInput from '~/components/StatusInput.vue'
export default {
  components: {
    AbilityBlock,
    MomentumInput,
    ProgressTrack,
    StatusInput
  },
  methods: {
    onHealthChanged(value) {
      this.$store.commit('stats/setHealth', value)
    },
    onSpiritChanged(value) {
      this.$store.commit('stats/setSpirit', value)
    },
    onSupplyChanged(value) {
      this.$store.commit('stats/setSupply', value)
    },
    onMomentumChanged(value) {
      this.$store.commit('stats/setMomentum', value)
    },
    onMomentumReset() {
      this.$store.commit('stats/resetMomentum')
    }
  }
}
</script>

<style lang="scss" scoped>
.abilities {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.ability {
  display: flex;
  padding-top: 20px;
  justify-content: center;
}
.bonds {
  margin-top: 32px;
}
.section-title {
  text-align: center;
}
.section-title:before,
.section-title:after {
  border-top: 1px solid black;
  content: '';
  display: inline-block;
  height: 0;
  margin-bottom: 0.25em;
  position: relative;
  width: 50%;
}

.section-title:before {
  right: 0.5em;
  margin-left: -50%;
}

.section-title:after {
  left: 0.5em;
  margin-right: -50%;
}
.statuses {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 32px;
}
.status {
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 33%;
  justify-content: center;
}
.momentum {
  margin-top: 32px;
  display: flex;
  justify-content: center;
}
</style>
