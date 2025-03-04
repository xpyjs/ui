import Spinner from "./spinner.vue";
import Dots from "./dots.vue";
import Snake from "./snake.vue";
import Pulse from "./pulse.vue";
import Wave from "./wave.vue";
import { type LoadingType } from "../props";
import { type Component } from "vue";

export { Spinner, Dots, Snake, Pulse, Wave };

export default {
  Spinner,
  Dots,
  Snake,
  Pulse,
  Wave
};

export const animations: Record<LoadingType, Component> = {
  spinner: Spinner,
  dots: Dots,
  snake: Snake,
  pulse: Pulse,
  wave: Wave
};
