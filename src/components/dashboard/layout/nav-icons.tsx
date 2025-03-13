import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { Book as BookIcon } from '@phosphor-icons/react/dist/ssr/Book'; // Icono para cursos o clases
import { Clipboard as ClipboardListIcon } from '@phosphor-icons/react/dist/ssr/Clipboard';
import { FileText as DocumentTextIcon } from '@phosphor-icons/react/dist/ssr/FileText';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { ChartBar as PresentationChartIcon } from '@phosphor-icons/react';
import { Megaphone as MegaphoneIcon } from '@phosphor-icons/react/dist/ssr/Megaphone';
import { VideoCamera as VideoIcon } from '@phosphor-icons/react/dist/ssr/VideoCamera'; // Importar el ícono de video

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  'courses': BookIcon, // Representa cursos o clases
  'enrollments': ClipboardListIcon, // Representa las inscripciones o matrículas
  'forms': DocumentTextIcon, // Representa formularios
  'notifications': BellIcon, // Representa notificaciones
  'presentation-chart': PresentationChartIcon,
  'publicidad': MegaphoneIcon,
  'maestrias' : BookIcon,
  'video': VideoIcon,
  user: UserIcon,
  users: UsersIcon,
  book: BookIcon,
} as Record<string, Icon>;
