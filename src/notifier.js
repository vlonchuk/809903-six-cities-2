import {Notyf} from 'notyf';
//import 'notyf/notyf.min.css';

const notifier = new Notyf();

export default {
  error: (text) => notifier.error(text),
};
