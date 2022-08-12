<template>
  <div class="edit-skill-component" :class="{'blocked' : blocked}">
    <div class="edit-skill-title" v-if="editmode === false">
      <div class="edit-skill-text">{{editValue.title}}</div>
      <div class="edit-skill-desc">
        <div class="edit-skill-percent edit-skill-percent--output">{{editValue.percent}}</div>
        <div class="edit-skill-buttons">
          <div class="button-icon">
            <icon symbol="pencil" grayscale @click="editmode = true"></icon>
          </div>
          <div class="button-icon button-icon--trash">
            <icon symbol="trash" grayscale @click="removeExistedSkill"></icon>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="edit-skill-title">
      <div class="edit-skill-input">
        <app-input
          placeholder="Название новой группы"
          v-model="editValue.title"
          :errorMessage="validation.firstError('editValue.title')"
          @keydown.native.enter="onApprove(editValue.id)"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
        />
      </div>
      <div class="edit-skill-desc">
        <div class="edit-skill-percent">
          <app-input
            type="number"
            v-model="editValue.percent"
            :errorMessage="validation.firstError('editValue.percent')"
            @keydown.native.enter="onApprove(editValue.id)"
            min="0"
            max="100"
            maxlength="3"
          />
        </div>
        <div class="edit-skill-buttons">
          <div class="button-icon">
            <icon symbol="tick" @click="onApprove"></icon>
          </div>
          <div class="button-icon">
            <icon symbol="cross" @click="cancelChanges"></icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Validator } from 'simple-vue-validator';
import { mapActions } from 'vuex';

export default {
  mixins: [require('simple-vue-validator').mixin],
  validators: {
    'editValue.title'(value) {
      return Validator.value(value).required('ЗАПОЛНИТЕ ПОЛЕ');
    },
    'editValue.percent'(value) {
      return Validator.value(value)
              .required('НЕДОПУСТИМО')
              .greaterThanOrEqualTo(0, 'НЕДОПУСТИМО')
              .lessThanOrEqualTo(100, 'НЕДОПУСТИМО');
    }
  },
  props: {
    value: Object,
    errorText: {
      type: String,
      default: ""
    },
    blocked: Boolean
  },
  data() {
    return {
      editmode: false,
      editValue: {...this.value}
    }
  },
  methods: {
    ...mapActions('skills', ['removeSkill', 'editSkill']),
    ...mapActions('notifs', ['showError']),
    onApprove() {
      this.$validate(['editValue.title', 'editValue.percent']).then(async (success) => {
        if (success) {
          try {  
            await this.editSkill(this.editValue);
            this.editmode = false;
          } catch(error) {
            console.log(error);
            this.showError(error.response.data.error);
          };
        }
      });
    },
    async removeExistedSkill() {
      try {
        await this.removeSkill(this.value.id);
      } catch(error) {
        console.log(error);
        this.showError(error.response.data.error);
      }
    },
    cancelChanges() {
      this.editValue = {...this.value};
      this.editmode = false;
    }
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input")
  },
  watch: {
    value() {
      this.editValue = {...this.value}
    }
  }
};
</script>

<style lang="postcss" scoped src="./editSkill.pcss"></style>