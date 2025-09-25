import { messages } from './messages';
import { PATHS } from './path';
export const categories = [
  { key: 'drama', href: PATHS.K_DRAMA, title: messages.kDrama, desc: messages.dramaTrending },
  { key: 'movie', href: PATHS.K_MOVIE, title: messages.kMovie, desc: messages.movieTrending },
  { key: 'pop', href: PATHS.K_POP, title: messages.kPop, desc: messages.kpopTrending },
];
