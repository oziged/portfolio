import Vue from 'vue'
import gsap from 'gsap'

const handlers = {}
let counter = 0

Vue.directive('on-appear', {
  bind(el, {value: handler}) {
    el.$scrollId = counter
    counter++
    let tween = handler()
    handlers[el.$scrollId] = tween
    observer.observe(el)
  },

  unbind(el) {
    delete handlers[el.$scrollId]
  },
})

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
  if (entry.isIntersecting) {
    handlers[entry.target.$scrollId].play()
    observer.unobserve(entry.target);
  }
  });
});


