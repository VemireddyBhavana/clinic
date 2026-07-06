import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, ArrowRight, Zap, Navigation, Activity, BellRing, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import gsap from 'gsap';

/* ─── SVG beam + strike generator ─── */
const createSVG = () => `
  <svg viewBox="0 0 116 5" preserveAspectRatio="none" class="beam">
    <path d="M0.5 2.5L113 0.534929C114.099 0.515738 115 1.40113 115 2.5C115 3.59887 114.099 4.48426 113 4.46507L0.5 2.5Z" fill="url(#gradient-beam)"/>
    <defs>
      <linearGradient id="gradient-beam" x1="2" y1="2.5" x2="115" y2="2.5" gradientUnits="userSpaceOnUse">
        <stop stop-color="#0270ffff"/>
        <stop offset="1" stop-color="white"/>
      </linearGradient>
    </defs>
  </svg>
  <div class="strike">
    <svg viewBox="0 0 114 12" preserveAspectRatio="none">
      <g fill="none" stroke="white" stroke-width="0.75" stroke-linecap="round">
        <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
        <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
        <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
      </g>
    </svg>
    <svg viewBox="0 0 114 12" preserveAspectRatio="none">
      <g fill="none" stroke="white" stroke-width="0.75" stroke-linecap="round">
        <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
        <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
        <path d="M113.5 6.5L109.068 8.9621C109.023 8.98721 108.974 9.00516 108.923 9.01531L106.889 9.42219C106.661 9.46776 106.432 9.35034 106.336 9.1388L104.045 4.0986C104.015 4.03362 104 3.96307 104 3.8917V2.12268C104 1.6898 103.487 1.46145 103.166 1.75103L99.2887 5.24019C99.1188 5.39305 98.867 5.41132 98.6768 5.28457L95.0699 2.87996C94.7881 2.69205 94.4049 2.83291 94.3118 3.15862L92.6148 9.09827C92.5483 9.33084 92.3249 9.48249 92.0843 9.45843L87.7087 9.02087C87.5752 9.00752 87.4419 9.04839 87.3389 9.13428L84.9485 11.1263C84.7128 11.3227 84.3575 11.2625 84.1996 10.9994L81.7602 6.93359C81.617 6.69492 81.3064 6.61913 81.0694 6.76501L75.3165 10.3052C75.1286 10.4209 74.8871 10.3997 74.7223 10.2531L70.6678 6.64917C70.5611 6.55429 70.5 6.41829 70.5 6.27547V1.20711C70.5 1.0745 70.4473 0.947322 70.3536 0.853553L70.2185 0.718508C70.0846 0.584592 69.8865 0.537831 69.7068 0.59772L69.2675 0.744166C68.9149 0.861705 68.8092 1.30924 69.0721 1.57206L69.605 2.10499C69.8157 2.31571 69.7965 2.66281 69.5638 2.84897L67.5 4.5L65.2715 6.28282C65.1083 6.41338 64.8811 6.42866 64.7019 6.32113L60.3621 3.71725C60.153 3.59179 59.8839 3.63546 59.7252 3.8206L57.0401 6.95327C57.0135 6.9843 56.9908 7.01849 56.9725 7.05505L55.2533 10.4934C55.1188 10.7624 54.779 10.8526 54.5287 10.6858L50.7686 8.17907C50.6051 8.07006 50.3929 8.06694 50.2263 8.17109L46.7094 10.3691C46.5774 10.4516 46.4145 10.468 46.2688 10.4133L42.6586 9.05949C42.5558 9.02091 42.4684 8.94951 42.4102 8.85633L40.1248 5.1997C40.0458 5.07323 40.0273 4.91808 40.0745 4.77659L40.6374 3.08777C40.7755 2.67359 40.3536 2.29381 39.9562 2.47447L35.5 4.5L32.2657 5.88613C32.1013 5.95658 31.9118 5.93386 31.7687 5.82656L30.1904 4.64279C30.0699 4.55245 29.9152 4.5212 29.7691 4.55772L26.2009 5.44977C26.0723 5.48193 25.9617 5.56388 25.8934 5.67759L23.1949 10.1752C23.0796 10.3673 22.8507 10.4593 22.6346 10.4003L17.6887 9.05148C17.5674 9.01838 17.463 8.94076 17.3963 8.83409L15.3331 5.53299C15.1627 5.26032 14.7829 5.21707 14.5556 5.44443L12.1464 7.85355C12.0527 7.94732 11.9255 8 11.7929 8H8.15139C8.05268 8 7.95617 7.97078 7.87404 7.91603L3.74143 5.16095C3.59214 5.06142 3.40096 5.04952 3.24047 5.12976L0.5 6.5" />
      </g>
    </svg>
  </div>
`;

/* ─── Tab Sections ─── */
const tabs = ['Home', 'About', 'Service', 'Contact'];

function HomeSection({ navigate }) {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-16 w-full">
      <motion.div
        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }} className="flex-1 max-w-xl space-y-6"
      >
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-500/20">
          <Activity size={14} className="animate-pulse" /> AI-Powered Smart Scheduling
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-none">
          Smarter Appointments.<br />
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Better Healthcare.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          MediSlot AI bridges the gap between patient slot booking and clinic administration. Discover nearby hospitals, preview directions with Street View, and optimize medical resources in real-time.
        </p>
        <button
          onClick={() => navigate('/admin/login')}
          className="py-4 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl flex items-center gap-3 shadow-[0_0_30px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-300 text-sm hover:-translate-y-0.5"
        >
          GET STARTED <ArrowRight size={16} />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }} className="flex-1 w-full max-w-xl"
      >
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">Why Choose MediSlot AI?</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            { title: "Smart AI Scheduling", desc: "Optimize rosters, balance workloads, and cut wait times.", icon: Zap, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
            { title: "Hospital Locator", desc: "Detect live coordinates and map nearby clinics by distance.", icon: Navigation, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
            { title: "Google Street View", desc: "Preview hospital surroundings in full 3D in a new tab.", icon: Activity, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
            { title: "System Alerts", desc: "Automate follow-ups, cancellations, and notifications.", icon: BellRing, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
          ].map((f, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm hover:border-slate-700/60 transition-colors hover:-translate-y-1 duration-200">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${f.color}`}><f.icon size={20} /></div>
              <h3 className="font-bold text-white text-sm mb-1">{f.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function AboutSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">About MediSlot AI</h2>
      <p className="text-slate-400 text-base leading-relaxed">
        MediSlot AI is a next-generation AI-powered clinic management and appointment scheduling platform designed for hospitals across Telangana and beyond. Our mission is to eliminate long queues, reduce no-shows, and ensure every patient gets the right care at the right time.
      </p>
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { val: "250+", label: "Registered Doctors" },
          { val: "15K+", label: "Appointments Booked" },
          { val: "98%", label: "Patient Satisfaction" },
        ].map((s, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 text-center backdrop-blur-sm">
            <p className="text-3xl font-extrabold text-blue-400">{s.val}</p>
            <p className="text-xs text-slate-400 mt-1 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 bg-slate-900/40 border border-slate-800/60 rounded-2xl px-6 py-4">
        <ShieldCheck size={20} className="text-emerald-400 shrink-0" />
        <p className="text-slate-400 text-sm">HIPAA-compliant data handling with end-to-end encryption for all patient records and clinical data.</p>
      </div>
    </motion.div>
  );
}

function ServiceSection() {
  const services = [
    { title: "Slot Recommendation", desc: "AI suggests the best available slots based on doctor workload, patient preferences, and historical patterns.", icon: Zap },
    { title: "No-Show Prediction", desc: "Machine learning models predict no-show risk and prepare backup patients automatically.", icon: Activity },
    { title: "Workload Balancer", desc: "Distributes appointments evenly across doctors to prevent burnout and ensure quality care.", icon: Navigation },
    { title: "Automated Reminders", desc: "Timely SMS & email reminders for appointments, reducing no-show rates by up to 40%.", icon: BellRing },
    { title: "Location Discovery", desc: "Live geolocation mapping to find and display nearby hospitals sorted by real-time distance.", icon: MapPin },
    { title: "Street View Preview", desc: "Preview hospital surroundings, street details, and route coordinates in full 3D panorama.", icon: HeartPulse },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-5xl mx-auto space-y-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Our Services</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-200 group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
              <s.icon size={20} />
            </div>
            <h3 className="font-bold text-white text-sm mb-2">{s.title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ContactSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Contact Us</h2>
      <p className="text-slate-400 text-base leading-relaxed">Have questions or need support? Reach out to our dedicated team.</p>
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { icon: Mail, label: "Email", value: "support@medislot.ai" },
          { icon: Phone, label: "Phone", value: "+91 800-MEDISLOT" },
          { icon: MapPin, label: "Location", value: "Hyderabad, Telangana, India" },
        ].map((c, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto text-blue-400">
              <c.icon size={22} />
            </div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{c.label}</p>
            <p className="text-sm text-white font-medium">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-bold text-base">Send us a message</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <input placeholder="Your Name" className="bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
          <input placeholder="Your Email" className="bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40" />
        </div>
        <textarea placeholder="Your Message..." rows={4} className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 resize-none" />
        <button className="py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-sm hover:from-blue-500 hover:to-indigo-500 transition-all">Send Message</button>
      </div>
    </motion.div>
  );
}

/* ─── Main Landing Component ─── */
export default function Landing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Home');
  const navRef = useRef(null);
  const activeElRef = useRef(null);
  const animatingRef = useRef(false);

  const getOffsetLeft = useCallback((buttonEl) => {
    if (!navRef.current || !activeElRef.current) return 0;
    const btnRect = buttonEl.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    return btnRect.left - navRect.left + (btnRect.width - activeElRef.current.offsetWidth) / 2;
  }, []);

  /* Mount: create active-element and position it */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const el = document.createElement('div');
    el.classList.add('active-element');
    nav.appendChild(el);
    activeElRef.current = el;

    const firstBtn = nav.querySelector('ul li.active button');
    if (firstBtn) {
      document.fonts.ready.then(() => {
        gsap.set(el, { x: getOffsetLeft(firstBtn) });
        gsap.to(el, { '--active-element-show': '1', duration: 0.2 });
      });
    }

    return () => { if (el.parentNode) el.parentNode.removeChild(el); };
  }, [getOffsetLeft]);

  const handleTabClick = (tabName, buttonEl, index) => {
    if (animatingRef.current) return;
    const nav = navRef.current;
    const el = activeElRef.current;
    if (!nav || !el) return;

    const activeLi = nav.querySelector('ul li.active');
    const oldIndex = [...activeLi.parentElement.children].indexOf(activeLi);
    if (index === oldIndex) return;

    animatingRef.current = true;
    const x = getOffsetLeft(buttonEl);
    const direction = index > oldIndex ? 'after' : 'before';
    const spacing = Math.abs(x - getOffsetLeft(activeLi.querySelector('button')));

    nav.classList.add(direction);
    activeLi.classList.remove('active');
    buttonEl.parentElement.classList.add('active');

    gsap.set(el, { rotateY: direction === 'before' ? '180deg' : '0deg' });

    gsap.to(el, {
      keyframes: [
        {
          '--active-element-width': `${spacing > nav.offsetWidth - 60 ? nav.offsetWidth - 60 : spacing}px`,
          duration: 0.3, ease: 'none',
          onStart: () => {
            el.innerHTML = createSVG();
            gsap.to(el, { '--active-element-opacity': 1, duration: 0.1 });
          },
        },
        {
          '--active-element-scale-x': '0', '--active-element-scale-y': '.25', '--active-element-width': '0px',
          duration: 0.3,
          onStart: () => {
            gsap.to(el, { '--active-element-mask-position': '40%', duration: 0.5 });
            gsap.to(el, { '--active-element-opacity': 0, delay: 0.45, duration: 0.25 });
          },
          onComplete: () => {
            el.innerHTML = '';
            nav.classList.remove('before', 'after');
            el.removeAttribute('style');
            gsap.set(el, { x: getOffsetLeft(buttonEl), '--active-element-show': '1' });
            animatingRef.current = false;
          },
        },
      ],
    });

    gsap.to(el, { x, '--active-element-strike-x': '-50%', duration: 0.6, ease: 'none' });
    setActiveTab(tabName);
  };

  const renderSection = () => {
    switch (activeTab) {
      case 'About': return <AboutSection key="about" />;
      case 'Service': return <ServiceSection key="service" />;
      case 'Contact': return <ContactSection key="contact" />;
      default: return <HomeSection key="home" navigate={navigate} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -50, scale: 0.96 }}
      transition={{ type: 'tween', ease: 'anticipate', duration: 0.4 }}
      className="min-h-screen bg-slate-950 text-white font-sans overflow-hidden relative flex flex-col"
    >
      {/* Scoped CSS for the GSAP navbar */}
      <style>{`
        @import url('https://rsms.me/inter/inter.css');
        .gsap-nav { position: relative; z-index: 10; }
        .gsap-nav ul { margin:0; padding:0; list-style:none; display:flex; gap:60px; }
        .gsap-nav ul li button {
          appearance:none; border:none; cursor:pointer; background:transparent;
          padding:0; margin:0; font-family:"Inter",sans-serif; font-weight:600;
          font-size:15px; color:#fff; transition:color 0.25s;
        }
        .gsap-nav ul li.active button { color:#00fffc; }
        .gsap-nav ul li:not(.active):hover button { color:#807E8C; }
        .gsap-nav .active-element {
          --active-element-scale-x:1; --active-element-scale-y:1;
          --active-element-show:0; --active-element-opacity:0;
          --active-element-width:0px; --active-element-strike-x:0%;
          --active-element-mask-position:0%;
          position:absolute; left:0; top:34px; height:3px; width:36px;
          border-radius:2px; background-color:#fff;
          opacity:var(--active-element-show);
        }
        .gsap-nav .active-element>svg, .gsap-nav .active-element .strike {
          position:absolute; right:0; top:50%; transform:translateY(-50%);
          opacity:var(--active-element-opacity); width:var(--active-element-width);
          mix-blend-mode:multiply;
        }
        .gsap-nav .active-element>svg {
          display:block; overflow:visible; height:5px;
          filter: blur(0.5px) drop-shadow(2px 0px 8px rgba(0,117,255,0.4))
                  drop-shadow(1px 0px 2px rgba(0,128,255,0.8))
                  drop-shadow(0px 0px 3px rgba(153,204,255,0.4))
                  drop-shadow(2px 0px 8px rgba(137,196,255,0.45))
                  drop-shadow(8px 0px 16px rgba(153,204,255,0.5));
        }
        .gsap-nav .active-element .strike {
          padding:24px 0;
          mask-image:linear-gradient(to right,transparent calc(0% + var(--active-element-mask-position)),black calc(15% + var(--active-element-mask-position)),black 80%,transparent);
          -webkit-mask-image:linear-gradient(to right,transparent calc(0% + var(--active-element-mask-position)),black calc(15% + var(--active-element-mask-position)),black 80%,transparent);
        }
        .gsap-nav .active-element .strike svg {
          display:block; overflow:visible; height:12px;
          width:calc(var(--active-element-width) * 2);
          transform:translate(var(--active-element-strike-x),30%) scale(var(--active-element-scale-x),var(--active-element-scale-y));
        }
        .gsap-nav .active-element .strike svg:last-child { transform:translate(var(--active-element-strike-x),-30%) scale(-1); }
        .gsap-nav .active-element .strike svg g path:nth-child(2) { filter:blur(2px); }
        .gsap-nav .active-element .strike svg g path:nth-child(3) { filter:blur(4px); }
        .gsap-nav.before .active-element { transform:rotateY(180deg); }
      `}</style>

      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Header with Logo + GSAP Navbar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 z-10">
        <div className="flex items-center gap-2">
          <div className="text-blue-500 bg-blue-500/10 p-2 rounded-xl border border-blue-500/20">
            <HeartPulse size={24} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            MediSlot AI
          </span>
        </div>

        {/* GSAP Animated Navbar */}
        <nav ref={navRef} className="gsap-nav">
          <ul>
            {tabs.map((tab, i) => (
              <li key={tab} className={i === 0 ? 'active' : ''}>
                <button onClick={(e) => handleTabClick(tab, e.currentTarget, i)}>{tab}</button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Live
          </div>
        </div>
      </header>

      {/* Dynamic Tab Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 z-10 w-full">
        <AnimatePresence mode="wait">
          {renderSection()}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 text-xs text-slate-500">
        <div>© 2026 MediSlot AI. All rights reserved.</div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-500" />
          Secure HIPAA Compliant Platform
        </div>
      </footer>
    </motion.div>
  );
}
