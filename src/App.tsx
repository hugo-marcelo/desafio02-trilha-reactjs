import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { GenreProvider } from './contexts/GenreContext';
import { MovieProvider } from './contexts/MovieContext';

import './styles/global.scss';

export function App() {
  return (
    <GenreProvider>
      <MovieProvider>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <SideBar />
          <Content />
        </div>
      </MovieProvider>
    </GenreProvider>
  )
}