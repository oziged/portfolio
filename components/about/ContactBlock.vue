<template>
  <div class="contact-block">
    <span class="contact-block__title">Contact</span>
      <div class="contact-block__flex-wrapper">
        <div class="contact-block__links">
          <a
            :href="link"
            target="_blank"
            v-for="(link, key) in contactLinks"
            :key="key"
            class="contact-block__link a_underlined"
            @mouseenter="linkMouseEnter"
            @mouseleave="linkMouseLeave"
          >
            {{ key }}
          </a>
        </div>

        <div class="contact-block__date" v-if="date">
          {{ `${date.hour}:${date.min}${date.meridium}` }} <br>
          {{ `${date.day}, ${date.date} ${date.month}` }} <br>
          Zaporizhia, Ukraine
        </div>
      </div>
  </div>
</template>

<script>
import * as moment from 'moment';

export default {
  inject: ['updateCursor'],

  data() {
    return {
      moment: null,
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      contactLinks: {
        resume: 'https://drive.google.com/file/d/1Ns_CSQugRMYZgc8_C_Ppos0fhcXZpwXt/view?usp=sharing',
        email: 'https://mail.google.com/mail/?view=cm&fs=1&to=eugenedrvnk@gmail.com',
        github: 'https://github.com/oziged',
        telegram: 'https://t.me/eubarring',
        linkedin: 'https://www.linkedin.com/in/eugenedrvnk/'
      },
    }
  },


  computed: {
    date() {
      if (!this.moment) return
      return {
        day: this.days[this.moment.weekday()],
        date: this.moment.date(),
        month: this.months[this.moment.month()],
        min: this.moment.minute() < 10 ? '0' + this.moment.minute() : this.moment.minute(),
        ...this.hourFormat
      }
    },

    hourFormat() {
      if (!this.moment) return
      let hour = this.moment.hour()
      let meridium = 'am';
      if (hour > 12) {hour -= 12; meridium = 'pm'}
      if (hour < 10) hour = '0' + hour
      return {
        hour,
        meridium
      }
    }
  },


  mounted() {
    this.updateTime()
  },


  methods: {
    updateTime() {
      this.moment = moment()
      setInterval(() => {
        this.moment = moment()
      }, 20000);
    },

    linkMouseEnter() {
      this.updateCursor('enableRedEffect')
      this.updateCursor('disableCircle')
    },

    linkMouseLeave() {
      this.updateCursor('disableRedEffect')
      this.updateCursor('enableCircle')
    }
  },
}
</script>

<style lang="scss">
  .contact-block {
    &__flex-wrapper {
      display: flex;
    }

    &__title {
      font-weight: bold;
    }

    &__links {
      margin-right: 2rem;
    }

    &__link {
      display: block;
    }
  }
</style>
