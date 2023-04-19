<template>
    <div class="explansion--tab">
      <div class="tab" v-for="item in explanList" :key="item.id">
        <div class="tab__header" :class="{'tab__header--hidden': (activeId !== item.id)}">
          <h4>{{item.title}}</h4>
          <button class="tab__header__action" @click="activeId = item.id">
            <img src="~/static/img/life-style-section/minus-icon.png" alt="" v-if="activeId === item.id">
            <img src="~/static/img/life-style-section/plus-icon.png" alt="" v-else>
          </button>
        </div>
        <div class="tab__content" v-if="activeId === item.id">
          <p>{{ item.des1 }}</p>

          <p>{{ item.des2 }}}</p>

          <p>{{item.des3}}</p>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    name: "LifeStyleSectionExpansionTab",

    props: {
      explanList: {
          type: Array,
          default: () => []
      }
    },

    data() {
      return {
        activeId: 1,
      }
    },
}
</script>

<style lang="scss" scoped>
.explansion--tab {
  padding: 0 1.6rem;
  border-radius: 20px;
  border: 1px solid var(--color-boder);
}
.tab {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // min-height: 6rem;
    padding: 2.4rem 0 1.2rem;

    h4 {
      font-weight: 700;
      font-size: 1.6rem;
      line-height: 2.2rem;
      color: var(--color-menu);
      margin-bottom: 0;
    }

    &--hidden {
      padding: 2.4rem 0;
      border-bottom: 1px solid var(--color-boder);
    }
  }

  &__content {
    padding: 0 4.2rem 5.2rem 0;
    border-bottom: 1px solid var(--color-boder);
    p {
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 2.4rem;
      color: var(--color-text-black);
    }
  }
}
</style>