import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'publicidad', title: 'Publicidad de Cursos', href: paths.dashboard.courses, icon: 'publicidad' },
  //{ key: 'overview', title: 'Estadisticas', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'users', title: 'Cuenta', href: paths.dashboard.account, icon: 'users' },
  { key: 'curso', title: 'Gestion de Curso', href: paths.dashboard.cursos, icon: 'courses' },
  { key: 'maestrias', title: 'Maestrias de cursos', href: paths.dashboard.maestrias, icon: 'maestrias' },
  { key: 'carrusel', title: 'Cursos Presentación', href: paths.dashboard.carrusel, icon: 'presentation-chart' },
  { key: 'videos', title: 'Cargar Videos', href: paths.dashboard.videos, icon: 'video' }

] satisfies NavItemConfig[];
