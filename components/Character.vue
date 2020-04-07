<template>
  <div v-if="character" class="character">
    <div class="header" @click.self="toggleOpen">
      <input
        :id="`${id}-name`"
        class="name"
        placeholder="Name"
        type="text"
        :value="name"
        @input="onNameChange"
      />
      <remove-icon @click="onRemove" />
    </div>
    <div v-show="isOpen" class="body">
      <div class="name-section">
        <div class="stats">
          <div class="stat">
            <label :for="`${id}-edge`">Edge</label>
            <number-input
              id="`${id}-edge`"
              type="number"
              :value="edge"
              @input="onEdgeChange"
            />
          </div>
          <div class="stat">
            <label :for="`${id}-heart`">Heart</label>
            <number-input
              :id="`${id}-heart`"
              type="number"
              :value="heart"
              @input="onHeartChange"
            />
          </div>
          <div class="stat">
            <label :for="`${id}-iron`">Iron</label>
            <number-input
              :id="`${id}-iron`"
              type="number"
              :value="iron"
              @input="onIronChange"
            />
          </div>
          <div class="stat">
            <label :for="`${id}-shadow`">Shadow</label>
            <number-input
              :id="`${id}-shadow`"
              type="number"
              :value="shadow"
              @input="onShadowChange"
            />
          </div>
          <div class="stat">
            <label :for="`${id}-wits`">Wits</label>
            <number-input
              :id="`${id}-wits`"
              type="number"
              :value="wits"
              @input="onWitsChange"
            />
          </div>
        </div>
        <momentum-input
          class="momentum"
          :current-value="momentum"
          @valueChange="onMomentumChange"
        ></momentum-input>
        <div class="status">
          <status-input
            name="Health"
            :current-value="health"
            @valueChange="onHealthChange"
          />

          <status-input
            name="Spirit"
            :current-value="spirit"
            @valueChange="onSpiritChange"
          />
          <status-input
            name="Supply"
            :current-value="supply"
            @valueChange="onSupplyChange"
          />
        </div>
      </div>
      <div>
        <h4 class="section-title">Debilities</h4>
        <div class="debilities">
          <div>
            <input
              :id="`${id}-wounded`"
              type="checkbox"
              :checked="wounded"
              @change="onWoundedChange"
            />
            <label :for="`${id}-wounded`">Wounded</label>
          </div>
          <div>
            <input
              :id="`${id}-shaken`"
              type="checkbox"
              :checked="shaken"
              @change="onShakenChange"
            />
            <label :for="`${id}-shaken`">Shaken</label>
          </div>
          <div>
            <input
              :id="`${id}-unprepared`"
              type="checkbox"
              :checked="unprepared"
              @change="onUnpreparedChange"
            />
            <label :for="`${id}-unprepared`">Unprepared</label>
          </div>
          <div>
            <input
              :id="`${id}-encumbered`"
              type="checkbox"
              :checked="encumbered"
              @change="onEncumberedChange"
            />
            <label :for="`${id}-encumbered`">Encumbered</label>
          </div>
          <div>
            <input
              :id="`${id}-maimed`"
              type="checkbox"
              :checked="maimed"
              @change="onMaimedChange"
            />
            <label :for="`${id}-maimed`">Maimed</label>
          </div>
          <div>
            <input
              :id="`${id}-corrupted`"
              type="checkbox"
              :checked="corrupted"
              @change="onCorruptedChange"
            />
            <label :for="`${id}-corrupted`">Corrupted</label>
          </div>
          <div>
            <input
              :id="`${id}-cursed`"
              type="checkbox"
              :checked="cursed"
              @change="onCursedChange"
            />
            <label :for="`${id}-cursed`">Cursed</label>
          </div>
          <div>
            <input
              :id="`${id}-tormented`"
              type="checkbox"
              :checked="tormented"
              @change="onTormentedChange"
            />
            <label :for="`${id}-tormented`">Tormented</label>
          </div>
        </div>
      </div>
      <div>
        <h4 class="section-title">Assets</h4>
        <div class="assets">
          <div
            v-for="(asset, index) in assets"
            :key="asset.name"
            class="asset-wrapper"
          >
            <asset
              v-bind="asset"
              @change="onAssetChange($event, index)"
              @remove="removeAsset(index)"
            ></asset>
          </div>
        </div>
        <asset-selection
          :available-assets="availableAssets"
          @selected="addAsset"
        />
      </div>
      <div>
        <h4 class="section-title">Bonds</h4>
        <div class="bonds">
          <bonds-track :progress="bonds" @progressChange="onBondsChange" />
        </div>
      </div>
      <div>
        <h4 class="section-title">Vows</h4>
        <progress-track
          v-for="(vow, index) in vows"
          :id="index"
          :key="index"
          class="vow"
          v-bind="vow"
          @progressChange="onProgressChange($event, index)"
          @remove="removeVow($event, index)"
        />
        <round-button class="vows__add" @click="addVow">+</round-button>
      </div>
    </div>
  </div>
</template>

<script>
import RoundButton from '~/components/RoundButton.vue'
import RemoveIcon from '~/components/RemoveIcon.vue'
import BondsTrack from '~/components/BondsTrack.vue'
import ProgressTrack from '~/components/ProgressTrack.vue'
import StatusInput from '~/components/StatusInput.vue'
import MomentumInput from '~/components/MomentumInput.vue'
import NumberInput from '~/components/NumberInput.vue'
import Asset from '~/components/Asset.vue'
import AssetSelection from '~/components/AssetSelection.vue'
import { fireDb } from '~/plugins/firebase'
export default {
  components: {
    RoundButton,
    RemoveIcon,
    StatusInput,
    MomentumInput,
    ProgressTrack,
    BondsTrack,
    NumberInput,
    Asset,
    AssetSelection
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      character: null,
      allAssets: null,
      unsubscribe: null
    }
  },
  computed: {
    document() {
      return fireDb.collection('characters').doc(this.id)
    },
    availableAssets() {
      const ownAssets = this.assets.map((asset) => asset.name)
      return this.allAssets.filter((asset) => {
        return !ownAssets.includes(asset.name)
      })
    },
    name() {
      return this.character.name || ''
    },
    edge() {
      return this.character.edge || 0
    },
    heart() {
      return this.character.heart || 0
    },
    iron() {
      return this.character.iron || 0
    },
    shadow() {
      return this.character.shadow || 0
    },
    wits() {
      return this.character.wits || 0
    },
    health() {
      return this.character.health || 5
    },
    spirit() {
      return this.character.spirit || 5
    },
    supply() {
      return this.character.supply || 5
    },
    momentum() {
      return this.character.momentum || 2
    },
    maxMomentum() {
      return this.character.maxMomentum || 10
    },
    momentumReset() {
      return this.character.momentumReset || 2
    },
    assets() {
      return this.character.assets || []
    },
    bonds() {
      return this.character.bonds || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    vows() {
      return this.character.vows || []
    },
    wounded() {
      return this.character.wounded || false
    },
    shaken() {
      return this.character.shaken || false
    },
    unprepared() {
      return this.character.unprepared || false
    },
    encumbered() {
      return this.character.encumbered || false
    },
    maimed() {
      return this.character.maimed || false
    },
    corrupted() {
      return this.character.corrupted || false
    },
    cursed() {
      return this.character.cursed || false
    },
    tormented() {
      return this.character.tormented || false
    }
  },
  mounted() {
    const resolve = require.context('~/content/assets', true, /\.json$/)
    const allAssets = resolve
      .keys()
      .map((key) => {
        return resolve(key)
      })
      .sort((a, b) => {
        return a.type.localeCompare(b.type)
      })
    this.allAssets = allAssets

    this.unsubscribe = this.document.onSnapshot((doc) => {
      if (doc.exists) {
        this.character = doc.data()
      } else {
        this.document.set({})
      }
    })
  },
  beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
    setCharacter(updatedCharacter) {
      this.document.update(updatedCharacter)
    },
    onNameChange(event) {
      this.setCharacter({
        ...this.character,
        name: event.target.value
      })
    },
    onExpChange(event) {
      this.setCharacter({
        ...this.character,
        exp: parseInt(event.target.value)
      })
    },
    onMomentumChange(value) {
      this.setCharacter({
        ...this.character,
        momentum: parseInt(value)
      })
    },
    onEdgeChange(event) {
      this.setCharacter({
        ...this.character,
        edge: parseInt(event.target.value)
      })
    },
    onHeartChange(event) {
      this.setCharacter({
        ...this.character,
        heart: parseInt(event.target.value)
      })
    },
    onIronChange(event) {
      this.setCharacter({
        ...this.character,
        iron: parseInt(event.target.value)
      })
    },
    onShadowChange(event) {
      this.setCharacter({
        ...this.character,
        shadow: parseInt(event.target.value)
      })
    },
    onWitsChange(event) {
      this.setCharacter({
        ...this.character,
        wits: parseInt(event.target.value)
      })
    },
    onHealthChange(value) {
      this.setCharacter({
        ...this.character,
        health: parseInt(value)
      })
    },
    onSpiritChange(value) {
      this.setCharacter({
        ...this.character,
        spirit: parseInt(value)
      })
    },
    onSupplyChange(value) {
      this.setCharacter({
        ...this.character,
        supply: parseInt(value)
      })
    },
    onWoundedChange(event) {
      this.setCharacter({
        ...this.character,
        wounded: event.target.checked
      })
    },
    onShakenChange(event) {
      this.setCharacter({
        ...this.character,
        shaken: event.target.checked
      })
    },
    onUnpreparedChange(event) {
      this.setCharacter({
        ...this.character,
        unprepared: event.target.checked
      })
    },
    onEncumberedChange(event) {
      this.setCharacter({
        ...this.character,
        encumbered: event.target.checked
      })
    },
    onMaimedChange(event) {
      this.setCharacter({
        ...this.character,
        maimed: event.target.checked
      })
    },
    onCorruptedChange(event) {
      this.setCharacter({
        ...this.character,
        corrupted: event.target.checked
      })
    },
    onCursedChange(event) {
      this.setCharacter({
        ...this.character,
        cursed: event.target.checked
      })
    },
    onTormentedChange(event) {
      this.setCharacter({
        ...this.character,
        tormented: event.target.checked
      })
    },
    onBondsChange(bonds) {
      this.setCharacter({
        ...this.character,
        bonds
      })
    },
    onProgressChange(value, index) {
      this.vows[index].progress = value
      this.setCharacter({
        ...this.character,
        vows: this.vows
      })
    },
    onAssetChange(asset, index) {
      const assets = [...this.assets]
      assets.splice(index, 1, asset)
      this.setCharacter({
        ...this.character,
        assets
      })
    },

    addAsset(asset) {
      const assets = [...this.assets]
      assets.push(asset)
      this.setCharacter({
        ...this.character,
        assets
      })
    },
    removeAsset(index) {
      const assets = [...this.assets]
      assets.splice(index, 1)
      this.setCharacter({
        ...this.character,
        assets
      })
    },
    addVow() {
      this.setCharacter({
        ...this.character,
        vows: [...this.vows, {}]
      })
    },
    removeVow(index) {
      const vows = [...this.vows]
      vows.splice(index, 1)
      this.setCharacter({
        ...this.character,
        vows
      })
    },
    onRemove() {
      const remove = confirm('Are you sure you want to remove this character?')
      if (remove) {
        this.$emit('remove', () => {
          this.document.delete().catch((error) => {
            console.log(error)
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.character {
  background-color: black;
  border-radius: 4px;
  overflow: hidden;
  color: #fff;

  &:hover,
  &:focus {
    background-color: #333;
    outline: none;
  }

  .header {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name {
      font-family: 'Times New Roman', Times, serif;
      padding: 4px;
      border-radius: 4px;
      outline: none;
      border: 1px solid transparent;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);

      &:focus {
        border: 1px solid #00c8fa;
        box-shadow: 0 0 4px rgba(255, 255, 255, 1);
      }
    }
  }

  .body {
    background: #4a4a4a;
    padding: 15px;
  }

  .name-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: -16px;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(5, min-content);
    grid-gap: 16px;

    .stat {
      text-align: center;
      input {
        margin-top: 4px;
        display: block;
      }
    }
  }

  .stats,
  .momentum,
  .status {
    margin: 16px 16px 0 0;
  }

  .status {
    display: grid;
    grid-template-columns: repeat(3, min-content);
    grid-gap: 16px;
  }

  .debilities {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    grid-gap: 16px;
    text-align: left;
    margin: 0 auto;
  }

  .assets {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    margin-bottom: 1rem;
  }

  .asset-wrapper {
    display: flex;
    justify-content: center;
  }

  .vows__add {
    margin: 1rem auto;
  }

  .vow {
    margin-bottom: 1rem;
  }

  .section-title {
    text-align: center;
    display: flex;

    &:before,
    &:after {
      content: '';
      flex: 1;
      border-bottom: 1px solid white;
      margin: auto 0.25em;
    }
  }
}
</style>
