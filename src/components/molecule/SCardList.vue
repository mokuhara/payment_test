<template>
  <div>
    <div class="container">
      <ul class="members">
        <li class="member" v-for="(specialist, index) in lists" :key="index">
          <SCard
            :userId="specialist.userId"
            :iconUrl="specialist.iconUrl"
            :name="specialist.name"
            :description="specialist.description"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SCard from "../atom/SCard";
import { createNamespacedHelpers } from "vuex";

const {
  mapState: mapStateOfUsers,
  mapActions: mapActionsOfUsers,
} = createNamespacedHelpers("user");

export default {
  data() {
    return {
      lists: [],
    };
  },
  components: {
    SCard,
  },
  computed: {
    ...mapStateOfUsers(["specialists"]),
  },
  methods: {
    ...mapActionsOfUsers(["get"]),
  },
  async created() {
    await this.get();
    this.lists = this.specialists;
  },
};
</script>

<style scoped>
.members {
  list-style: none;
  padding-inline-start: 0;
}
</style>
